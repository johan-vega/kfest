/** Pure recipe engine. ml of brewing water ≈ g on a scale; espresso yield is in g.
 * Defaults are starting points, not recipes validated for every coffee or brewer.
 */
export type BrewLanguage = 'es' | 'en';
export type LocalizedText = Record<BrewLanguage, string>;
export type BrewMethod = 'v60' | 'prensa' | 'moka' | 'espresso' | 'chemex' | 'gota';
export type BrewUnit = 'g' | 'ml' | '°C';
export const CUP_VOLUMES = [150, 200, 220, 250] as const;
export const MAX_PORTIONS = 8;

interface RecipeBase {
  name: LocalizedText;
  grind: LocalizedText;
  equipment: LocalizedText;
  icon: string;
  temperatureC: number | null;
}
export interface EquipmentLimits {
  /** Operating water limit, including headspace for immersion. Validate on site. */
  maxWaterMl: number;
}
export interface FilterRecipe extends RecipeBase {
  kind: 'filter';
  waterRatio: number;
  retentionGramsPerGram: number;
  limits: EquipmentLimits;
}
export interface EspressoRecipe extends RecipeBase {
  kind: 'espresso';
  doseGrams: number;
  beverageRatio: number;
}
export interface MokaCapacity {
  italianCups: number;
  /** Only enter measured amounts for the actual model; null means unknown. */
  measuredDoseGrams: number | null;
  measuredWaterMl: number | null;
  measuredYieldMl: number | null;
}
export interface MokaRecipe extends RecipeBase {
  kind: 'moka';
  capacities: readonly MokaCapacity[];
}
export interface ConcentrateRecipe extends RecipeBase {
  kind: 'concentrate';
  waterRatio: number;
  doseGrams: number;
  retentionGramsPerGram: number | null;
  timeMinutes: number | null;
  concentrated: boolean;
  validated: boolean;
  limits: EquipmentLimits;
}
export type BrewConfig = FilterRecipe | EspressoRecipe | MokaRecipe | ConcentrateRecipe;
export interface BrewRecipes {
  v60: FilterRecipe;
  prensa: FilterRecipe;
  chemex: FilterRecipe;
  espresso: EspressoRecipe;
  moka: MokaRecipe;
  gota: ConcentrateRecipe;
}

export const BREW_CONFIGS: BrewRecipes = {
  v60: {
    kind: 'filter', name: { es: 'V60 / Cono', en: 'V60 / Pour Over' },
    grind: { es: 'Media-fina', en: 'Medium-fine' },
    equipment: { es: 'V60 tamaño 02', en: 'V60 size 02' }, icon: 'fa-solid fa-filter',
    temperatureC: 93, waterRatio: 16.7, retentionGramsPerGram: 2, limits: { maxWaterMl: 600 }
  },
  prensa: {
    kind: 'filter', name: { es: 'Prensa Francesa', en: 'French Press' },
    grind: { es: 'Gruesa', en: 'Coarse' },
    equipment: { es: 'Prensa con margen para la costra', en: 'Press with headspace for the crust' },
    icon: 'fa-solid fa-mug-hot', temperatureC: 94, waterRatio: 15,
    retentionGramsPerGram: 2, limits: { maxWaterMl: 600 }
  },
  chemex: {
    kind: 'filter', name: { es: 'Chemex', en: 'Chemex' },
    grind: { es: 'Media-gruesa', en: 'Medium-coarse' },
    equipment: { es: 'Chemex · verificar modelo', en: 'Chemex · check model' },
    icon: 'fa-solid fa-flask', temperatureC: 94, waterRatio: 16.7,
    retentionGramsPerGram: 2, limits: { maxWaterMl: 800 }
  },
  espresso: {
    kind: 'espresso', name: { es: 'Espresso', en: 'Espresso' },
    grind: { es: 'Fina, ajustar al calibrar', en: 'Fine, adjust while dialling in' },
    equipment: { es: 'Canastilla doble de 18 g', en: '18 g double basket' },
    icon: 'fa-solid fa-bolt', temperatureC: 93, doseGrams: 18, beverageRatio: 2
  },
  moka: {
    kind: 'moka', name: { es: 'Moka Italiana', en: 'Moka Pot' },
    grind: { es: 'Fina-media para Moka', en: 'Fine-medium for Moka' },
    equipment: { es: 'Moka · tazas italianas nominales', en: 'Moka · nominal Italian cups' },
    icon: 'fa-solid fa-fire-burner', temperatureC: null,
    capacities: [1, 3, 6, 9].map(italianCups => ({
      italianCups, measuredDoseGrams: null, measuredWaterMl: null, measuredYieldMl: null
    }))
  },
  gota: {
    kind: 'concentrate', name: { es: 'Gota a Gota', en: 'Traditional Slow Drip' },
    grind: { es: 'Media-gruesa, por calibrar', en: 'Medium-coarse, to calibrate' },
    equipment: { es: 'Gotero tradicional de esencia', en: 'Traditional coffee essence dripper' },
    icon: 'fa-solid fa-droplet', temperatureC: null,
    // Preserve the old Kfest 1:8 / 100 ml reference, explicitly unvalidated.
    waterRatio: 8, doseGrams: 12.5, retentionGramsPerGram: null,
    timeMinutes: null, concentrated: true, validated: false, limits: { maxWaterMl: 300 }
  }
};

