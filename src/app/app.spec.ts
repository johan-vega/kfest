import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    Object.defineProperty(HTMLElement.prototype, 'scrollTo', { configurable: true, value: vi.fn() });
    Object.defineProperties(HTMLDialogElement.prototype, {
      showModal: { configurable: true, value: function(this: HTMLDialogElement) { this.setAttribute('open', ''); } },
      close: { configurable: true, value: function(this: HTMLDialogElement) { this.removeAttribute('open'); } }
    });
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('restores persisted browser preferences after the initial render, keeping hydration state consistent', async () => {
    localStorage.setItem('kfest_theme', 'light');
    localStorage.setItem('kfest_favorites', '["espresso"]');
    try {
      const fixture = TestBed.createComponent(App);
      expect(fixture.componentInstance.isLightMode).toBe(false);
      expect(fixture.componentInstance.favoritesCount).toBe(0);
      fixture.detectChanges();
      await fixture.whenStable();
      expect(fixture.componentInstance.isLightMode).toBe(true);
      expect(fixture.componentInstance.favoriteCoffeeIds).toEqual(['espresso']);
      expect(fixture.nativeElement.querySelector('.brand-logo-img').getAttribute('src')).toBe('images/logo_marron.png');
    } finally {
      localStorage.removeItem('kfest_theme');
      localStorage.removeItem('kfest_favorites');
      document.body.classList.remove('light-theme');
    }
  });

  it('updates the document language without creating alternate language routes', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const buttons = (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('.lang-pill button');
    buttons[1].click();
    fixture.detectChanges();
    expect(document.documentElement.lang).toBe('en');
    buttons[0].click();
    fixture.detectChanges();
    expect(document.documentElement.lang).toBe('es');
  });

  it('should render the KFEST brand in the page', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand-logo-img')?.getAttribute('alt')).toContain('Kfest');
  });

  it('should omit the redundant quiz and keep the digital menu available', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#quiz')).toBeNull();
    expect(compiled.querySelector<HTMLAnchorElement>('.catalog-download-btn')?.getAttribute('href'))
      .toBe('carta_kfest.pdf');
  });

  it('embeds the live official Instagram profile instead of static sample posts', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const section = (fixture.nativeElement as HTMLElement).querySelector('#instagram')!;
    const frame = section.querySelector('iframe')!;
    expect(frame.getAttribute('src')).toBe('https://www.instagram.com/kfest.peru/embed/');
    expect(frame.getAttribute('title')).toBe('Perfil oficial de Kfest en Instagram');
    expect(frame.getAttribute('loading')).toBe('lazy');
    expect(frame.getAttribute('referrerpolicy')).toBe('strict-origin-when-cross-origin');
    expect(section.querySelector('.ig-profile-card')).not.toBeNull();
    expect(section.querySelector('.ig-post-card')).toBeNull();
    expect(section.querySelector<HTMLAnchorElement>('.instagram-link')?.href)
      .toBe('https://www.instagram.com/kfest.peru/');
  });

  it('translates the Instagram frame title and fallback link', () => {
    const fixture = TestBed.createComponent(App);
    fixture.componentInstance.language = 'en';
    fixture.detectChanges();
    const section = (fixture.nativeElement as HTMLElement).querySelector('#instagram')!;
    expect(section.querySelector('iframe')?.getAttribute('title')).toBe('Official Kfest Instagram profile');
    expect(section.textContent).toContain('Open the full @kfest.peru profile');
    expect(section.textContent).toContain('If Instagram does not load');
  });

  it('places the official TikTok creator embed below Instagram with a direct fallback', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const instagram = element.querySelector('#instagram')!;
    const tiktok = element.querySelector('#tiktok')!;
    expect(instagram.compareDocumentPosition(tiktok) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    expect(tiktok.querySelector('.tiktok-embed')?.getAttribute('data-unique-id')).toBe('kfest.peru');
    expect(tiktok.querySelector('.tiktok-embed')?.getAttribute('data-embed-type')).toBe('creator');
    expect(tiktok.querySelector<HTMLAnchorElement>('.instagram-link')?.href).toBe('https://www.tiktok.com/@kfest.peru');
  });

  it('shows exactly the three current Utilkfest products and opens each in the viewer', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    const cards = element.querySelectorAll<HTMLButtonElement>('#utilkfest .util-card');
    expect(cards).toHaveLength(3);
    for (let i = 0; i < cards.length; i++) {
      cards[i].click();
      fixture.detectChanges();
      const viewer = element.querySelector('app-image-viewer')!;
      expect(viewer.querySelector('img')?.getAttribute('src')).toBe(fixture.componentInstance.utilProducts[i].image);
      expect(viewer.querySelector('h2')?.textContent).toContain(fixture.componentInstance.utilProducts[i].name.es);
      expect(viewer.querySelector('dialog')?.open).toBe(true);
      viewer.querySelector<HTMLButtonElement>('.viewer-close')!.click();
      fixture.detectChanges();
      expect(fixture.componentInstance.selectedUtilProduct).toBeNull();
      expect(viewer.querySelector('dialog')?.open).toBe(false);
    }
  });

  it('opens the menu with zoom and keeps page navigation and WhatsApp working', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const element = fixture.nativeElement as HTMLElement;
    element.querySelector<HTMLButtonElement>('.catalog-fullscreen-btn')!.click();
    fixture.detectChanges();
    const viewer = element.querySelector('app-image-viewer')!;
    viewer.querySelector<HTMLButtonElement>('[aria-label="Aumentar zoom"]')!.click();
    fixture.detectChanges();
    expect(viewer.querySelector('output')?.textContent).toContain('125');
    viewer.querySelector<HTMLButtonElement>('[aria-label="Página siguiente"]')!.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.currentCatalogPage).toBe(2);
    expect(viewer.querySelector('img')?.getAttribute('src')).toBe('images/carta/2.png');
    expect(viewer.querySelector('output')?.textContent).toContain('100');
    const message = new URL(viewer.querySelector<HTMLAnchorElement>('.viewer-footer a')!.href).searchParams.get('text');
    expect(message).toContain('Página 2 de 7');
    viewer.querySelector('dialog')!.dispatchEvent(new Event('cancel', { cancelable: true }));
    fixture.detectChanges();
    expect(fixture.componentInstance.isCatalogFsOpen).toBe(false);
  });

  it('should filter coffees by search query and tasting notes', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    // Search query test
    app.searchQuery = 'espresso';
    const espressoResults = app.getFilteredCatalog();
    expect(espressoResults.length).toBeGreaterThan(0);
    expect(espressoResults.every(c =>
      c.name.es.toLowerCase().includes('espresso') ||
      c.desc.es.toLowerCase().includes('espresso') ||
      c.notes.es.toLowerCase().includes('espresso') ||
      c.flavorTag.toLowerCase().includes('espresso')
    )).toBe(true);

    // Sensory filter test
    app.clearSearch();
    app.setSensoryFilter('chocolate');
    const chocolateResults = app.getFilteredCatalog();
    expect(chocolateResults.length).toBeGreaterThan(0);
    expect(chocolateResults.some(c =>
      c.notes.es.toLowerCase().includes('chocolate') ||
      c.notes.es.toLowerCase().includes('cacao')
    )).toBe(true);
  });

  it('should toggle favorites and persist count', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app.favoritesCount).toBe(0);

    const testCoffee = app.coffeeMenu[0];
    app.toggleFavorite(testCoffee);

    expect(app.isFavorite(testCoffee.id)).toBe(true);
    expect(app.favoritesCount).toBe(1);

    // Toggle again to remove
    app.toggleFavorite(testCoffee);
    expect(app.isFavorite(testCoffee.id)).toBe(false);
    expect(app.favoritesCount).toBe(0);
  });

  it('updates Barista Lab through its method, volume and quantity controls', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();
    const section = fixture.nativeElement.querySelector('#calculadora') as HTMLElement;
    expect(section.textContent).toContain('13,5');
    expect(section.textContent).toContain('≈ 198');
    expect(section.querySelectorAll('.brew-method-btn')).toHaveLength(6);
    const sizes = section.querySelectorAll<HTMLButtonElement>('.brew-volume-options button');
    sizes[0].click(); // 150 ml
    fixture.detectChanges();
    expect(fixture.componentInstance.brewResult.targetBeverageMl).toBe(150);
    section.querySelectorAll<HTMLButtonElement>('.cup-btn')[1].click();
    fixture.detectChanges();
    expect(fixture.componentInstance.brewResult.beverage).toBe(299);
    section.querySelectorAll<HTMLButtonElement>('.brew-method-btn')[3].click();
    fixture.detectChanges();
    expect(section.querySelector('.brew-volume-options')).toBeNull();
    expect(section.querySelector('#brew-espresso-type')).not.toBeNull();
    expect(section.textContent).toContain('BEBIDA EN TAZA');
    expect(section.textContent).not.toContain('AGUA DE PREPARACIÓN');
    expect(section.textContent).toContain('18 g de café');
    expect(section.textContent).toContain('72');
    const app = fixture.componentInstance;
    section.querySelectorAll<HTMLButtonElement>('.brew-method-btn')[0].click();
    fixture.detectChanges();
    expect(app.brewCupVolume).toBe(150);
    expect(section.querySelector('.brew-volume-options')).not.toBeNull();
  });

  it('renders English labels and correct units for every method', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.language = 'en';
    fixture.detectChanges();
    for (const method of app.brewMethodsList) {
      (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('.brew-method-btn')[app.brewMethodsList.indexOf(method)].click();
      fixture.detectChanges();
      const section = fixture.nativeElement.querySelector('#calculadora') as HTMLElement;
      expect(section.textContent).toContain('GROUND COFFEE');
      expect(section.textContent).toContain('RECOMMENDED GRIND');
      expect(section.textContent).toContain('GUIDELINE TIME');
      expect(section.textContent).not.toMatch(/NaN|Infinity/);
      expect(section.querySelectorAll('[aria-pressed="true"].brew-method-btn')).toHaveLength(1);
      if (method === 'espresso') {
        expect(section.textContent).toContain('BEVERAGE IN CUP');
        expect(section.textContent).not.toContain('ml');
      } else if (method === 'moka') {
        expect(section.textContent).toContain('Italian cups');
        expect(section.textContent).toContain('Full basket');
        expect(section.textContent).not.toContain('ESTIMATED FINAL DRINK');
      } else if (method === 'gota') {
        expect(section.textContent).toContain('Initial reference to calibrate');
        expect(section.textContent).not.toContain('ESTIMATED FINAL DRINK');
      } else {
        expect(section.textContent).toContain('BREWING WATER');
        expect(section.textContent).toContain('ESTIMATED FINAL DRINK');
        expect(section.textContent).toContain('ml');
      }
    }
  });

  it('switches Moka capacities and updates the editable essence recipe', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.setBrewMethod('moka');
    fixture.detectChanges();
    const select = fixture.nativeElement.querySelector('#brew-moka-capacity') as HTMLSelectElement;
    select.value = '6';
    select.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(app.brewResult.mokaCapacity).toBe(6);
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('.brew-method-btn')[5].click();
    fixture.detectChanges();
    const dose = fixture.nativeElement.querySelector('#brew-concentrate-dose') as HTMLInputElement;
    dose.value = '20';
    dose.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(app.brewResult.waterMl).toBe(160);
    expect(app.brewResult.beverage).toBeNull();
    expect(app.brewResult.warnings).toContain('uncalibrated-concentrate');
    const ratio = fixture.nativeElement.querySelector('#brew-concentrate-ratio') as HTMLInputElement;
    ratio.value = '10';
    ratio.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(app.brewResult.waterMl).toBe(200);
    dose.value = '-1';
    dose.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    expect(dose.getAttribute('aria-invalid')).toBe('true');
    expect(app.brewResult.warnings).toContain('input-adjusted');
    dose.dispatchEvent(new Event('change'));
    fixture.detectChanges();
    expect(dose.value).toBe('5');
    expect(dose.getAttribute('aria-invalid')).toBeNull();
  });

  it('labels controls in both languages and disables the stepper at its limits', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    fixture.detectChanges();
    const section = fixture.nativeElement.querySelector('#calculadora') as HTMLElement;
    const buttons = section.querySelectorAll<HTMLButtonElement>('.cup-btn');
    expect(buttons[0].disabled).toBe(true);
    expect(buttons[1].getAttribute('aria-label')).toBe('Aumentar cantidad');
    for (let i = 1; i < 8; i++) { buttons[1].click(); fixture.detectChanges(); }
    (fixture.nativeElement as HTMLElement).querySelectorAll<HTMLButtonElement>('.lang-pill button')[1].click();
    fixture.detectChanges();
    expect(buttons[1].disabled).toBe(true);
    expect(buttons[0].getAttribute('aria-label')).toBe('Decrease quantity');
    expect(section.textContent).toContain('Batches required: 4');
    app.setBrewCups(NaN);
    app.setBrewCupVolume(-1);
    app.setBrewMethod('unknown' as never);
    expect(app.brewCups).toBe(1);
    expect(app.brewCupVolume).toBe(200);
    expect(app.selectedBrewMethod).toBe('v60');
  });

  it('uses the existing Kfest phone in the calculator WhatsApp draft', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    app.setBrewMethod('espresso');
    app.setBrewCups(2);
    const link = new URL(app.getBrewWhatsAppLink());
    expect(link.pathname).toBe(`/${app.phonePrimary}`);
    expect(link.searchParams.get('text')).toContain('Café total: 36 g');
    expect(link.searchParams.get('text')).toContain('Por extracción independiente: 18 g');
  });
});
