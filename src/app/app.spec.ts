import { TestBed } from '@angular/core/testing';
import { App } from './app';

describe('App', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the KFEST brand in the page', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.brand-logo-img')?.getAttribute('alt')).toContain('Kfest');
  });

  it('should update coffee selection and generate appropriate WhatsApp message in the quiz', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    // Step 1: Select 'cold_brew'
    app.setQuizCategory('cold_brew');
    expect(app.quizCategory).toBe('cold_brew');
    expect(app.quizStep).toBe(2);

    // Step 2: Select 'cold_brew_maracuya'
    app.selectQuizCoffee('cold_brew_maracuya');
    expect(app.selectedCoffeeId).toBe('cold_brew_maracuya');
    expect(app.getSelectedCoffee().name.es).toContain('Cold Brew Maracuyá');

    // Step 3: Add food pairing
    app.setQuizFoodOption('croissant_mixto');
    expect(app.quizFoodOption).toBe('croissant_mixto');

    // Step 4: WhatsApp link contains preferred coffee and total
    const waLink = app.getQuizWhatsAppLink();
    expect(waLink).toContain('Cold%20Brew%20Maracuy');
    expect(waLink).toContain('51918422677');
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
});