export interface BrewInput {
  method: BrewMethod;
  portions?: number;
  cupVolumeMl?: number;
  mokaCapacity?: number;
  concentrateDoseGrams?: number;
  concentrateRatio?: number;
}
export type BrewWarning = 'input-adjusted' | 'split-batches' | 'estimated-retention' |
  'unmeasured-moka' | 'uncalibrated-concentrate';
export interface BrewBatch {
  coffeeGrams: number | null;
  waterMl: number | null;
  beverage: number | null;
  beverageUnit: 'g' | 'ml';
  /** Water weights are cumulative, including bloom, never additional pours. */
  bloomRangeGrams: readonly [number, number] | null;
  cumulativePoursGrams: readonly number[];
}
export interface BrewResult {
  method: BrewMethod;
  kind: BrewConfig['kind'];
  portions: number;
  cupVolumeMl: number | null;
  targetBeverageMl: number | null;
  mokaCapacity: number | null;
  batchCount: number;
  perBatch: BrewBatch;
  coffeeGrams: number | null;
  waterMl: number | null;
  beverage: number | null;
  beverageUnit: 'g' | 'ml';
  referenceRatio: number | null;
  actualRatio: number | null;
  maxWaterMl: number | null;
  warnings: BrewWarning[];
}

function clamp(value: number | undefined, fallback: number, min: number, max: number): number {
  return Number.isFinite(value) ? Math.min(max, Math.max(min, value!)) : fallback;
}
export function normalizePortions(value: number): number {
  return Math.round(clamp(value, 1, 1, MAX_PORTIONS));
}
export function normalizeCupVolume(value: number): number {
  return CUP_VOLUMES.includes(value as typeof CUP_VOLUMES[number]) ? value : 200;
}
export function normalizeConcentrateDose(value: number | undefined, fallback = 12.5): number {
  return Math.round(clamp(value, fallback, 5, 100) * 2) / 2;
}
export function normalizeConcentrateRatio(value: number | undefined, fallback = 8): number {
  return clamp(value, fallback, 2, 20);
}
export function isBrewMethod(value: unknown): value is BrewMethod {
  return typeof value === 'string' && Object.hasOwn(BREW_CONFIGS, value);
}
const roundTo = (value: number, step: number) => Math.round(value / step) * step;
function requireNumber(value: number, min: number, max: number, label: string): void {
  if (!Number.isFinite(value) || value < min || value > max) {
    throw new RangeError(`Invalid recipe ${label}`);
  }
}

