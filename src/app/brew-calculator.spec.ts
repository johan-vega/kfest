import {
  BREW_CONFIGS, BrewMethod, BrewRecipes, calculateBrew, brewSteps, brewWarnings,
  brewTime, buildBrewWhatsAppLink, formatBrewNumber
} from './brew-calculator';

describe('brew calculator (pure engine)', () => {
  it.each([
    [1, 200, 13.5, 225, 198],
    [2, 200, 27, 450, 396],
    [2, 150, 20.5, 340, 299]
  ])('V60: %s portions × %s ml', (portions, cupVolumeMl, coffee, water, beverage) => {
    const r = calculateBrew({ method: 'v60', portions, cupVolumeMl });
    expect(r.coffeeGrams).toBe(coffee);
    expect(r.waterMl).toBe(water);
    expect(r.beverage).toBe(beverage);
    expect(r.targetBeverageMl).toBe(portions * cupVolumeMl);
    expect(r.warnings).toContain('estimated-retention');
  });

  it('changes method and volume without stale calculations or mutation', () => {
    const input = { method: 'v60' as BrewMethod, portions: 2, cupVolumeMl: 200 };
    const original = calculateBrew(input);
    expect(calculateBrew({ ...input, cupVolumeMl: 150 }).waterMl).toBe(340);
    const press = calculateBrew({ ...input, method: 'prensa' });
    expect(press.coffeeGrams).toBe(31);
    expect(press.waterMl).toBe(465);
    expect(press.beverage).toBe(403);
    expect(calculateBrew(input)).toEqual(original);
    expect(input.method).toBe('v60');
  });

  it.each([1, 2])('espresso: %s independent double shots, never a combined basket dose', portions => {
    const r = calculateBrew({ method: 'espresso', portions, cupVolumeMl: 250 });
    expect(r.perBatch.coffeeGrams).toBe(18);
    expect(r.perBatch.beverage).toBe(36);
    expect(r.coffeeGrams).toBe(18 * portions);
    expect(r.beverage).toBe(36 * portions);
    expect(r.batchCount).toBe(portions);
    expect(r.beverageUnit).toBe('g');
    expect(r.waterMl).toBeNull();
    expect(r.cupVolumeMl).toBeNull();
    expect(brewSteps(r, 'es').join(' ')).not.toMatch(/9 bar|bloom/i);
  });

  it.each([1, 3, 6, 9])('Moka capacity %s has no invented measurements', mokaCapacity => {
    const r = calculateBrew({ method: 'moka', portions: 2, mokaCapacity });
    expect(r.mokaCapacity).toBe(mokaCapacity);
    expect(r.batchCount).toBe(2);
    expect(r.coffeeGrams).toBeNull();
    expect(r.waterMl).toBeNull();
    expect(r.beverage).toBeNull();
    expect(r.referenceRatio).toBeNull();
    expect(r.warnings).toContain('unmeasured-moka');
    expect(brewSteps(r, 'en').join(' ')).toContain('without tamping');
  });

  it('supports measured Moka models without applying a filter formula', () => {
    const recipes: BrewRecipes = structuredClone(BREW_CONFIGS);
    recipes.moka.capacities = [{ italianCups: 4, measuredDoseGrams: 20, measuredWaterMl: 200, measuredYieldMl: 150 }];
    const r = calculateBrew({ method: 'moka', mokaCapacity: 4, portions: 2 }, recipes);
    expect(r.coffeeGrams).toBe(40);
    expect(r.waterMl).toBe(400);
    expect(r.beverage).toBe(300);
    expect(r.warnings).not.toContain('unmeasured-moka');
  });

  it('splits eight large V60 cups into four whole preparations', () => {
    const r = calculateBrew({ method: 'v60', portions: 8, cupVolumeMl: 250 });
    expect(r.batchCount).toBe(4);
    expect(r.perBatch.coffeeGrams).toBe(34);
    expect(r.perBatch.waterMl).toBe(570);
    expect(r.coffeeGrams).toBe(136);
    expect(r.waterMl).toBe(2280);
    expect(r.beverage).toBe(2008);
    expect(r.warnings).toContain('split-batches');
  });

  it('honours a custom capacity even at a rounding boundary', () => {
    const recipes = structuredClone(BREW_CONFIGS);
    recipes.v60.limits.maxWaterMl = 224;
    const r = calculateBrew({ method: 'v60', cupVolumeMl: 200 }, recipes);
    expect(r.batchCount).toBe(2);
    expect(r.perBatch.waterMl).toBeLessThanOrEqual(224);
    expect(r.referenceRatio).toBe(16.7);
  });

  it('keeps rounded doses, totals, yields and actual ratios coherent for all filter sizes', () => {
    for (const method of ['v60', 'prensa', 'chemex'] as const) {
      for (const cupVolumeMl of [150, 200, 220, 250]) {
        for (let portions = 1; portions <= 8; portions++) {
          const r = calculateBrew({ method, portions, cupVolumeMl });
          const b = r.perBatch;
          expect(b.coffeeGrams! * 2 % 1).toBe(0);
          expect(b.waterMl! % 5).toBe(0);
          expect(b.waterMl).toBeLessThanOrEqual(BREW_CONFIGS[method].limits.maxWaterMl);
          expect(Math.abs(b.waterMl! - b.coffeeGrams! * r.referenceRatio!)).toBeLessThanOrEqual(2.5);
          expect(r.actualRatio).toBe(b.waterMl! / b.coffeeGrams!);
          expect(r.beverage).toBe((b.waterMl! - b.coffeeGrams! * 2) * r.batchCount);
          expect(r.coffeeGrams).toBe(b.coffeeGrams! * r.batchCount);
          expect(r.waterMl).toBe(b.waterMl! * r.batchCount);
          expect(Number.isInteger(r.batchCount)).toBe(true);
        }
      }
    }
  });

  it('uses cumulative pour targets including a dynamic bloom', () => {
    const r = calculateBrew({ method: 'v60' });
    expect(r.perBatch.bloomRangeGrams).toEqual([27, 40.5]);
    expect(r.perBatch.cumulativePoursGrams).toEqual([135, 225]);
    expect(brewSteps(r, 'es').join(' ')).toContain('ya incluyen el bloom');
    expect(brewTime(calculateBrew({ method: 'v60', portions: 2 }), 'en')).toContain('Larger batch');
    const press = calculateBrew({ method: 'prensa' });
    expect(press.perBatch.bloomRangeGrams).toBeNull();
    expect(press.perBatch.cumulativePoursGrams).toEqual([]);
    expect(brewSteps(press, 'es').join(' ')).toContain('decanta');
  });

  it('preserves Kfest essence as an editable, unvalidated 1:8 reference', () => {
    const r = calculateBrew({ method: 'gota' });
    expect(r.coffeeGrams).toBe(12.5);
    expect(r.waterMl).toBe(100);
    expect(r.beverage).toBeNull();
    expect(brewWarnings(r, 'es').join(' ')).toContain('Referencia inicial por calibrar');
    expect(brewSteps(r, 'en').join(' ')).toContain('Selva Central');
    const edited = calculateBrew({ method: 'gota', concentrateDoseGrams: 20, concentrateRatio: 10 });
    expect(edited.coffeeGrams).toBe(20);
    expect(edited.waterMl).toBe(200);
    const large = calculateBrew({ method: 'gota', concentrateDoseGrams: 100, concentrateRatio: 20, portions: 8 });
    expect(large.perBatch.waterMl).toBeLessThanOrEqual(300);
    expect(large.warnings).toContain('split-batches');
  });

  it('supports a barista-configured concentrate yield, time and drink type', () => {
    const recipes = structuredClone(BREW_CONFIGS);
    Object.assign(recipes.gota, { retentionGramsPerGram: 1, timeMinutes: 6, validated: true, concentrated: false });
    const r = calculateBrew({ method: 'gota' }, recipes);
    expect(r.beverage).toBe(87.5);
    expect(brewTime(r, 'en', recipes)).toBe('6 min');
    expect(brewSteps(r, 'en', recipes).join(' ')).toContain('ready to drink');
    expect(r.warnings).not.toContain('uncalibrated-concentrate');
  });

  it.each([[-3, 1], [0, 1], [1.8, 2], [9, 8], [Infinity, 1], [NaN, 1]])(
    'normalizes portions %s to %s', (portions, expected) => {
      const r = calculateBrew({ method: 'v60', portions });
      expect(r.portions).toBe(expected);
      expect(r.warnings).toContain('input-adjusted');
    });

  it('validates unknown methods, invalid volumes, Moka capacities and concentrate inputs', () => {
    const fallback = calculateBrew({ method: 'invalid' as BrewMethod, cupVolumeMl: -20 });
    expect(fallback.method).toBe('v60');
    expect(fallback.cupVolumeMl).toBe(200);
    expect(calculateBrew({ method: 'moka', mokaCapacity: NaN }).mokaCapacity).toBe(1);
    const gota = calculateBrew({ method: 'gota', concentrateDoseGrams: Infinity, concentrateRatio: -4 });
    expect(gota.perBatch.coffeeGrams).toBe(12.5);
    expect(gota.waterMl).toBe(25);
    for (const value of [fallback.coffeeGrams, fallback.waterMl, fallback.beverage, gota.waterMl]) {
      expect(Number.isFinite(value)).toBe(true);
      expect(value).toBeGreaterThan(0);
    }
  });

  it('rejects invalid developer configuration instead of emitting impossible quantities', () => {
    for (const value of [NaN, Infinity, -2, 0, 2]) {
      const recipes = structuredClone(BREW_CONFIGS);
      recipes.v60.waterRatio = value;
      expect(() => calculateBrew({ method: 'v60' }, recipes)).toThrow(RangeError);
    }
    const recipes = structuredClone(BREW_CONFIGS);
    recipes.prensa.limits.maxWaterMl = 0;
    expect(() => calculateBrew({ method: 'prensa' }, recipes)).toThrow(RangeError);
  });

  it.each(['es', 'en'] as const)('builds a correctly encoded WhatsApp draft in %s', language => {
    const r = calculateBrew({ method: 'v60', portions: 8, cupVolumeMl: 250 });
    const link = buildBrewWhatsAppLink('configured-phone', r, language);
    const url = new URL(link);
    expect(url.pathname).toBe('/configured-phone');
    const text = url.searchParams.get('text')!;
    expect(text).toContain('250 ml');
    expect(text).toContain('136 g');
    expect(text).toContain('2');
    expect(text).toContain('34 g');
    expect(text).toContain('570 ml');
    expect(text).toContain(language === 'es' ? 'Preparaciones: 4' : 'Batches: 4');
    expect(text).toContain(language === 'es' ? 'en grano' : 'whole beans');
    expect(text).not.toMatch(/exact|perfect/i);
    expect(link).toContain('%0A');
    expect(link).not.toContain(' ');
  });

  it('distinguishes espresso extraction dose and total in WhatsApp', () => {
    const r = calculateBrew({ method: 'espresso', portions: 2 });
    const text = new URL(buildBrewWhatsAppLink('existing-phone', r, 'es')).searchParams.get('text');
    expect(text).toContain('Café total: 36 g');
    expect(text).toContain('Por extracción independiente: 18 g de café → 36 g de bebida');
    expect(text).toContain('Bebida total: 72 g');
    expect(text).not.toContain('ml');
  });

  it('does not invent Moka doses or omit the uncalibrated essence status from WhatsApp', () => {
    const moka = new URL(buildBrewWhatsAppLink('phone', calculateBrew({ method: 'moka', mokaCapacity: 6 }), 'en')).searchParams.get('text');
    expect(moka).toContain('6 nominal Italian-cup');
    expect(moka).toContain('Dose: fill basket');
    const gota = new URL(buildBrewWhatsAppLink('phone', calculateBrew({ method: 'gota' }), 'es')).searchParams.get('text');
    expect(gota).toContain('Referencia inicial por calibrar');
  });

  it('localizes decimal quantities, method names, warnings and measurement units', () => {
    expect(formatBrewNumber(13.5, 'es')).toBe('13,5');
    expect(formatBrewNumber(13.5, 'en')).toBe('13.5');
    expect(BREW_CONFIGS.prensa.name.en).toBe('French Press');
    expect(brewWarnings(calculateBrew({ method: 'v60' }), 'en').join(' ')).toContain('g water/g coffee');
    expect(brewWarnings(calculateBrew({ method: 'v60' }), 'es').join(' ')).toContain('g de agua/g de café');
  });
});
