import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, Component, ElementRef, HostListener, Inject, OnDestroy, PLATFORM_ID, ViewChild, ViewEncapsulation } from '@angular/core';
import {
  CoffeeCategoryKey,
  CoffeeMenuItem,
  QuizOption,
  QUIZ_CATEGORIES,
  QUIZ_FLAVOR_FILTERS,
  COFFEE_MENU,
  QUIZ_MILK_OPTIONS,
  QUIZ_GRIND_OPTIONS,
  QUIZ_SPECIAL_OPTIONS,
  QUIZ_FOOD_OPTIONS
} from './coffee-menu.data';

export type Language = 'es' | 'en';
export type GrindType = 'grano' | 'v60' | 'prensa' | 'gota' | 'accesorios';
export type CataFormat = 'grano' | 'molido';
export type EventType = 'bodas' | 'corporativos' | 'ferias' | 'aniversarios' | 'lanzamientos' | 'privados';
export type BrewMethod = 'v60' | 'prensa' | 'moka' | 'espresso' | 'chemex' | 'gota';
export type TraceabilityTab = 'origen' | 'proceso' | 'cata' | 'social';

export type WhatsAppAction =
  | 'hero'
  | 'prod_250g'
  | 'prod_500g'
  | 'prod_1kg'
  | 'prod_40g'
  | 'prod_bidon'
  | 'prod_bandeja'
  | 'prod_edicion'
  | 'delivery'
  | 'cata_fe'
  | 'cata_paciencia'
  | 'cata_tolerancia'
  | 'cata_respeto'
  | 'utilkfest'
  | 'catering'
  | 'concierge';

export interface BrewConfig {
  name: { es: string; en: string };
  ratio: number;
  waterPerCup: number;
  grind: { es: string; en: string };
  temp: number;
  time: string;
  tip: { es: string; en: string };
  icon: string;
}

export const BREW_CONFIGS: Record<BrewMethod, BrewConfig> = {
  v60: {
    name: { es: 'V60 / Filtrado Cónico', en: 'V60 / Pour Over' },
    ratio: 15,
    waterPerCup: 180,
    grind: { es: 'Media-Fina (textura de sal de mesa)', en: 'Medium-Fine' },
    temp: 92,
    time: '2:45 – 3:15 min',
    tip: {
      es: 'Realiza un pre-infusionado ("bloom") de 35s con el doble de agua para despertar las notas a panela y miel del Fundo Santa Teresita.',
      en: 'Perform a 35s bloom with double the water to awaken the honey and golden panela notes.'
    },
    icon: 'fa-solid fa-filter'
  },
  prensa: {
    name: { es: 'Prensa Francesa', en: 'French Press' },
    ratio: 12,
    waterPerCup: 200,
    grind: { es: 'Gruesa (textura de sal marina)', en: 'Coarse' },
    temp: 94,
    time: '4:00 min',
    tip: {
      es: 'Vierte toda el agua, reposa 4 min. Rompe la costra superficial con cuchara, retira la espuma y baja el émbolo lentamente sin presionar el fondo.',
      en: 'Pour all water, rest 4 min. Break the crust, skim foam, and press plunger gently without crushing bottom grounds.'
    },
    icon: 'fa-solid fa-mug-hot'
  },
  moka: {
    name: { es: 'Cafetera Moka Italiana', en: 'Moka Pot' },
    ratio: 10,
    waterPerCup: 60,
    grind: { es: 'Fina calibrada (arenilla fina)', en: 'Fine' },
    temp: 90,
    time: '2:30 min',
    tip: {
      es: 'Llena la base con agua ya caliente hasta la válvula y retira del fuego apenas comience el gorgoteo para evitar notas amargas.',
      en: 'Fill lower chamber with pre-heated water up to the safety valve; remove immediately upon gurgling.'
    },
    icon: 'fa-solid fa-fire-burner'
  },
  espresso: {
    name: { es: 'Espresso Máquina', en: 'Espresso Machine' },
    ratio: 2,
    waterPerCup: 36,
    grind: { es: 'Extra Fina (polvo suave)', en: 'Extra Fine' },
    temp: 93,
    time: '25 – 30 seg',
    tip: {
      es: 'Tampado nivelado a 9 bares de presión. La crema avellana dorada encapsulará los aceites aromáticos de cacao puro.',
      en: 'Level 9-bar tamping pressure yields a golden hazelnut crema encapsulating pure cacao aromatics.'
    },
    icon: 'fa-solid fa-bolt'
  },
  chemex: {
    name: { es: 'Chemex Artesanal', en: 'Chemex' },
    ratio: 16,
    waterPerCup: 220,
    grind: { es: 'Media (arena de río)', en: 'Medium' },
    temp: 93,
    time: '4:00 – 4:30 min',
    tip: {
      es: 'Enjuaga el filtro de papel grueso con abundante agua caliente antes de verter el café para máxima limpieza y brillo en taza.',
      en: 'Rinse thick paper filter thoroughly with hot water first for crystal clarity and bright cup acidity.'
    },
    icon: 'fa-solid fa-flask'
  },
  gota: {
    name: { es: 'Gota a Gota Tradicional', en: 'Rainforest Slow Drip' },
    ratio: 8,
    waterPerCup: 100,
    grind: { es: 'Media-Gruesa', en: 'Medium-Coarse' },
    temp: 91,
    time: '5:00 min',
    tip: {
      es: 'Método patrimonial de la Selva Central. Extrae una esencia de café densa y concentrada, ideal para combinar con leche fresca.',
      en: 'Heritage Amazonian extraction. Yields a dense coffee essence ideal for combining with fresh milk.'
    },
    icon: 'fa-solid fa-droplet'
  }
};

export interface FaqItem {
  q: { es: string; en: string };
  a: { es: string; en: string };
  category: { es: string; en: string };
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: { es: 'Envíos & Pedidos', en: 'Shipping & Orders' },
    q: {
      es: '¿Hacen envíos a Lima y a todas las provincias del Perú?',
      en: 'Do you ship to Lima and all Peruvian provinces?'
    },
    a: {
      es: 'Sí. Realizamos despachos programados todos los lunes, miércoles y viernes desde Chanchamayo directo a Lima y a nivel nacional vía Olva Courier y agencias autorizadas. El tiempo de entrega habitual es de 24 a 48 horas con número de seguimiento.',
      en: 'Yes. We run scheduled dispatches every Monday, Wednesday, and Friday directly from Chanchamayo to Lima and nationwide via certified couriers. Standard delivery time is 24 to 48 hours with full tracking.'
    }
  },
  {
    category: { es: 'Molienda & Frescura', en: 'Grind & Freshness' },
    q: {
      es: '¿Es mejor pedir el café en grano entero o molido?',
      en: 'Is it better to order whole bean or ground coffee?'
    },
    a: {
      es: 'Si cuentas con molino en casa, siempre recomendamos pedir "En Grano" para molerlo al instante y aprovechar el 100% de los aromas. Si no tienes molino, indícanos qué cafetera utilizas y nosotros calibramos la molienda exacta (fina, media o gruesa) recién tostado y molido antes de sellar la bolsa con válvula.',
      en: 'If you have a home grinder, whole bean preserves peak aromatics. If not, simply let us know your brew device and we custom-calibrate the precise grind right before nitrogen valve heat sealing.'
    }
  },
  {
    category: { es: 'Calidad & Origen', en: 'Quality & Origin' },
    q: {
      es: '¿Qué significa que el café tenga entre 81 y 84 puntos SCA?',
      en: 'What does an 81 to 84 SCA cupping score mean?'
    },
    a: {
      es: 'La escala internacional de la Specialty Coffee Association (SCA) califica los mejores cafés del mundo de 0 a 100. Solo aquellos que superan 80 puntos obtienen la categoría formal de "Café de Especialidad". Significa que nuestro café no contiene defectos primarios, ha sido cultivado a más de 1,600 msnm y ofrece notas limpias, dulces y complejas.',
      en: 'The Specialty Coffee Association (SCA) grades global coffees on a 100-point scale. Only coffees scoring 80+ points qualify as "Specialty Coffee". It guarantees zero primary defects, high altitude cultivation at 1,600+ masl, and exceptional sweetness and complexity.'
    }
  },
  {
    category: { es: 'Conservación', en: 'Storage' },
    q: {
      es: '¿Cómo debo conservar mi café para que mantenga sus aromas?',
      en: 'How should I store my coffee to preserve maximum aroma?'
    },
    a: {
      es: 'Mantén la bolsa en su empaque original de triple capa con ziploc y válvula desgasificadora, en un lugar fresco, seco y protegido de la luz solar (alacena). Nunca guardes el café en la refrigeradora, ya que la condensación de humedad y los olores de otros alimentos degradan los aceites aromáticos.',
      en: 'Keep it inside our original triple-layer bag with degas valve in a cool, dark, dry pantry. Never refrigerate coffee, as humidity condensation and external odors quickly compromise delicate coffee oils.'
    }
  },
  {
    category: { es: 'Concierge Kfestcar', en: 'Kfestcar Concierge' },
    q: {
      es: '¿Cómo puedo cotizar la Barra Móvil Kfestcar para un evento o boda?',
      en: 'How do I book the Kfestcar Mobile Espresso Bar for my event?'
    },
    a: {
      es: 'Llevamos nuestro carrito Kfestcar con máquina espresso profesional, baristas certificados y menú de especialidad a bodas, ferias corporativas y eventos privados en Lima y Selva Central. Solo haz clic en "Cotizar Barra Móvil" y te enviamos una propuesta personalizada según el número de invitados.',
      en: 'We bring the mobile Kfestcar bar equipped with professional espresso gear and certified baristas to weddings, corporate galas, and private events. Click "Quote Mobile Bar" and we provide a tailored proposal based on guest count.'
    }
  }
];