/** Bad user inputs are normalized and flagged; invalid developer recipes fail explicitly. */
export function calculateBrew(input: BrewInput, recipes: BrewRecipes = BREW_CONFIGS): BrewResult {
  const method = isBrewMethod(input.method) ? input.method : 'v60';
  const config = recipes[method];
  const portions = normalizePortions(input.portions ?? 1);
  const warnings: BrewWarning[] = [];
  if (method !== input.method || (input.portions !== undefined && portions !== input.portions)) {
    warnings.push('input-adjusted');
  }
  const result: BrewResult = {
    method, kind: config.kind, portions, cupVolumeMl: null, targetBeverageMl: null,
    mokaCapacity: null, batchCount: 1, coffeeGrams: null, waterMl: null, beverage: null,
    beverageUnit: 'ml', referenceRatio: null, actualRatio: null, maxWaterMl: null, warnings,
    perBatch: { coffeeGrams: null, waterMl: null, beverage: null, beverageUnit: 'ml',
      bloomRangeGrams: null, cumulativePoursGrams: [] }
  };

  if (config.kind === 'espresso') {
    requireNumber(config.doseGrams, 1, 30, 'espresso dose');
    requireNumber(config.beverageRatio, 1, 4, 'espresso ratio');
    result.batchCount = portions;
    result.beverageUnit = 'g';
    result.referenceRatio = config.beverageRatio;
    result.actualRatio = config.beverageRatio;
    result.perBatch = { ...result.perBatch, coffeeGrams: config.doseGrams,
      beverage: config.doseGrams * config.beverageRatio, beverageUnit: 'g' };
  } else if (config.kind === 'moka') {
    if (!config.capacities.length) throw new RangeError('Moka capacities are empty');
    const capacity = config.capacities.find(c => c.italianCups === (input.mokaCapacity ?? 3))
      ?? config.capacities[0];
    requireNumber(capacity.italianCups, 1, 24, 'Moka capacity');
    if (input.mokaCapacity !== undefined && capacity.italianCups !== input.mokaCapacity) {
      warnings.push('input-adjusted');
    }
    for (const measurement of [capacity.measuredDoseGrams, capacity.measuredWaterMl, capacity.measuredYieldMl]) {
      if (measurement !== null) requireNumber(measurement, 0.5, 2000, 'Moka measurement');
    }
    result.mokaCapacity = capacity.italianCups;
    // Portions mean full pots, never fractional baskets or large filter cups.
    result.batchCount = portions;
    result.perBatch = { ...result.perBatch, coffeeGrams: capacity.measuredDoseGrams,
      waterMl: capacity.measuredWaterMl, beverage: capacity.measuredYieldMl };
    if ([capacity.measuredDoseGrams, capacity.measuredWaterMl, capacity.measuredYieldMl].includes(null)) {
      warnings.push('unmeasured-moka');
    }
  } else {
    requireNumber(config.limits.maxWaterMl, 50, 5000, 'water capacity');
    result.maxWaterMl = config.limits.maxWaterMl;
    let ratio = config.waterRatio;
    let retention = config.retentionGramsPerGram;
    let totalDose: number;
    if (config.kind === 'filter') {
      const cup = normalizeCupVolume(input.cupVolumeMl ?? 200);
      if (input.cupVolumeMl !== undefined && cup !== input.cupVolumeMl) warnings.push('input-adjusted');
      result.cupVolumeMl = cup;
      result.targetBeverageMl = portions * cup;
      requireNumber(retention!, 0, 5, 'retention');
      requireNumber(ratio, retention! + 1, 30, 'water ratio');
      totalDose = result.targetBeverageMl / (ratio - retention!);
      warnings.push('estimated-retention');
    } else {
      requireNumber(config.doseGrams, 5, 100, 'concentrate dose');
      requireNumber(ratio, 2, 20, 'concentrate ratio');
      const dose = normalizeConcentrateDose(input.concentrateDoseGrams, config.doseGrams);
      ratio = normalizeConcentrateRatio(input.concentrateRatio, ratio);
      if ((input.concentrateDoseGrams !== undefined && dose !== input.concentrateDoseGrams) ||
          (input.concentrateRatio !== undefined && ratio !== input.concentrateRatio)) warnings.push('input-adjusted');
      if (retention !== null) {
        requireNumber(retention, 0, ratio - 1, 'concentrate retention');
        warnings.push('estimated-retention');
      }
      totalDose = dose * portions;
      if (!config.validated) warnings.push('uncalibrated-concentrate');
    }
    // Start with whole preparations; round each repeated batch, then sum those actual recipes.
    let batches = config.kind === 'filter' ? 1 : portions;
    let coffee: number;
    let water: number;
    do {
      coffee = roundTo(totalDose / batches, 0.5);
      water = roundTo(coffee * ratio, 5);
      if (coffee < 0.5 || water < 5) throw new RangeError('Capacity cannot hold a meaningful recipe');
      if (water <= config.limits.maxWaterMl) break;
      batches++;
    } while (batches <= 1000);
    if (water > config.limits.maxWaterMl) throw new RangeError('Recipe exceeds equipment capacity');
    result.batchCount = batches;
    result.referenceRatio = ratio;
    result.actualRatio = water / coffee;
    const bloom = method === 'v60' || method === 'chemex';
    result.perBatch = {
      coffeeGrams: coffee, waterMl: water,
      beverage: retention === null ? null : water - coffee * retention,
      beverageUnit: 'ml', bloomRangeGrams: bloom ? [coffee * 2, coffee * 3] : null,
      cumulativePoursGrams: bloom ? [roundTo(water * 0.6, 5), water] : []
    };
    if (batches > (config.kind === 'filter' ? 1 : portions)) warnings.push('split-batches');
  }
  const total = (value: number | null) => value === null ? null : value * result.batchCount;
  result.coffeeGrams = total(result.perBatch.coffeeGrams);
  result.waterMl = total(result.perBatch.waterMl);
  result.beverage = total(result.perBatch.beverage);
  return result;
}

