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
});