export interface TestimonialItem {
  name: string;
  role: { es: string; en: string };
  city: string;
  quote: { es: string; en: string };
  stars: number;
  highlight: { es: string; en: string };
  badge: { es: string; en: string };
}

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Valeria Mendoza',
    role: { es: 'Catadora Aficionada & Coffee Lover', en: 'Cupper & Coffee Enthusiast' },
    city: 'Miraflores, Lima',
    quote: {
      es: 'El aroma al abrir la bolsa de 500g llena toda la cocina. Notas intensas a panela de oro y frutos secos. Mi método predilecto es la V60 y la taza queda limpia y dulce sin amargor. La atención por WhatsApp fue rápida y muy amable.',
      en: 'The fragrance upon unsealing the 500g bag fills the whole room. Intense golden panela and roasted nut notes. In V60 it extracts clean, sweet and velvety with zero harsh bitterness.'
    },
    stars: 5,
    highlight: { es: 'V60 & Filtrados', en: 'V60 & Filtered' },
    badge: { es: 'Cliente Frecuente', en: 'Verified Patron' }
  },
  {
    name: 'Chef Rodrigo Palacios',
    role: { es: 'Director Gastronómico & Sommelier', en: 'Gastronomic Director & Sommelier' },
    city: 'San Isidro, Lima',
    quote: {
      es: 'Servimos el café de Fundo Santa Teresita en los cierres de nuestros menús degustación. Los comensales elogian la acidez brillante y el balance. Saber que proviene de mujeres caficultoras de Chanchamayo le agrega un valor humano inmenso.',
      en: 'We pair Santa Teresita coffee as the grand finale of our tasting menu. Guests constantly praise the bright balanced acidity. Knowing it empowers family coffee growers in Chanchamayo adds profound value.'
    },
    stars: 5,
    highlight: { es: 'Espresso & Alta Cocina', en: 'Espresso & Haute Cuisine' },
    badge: { es: 'Aliado Gastronómico', en: 'Culinary Partner' }
  },
  {
    name: 'Carlos Echevarría',
    role: { es: 'Arquitecto & Consumidor Diario', en: 'Architect & Daily Drinker' },
    city: 'Surco, Lima',
    quote: {
      es: 'Llevo 6 meses suscrito pidiendo el cofre de 1kg en grano cada mes. Tuesto artesanal en lotes pequeños que se nota en la frescura: granos enteros sin quemar, con tueste medio impecable. Es el verdadero café de chacra.',
      en: 'Been ordering the 1kg whole bean pack monthly for 6 months. Small-batch artisan roasting is evident in freshness: uniform medium roast, beautiful bean integrity, authentic farm taste.'
    },
    stars: 5,
    highlight: { es: 'Pack 1kg En Grano', en: '1kg Whole Bean Pack' },
    badge: { es: 'Suscripción Mensual', en: 'Monthly Subscriber' }
  },
  {
    name: 'Mariana Quispe',
    role: { es: 'Gerente de Experiencias Corporativas', en: 'Corporate Events Manager' },
    city: 'San Borja, Lima',
    quote: {
      es: 'Contratamos el servicio de barra móvil Kfestcar para el aniversario de nuestra empresa (150 personas). La puntualidad, la estética del carrito de madera y la calidad de los flat whites y lattes dejaron boquiabiertos a todos los invitados.',
      en: 'We booked the Kfestcar mobile bar for our corporate anniversary (150 guests). The punctuality, wooden aesthetic, and espresso quality amazed our executive guests.'
    },
    stars: 5,
    highlight: { es: 'Barra Móvil Kfestcar', en: 'Kfestcar Mobile Bar' },
    badge: { es: 'Evento Corporativo', en: 'Corporate Gala' }
  }
];

const GRIND_NAMES: Record<Language, Record<GrindType, string>> = {
  es: {
    grano: 'En Grano (Whole Bean)',
    v60: 'V60 / Filtrado',
    prensa: 'Prensa Francesa (French Press)',
    gota: 'Gota a Gota (Drip)',
    accesorios: 'Accesorios & Edición'
  },
  en: {
    grano: 'Whole Bean',
    v60: 'V60 / Drip Filter',
    prensa: 'French Press',
    gota: 'Slow Drip',
    accesorios: 'Accessories & Edition'
  }
};

const EVENT_NAMES: Record<Language, Record<EventType, string>> = {
  es: {
    bodas: 'Bodas de Gala',
    corporativos: 'Corporativos VIP',
    ferias: 'Ferias Gourmet',
    aniversarios: 'Aniversarios',
    lanzamientos: 'Lanzamientos',
    privados: 'Eventos Privados'
  },
  en: {
    bodas: 'Gala Weddings',
    corporativos: 'VIP Corporate',
    ferias: 'Gourmet Fairs',
    aniversarios: 'Anniversaries',
    lanzamientos: 'Product Launches',
    privados: 'Private Events'
  }
};

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
  encapsulation: ViewEncapsulation.None
})
export class App implements AfterViewInit, OnDestroy {
  language: Language = 'es';
  mobileMenuOpen = false;
  activeSection: string = 'inicio';
  isScrolled: boolean = false;
  isLightMode: boolean = false;

  // ─── BUSCADOR INSTANTÁNEO, NOTAS DE CATA Y FAVORITOS ───
  searchQuery: string = '';
  selectedSensoryFilter: string = 'todos';
  selectedCatalogCategory: string = 'todos';
  onlyFavoritesFilter: boolean = false;
  catalogSortBy: 'relevance' | 'price-asc' | 'price-desc' | 'name-asc' = 'relevance';
  favoriteCoffeeIds: string[] = [];
  toastMessage: string = '';
  toastVisible: boolean = false;
  private toastTimer: any = null;

  // ─── CATÁLOGO DIGITAL INTERACTIVO (FLIPBOOK / VISOR KFEST) ───
  catalogViewMode: 'flipbook' | 'sheets' = 'flipbook';
  currentCatalogPage: number = 1;
  readonly totalCatalogPages: number = 7;
  readonly catalogPageList: number[] = [1, 2, 3, 4, 5, 6, 7];
  isCatalogFsOpen: boolean = false;

  readonly catalogPageTitles: Record<number, { es: string; en: string }> = {
    1: { es: 'Portada Oficial Kfest', en: 'Official Kfest Cover' },
    2: { es: 'Bebidas Calientes, Combos, Desayunos & Filtrados', en: 'Warm Drinks, Combos, Breakfast & Pour Over' },
    3: { es: 'Frappés, Cold Brew, Iced & Shakes', en: 'Frappes, Cold Brew, Iced & Shakes' },
    4: { es: 'Panadería, Postres & Bar Kfest', en: 'Bakery, Desserts & Kfest Bar' },
    5: { es: 'Línea Virtudes: Respeto, Fortaleza, Fe, Amor', en: 'Virtues Line: Respect, Strength, Faith, Love' },
    6: { es: 'Línea Virtudes: Paciencia, Resiliencia, Tolerancia, Cold Brew', en: 'Virtues Line: Patience, Resilience, Tolerance, Cold Brew' },
    7: { es: 'Contraportada Oficial Kfest', en: 'Official Back Cover' }
  };

  nextCatalogPage(): void {
    this.currentCatalogPage = this.currentCatalogPage < this.totalCatalogPages ? this.currentCatalogPage + 1 : 1;
    this.scrollThumbIntoView(this.currentCatalogPage);
  }