export function formatBrewNumber(value: number, language: BrewLanguage): string {
  return new Intl.NumberFormat(language === 'es' ? 'es-ES' : 'en-US', {
    maximumFractionDigits: 1
  }).format(value);
}

export function brewTime(result: BrewResult, language: BrewLanguage, recipes = BREW_CONFIGS): string {
  const es = language === 'es';
  switch (result.method) {
    case 'v60': return result.perBatch.waterMl! <= 350 ? '2:30–3:30 min' :
      (es ? 'Lote mayor: ajustar al drenaje' : 'Larger batch: adjust to drawdown');
    case 'chemex': return es ? '3:30–5:00 min, según lote' : '3:30–5:00 min, batch dependent';
    case 'prensa': return es ? '4 min de inmersión inicial' : '4 min initial steep';
    case 'espresso': return es ? '25–30 s por extracción' : '25–30 s per shot';
    case 'moka': return es ? 'Según equipo y calor' : 'Depends on pot and heat';
    case 'gota': return recipes.gota.timeMinutes === null ?
      (es ? 'Por calibrar en el equipo' : 'Calibrate on the brewer') : `${recipes.gota.timeMinutes} min`;
  }
}

export function brewWarnings(result: BrewResult, language: BrewLanguage, recipes = BREW_CONFIGS): string[] {
  const es = language === 'es';
  const config = recipes[result.method];
  const messages: Record<BrewWarning, LocalizedText> = {
    'input-adjusted': { es: 'Se ajustaron valores fuera de los límites permitidos.', en: 'Out-of-range inputs were adjusted.' },
    'split-batches': { es: `Divide en ${result.batchCount} preparaciones iguales para respetar la capacidad del equipo.`,
      en: `Split into ${result.batchCount} equal batches to stay within brewer capacity.` },
    'estimated-retention': { es: `Rendimiento aproximado: retención de referencia de ${formatBrewNumber('retentionGramsPerGram' in config ? config.retentionGramsPerGram! : 2, language)} g de agua/g de café. No es una medición; influyen el café y el drenaje.`,
      en: `Approximate yield: reference retention of ${formatBrewNumber('retentionGramsPerGram' in config ? config.retentionGramsPerGram! : 2, language)} g water/g coffee. Not a measurement; coffee and drainage affect yield.` },
    'unmeasured-moka': { es: 'Sin medidas del modelo: dosis, agua y bebida dependen de la canastilla y la caldera reales. No equivalen a tazas grandes de filtrado.',
      en: 'Model not measured: dose, water and yield depend on the actual basket and boiler. Italian cups are not large filter cups.' },
    'uncalibrated-concentrate': { es: 'Referencia inicial por calibrar. No es una receta universal. Confirma proporción, capacidad, rendimiento, temperatura y tiempo con el barista Kfest.',
      en: 'Initial reference to calibrate. Not a universal recipe. Confirm ratio, capacity, yield, temperature and time with the Kfest barista.' }
  };
  return result.warnings.map(code => messages[code][language]);
}

export function brewSteps(result: BrewResult, language: BrewLanguage, recipes = BREW_CONFIGS): string[] {
  const es = language === 'es';
  const n = (v: number) => formatBrewNumber(v, language);
  const batch = result.perBatch;
  if (result.method === 'v60' || result.method === 'chemex') {
    return es ? [
      'Enjuaga el filtro y descarta esa agua; no se incluye en la receta. Coloca el equipo en la balanza y tara.',
      `Agrega ${n(batch.coffeeGrams!)} g de café molido por preparación.`,
      `Humedece con ${n(batch.bloomRangeGrams![0])}–${n(batch.bloomRangeGrams![1])} g de agua (2–3 veces la dosis). Espera 30–45 s.`,
      `Continúa gradualmente hasta ${n(batch.cumulativePoursGrams[0])} g y luego ${n(batch.cumulativePoursGrams[1])} g acumulados en la balanza. Estos pesos ya incluyen el bloom.`,
      'Espera el drenaje completo. Ajusta la cadencia y la molienda según el tamaño del lote y el flujo; los tiempos son orientativos.'
    ] : [
      'Rinse the filter and discard this water; it is not part of the recipe. Place the brewer on the scale and tare.',
      `Add ${n(batch.coffeeGrams!)} g ground coffee per batch.`,
      `Wet with ${n(batch.bloomRangeGrams![0])}–${n(batch.bloomRangeGrams![1])} g water (2–3 times the dose). Wait 30–45 s.`,
      `Pour gradually to ${n(batch.cumulativePoursGrams[0])} g, then ${n(batch.cumulativePoursGrams[1])} g cumulative on the scale. These weights already include bloom water.`,
      'Allow full drawdown. Adjust pouring and grind for batch size and flow; times are guidelines.'
    ];
  }
  if (result.method === 'prensa') return es ? [
    `Agrega ${n(batch.coffeeGrams!)} g de café y ${n(batch.waterMl!)} ml de agua por preparación. Deja margen para la costra; no requiere bloom de filtrado.`,
    'Deja una inmersión inicial de 4 min. Rompe la costra y retira la espuma con cuidado.',
    'Baja el émbolo suavemente sin comprimir el fondo y decanta al terminar para separar la bebida del café.'
  ] : [
    `Add ${n(batch.coffeeGrams!)} g coffee and ${n(batch.waterMl!)} ml water per batch. Leave headspace for the crust; a filter-style bloom is not required.`,
    'Steep for an initial 4 min. Break the crust and carefully skim the foam.',
    'Lower the plunger gently without compressing the grounds and decant when finished to separate the drink from the coffee.'
  ];
  if (result.method === 'espresso') return es ? [
    `En cada extracción usa ${n(batch.coffeeGrams!)} g en una canastilla compatible. Distribuye y tampea nivelado.`,
    `Pesa ${n(batch.beverage!)} g de bebida en taza por extracción (1:${n(result.referenceRatio!)}). Los 25–30 s son un punto de partida.`,
    `Realiza ${result.batchCount} extracción(es) independientes. Ajusta la molienda durante la calibración según flujo y sabor.`
  ] : [
    `Use ${n(batch.coffeeGrams!)} g in a compatible basket for each shot. Distribute and tamp level.`,
    `Weigh ${n(batch.beverage!)} g beverage per shot (1:${n(result.referenceRatio!)}). Start with 25–30 s.`,
    `Pull ${result.batchCount} independent shot(s). Dial in the grind based on flow and taste.`
  ];
  if (result.method === 'moka') return es ? [
    `Usa la Moka de ${result.mokaCapacity} tazas italianas nominales. Prepara la cafetera completa; no reduzcas la carga para imitar una taza de filtrado.`,
    'Llena de agua hasta debajo de la válvula de seguridad, sin cubrirla. Sigue las indicaciones del fabricante.',
    'Llena la canastilla con molienda fina-media para Moka, nivela sin compactar.',
    'Usa calor bajo a moderado. Retira cuando termine la extracción, evitando sobrecalentar.'
  ] : [
    `Use the ${result.mokaCapacity} nominal Italian-cup Moka. Brew a full pot; do not underfill to imitate a filter cup.`,
    'Fill water below the safety valve without covering it. Follow the manufacturer’s instructions.',
    'Fill the basket with fine-medium Moka coffee; level without tamping.',
    'Use low to moderate heat. Remove when extraction finishes to avoid overheating.'
  ];
  return es ? [
    'Método patrimonial de la Selva Central: esencia de café, tradicionalmente combinada con leche o diluida al gusto.',
    `Referencia editable por preparación: ${n(batch.coffeeGrams!)} g de café / ${n(batch.waterMl!)} ml de agua (1:${n(result.referenceRatio!)}). Equipo: ${recipes.gota.equipment.es}.`,
    recipes.gota.concentrated ? 'Bebida concentrada: no equivale a una taza lista para tomar. Calibra el goteo y la dilución con Kfest.' : 'Receta configurada como lista para tomar: valida el goteo y el resultado con Kfest.'
  ] : [
    'A Selva Central heritage method: coffee essence, traditionally combined with milk or diluted to taste.',
    `Editable reference per batch: ${n(batch.coffeeGrams!)} g coffee / ${n(batch.waterMl!)} ml water (1:${n(result.referenceRatio!)}). Brewer: ${recipes.gota.equipment.en}.`,
    recipes.gota.concentrated ? 'Concentrated beverage: not a ready-to-drink cup. Calibrate drip rate and dilution with Kfest.' : 'Recipe configured as ready to drink: validate drip rate and yield with Kfest.'
  ];
}