  prevCatalogPage(): void {
    this.currentCatalogPage = this.currentCatalogPage > 1 ? this.currentCatalogPage - 1 : this.totalCatalogPages;
    this.scrollThumbIntoView(this.currentCatalogPage);
  }

  setCatalogPage(page: number): void {
    if (page >= 1 && page <= this.totalCatalogPages) {
      this.currentCatalogPage = page;
      this.scrollThumbIntoView(page);
    }
  }

  openCatalogFs(): void {
    this.isCatalogFsOpen = true;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
  }

  closeCatalogFs(): void {
    this.isCatalogFsOpen = false;
    if (typeof document !== 'undefined') {
      document.body.style.overflow = '';
    }
  }

  private catalogTouchStartX: number = 0;
  private catalogTouchStartY: number = 0;

  onCatalogTouchStart(event: TouchEvent): void {
    if (event.touches.length === 1) {
      this.catalogTouchStartX = event.touches[0].clientX;
      this.catalogTouchStartY = event.touches[0].clientY;
    }
  }

  onCatalogTouchEnd(event: TouchEvent): void {
    if (event.changedTouches.length === 1) {
      const deltaX = event.changedTouches[0].clientX - this.catalogTouchStartX;
      const deltaY = event.changedTouches[0].clientY - this.catalogTouchStartY;
      if (Math.abs(deltaX) > 40 && Math.abs(deltaX) > Math.abs(deltaY)) {
        if (deltaX < 0) {
          this.nextCatalogPage();
        } else {
          this.prevCatalogPage();
        }
      }
    }
  }

  private scrollThumbIntoView(page: number): void {
    if (typeof document !== 'undefined') {
      const rail = document.getElementById('catalog-thumbnails-rail');
      const thumb = document.querySelector(`.catalog-thumb-item[data-page="${page}"]`) as HTMLElement;
      if (rail && thumb) {
        const railCenter = rail.clientWidth / 2;
        const thumbCenter = thumb.offsetLeft + thumb.clientWidth / 2;
        rail.scrollTo({
          left: thumbCenter - railCenter,
          behavior: 'smooth'
        });
      }
    }
  }

  getCatalogWhatsAppLink(page: number): string {
    const isEs = this.language === 'es';
    const title = this.catalogPageTitles[page] ? (isEs ? this.catalogPageTitles[page].es : this.catalogPageTitles[page].en) : `Página ${page}`;
    const text = isEs
      ? `*¡Hola Kfest Café!* Estoy viendo el *Catálogo Digital Oficial* (*Página ${page} de ${this.totalCatalogPages}* - _${title}_) y deseo realizar un pedido o consulta. ¿Tienen atención disponible? ¡Muchas gracias!`
      : `*Hello Kfest Café!* I am browsing the *Official Digital Menu* (*Page ${page} of ${this.totalCatalogPages}* - _${title}_) and would like to place an order or inquiry. Thank you!`;
    return `https://wa.me/${this.phonePrimary}?text=${encodeURIComponent(text)}`;
  }

  // Estado de vista de la Carta Oficial (Páginas del PDF)
  activeCartaTab: 'all' | 'pag2' | 'pag3' | 'pag4' | 'virtudes' | 'pdf_viewer' = 'all';

  setCartaTab(tab: 'all' | 'pag2' | 'pag3' | 'pag4' | 'virtudes' | 'pdf_viewer'): void {
    this.activeCartaTab = tab;
  }

  orderItemFromMenu(name: string, price: string, category: string): string {
    const isEs = this.language === 'es';
    const text = isEs
      ? `*¡Hola Kfest!* Deseo pedir de la Carta Oficial:\n\n*${name}* (${price})\n*Sección:* ${category}\n\n¿Tienen disponibilidad en barra para prepararlo? ¡Muchas gracias!`
      : `*Hello Kfest!* I would like to order from the Official Menu:\n\n*${name}* (${price})\n*Section:* ${category}\n\nCould you please take my order? Thank you!`;
    return `https://wa.me/${this.phonePrimary}?text=${encodeURIComponent(text)}`;
  }

  readonly sensoryNotesFilters = [
    { id: 'todos', label: { es: 'Todos los Cafés', en: 'All Coffees' }, icon: 'fa-solid fa-mug-hot' },
    { id: 'chocolate', label: { es: 'Chocolate & Cacao', en: 'Chocolate & Cacao' }, icon: 'fa-solid fa-cookie-bite', keywords: ['chocolate', 'cacao', 'amargo'] },
    { id: 'panela', label: { es: 'Panela & Caramelo', en: 'Panela & Caramel' }, icon: 'fa-solid fa-cubes-stacked', keywords: ['panela', 'miel', 'caramelo', 'dulce', 'toffee'] },
    { id: 'citrico', label: { es: 'Cítrico & Frutal', en: 'Citrus & Fruity' }, icon: 'fa-solid fa-lemon', keywords: ['cítrico', 'citrico', 'frutal', 'frutas', 'naranja', 'maracuyá', 'maracuya', 'fresa', 'arándanos', 'arandanos', 'acidez'] },
    { id: 'floral', label: { es: 'Floral & Jazmín', en: 'Floral & Jasmine' }, icon: 'fa-solid fa-spa', keywords: ['floral', 'jazmín', 'jazmin', 'flores', 'delicado'] },
    { id: 'nuez', label: { es: 'Nuez & Avellana', en: 'Roasted Nuts' }, icon: 'fa-solid fa-seedling', keywords: ['nuez', 'avellana', 'secos', 'almendra', 'tostada'] },
    { id: 'intenso', label: { es: 'Extra Intenso', en: 'Extra Bold' }, icon: 'fa-solid fa-bolt', keywords: ['intenso', 'fuerte', 'cuerpo', 'denso', 'espresso', 'doble'] },
    { id: 'cremoso', label: { es: 'Cremoso & Leche', en: 'Creamy & Milk' }, icon: 'fa-solid fa-mug-hot', keywords: ['cremoso', 'leche', 'sedoso', 'suave', 'microespuma', 'chantilly'] }
  ];