/** Builds a draft only; uses the existing phone supplied by the application. */
export function buildBrewWhatsAppLink(phone: string, result: BrewResult, language: BrewLanguage,
  recipes = BREW_CONFIGS): string {
  const es = language === 'es';
  const config = recipes[result.method];
  const n = (v: number) => formatBrewNumber(v, language);
  const lines = [es ? `Hola Kfest, usé Barista Lab: ${config.name.es}.` : `Hello Kfest, I used Barista Lab: ${config.name.en}.`];
  const quantityLabel = result.kind === 'espresso' ? (es ? 'Espressos dobles' : 'Double espressos') :
    result.kind === 'moka' ? (es ? 'Cafeteras completas' : 'Full pots') :
    result.kind === 'concentrate' ? (es ? 'Lotes de referencia' : 'Reference batches') : (es ? 'Porciones' : 'Servings');
  lines.push(`${quantityLabel}: ${result.portions}.`);
  if (result.cupVolumeMl !== null) lines.push(es ? `Bebida deseada por taza: ${n(result.cupVolumeMl)} ml.` : `Desired drink per cup: ${n(result.cupVolumeMl)} ml.`);
  if (result.mokaCapacity !== null) lines.push(es ? `Moka de ${result.mokaCapacity} tazas italianas nominales.` : `${result.mokaCapacity} nominal Italian-cup Moka.`);
  lines.push(result.coffeeGrams === null ? (es ? 'Dosis: según canastilla, modelo por medir.' : 'Dose: fill basket, model to be measured.') :
    (es ? `Café total: ${n(result.coffeeGrams)} g.` : `Total coffee: ${n(result.coffeeGrams)} g.`));
  if (result.waterMl !== null) lines.push(es ? `Agua de preparación total: ${n(result.waterMl)} ml.` : `Total brewing water: ${n(result.waterMl)} ml.`);
  else if (result.kind === 'moka') lines.push(es ? 'Agua: debajo de la válvula; cantidad por medir.' : 'Water: below the valve; amount to be measured.');
  lines.push(es ? `Preparaciones: ${result.batchCount}.` : `Batches: ${result.batchCount}.`);
  if (result.kind === 'espresso') {
    lines.push(es ? `Por extracción independiente: ${n(result.perBatch.coffeeGrams!)} g de café → ${n(result.perBatch.beverage!)} g de bebida. Bebida total: ${n(result.beverage!)} g.` :
      `Per independent shot: ${n(result.perBatch.coffeeGrams!)} g coffee → ${n(result.perBatch.beverage!)} g beverage. Total beverage: ${n(result.beverage!)} g.`);
  } else if (result.perBatch.coffeeGrams !== null && result.perBatch.waterMl !== null) {
    lines.push(es ? `Por preparación: ${n(result.perBatch.coffeeGrams)} g de café / ${n(result.perBatch.waterMl)} ml de agua.` :
      `Per batch: ${n(result.perBatch.coffeeGrams)} g coffee / ${n(result.perBatch.waterMl)} ml water.`);
  }
  if (result.kind === 'concentrate') lines.push(...brewWarnings(result, language, recipes).filter((_, i) => result.warnings[i] === 'uncalibrated-concentrate'));
  lines.push(es ? `Molienda recomendada: ${config.grind.es}. Quisiera pedir café en grano o con esta molienda recomendada; ¿me ayudan a elegir?` :
    `Recommended grind: ${config.grind.en}. I would like whole beans or this recommended grind; could you help me choose?`);
  return `https://wa.me/${phone}?text=${encodeURIComponent(lines.join('\n'))}`;
}