  readonly catalogCategories = [
    { id: 'todos', label: { es: 'Toda la Carta', en: 'Full Menu' }, icon: 'fa-solid fa-utensils' },
    { id: 'calientes', label: { es: 'Bebidas Calientes', en: 'Warm Drinks' }, icon: 'fa-solid fa-mug-hot' },
    { id: 'desayunos_combos', label: { es: 'Desayunos & Combos', en: 'Breakfast & Combos' }, icon: 'fa-solid fa-sun' },
    { id: 'filtrados', label: { es: 'Filtrados', en: 'Pour Over' }, icon: 'fa-solid fa-filter' },
    { id: 'iced', label: { es: 'Cafés Helados', en: 'Iced Coffee' }, icon: 'fa-solid fa-snowflake' },
    { id: 'frappes', label: { es: 'Frappés & Shakes', en: 'Frappes & Shakes' }, icon: 'fa-solid fa-blender' },
    { id: 'cold_brew', label: { es: 'Cold Brew', en: 'Cold Brew' }, icon: 'fa-solid fa-glass-water' },
    { id: 'panaderia_postres', label: { es: 'Panadería & Postres', en: 'Bakery & Sweets' }, icon: 'fa-solid fa-bread-slice' },
    { id: 'bar_kfest', label: { es: 'Bar Kfest', en: 'Coffee Bar' }, icon: 'fa-solid fa-martini-glass-citrus' },
    { id: 'virtudes', label: { es: 'Línea Virtudes', en: 'Virtues Line' }, icon: 'fa-solid fa-seedling' }
  ];

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: object
  ) {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('kfest_theme');
        if (saved === 'light') {
          this.isLightMode = true;
          if (typeof document !== 'undefined') {
            document.body.classList.add('light-theme');
          }
        }
      } catch (e) {}

      try {
        const savedFavs = localStorage.getItem('kfest_favorites');
        if (savedFavs) {
          const parsed = JSON.parse(savedFavs);
          if (Array.isArray(parsed)) {
            this.favoriteCoffeeIds = parsed;
          }
        }
      } catch (e) {}
    }
  }

  ngAfterViewInit(): void {}

  ngOnDestroy(): void {}

  toggleTheme(): void {
    this.isLightMode = !this.isLightMode;
    if (typeof document !== 'undefined') {
      if (this.isLightMode) {
        document.body.classList.add('light-theme');
      } else {
        document.body.classList.remove('light-theme');
      }
      try {
        localStorage.setItem('kfest_theme', this.isLightMode ? 'light' : 'dark');
      } catch (e) {}
    }
  }

  private readonly sectionNavMap: { id: string; nav: string }[] = [
    { id: 'contacto', nav: 'contacto' },
    { id: 'faq', nav: 'faq' },
    { id: 'catering', nav: 'catering' },
    { id: 'calculadora', nav: 'calculadora' },
    { id: 'cata', nav: 'cata' },
    { id: 'quiz', nav: 'quiz' },
    { id: 'carta', nav: 'carta' },
    { id: 'proceso', nav: 'herencia' },
    { id: 'instagram', nav: 'herencia' },
    { id: 'herencia', nav: 'herencia' },
    { id: 'inicio', nav: 'inicio' }
  ];

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent): void {
    if (this.isCatalogFsOpen) {
      if (event.key === 'Escape') this.closeCatalogFs();
      if (event.key === 'ArrowLeft') this.prevCatalogPage();
      if (event.key === 'ArrowRight') this.nextCatalogPage();
    } else {
      // Also allow keyboard navigation when hovering or near catalog
      if (event.key === 'ArrowLeft' && this.activeSection === 'carta') this.prevCatalogPage();
      if (event.key === 'ArrowRight' && this.activeSection === 'carta') this.nextCatalogPage();
    }
  }

  @HostListener('window:scroll', [])
  onWindowScroll(): void {
    if (typeof window === 'undefined') return;
    const scrollPos = window.scrollY || document.documentElement.scrollTop || 0;
    const nextScrolled = scrollPos > 20;
    if (this.isScrolled !== nextScrolled) {
      this.isScrolled = nextScrolled;
    }

    const navOffset = 140;
    for (const section of this.sectionNavMap) {
      const el = document.getElementById(section.id);
      if (el) {
        const rect = el.getBoundingClientRect();
        const absoluteTop = rect.top + scrollPos - navOffset;
        if (scrollPos >= absoluteTop) {
          if (this.activeSection !== section.nav) {
            this.activeSection = section.nav;
          }
          break;
        }
      }
    }
  }

  scrollToSection(sectionId: string, event?: Event): void {
    if (event) {
      event.preventDefault();
    }
    const targetId = sectionId === 'coleccion' ? 'carta' : sectionId;
    this.activeSection = targetId === 'proceso' ? 'herencia' : targetId;
    this.closeMobileMenu();
    if (typeof document !== 'undefined' && typeof window !== 'undefined') {
      const el = document.getElementById(targetId);
      if (el) {
        const navHeight = 72;
        const targetY = el.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({
          top: targetY > 0 ? targetY : 0,
          behavior: 'smooth'
        });
      }
    }
  }

  // ─── ÁLBUM HISTÓRICO DEL VIAJE ─── carousel state
  albumIndex = 0;
  private readonly albumTotal = 18;

  albumScroll(dir: number): void {
    this.albumIndex = (this.albumIndex + dir + this.albumTotal) % this.albumTotal;
    this.syncAlbumSlider();
  }

  albumGoTo(index: number): void {
    this.albumIndex = index;
    this.syncAlbumSlider();
  }

  private syncAlbumSlider(): void {
    if (typeof document === 'undefined') return;
    const slider = document.querySelector('.album-slider') as HTMLElement;
    if (slider) {
      const slideWidth = slider.offsetWidth;
      slider.scrollTo({ left: slideWidth * this.albumIndex, behavior: 'smooth' });
    }
  }

  // Selected store options
  selectedGrind: GrindType = 'grano';
  selectedCataFormat: CataFormat = 'grano';
  selectedEvent: EventType = 'bodas';

  // Feature A: Barista Calculator State
  selectedBrewMethod: BrewMethod = 'v60';
  brewCups: number = 2;
  brewMethodsList: BrewMethod[] = ['v60', 'prensa', 'moka', 'espresso', 'chemex', 'gota'];

  // Feature B: Coffee Quiz State (Encuentra tu Café Ideal - Carta Kfest)
  quizStep: number = 1;
  quizCategory: CoffeeCategoryKey = 'calientes';
  quizFlavor: string = 'todos';
  selectedCoffeeId: string = 'capuchino';
  quizPrepOption: string = 'leche_entera';
  quizFoodOption: string = 'none';

  // Legacy compatibility fields
  quizMethod: string = '';
  quizAmount: string = '';

  readonly quizCategories = QUIZ_CATEGORIES;
  readonly quizFlavorFilters = QUIZ_FLAVOR_FILTERS;
  readonly coffeeMenu = COFFEE_MENU;

  // Feature C: Traceability Passport State
  traceabilityTab: TraceabilityTab = 'origen';

  // Feature D: FAQ Accordion State
  openFaqIndex: number | null = 0;
  faqList = FAQ_ITEMS;

  // Feature E: Testimonials State
  activeTestimonialIndex: number = 0;
  testimonialsList = TESTIMONIALS;

  readonly processSteps = [
    { num: '01', img: 'images/process/p01_cosecha.jpg', alt: 'Cosecha selectiva de cerezas maduras', es: 'COSECHA', en: 'HARVEST' },
    { num: '02', img: 'images/process/p02_cosechando.jpg', alt: 'Cosechando en las laderas de altura', es: 'RECOLECCIÓN', en: 'PICKING' },
    { num: '03', img: 'images/process/p03_seleccion_a.jpg', alt: 'Selección manual de cerezas', es: 'SELECCIÓN I', en: 'SELECTION I' },
    { num: '04', img: 'images/process/p04_seleccion_b.jpg', alt: 'Segunda selección artesanal', es: 'SELECCIÓN II', en: 'SELECTION II' },
    { num: '05', img: 'images/process/p05_seleccion_c.jpg', alt: 'Selección final de cerezas carmesí', es: 'SELECCIÓN III', en: 'SELECTION III' },
    { num: '06', img: 'images/process/p06_despulpar.jpg', alt: 'Despulpado artesanal de las cerezas', es: 'DESPULPADO', en: 'PULPING' },
    { num: '07', img: 'images/process/p07_lavado.jpg', alt: 'Lavado del café despulpado', es: 'LAVADO', en: 'WASHING' },
    { num: '08', img: 'images/process/p08_secado.jpg', alt: 'Secado solar en camas africanas', es: 'SECADO SOLAR', en: 'SUN DRYING' },
    { num: '09', img: 'images/process/p09_subiendo_a.jpg', alt: 'Subiendo el café por las laderas', es: 'TRASLADO', en: 'TRANSPORT' },
    { num: '10', img: 'images/process/p10_subiendo_1km.jpg', alt: 'Caminata de 1 km con la cosecha', es: '1 KM CAMINATA', en: '1 KM WALK' },
    { num: '11', img: 'images/process/p11_pilado.jpg', alt: 'Pilado artesanal del café pergamino', es: 'PILADO', en: 'MILLING' },
    { num: '12', img: 'images/process/p12_cafe_verde.jpg', alt: 'Café verde listo para el tueste', es: 'CAFÉ VERDE', en: 'GREEN COFFEE' },
    { num: '13', img: 'images/process/p13_tostando.jpg', alt: 'Tueste artesanal en pequeños lotes', es: 'TUESTE', en: 'ROASTING' },
    { num: '14', img: 'images/process/p14_seleccion_tostado.jpg', alt: 'Selección del tostado óptimo', es: 'SELEC. TOSTADO', en: 'ROAST SELECT.' },
    { num: '15', img: 'images/process/p15_molido.jpg', alt: 'Molienda calibrada por método', es: 'MOLIENDA', en: 'GRINDING' },
    { num: '16', img: 'images/process/p16_envasado.jpg', alt: 'Envasado con válvula desgasificadora', es: 'ENVASADO', en: 'PACKAGING' },
    { num: '17', img: 'images/process/p17_presentacion.jpg', alt: 'Presentación final — de la chacra a tu taza', es: 'TU TAZA', en: 'YOUR CUP' }
  ];

  // Contact numbers
  readonly phonePrimary = '51918422677';
  readonly phoneSecondary = '51987483134';

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  changeLanguage(lang: Language): void {
    this.language = lang;
  }

  setGrind(grind: GrindType): void {
    this.selectedGrind = grind;
  }

  get collectionProducts() {
    const isEs = this.language === 'es';
    switch (this.selectedGrind) {
      case 'v60':
        return [
          {
            weight: isEs ? '250 GRAMOS' : '250 GRAMS',
            tag: isEs ? 'MOLIENDA MEDIA-FINA V60' : 'MEDIUM-FINE V60 GRIND',
            name: isEs ? '1 Paquete CAFÉ DE ESPECIALIDAD (V60)' : '1 Bag SPECIALTY COFFEE (V60)',
            desc: isEs
              ? 'Calibrado con molienda media-fina para extracción cónica en V60. Resalta aromas a panela de oro y acidez cítrica brillante.'
              : 'Calibrated medium-fine for V60 cone extraction. Highlights sweet panela and bright citrus acidity.',
            price: 'S/ 30.00',
            img: 'images/products/singleproducto.png',
            action: 'prod_250g' as WhatsAppAction,
            isFeatured: false
          },
          {
            weight: isEs ? '500 GRAMOS TOTAL' : '500 GRAMS TOTAL',
            tag: isEs ? 'DÚO CALIBRADO FILTRADOS' : 'POUR OVER CALIBRATED DUO',
            name: isEs ? '2 Paquetes CAFÉ DE ESPECIALIDAD (V60)' : '2 Bags SPECIALTY COFFEE (V60)',
            desc: isEs
              ? 'Dos empaques de 250g sellados con nitrógeno y válvula. Abres uno y el otro queda hermético para máxima frescura en cada vertido.'
              : 'Two 250g hermetic bags with degas valves. Freshness locked in for every single pour over.',
            price: 'S/ 56.00',
            img: 'images/products/twoproducto.png',
            action: 'prod_500g' as WhatsAppAction,
            isFeatured: true
          },
          {
            weight: isEs ? '1 KILOGRAMO TOTAL' : '1 KILOGRAM TOTAL',
            tag: isEs ? 'COFRE FILTRADOS · AHORRA S/ 20' : 'DRIP PACK · SAVE S/ 20',
            name: isEs ? '4 Paquetes CAFÉ DE ESPECIALIDAD (V60)' : '4 Bags SPECIALTY COFFEE (V60)',
            desc: isEs
              ? 'Cuatro bolsas de 250g con molienda calibrada para cafetera V60 o Chemex. El suministro mensual perfecto al mejor precio.'
              : 'Four 250g bags custom ground for V60 or Chemex. Your ultimate monthly brew supply at the best value.',
            price: 'S/ 100.00',
            img: 'images/products/4_paquetes_virtudes.png',
            action: 'prod_1kg' as WhatsAppAction,
            isFeatured: false
          }
        ];
      case 'prensa':
        return [
          {
            weight: isEs ? '250 GRAMOS' : '250 GRAMS',
            tag: isEs ? 'MOLIENDA GRUESA INMERSIÓN' : 'COARSE IMMERSION GRIND',
            name: isEs ? '1 Paquete CAFÉ DE ESPECIALIDAD (Prensa)' : '1 Bag SPECIALTY COFFEE (Press)',
            desc: isEs
              ? 'Molienda gruesa tipo sal marina, diseñada para no tapar el filtro metálico y lograr una taza sedosa y achocolatada.'
              : 'Coarse sea-salt grind designed for metal mesh filtration, delivering a velvety, chocolate cup.',
            price: 'S/ 30.00',
            img: 'images/products/blend_bolsa.png',
            action: 'prod_250g' as WhatsAppAction,
            isFeatured: false
          },
          {
            weight: isEs ? '500 GRAMOS TOTAL' : '500 GRAMS TOTAL',
            tag: isEs ? 'DÚO PRENSA FRANCESA' : 'FRENCH PRESS DUO',
            name: isEs ? '2 Paquetes CAFÉ DE ESPECIALIDAD (Prensa)' : '2 Bags SPECIALTY COFFEE (Press)',
            desc: isEs
              ? 'Dúo de 250g con molienda gruesa para prensa francesa o cold brew. Extracción con cuerpo redondo y notas a cacao al 70%.'
              : 'Two 250g packs coarse-ground for French press or cold brew. Full-bodied extraction with 70% dark cacao notes.',
            price: 'S/ 56.00',
            img: 'images/products/twoproducto.png',
            action: 'prod_500g' as WhatsAppAction,
            isFeatured: true
          },
          {
            weight: isEs ? '1 KILOGRAMO TOTAL' : '1 KILOGRAM TOTAL',
            tag: isEs ? 'COFRE PRENSA · AHORRA S/ 20' : 'PRESS PACK · SAVE S/ 20',
            name: isEs ? '4 Paquetes CAFÉ DE ESPECIALIDAD (Prensa)' : '4 Bags SPECIALTY COFFEE (Press)',
            desc: isEs
              ? 'Pack familiar de 1kg en 4 bolsas independientes con molienda gruesa. Rendimiento supremo para desayunos en familia.'
              : 'Family 1kg pack across 4 independent coarse-ground bags. Perfect for family gatherings.',
            price: 'S/ 100.00',
            img: 'images/products/4_paquetes_virtudes.png',
            action: 'prod_1kg' as WhatsAppAction,
            isFeatured: false
          }
        ];
      case 'gota':
        return [
          {
            weight: isEs ? 'CAJA 5 DRIP' : '5-PACK DRIP',
            tag: isEs ? 'DRIP COFFEE INDIVIDUAL' : 'SINGLE-SERVE DRIP BAGS',
            name: isEs ? 'Caja 5 Drip Coffee INDIVIDUALES' : '5 Single-Serve DRIP COFFEE BOX',
            desc: isEs
              ? 'Filtros individuales de café gota a gota listos para infusionar directamente en tu taza con solo agregar agua caliente. Máxima practicidad.'
              : 'Portable single-serve pour-over filters ready to brew directly into your mug with hot water.',
            price: 'S/ 25.00',
            img: 'images/products/5_drip_coffee.png',
            action: 'prod_250g' as WhatsAppAction,
            isFeatured: false
          },
          {
            weight: isEs ? '500 GRAMOS TOTAL' : '500 GRAMS TOTAL',
            tag: isEs ? 'DÚO GOTA A GOTA SELVA' : 'RAINFOREST DRIP DUO',
            name: isEs ? '2 Paquetes CAFÉ DE ESPECIALIDAD (Drip)' : '2 Bags SPECIALTY COFFEE (Drip)',
            desc: isEs
              ? 'Molienda media-gruesa para la tradicional cafetera gota a gota de Selva Central. Produce una esencia densa, dulce y aromática.'
              : 'Calibrated grind for traditional slow drip percolators. Yields a dense, sweet, and aromatic coffee essence.',
            price: 'S/ 56.00',
            img: 'images/products/60gr_blend.png',
            action: 'prod_500g' as WhatsAppAction,
            isFeatured: true
          },
          {
            weight: isEs ? '1 KILOGRAMO TOTAL' : '1 KILOGRAM TOTAL',
            tag: isEs ? 'COFRE GOTA A GOTA · AHORRA S/ 20' : 'DRIP CHEST · SAVE S/ 20',
            name: isEs ? '4 Paquetes CAFÉ DE ESPECIALIDAD (Drip)' : '4 Bags SPECIALTY COFFEE (Drip)',
            desc: isEs
              ? 'Cofre degustación de 1kg con molienda artesanal para gota a gota tradicional. Rendimiento incomparable para amantes de la esencia pura.'
              : '1kg tasting chest with artisan grind for slow drip. Unmatched yield for pure essence lovers.',
            price: 'S/ 100.00',
            img: 'images/products/4_paquetes_virtudes.png',
            action: 'prod_1kg' as WhatsAppAction,
            isFeatured: false
          }
        ];
      case 'accesorios':
        return [
          {
            weight: isEs ? '40 GRAMOS' : '40 GRAMS',
            tag: isEs ? 'DEGUSTACIÓN SINGLE' : 'SINGLE TASTING POUCH',
            name: isEs ? 'Sachet Blend Degustación 40g' : '40g Blend Tasting Sachet',
            desc: isEs
              ? 'Dosis calibrada de microlote de altura (81-84 Pts SCA). La medida exacta para probar la esencia pura de nuestro tueste artesanal.'
              : 'Calibrated single dose of specialty microlot (81-84 SCA). The exact measure to sample our fresh artisan roast.',
            price: 'S/ 10.00',
            img: 'images/products/40gr_blend.png',
            action: 'prod_40g' as WhatsAppAction,
            isFeatured: false
          },
          {
            weight: isEs ? 'BIDÓN TÉRMICO' : 'THERMAL CANISTER',
            tag: isEs ? 'CONSERVACIÓN & TRANSPORTE' : 'STORAGE & TRANSPORT',
            name: isEs ? 'Bidón Kfest de Conservación Hermética' : 'Kfest Airtight Coffee Canister',
            desc: isEs
              ? 'Recipiente hermético diseñado para proteger los granos de café de la luz, humedad y oxígeno, manteniendo el aroma del Fundo intacto.'
              : 'Airtight container crafted to shield beans from light, moisture, and oxidation, preserving farm aroma.',
            price: 'S/ 45.00',
            img: 'images/products/bidon.png',
            action: 'prod_bidon' as WhatsAppAction,
            isFeatured: true
          },
          {
            weight: isEs ? 'BANDEJA SCA' : 'SCA CUPPING TRAY',
            tag: isEs ? 'EQUIPO PROFESIONAL' : 'PROFESSIONAL GEAR',
            name: isEs ? 'Bandeja Oficial de Cata Kfest' : 'Kfest Official Cupping Tray',
            desc: isEs
              ? 'Bandeja ergonómica de cata profesional para inspección de café verde, pergamino y grano tostado según estándares internacionales.'
              : 'Ergonomic professional cupping tray for green and roasted bean inspection following SCA protocols.',
            price: 'S/ 28.00',
            img: 'images/products/bandeja_cata.png',
            action: 'prod_bandeja' as WhatsAppAction,
            isFeatured: false
          },
          {
            weight: isEs ? '1 KG (4 x 250g)' : '1 KG (4 x 250g)',
            tag: isEs ? 'EDICIÓN ANIVERSARIO' : 'ANNIVERSARY EDITION',
            name: isEs ? 'Cofre Edición Fundo Santa Teresita' : 'Santa Teresita Estate Gift Chest',
            desc: isEs
              ? 'Edición de lujo con 4 paquetes de 250g seleccionados de los mejores lotes de altura, empacados con válvula y presentación de regalo.'
              : 'Deluxe estate gift pack featuring four 250g bags from our best high-elevation microlots with aroma valves.',
            price: 'S/ 110.00',
            img: 'images/products/4_paquetes_virtudes.png',
            action: 'prod_edicion' as WhatsAppAction,
            isFeatured: false
          }
        ];
      case 'grano':
      default:
        return [
          {
            weight: isEs ? '250 GRAMOS' : '250 GRAMS',
            tag: isEs ? 'RESERVA PERSONAL' : 'PERSONAL RESERVE',
            name: isEs ? '1 Paquete CAFÉ DE ESPECIALIDAD' : '1 Bag SPECIALTY COFFEE',
            desc: isEs
              ? 'La medida perfecta para moler en casa justo antes de preparar. Granos enteros con aceites aromáticos intactos y tueste reciente.'
              : 'The perfect size for fresh home grinding. Whole beans with intact aromatic oils and recent roast date.',
            price: 'S/ 30.00',
            img: 'images/products/blend_bolsa.png',
            action: 'prod_250g' as WhatsAppAction,
            isFeatured: false
          },
          {
            weight: isEs ? '500 GRAMOS TOTAL' : '500 GRAMS TOTAL',
            tag: isEs ? 'DÚO ESENCIAL RESERVA' : 'ESSENTIAL RESERVE DUO',
            name: isEs ? '2 Paquetes CAFÉ DE ESPECIALIDAD' : '2 Bags SPECIALTY COFFEE',
            desc: isEs
              ? 'Nuestra presentación insignia en grano entero. Dos bolsas de 250g con válvula desgasificadora: una abierta y la otra perfectamente sellada.'
              : 'Our flagship whole bean presentation. Two 250g bags with nitrogen aroma valves for supreme shelf freshness.',
            price: 'S/ 56.00',
            img: 'images/products/twoproducto.png',
            action: 'prod_500g' as WhatsAppAction,
            isFeatured: true
          },
          {
            weight: isEs ? '1 KILOGRAMO TOTAL' : '1 KILOGRAM TOTAL',
            tag: isEs ? 'COFRE DEGUSTACIÓN · AHORRA S/ 20' : 'TASTING CHEST · SAVE S/ 20',
            name: isEs ? '4 Paquetes CAFÉ DE ESPECIALIDAD' : '4 Bags SPECIALTY COFFEE',
            desc: isEs
              ? 'Pack maestro de 1 kg en grano distribuido en 4 bolsas individuales. Máxima frescura por semanas para verdaderos amantes del café.'
              : 'Master 1kg whole bean pack across 4 individual bags. Weeks of peak freshness for true coffee aficionados.',
            price: 'S/ 100.00',
            img: 'images/products/4_paquetes_virtudes.png',
            action: 'prod_1kg' as WhatsAppAction,
            isFeatured: false
          }
        ];
    }
  }

  setCataFormat(format: CataFormat): void {
    this.selectedCataFormat = format;
  }

  setEvent(event: EventType): void {
    this.selectedEvent = event;
  }

  // --- FEATURE A: BARISTA CALCULATOR METHODS ---
  setBrewMethod(method: BrewMethod): void {
    this.selectedBrewMethod = method;
  }

  setBrewCups(cups: number): void {
    if (cups >= 1 && cups <= 8) {
      this.brewCups = cups;
    }
  }

  get currentBrewConfig(): BrewConfig {
    return BREW_CONFIGS[this.selectedBrewMethod] || BREW_CONFIGS.v60;
  }

  get calculatedWater(): number {
    return this.brewCups * this.currentBrewConfig.waterPerCup;
  }

  get calculatedCoffeeGrams(): number {
    const water = this.calculatedWater;
    const ratio = this.currentBrewConfig.ratio;
    return Math.round((water / ratio) * 10) / 10;
  }

  getBrewWhatsAppLink(): string {
    const config = this.currentBrewConfig;
    const isEs = this.language === 'es';
    const method = config.name[this.language];
    const grind = config.grind[this.language];
    const grams = this.calculatedCoffeeGrams;
    const water = this.calculatedWater;
    const cups = this.brewCups;

    const message = isEs
      ? `Hola Kfest, usé la Calculadora Barista en su web para preparar ${method} (${cups} tazas, ${grams}g café / ${water}ml agua). Quisiera pedir café de especialidad con molienda ${grind}.`
      : `Hello Kfest, I used your website Barista Calculator for ${method} (${cups} cups, ${grams}g coffee / ${water}ml water). I would like to order specialty coffee ground as ${grind}.`;

    return `https://wa.me/${this.phonePrimary}?text=${encodeURIComponent(message)}`;
  }

  // --- FEATURE B: COFFEE QUIZ METHODS (CARTA KFEST) ---
  setQuizCategory(category: CoffeeCategoryKey): void {
    this.quizCategory = category;
    this.quizFlavor = 'todos';

    const defaultCoffees: Record<CoffeeCategoryKey, string> = {
      calientes: 'capuchino',
      desayunos_combos: 'desayuno_parisino',
      iced: 'caramel_latte',
      cold_brew: 'cold_brew_maracuya',
      frappes: 'frappe_oreo',
      filtrados: 'mupeco',
      panaderia_postres: 'croissant_pollo',
      bar_kfest: 'coffee_sour',
      virtudes: 'virtud_resiliencia'
    };

    const targetId = defaultCoffees[category] || this.getFilteredCoffees()[0]?.id || 'capuchino';
    this.selectQuizCoffee(targetId);
    this.quizStep = 2;
  }

  setQuizFlavor(flavor: string): void {
    this.quizFlavor = flavor;
    const filtered = this.getFilteredCoffees();
    if (filtered.length > 0 && !filtered.some(c => c.id === this.selectedCoffeeId)) {
      this.selectQuizCoffee(filtered[0].id);
    }
  }

  selectQuizCoffee(coffeeId: string): void {
    this.selectedCoffeeId = coffeeId;
    const coffee = this.getSelectedCoffee();
    if (coffee.allowsMilk) {
      this.quizPrepOption = 'leche_entera';
    } else if (coffee.isPack) {
      this.quizPrepOption = 'grano';
    } else {
      this.quizPrepOption = 'clasica';
    }
  }

  setQuizPrepOption(optId: string): void {
    this.quizPrepOption = optId;
  }

  setQuizFoodOption(optId: string): void {
    this.quizFoodOption = optId;
  }

  setQuizStep(step: number): void {
    this.quizStep = step;
  }

  getSelectedCoffee(): CoffeeMenuItem {
    return this.coffeeMenu.find(c => c.id === this.selectedCoffeeId) || this.coffeeMenu[0];
  }

  getFilteredCoffees(): CoffeeMenuItem[] {
    return this.coffeeMenu.filter(c => {
      const matchCat = c.category === this.quizCategory;
      if (!matchCat) return false;
      if (this.quizFlavor === 'todos') return true;
      return c.flavorTag === this.quizFlavor;
    });
  }

  getActiveFlavorFilters(): { id: string; label: { es: string; en: string } }[] {
    return this.quizFlavorFilters[this.quizCategory] || [{ id: 'todos', label: { es: 'Todos', en: 'All' } }];
  }

  getQuizPrepOptions(): QuizOption[] {
    const coffee = this.getSelectedCoffee();
    if (coffee.allowsMilk) return QUIZ_MILK_OPTIONS;
    if (coffee.isPack) return QUIZ_GRIND_OPTIONS;
    return QUIZ_SPECIAL_OPTIONS;
  }

  getQuizFoodOptions(): QuizOption[] {
    return QUIZ_FOOD_OPTIONS;
  }

  getSelectedPrepOption(): QuizOption {
    const options = this.getQuizPrepOptions();
    return options.find(o => o.id === this.quizPrepOption) || options[0];
  }

  getSelectedFoodOption(): QuizOption {
    return QUIZ_FOOD_OPTIONS.find(o => o.id === this.quizFoodOption) || QUIZ_FOOD_OPTIONS[0];
  }

  getQuizTotalNum(): number {
    const coffee = this.getSelectedCoffee();
    const prep = this.getSelectedPrepOption();
    const food = this.getSelectedFoodOption();
    return (coffee?.priceNum || 0) + (prep?.price || 0) + (food?.price || 0);
  }

  getQuizTotalPrice(): string {
    return `S/ ${this.getQuizTotalNum().toFixed(2)}`;
  }

  getQuizPrepName(): string {
    const prep = this.getSelectedPrepOption();
    return prep ? prep.name[this.language] : '';
  }

  getQuizFoodName(): string {
    const food = this.getSelectedFoodOption();
    return food && food.id !== 'none' ? food.name[this.language] : '';
  }

  setQuizAnswer(step: number, answer: string): void {
    if (step === 1) {
      const catMap: Record<string, CoffeeCategoryKey> = {
        v60: 'filtrados',
        prensa: 'filtrados',
        moka: 'calientes',
        grano: 'virtudes'
      };
      this.setQuizCategory(catMap[answer] || 'calientes');
    } else if (step === 2) {
      this.setQuizFlavor(answer);
      this.quizStep = 3;
    } else if (step === 3) {
      this.quizStep = 4;
    }
  }

  resetQuiz(): void {
    this.quizStep = 1;
    this.quizCategory = 'calientes';
    this.quizFlavor = 'todos';
    this.selectedCoffeeId = 'capuchino';
    this.quizPrepOption = 'leche_entera';
    this.quizFoodOption = 'none';
  }

  getQuizRecommendation() {
    const coffee = this.getSelectedCoffee();
    return {
      title: coffee.name,
      package: coffee.categoryLabel,
      price: this.getQuizTotalPrice(),
      grind: {
        es: this.getQuizPrepName(),
        en: this.getQuizPrepName()
      },
      notes: coffee.notes,
      reason: coffee.desc,
      img: coffee.img || 'images/products/blend_bolsa.png'
    };
  }

  getQuizWhatsAppLink(): string {
    const isEs = this.language === 'es';
    const coffee = this.getSelectedCoffee();
    const totalPrice = this.getQuizTotalPrice();
    const prepName = this.getQuizPrepName();
    const foodName = this.getQuizFoodName();

    const message = isEs
      ? `*¡Hola Kfest! Hice el test "Encuentra tu Café Ideal" en su web.*\n\n` +
        `Mi café de preferencia es:\n` +
        `*${coffee.name.es}* (${coffee.price})\n` +
        `*Categoría:* ${coffee.categoryLabel.es}\n` +
        `*Notas sensoriales:* ${coffee.notes.es}\n\n` +
        `*Detalles de mi preferencia:*` +
        (prepName ? `\n• Preparación / Leche: ${prepName}` : '') +
        (foodName ? `\n• Acompañamiento: ${foodName}` : '') +
        `\n• *Total estimado:* ${totalPrice}\n\n` +
        `¿Me podrían confirmar disponibilidad para preparar / tomar mi pedido? ¡Muchas gracias!`
      : `*Hello Kfest! I completed the "Find your Ideal Coffee" test on your website.*\n\n` +
        `My selected coffee match is:\n` +
        `*${coffee.name.en}* (${coffee.price})\n` +
        `*Category:* ${coffee.categoryLabel.en}\n` +
        `*Tasting notes:* ${coffee.notes.en}\n\n` +
        `*Order details:*` +
        (prepName ? `\n• Preparation / Milk: ${prepName}` : '') +
        (foodName ? `\n• Pairing: ${foodName}` : '') +
        `\n• *Estimated Total:* ${totalPrice}\n\n` +
        `Could you please confirm availability to take my order? Thank you!`;

    return `https://wa.me/${this.phonePrimary}?text=${encodeURIComponent(message)}`;
  }

  // --- FEATURE C: TRACEABILITY METHODS ---
  setTraceabilityTab(tab: TraceabilityTab): void {
    this.traceabilityTab = tab;
  }

  // --- FEATURE D: FAQ METHODS ---
  toggleFaq(index: number): void {
    if (this.openFaqIndex === index) {
      this.openFaqIndex = null;
    } else {
      this.openFaqIndex = index;
    }
  }

  isFaqOpen(index: number): boolean {
    return this.openFaqIndex === index;
  }

  // --- FEATURE E: TESTIMONIALS METHODS ---
  setTestimonial(index: number): void {
    this.activeTestimonialIndex = index;
  }

  nextTestimonial(): void {
    this.activeTestimonialIndex = (this.activeTestimonialIndex + 1) % this.testimonialsList.length;
  }

  prevTestimonial(): void {
    this.activeTestimonialIndex =
      (this.activeTestimonialIndex - 1 + this.testimonialsList.length) % this.testimonialsList.length;
  }

  get currentTestimonial(): TestimonialItem {
    return this.testimonialsList[this.activeTestimonialIndex];
  }

  // --- STORE HELPERS ---
  getGrindName(): string {
    return GRIND_NAMES[this.language][this.selectedGrind] || GRIND_NAMES[this.language].grano;
  }

  getEventName(): string {
    return EVENT_NAMES[this.language][this.selectedEvent] || EVENT_NAMES[this.language].bodas;
  }

  getWhatsAppLink(type: WhatsAppAction): string {
    const grind = this.getGrindName();
    const isEs = this.language === 'es';
    const cataFormatText = this.selectedCataFormat === 'grano'
      ? (isEs ? 'En Grano' : 'Whole Bean')
      : (isEs ? 'Molido' : 'Ground');

    const messages: Record<Language, Record<WhatsAppAction, string>> = {
      es: {
        hero: 'Hola Kfest, quisiera pedir información para reservar Café de Especialidad (81-84 Pts SCA) del Fundo Santa Teresita.',
        prod_250g: `Hola Kfest, deseo pedir 1 Paquete de Café de Especialidad Reserva Personal 250g (S/ 30.00). Molienda elegida: ${grind}.`,
        prod_500g: `Hola Kfest, deseo pedir 2 Paquetes Dúo Esencial Reserva 500g (S/ 56.00). Molienda elegida: ${grind}.`,
        prod_1kg: `Hola Kfest, deseo pedir el Cofre Degustación de 4 Paquetes 1kg (S/ 100.00). Molienda elegida: ${grind}.`,
        prod_40g: 'Hola Kfest, deseo pedir el Sachet Blend Degustación 40g (S/ 10.00).',
        prod_bidon: 'Hola Kfest, deseo adquirir el Bidón Kfest de Conservación Hermética (S/ 45.00).',
        prod_bandeja: 'Hola Kfest, deseo comprar la Bandeja Oficial de Cata Kfest (S/ 28.00).',
        prod_edicion: 'Hola Kfest, deseo encargar el Cofre Edición Fundo Santa Teresita 1kg (S/ 110.00).',
        delivery: 'Hola Kfest, quisiera coordinar la entrega de mi pedido de tueste reciente para los días de despacho (Lunes, Miércoles y Viernes).',
        cata_fe: `Hola Kfest, me interesa pedir el Perfil Fe (Catuai + Pache, 1,600 msnm). Presentación: ${cataFormatText}.`,
        cata_paciencia: `Hola Kfest, me interesa pedir el Perfil Paciencia (Catimor, 1,800 msnm). Presentación: ${cataFormatText}.`,
        cata_tolerancia: `Hola Kfest, me interesa pedir el Perfil Tolerancia (Blend de Altura). Presentación: ${cataFormatText}.`,
        cata_respeto: `Hola Kfest, me interesa pedir el Perfil Respeto (Caturra Pura, 1,300 msnm). Presentación: ${cataFormatText}.`,
        utilkfest: 'Hola Kfest, me gustaría consultar la colección de artículos ecológicos Útilkfest elaborados con borra de café.',
        catering: `Hola Kfest, deseo cotizar el servicio de Barra Móvil Kfestcar para mi evento (${this.getEventName()}).`,
        concierge: 'Hola Kfest Business, solicito atención de Concierge para adquirir café de especialidad directo del Fundo Santa Teresita.'
      },
      en: {
        hero: 'Hello Kfest, I would like to request info to reserve Specialty Coffee (81-84 SCA Points) from Santa Teresita Farm.',
        prod_250g: `Hello Kfest, I would like to order 1 Personal Reserve Specialty Coffee Bag 250g (S/ 30.00). Selected grind: ${grind}.`,
        prod_500g: `Hello Kfest, I would like to order 2 Bags Essential Reserve Duo 500g (S/ 56.00). Selected grind: ${grind}.`,
        prod_1kg: `Hello Kfest, I would like to order the 4-Bag Master Tasting Pack 1kg (S/ 100.00). Selected grind: ${grind}.`,
        prod_40g: 'Hello Kfest, I would like to order the 40g Blend Tasting Sachet (S/ 10.00).',
        prod_bidon: 'Hello Kfest, I would like to order the Kfest Airtight Coffee Canister (S/ 45.00).',
        prod_bandeja: 'Hello Kfest, I would like to purchase the Official Cupping Tray (S/ 28.00).',
        prod_edicion: 'Hello Kfest, I would like to order the Santa Teresita Estate Gift Chest 1kg (S/ 110.00).',
        delivery: 'Hello Kfest, I would like to coordinate delivery for my recent roast order on dispatch days (Mon, Wed, Fri).',
        cata_fe: `Hello Kfest, I am interested in ordering the Faith Profile (Catuai + Pache, 1,600 masl). Format: ${cataFormatText}.`,
        cata_paciencia: `Hello Kfest, I am interested in ordering the Patience Profile (Catimor, 1,800 masl). Format: ${cataFormatText}.`,
        cata_tolerancia: `Hello Kfest, I am interested in ordering the Tolerance Profile (High Altitude Blend). Format: ${cataFormatText}.`,
        cata_respeto: `Hello Kfest, I am interested in ordering the Respect Profile (Pure Caturra, 1,300 masl). Format: ${cataFormatText}.`,
        utilkfest: 'Hello Kfest, I would like to inquire about the Útilkfest eco-friendly handcrafted collection made from recycled coffee grounds.',
        catering: `Hello Kfest, I would like a quote for the Kfestcar Mobile Espresso Bar for my event (${this.getEventName()}).`,
        concierge: 'Hello Kfest Business, I request Concierge assistance to purchase specialty coffee directly from Santa Teresita Farm.'
      }
    };

    const message = messages[this.language][type] || messages[this.language].concierge;
    return `https://wa.me/${this.phonePrimary}?text=${encodeURIComponent(message)}`;
  }

  // ─── MÉTODOS DEL BUSCADOR & FAVORITOS ───
  get favoritesCount(): number {
    return this.favoriteCoffeeIds.length;
  }

  isFavorite(coffeeId: string): boolean {
    return this.favoriteCoffeeIds.includes(coffeeId);
  }

  toggleFavorite(coffee: CoffeeMenuItem, event?: Event): void {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    const id = coffee.id;
    const index = this.favoriteCoffeeIds.indexOf(id);
    const coffeeName = coffee.name[this.language];

    if (index >= 0) {
      this.favoriteCoffeeIds.splice(index, 1);
      this.showToast(
        this.language === 'es'
          ? `Eliminado de tus favoritos: ${coffeeName}`
          : `Removed from favorites: ${coffeeName}`
      );
    } else {
      this.favoriteCoffeeIds.push(id);
      this.showToast(
        this.language === 'es'
          ? `Guardado en tus favoritos: ${coffeeName}`
          : `Saved to favorites: ${coffeeName}`
      );
    }

    if (typeof window !== 'undefined') {
      try {
        localStorage.setItem('kfest_favorites', JSON.stringify(this.favoriteCoffeeIds));
      } catch (e) {}
    }
  }

  onSearchInput(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchQuery = target?.value || '';
  }

  clearSearch(): void {
    this.searchQuery = '';
  }

  setSensoryFilter(filterId: string): void {
    this.selectedSensoryFilter = filterId;
  }

  setCatalogCategory(catId: string): void {
    this.selectedCatalogCategory = catId;
  }

  toggleOnlyFavorites(): void {
    this.onlyFavoritesFilter = !this.onlyFavoritesFilter;
  }

  onSortChange(event: Event): void {
    const select = event.target as HTMLSelectElement;
    if (select) {
      this.catalogSortBy = select.value as any;
    }
  }

  setCatalogSort(sortBy: 'relevance' | 'price-asc' | 'price-desc' | 'name-asc'): void {
    this.catalogSortBy = sortBy;
  }

  resetCatalogFilters(): void {
    this.searchQuery = '';
    this.selectedSensoryFilter = 'todos';
    this.selectedCatalogCategory = 'todos';
    this.onlyFavoritesFilter = false;
    this.catalogSortBy = 'relevance';
  }

  goToFavorites(): void {
    this.onlyFavoritesFilter = true;
    this.scrollToSection('carta');
  }

  getFilteredCatalog(): CoffeeMenuItem[] {
    let list = [...this.coffeeMenu];

    // Filter by Category
    if (this.selectedCatalogCategory !== 'todos') {
      list = list.filter(item => item.category === this.selectedCatalogCategory);
    }

    // Filter by Favorites
    if (this.onlyFavoritesFilter) {
      list = list.filter(item => this.favoriteCoffeeIds.includes(item.id));
    }

    // Filter by Sensory Notes
    if (this.selectedSensoryFilter !== 'todos') {
      const activeFilter = this.sensoryNotesFilters.find(f => f.id === this.selectedSensoryFilter);
      if (activeFilter && activeFilter.keywords) {
        list = list.filter(item => {
          const combined = `${item.notes.es} ${item.notes.en} ${item.flavorLabel.es} ${item.flavorTag} ${item.desc.es} ${item.desc.en}`.toLowerCase();
          return activeFilter.keywords!.some(kw => combined.includes(kw));
        });
      }
    }

    // Filter by Search Query
    if (this.searchQuery.trim()) {
      const q = this.searchQuery.toLowerCase().trim();
      list = list.filter(item => {
        const nameEs = item.name.es.toLowerCase();
        const nameEn = item.name.en.toLowerCase();
        const descEs = item.desc.es.toLowerCase();
        const descEn = item.desc.en.toLowerCase();
        const notesEs = item.notes.es.toLowerCase();
        const notesEn = item.notes.en.toLowerCase();
        const catEs = item.categoryLabel.es.toLowerCase();
        const catEn = item.categoryLabel.en.toLowerCase();
        const tag = (item.flavorTag || '').toLowerCase();
        return (
          nameEs.includes(q) ||
          nameEn.includes(q) ||
          descEs.includes(q) ||
          descEn.includes(q) ||
          notesEs.includes(q) ||
          notesEn.includes(q) ||
          catEs.includes(q) ||
          catEn.includes(q) ||
          tag.includes(q)
        );
      });
    }

    // Sorting
    if (this.catalogSortBy === 'price-asc') {
      list.sort((a, b) => a.priceNum - b.priceNum);
    } else if (this.catalogSortBy === 'price-desc') {
      list.sort((a, b) => b.priceNum - a.priceNum);
    } else if (this.catalogSortBy === 'name-asc') {
      list.sort((a, b) => a.name[this.language].localeCompare(b.name[this.language]));
    }

    return list;
  }

  getCoffeeWhatsAppLink(item: CoffeeMenuItem): string {
    const isEs = this.language === 'es';
    const msg = isEs
      ? `*¡Hola Kfest!* Deseo pedir de su carta:\n\n` +
        `*${item.name.es}* (${item.price})\n` +
        `*Categoría:* ${item.categoryLabel.es}\n` +
        `*Notas:* ${item.notes.es}\n\n` +
        `¿Me confirman si tienen disponibilidad para preparar mi pedido? ¡Muchas gracias!`
      : `*Hello Kfest!* I would like to order from your menu:\n\n` +
        `*${item.name.en}* (${item.price})\n` +
        `*Category:* ${item.categoryLabel.en}\n` +
        `*Notes:* ${item.notes.en}\n\n` +
        `Could you please confirm availability to take my order? Thank you!`;
    return `https://wa.me/${this.phonePrimary}?text=${encodeURIComponent(msg)}`;
  }

  customizeFromCatalog(item: CoffeeMenuItem): void {
    this.quizCategory = item.category;
    this.selectQuizCoffee(item.id);
    this.quizStep = 3;
    this.scrollToSection('quiz');
  }

  showToast(message: string): void {
    this.toastMessage = message;
    this.toastVisible = true;
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
    if (typeof window !== 'undefined') {
      this.toastTimer = setTimeout(() => {
        this.toastVisible = false;
      }, 2600);
    }
  }

  hideToast(): void {
    this.toastVisible = false;
    if (this.toastTimer) {
      clearTimeout(this.toastTimer);
    }
  }
}