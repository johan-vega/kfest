export type CoffeeCategoryKey =
  | 'calientes'
  | 'filtrados'
  | 'iced'
  | 'cold_brew'
  | 'frappes'
  | 'bar_kfest'
  | 'virtudes';

export interface CoffeeMenuItem {
  id: string;
  name: { es: string; en: string };
  category: CoffeeCategoryKey;
  categoryLabel: { es: string; en: string };
  price: string;
  priceNum: number;
  flavorTag: string; // 'intenso' | 'cremoso' | 'dulce' | 'frutal' | 'floral' | 'tradicional' | 'especial'
  flavorLabel: { es: string; en: string };
  desc: { es: string; en: string };
  notes: { es: string; en: string };
  icon: string;
  badge?: { es: string; en: string };
  img?: string;
  allowsMilk?: boolean;
  isPack?: boolean;
}

export interface QuizOption {
  id: string;
  name: { es: string; en: string };
  price: number;
  desc?: { es: string; en: string };
  icon?: string;
}

export interface CategoryCard {
  id: CoffeeCategoryKey;
  name: { es: string; en: string };
  desc: { es: string; en: string };
  icon: string;
  tag: { es: string; en: string };
}

export const QUIZ_CATEGORIES: CategoryCard[] = [
  {
    id: 'calientes',
    name: { es: 'Bebidas Calientes', en: 'Warm Classics' },
    desc: {
      es: 'Espresso, Americano, Capuchino, Latte, Mokaccino, Bombón... El calor reconfortante de la barra.',
      en: 'Espresso, Americano, Cappuccino, Latte, Mochaccino... Warm comforting coffee bar classics.'
    },
    icon: 'fa-solid fa-mug-hot',
    tag: { es: 'Desde S/ 8.00', en: 'From S/ 8.00' }
  },
  {
    id: 'iced',
    name: { es: 'Cafés Helados (Iced)', en: 'Iced Coffee' },
    desc: {
      es: 'Iced Coffee, Capuchino Helado, Vanilla Latte, Caramel y Avellana con cubos de hielo.',
      en: 'Iced Coffee, Iced Cappuccino, Vanilla, Caramel and Hazelnut Latte over crisp ice.'
    },
    icon: 'fa-solid fa-snowflake',
    tag: { es: 'Desde S/ 12.00', en: 'From S/ 12.00' }
  },
  {
    id: 'cold_brew',
    name: { es: 'Cold Brew de Autor', en: 'Signature Cold Brew' },
    desc: {
      es: '18 horas de extracción lenta en frío. Iced Cold Brew, Orange Coffee y Cold Brew Maracuyá.',
      en: '18 hours slow cold extraction. Iced Cold Brew, Orange Coffee and Passionfruit Cold Brew.'
    },
    icon: 'fa-solid fa-glass-water',
    tag: { es: 'S/ 14.00 · 18h frío', en: 'S/ 14.00 · 18h brew' }
  },
  {
    id: 'frappes',
    name: { es: 'Frappés & Golosos', en: 'Frappes & Treats' },
    desc: {
      es: 'Hielo granizado con chantilly: Oreo, Chocolate, Caramelo, Algarrobina, Fresa o Chin Chin.',
      en: 'Blended ice & whipped cream: Oreo, Chocolate, Caramel, Algarrobina, Strawberry or Chin Chin.'
    },
    icon: 'fa-solid fa-blender',
    tag: { es: 'Desde S/ 15.00', en: 'From S/ 15.00' }
  },
  {
    id: 'filtrados',
    name: { es: 'Filtrados de Especialidad', en: 'Specialty Pour Over' },
    desc: {
      es: 'Mupeco patrimonial de la selva, V60 japonesa, Chemex, Prensa Francesa y Ritual Virtudes.',
      en: 'Peruvian Mupeco, Japanese V60, Chemex, French Press and the 3-cup Virtues Ritual.'
    },
    icon: 'fa-solid fa-filter',
    tag: { es: 'Desde S/ 9.00', en: 'From S/ 9.00' }
  },
  {
    id: 'bar_kfest',
    name: { es: 'Bar Kfest (Coctelería)', en: 'Kfest Coffee Bar' },
    desc: {
      es: 'Coffee Sour con pisco peruano, Baileys Affogato, Menta Coffee y Wine Coffee de autor.',
      en: 'Coffee Sour with Peruvian pisco, Baileys Affogato, Mint Coffee and Wine Coffee creations.'
    },
    icon: 'fa-solid fa-martini-glass-citrus',
    tag: { es: 'Desde S/ 14.00', en: 'From S/ 14.00' }
  },
  {
    id: 'virtudes',
    name: { es: 'Línea Virtudes (Café en Bolsa)', en: 'Virtues Coffee Bags' },
    desc: {
      es: 'Bolsas de Geisha, Bourbon, Caturra de Chanchamayo (1,300 a 1,750 msnm) para preparar en casa.',
      en: 'Fresh roasted whole bean / ground specialty bags from Chanchamayo (1300-1750m) for home.'
    },
    icon: 'fa-solid fa-seedling',
    tag: { es: 'Desde S/ 30.00', en: 'From S/ 30.00' }
  }
];

export const QUIZ_FLAVOR_FILTERS: Record<
  CoffeeCategoryKey,
  { id: string; label: { es: string; en: string } }[]
> = {
  calientes: [
    { id: 'todos', label: { es: 'Todos', en: 'All' } },
    { id: 'intenso', label: { es: 'Intenso & Solo', en: 'Bold & Black' } },
    { id: 'cremoso', label: { es: 'Cremoso con Leche', en: 'Creamy Milk' } },
    { id: 'dulce', label: { es: 'Dulce & Chocolate', en: 'Sweet & Chocolate' } }
  ],
  iced: [
    { id: 'todos', label: { es: 'Todos', en: 'All' } },
    { id: 'intenso', label: { es: 'Negro & Helado', en: 'Black & Iced' } },
    { id: 'cremoso', label: { es: 'Cremoso con Leche', en: 'Milky Cold' } },
    { id: 'dulce', label: { es: 'Dulce con Siropes', en: 'Flavored Sweets' } }
  ],
  cold_brew: [
    { id: 'todos', label: { es: 'Todos', en: 'All' } },
    { id: 'intenso', label: { es: 'Puro Clásico', en: 'Classic Pure' } },
    { id: 'frutal', label: { es: 'Cítrico & Tropical', en: 'Citrus & Tropical' } }
  ],
  frappes: [
    { id: 'todos', label: { es: 'Todos', en: 'All' } },
    { id: 'dulce', label: { es: 'Oreo & Goloso', en: 'Oreo & Sweets' } },
    { id: 'cremoso', label: { es: 'Cafetero', en: 'Coffee Rich' } },
    { id: 'frutal', label: { es: 'Frutal Fresa', en: 'Fruity Berry' } }
  ],
  filtrados: [
    { id: 'todos', label: { es: 'Todos', en: 'All' } },
    { id: 'tradicional', label: { es: 'Tradición Selva (Mupeco)', en: 'Rainforest Heritage' } },
    { id: 'floral', label: { es: 'Taza Limpia & Floral (V60 / Chemex)', en: 'Clean & Floral' } },
    { id: 'intenso', label: { es: 'Cuerpo & Inmersión (Prensa)', en: 'Full Body (Press)' } },
    { id: 'especial', label: { es: 'Ritual Completo (3 Cafés)', en: 'Full Ritual (3 Cups)' } }
  ],
  bar_kfest: [
    { id: 'todos', label: { es: 'Todos', en: 'All' } },
    { id: 'especial', label: { es: 'Con Pisco o Vino', en: 'Pisco or Wine' } },
    { id: 'dulce', label: { es: 'Con Baileys & Helado', en: 'Baileys & Gelato' } },
    { id: 'cremoso', label: { es: 'Affogato Clásico', en: 'Classic Affogato' } },
    { id: 'frutal', label: { es: 'Menta & Everest', en: 'Mint & Everest' } }
  ],
  virtudes: [
    { id: 'todos', label: { es: 'Todos', en: 'All' } },
    { id: 'floral', label: { es: 'Geisha & Floral', en: 'Geisha & Floral' } },
    { id: 'intenso', label: { es: 'Cacao & Tueste Medio-Alto', en: 'Cacao & Medium-Dark' } },
    { id: 'frutal', label: { es: 'Frutal & Cítrico Suave', en: 'Fruity & Soft Citrus' } },
    { id: 'dulce', label: { es: 'Toffee & Panela', en: 'Toffee & Panela' } }
  ]
};

export const COFFEE_MENU: CoffeeMenuItem[] = [
  // --- BEBIDAS CALIENTES (Menú pág. 2) ---
  {
    id: 'espresso',
    name: { es: 'Espresso', en: 'Espresso' },
    category: 'calientes',
    categoryLabel: { es: 'Bebidas Calientes', en: 'Warm Beverages' },
    price: 'S/ 8.00',
    priceNum: 8,
    flavorTag: 'intenso',
    flavorLabel: { es: 'Intenso & Concentrado', en: 'Bold & Concentrated' },
    desc: {
      es: '1 shot de café espresso recién extraído con crema dorada elástica y aroma penetrante.',
      en: '1 shot of fresh espresso with thick golden crema and deep intense aroma.'
    },
    notes: {
      es: 'Cuerpo licoroso, cacao fino al 70%, retrogusto prolongado y dulce natural.',
      en: 'Liqueur body, 70% dark cacao, long lingering and naturally sweet finish.'
    },
    icon: 'fa-solid fa-mug-hot',
    badge: { es: 'Puro & Intenso', en: 'Pure & Intense' }
  },
  {
    id: 'espresso_doble',
    name: { es: 'Espresso Doble', en: 'Double Espresso' },
    category: 'calientes',
    categoryLabel: { es: 'Bebidas Calientes', en: 'Warm Beverages' },
    price: 'S/ 10.00',
    priceNum: 10,
    flavorTag: 'intenso',
    flavorLabel: { es: 'Extra Intenso', en: 'Extra Bold' },
    desc: {
      es: '2 shots de café espresso de especialidad. Doble dosis de vitalidad y concentración aromática.',
      en: '2 shots of specialty espresso. Double dose of pure vitality and aromatic punch.'
    },
    notes: {
      es: 'Intensidad máxima, notas a nuez tostada, chocolate amargo y cuerpo denso.',
      en: 'Maximum intensity, toasted nuts, bitter chocolate, and dense body.'
    },
    icon: 'fa-solid fa-bolt',
    badge: { es: 'Doble Shot', en: 'Double Shot' }
  },
  {
    id: 'americano',
    name: { es: 'Americano', en: 'Americano' },
    category: 'calientes',
    categoryLabel: { es: 'Bebidas Calientes', en: 'Warm Beverages' },
    price: 'S/ 8.00',
    priceNum: 8,
    flavorTag: 'intenso',
    flavorLabel: { es: 'Equilibrado & Limpio', en: 'Balanced & Clean' },
    desc: {
      es: 'Espresso de especialidad combinado con agua caliente pura a temperatura precisa.',
      en: 'Specialty espresso combined with pure hot water at precise brewing temperature.'
    },
    notes: {
      es: 'Taza limpia, notas a caramelo suave, frutos secos y acidez sutil agradable.',
      en: 'Clean cup, mild caramel notes, dried fruits, and pleasant subtle acidity.'
    },
    icon: 'fa-solid fa-mug-saucer',
    badge: { es: '⭐ Clásico Favorito', en: '⭐ Classic Favorite' }
  },
  {
    id: 'capuchino',
    name: { es: 'Capuchino', en: 'Cappuccino' },
    category: 'calientes',
    categoryLabel: { es: 'Bebidas Calientes', en: 'Warm Beverages' },
    price: 'S/ 12.00',
    priceNum: 12,
    flavorTag: 'cremoso',
    flavorLabel: { es: 'Cremoso con Leche', en: 'Creamy with Milk' },
    desc: {
      es: 'Espresso doble y leche entera vaporizada con microespuma densa y sedosa.',
      en: 'Double espresso and steamed whole milk with dense, silky microfoam.'
    },
    notes: {
      es: 'Dulzor natural de la leche cremosa, notas a panela de altura y textura aterciopelada.',
      en: 'Natural milk sweetness, highland panela hints, and velvety smooth texture.'
    },
    icon: 'fa-solid fa-mug-hot',
    badge: { es: '⭐ El Más Pedido', en: '⭐ Best Seller' },
    allowsMilk: true
  },
  {
    id: 'cafe_latte',
    name: { es: 'Café Latte', en: 'Caffè Latte' },
    category: 'calientes',
    categoryLabel: { es: 'Bebidas Calientes', en: 'Warm Beverages' },
    price: 'S/ 12.00',
    priceNum: 12,
    flavorTag: 'cremoso',
    flavorLabel: { es: 'Suave & Lácteo', en: 'Smooth & Milky' },
    desc: {
      es: 'Espresso de especialidad con abundante leche caliente cremosa y sutil corona de espuma.',
      en: 'Specialty espresso with generous steamed milk and a delicate velvety cap.'
    },
    notes: {
      es: 'Muy suave en paladar, dulce lácteo envolvente, toques a toffee y fácil de beber.',
      en: 'Gentle on the palate, creamy toffee undertones, extremely smooth.'
    },
    icon: 'fa-solid fa-mug-saucer',
    badge: { es: 'Suave & Sedoso', en: 'Smooth & Silky' },
    allowsMilk: true
  },
  {
    id: 'mokaccino',
    name: { es: 'Mokaccino', en: 'Mochaccino' },
    category: 'calientes',
    categoryLabel: { es: 'Bebidas Calientes', en: 'Warm Beverages' },
    price: 'S/ 15.00',
    priceNum: 15,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Dulce & Chocolatoso', en: 'Sweet & Chocolate' },
    desc: {
      es: 'Espresso, leche entera vaporizada y chocolate fino de origen Chanchamayo.',
      en: 'Espresso, steamed whole milk, and fine Chanchamayo origin dark chocolate.'
    },
    notes: {
      es: 'Fusión de cacao al 70%, crema láctea y la vivacidad del café de altura.',
      en: '70% rich cacao blend, velvety milk cream, and high-altitude espresso vigor.'
    },
    icon: 'fa-solid fa-cookie-bite',
    badge: { es: 'Extra Chocolate', en: 'Extra Chocolate' },
    allowsMilk: true
  },
  {
    id: 'cafe_bombon',
    name: { es: 'Café Bombón', en: 'Café Bombón' },
    category: 'calientes',
    categoryLabel: { es: 'Bebidas Calientes', en: 'Warm Beverages' },
    price: 'S/ 15.00',
    priceNum: 15,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Dulce & Meloso', en: 'Sweet & Indulgent' },
    desc: {
      es: 'Espresso intenso servido sobre generosa base de leche condensada y leche entera.',
      en: 'Intense espresso layered over a luscious base of condensed milk and warm milk.'
    },
    notes: {
      es: 'Dulzor acaramelado profundo, contraste visual en capas y cuerpo voluptuoso.',
      en: 'Deep caramelized sweetness, layered visual delight, and indulgent full body.'
    },
    icon: 'fa-solid fa-jar-wheat',
    badge: { es: 'Postre en Taza', en: 'Dessert in a Cup' },
    allowsMilk: true
  },
  {
    id: 'babyccino',
    name: { es: 'Babyccino', en: 'Babyccino' },
    category: 'calientes',
    categoryLabel: { es: 'Bebidas Calientes', en: 'Warm Beverages' },
    price: 'S/ 8.00',
    priceNum: 8,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Sin Cafeína · Algarrobina', en: 'Caffeine-Free' },
    desc: {
      es: 'Algarrobina peruana natural, leche entera vaporizada y mini marshmallows flotantes.',
      en: 'Natural Peruvian algarrobina, frothy warm milk, and floating mini marshmallows.'
    },
    notes: {
      es: '0% cafeína, dulce aroma a algarrobina piurana, reconfortante y suave.',
      en: '0% caffeine, golden algarrobina aroma, gentle and comforting.'
    },
    icon: 'fa-solid fa-heart',
    badge: { es: 'Para Toda la Familia', en: 'Family Friendly' },
    allowsMilk: true
  },

  // --- FILTRADOS DE ESPECIALIDAD (Menú pág. 2) ---
  {
    id: 'mupeco',
    name: { es: 'Mupeco (Cafetera Peruana)', en: 'Mupeco (Peruvian Brewer)' },
    category: 'filtrados',
    categoryLabel: { es: 'Filtrados de Especialidad', en: 'Specialty Pour Over' },
    price: 'S/ 10.00',
    priceNum: 10,
    flavorTag: 'tradicional',
    flavorLabel: { es: 'Tradición de Selva Central', en: 'Rainforest Heritage' },
    desc: {
      es: 'Cafetera artesanal peruana de Selva Central y café de especialidad a elección.',
      en: 'Artisan Peruvian brewer from Central Rainforest with choice of specialty coffee.'
    },
    notes: {
      es: 'Esencia densa, dulce, balanceada y aromática con el auténtico sabor tradicional de Chanchamayo.',
      en: 'Dense, sweet, balanced essence preserving authentic Chanchamayo coffee tradition.'
    },
    icon: 'fa-solid fa-filter',
    img: 'images/barista/dripper_artesanal_mupeco.png',
    badge: { es: '⭐ Identidad Kfest', en: '⭐ Kfest Heritage' }
  },
  {
    id: 'v60',
    name: { es: 'V60 (Cafetera Japonesa)', en: 'V60 (Japanese Dripper)' },
    category: 'filtrados',
    categoryLabel: { es: 'Filtrados de Especialidad', en: 'Specialty Pour Over' },
    price: 'S/ 10.00',
    priceNum: 10,
    flavorTag: 'floral',
    flavorLabel: { es: 'Floral & Cítrico Brillante', en: 'Floral & Bright Citrus' },
    desc: {
      es: 'Cafetera japonesa cónica con estrías en espiral y café de especialidad a elección.',
      en: 'Japanese conical spiral dripper with choice of single-origin specialty roast.'
    },
    notes: {
      es: 'Taza de máxima claridad sensorial, acidez cítrica brillante, flores de café y frutas frescas.',
      en: 'Maximum sensory clarity, vibrant citrus acidity, coffee blossom, and fresh fruit notes.'
    },
    icon: 'fa-solid fa-filter',
    img: 'images/barista/v60.png',
    badge: { es: 'Claridad & Aroma', en: 'Clarity & Aroma' }
  },
  {
    id: 'chemex',
    name: { es: 'Chemex (Cafetera Inglesa)', en: 'Chemex Brewer' },
    category: 'filtrados',
    categoryLabel: { es: 'Filtrados de Especialidad', en: 'Specialty Pour Over' },
    price: 'S/ 10.00',
    priceNum: 10,
    flavorTag: 'floral',
    flavorLabel: { es: 'Sedoso & Ultra Limpio', en: 'Silky & Ultra Clean' },
    desc: {
      es: 'Cafetera de vidrio borosilicato con filtro grueso y café de especialidad a elección.',
      en: 'Hourglass glass brewer with dense laboratory filter and choice of specialty coffee.'
    },
    notes: {
      es: 'Extracción cristalina sin sedimentos ni aceites pesados. Dulzura delicada y cuerpo sedoso.',
      en: 'Crystalline extraction with zero sediments. Delicate honey sweetness and silky cup.'
    },
    icon: 'fa-solid fa-flask',
    badge: { es: 'Elegancia Sensorial', en: 'Sensory Elegance' }
  },
  {
    id: 'prensa_francesa',
    name: { es: 'Prensa Francesa', en: 'French Press' },
    category: 'filtrados',
    categoryLabel: { es: 'Filtrados de Especialidad', en: 'Specialty Pour Over' },
    price: 'S/ 9.00',
    priceNum: 9,
    flavorTag: 'intenso',
    flavorLabel: { es: 'Cuerpo Denso & Inmersión', en: 'Full Immersion Body' },
    desc: {
      es: 'Cafetera francesa de inmersión completa y café de especialidad a elección.',
      en: 'Full immersion French plunger brewer with choice of specialty roast.'
    },
    notes: {
      es: 'Cuerpo redondo y oleoso, conserva todos los aceites esenciales aromáticos, notas a cacao y panela.',
      en: 'Rich oily body preserving natural aromatic oils, cacao nibs and dark panela hints.'
    },
    icon: 'fa-solid fa-mug-hot',
    img: 'images/barista/prensa_francesa.png',
    badge: { es: 'Cuerpo & Fuerza', en: 'Full Body' }
  },
  {
    id: 'ritual_virtudes',
    name: { es: 'Ritual Virtudes (3 Filtrados)', en: 'Virtues Ritual (3 Tastings)' },
    category: 'filtrados',
    categoryLabel: { es: 'Filtrados de Especialidad', en: 'Specialty Pour Over' },
    price: 'S/ 22.00',
    priceNum: 22,
    flavorTag: 'especial',
    flavorLabel: { es: 'Experiencia Sensorial Suprema', en: 'Ultimate Tasting Experience' },
    desc: {
      es: 'Experiencia de 3 filtrados en mupeco, con 3 diferentes cafés de especialidad a elección.',
      en: 'Experiential 3-pour-over tasting in Mupeco drippers featuring 3 distinct specialty microlots.'
    },
    notes: {
      es: 'Cata interactiva en mesa: compara variedades como Geisha, Bourbon y Catuai en un solo viaje.',
      en: 'Side-by-side interactive table tasting: compare Geisha, Bourbon and Catuai varietals.'
    },
    icon: 'fa-solid fa-wand-magic-sparkles',
    badge: { es: '⭐ Experiencia Top', en: '⭐ Top Experience' }
  },

  // --- ICED / CAFÉS HELADOS (Menú pág. 3) ---
  {
    id: 'iced_coffee',
    name: { es: 'Iced Coffee', en: 'Iced Coffee' },
    category: 'iced',
    categoryLabel: { es: 'Cafés Helados (Iced)', en: 'Iced Coffee' },
    price: 'S/ 12.00',
    priceNum: 12,
    flavorTag: 'intenso',
    flavorLabel: { es: 'Negro Puro & Helado', en: 'Black & Ice Cold' },
    desc: {
      es: 'Espresso doble recién extraído vertido sobre abundantes cubos de hielo macizo.',
      en: 'Fresh double espresso poured directly over generous solid ice cubes.'
    },
    notes: {
      es: 'Golpe revitalizante frío, notas a chocolate amargo y retrogusto limpio sin azúcar añadida.',
      en: 'Revitalizing cold rush, dark chocolate notes, and clean unsweetened finish.'
    },
    icon: 'fa-solid fa-snowflake',
    badge: { es: 'Puro Frío', en: 'Pure Cold' }
  },
  {
    id: 'iced_capuchino',
    name: { es: 'Iced Capuchino', en: 'Iced Cappuccino' },
    category: 'iced',
    categoryLabel: { es: 'Cafés Helados (Iced)', en: 'Iced Coffee' },
    price: 'S/ 14.00',
    priceNum: 14,
    flavorTag: 'cremoso',
    flavorLabel: { es: 'Cremoso Helado', en: 'Creamy Cold' },
    desc: {
      es: 'Espresso, leche entera fría, un toque de jarabe de goma y cubos de hielo.',
      en: 'Espresso, chilled whole milk, a touch of simple cane syrup, and ice cubes.'
    },
    notes: {
      es: 'Textura cremosa y refrescante con el contraste vibrante del café espresso.',
      en: 'Creamy and refreshing texture with the vibrant contrast of fresh espresso.'
    },
    icon: 'fa-solid fa-glass-water',
    badge: { es: 'Refrescante', en: 'Refreshing' },
    allowsMilk: true
  },
  {
    id: 'vanilla_latte',
    name: { es: 'Vanilla Latte Helado', en: 'Iced Vanilla Latte' },
    category: 'iced',
    categoryLabel: { es: 'Cafés Helados (Iced)', en: 'Iced Coffee' },
    price: 'S/ 14.00',
    priceNum: 14,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Vainilla Bourbon', en: 'Bourbon Vanilla' },
    desc: {
      es: 'Espresso, leche entera, jarabe artesanal de vainilla y cubos de hielo.',
      en: 'Espresso, whole milk, artisan vanilla bean syrup, and ice cubes.'
    },
    notes: {
      es: 'Aromas florales a vainilla natural, dulzor suave y textura sedosa en frío.',
      en: 'Natural vanilla floral aromas, mild sweetness, and cold silky texture.'
    },
    icon: 'fa-solid fa-glass-water',
    badge: { es: 'Aromático', en: 'Aromatic' },
    allowsMilk: true
  },
  {
    id: 'caramel_latte',
    name: { es: 'Caramel Latte Helado', en: 'Iced Caramel Latte' },
    category: 'iced',
    categoryLabel: { es: 'Cafés Helados (Iced)', en: 'Iced Coffee' },
    price: 'S/ 15.00',
    priceNum: 15,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Caramelo Meloso', en: 'Honeyed Caramel' },
    desc: {
      es: 'Espresso, leche entera, caramelo artesanal y cubos de hielo.',
      en: 'Espresso, whole milk, rich artisan caramel drizzle, and ice cubes.'
    },
    notes: {
      es: 'Vetas de caramelo dulce, toffee tostado y balance perfecto con el café.',
      en: 'Sweet caramel ribbons, roasted toffee, and flawless coffee harmony.'
    },
    icon: 'fa-solid fa-jar-wheat',
    badge: { es: '⭐ Favorito Helado', en: '⭐ Iced Favorite' },
    allowsMilk: true
  },
  {
    id: 'iced_mokaccino',
    name: { es: 'Mokaccino Helado', en: 'Iced Mochaccino' },
    category: 'iced',
    categoryLabel: { es: 'Cafés Helados (Iced)', en: 'Iced Coffee' },
    price: 'S/ 16.00',
    priceNum: 16,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Chocolate & Cacao Frío', en: 'Cold Cacao & Choc' },
    desc: {
      es: 'Espresso, leche entera, crema de cacao fino al 70% y cubos de hielo.',
      en: 'Espresso, whole milk, fine 70% cacao cream, and ice cubes.'
    },
    notes: {
      es: 'El encuentro celestial entre cacao denso y café helado sobre rocas.',
      en: 'Heavenly match between rich dark cacao and chilled espresso on the rocks.'
    },
    icon: 'fa-solid fa-ice-cream',
    badge: { es: 'Indulgente', en: 'Indulgent' },
    allowsMilk: true
  },
  {
    id: 'avellana_latte',
    name: { es: 'Avellana Latte Helado', en: 'Iced Hazelnut Latte' },
    category: 'iced',
    categoryLabel: { es: 'Cafés Helados (Iced)', en: 'Iced Coffee' },
    price: 'S/ 14.00',
    priceNum: 14,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Frutos Secos & Praliné', en: 'Toasted Hazelnut' },
    desc: {
      es: 'Espresso, leche entera, jarabe de avellana tostada y cubos de hielo.',
      en: 'Espresso, whole milk, roasted hazelnut syrup, and ice cubes.'
    },
    notes: {
      es: 'Notas tostadas a praliné, aroma a bosque y cuerpo aterciopelado.',
      en: 'Roasted praline notes, nutty fragrance, and velvety chilled body.'
    },
    icon: 'fa-solid fa-cubes-stacked',
    badge: { es: 'Tostado Suave', en: 'Toasted Nut' },
    allowsMilk: true
  },

  // --- COLD BREW (Menú pág. 3) ---
  {
    id: 'iced_cold_brew',
    name: { es: 'Iced Cold Brew', en: 'Iced Cold Brew' },
    category: 'cold_brew',
    categoryLabel: { es: 'Cold Brew de Autor', en: 'Signature Cold Brew' },
    price: 'S/ 14.00',
    priceNum: 14,
    flavorTag: 'intenso',
    flavorLabel: { es: '18 Horas de Extracción', en: '18h Slow Brew' },
    desc: {
      es: 'Vaso de cold brew artesanal reposado en frío durante 18 horas con cubos de hielo.',
      en: 'Glass of artisan cold brew steeped slowly in cold water for 18 hours over ice.'
    },
    notes: {
      es: 'Acidez ultra baja, dulzura natural a chocolate y frutos secos, sin amargor.',
      en: 'Ultra-low acidity, natural honey and cacao sweetness, completely smooth.'
    },
    icon: 'fa-solid fa-glass-water',
    badge: { es: '18h en Frío', en: '18h Cold Steep' }
  },
  {
    id: 'orange_coffee',
    name: { es: 'Orange Coffee', en: 'Orange Coffee' },
    category: 'cold_brew',
    categoryLabel: { es: 'Cold Brew de Autor', en: 'Signature Cold Brew' },
    price: 'S/ 14.00',
    priceNum: 14,
    flavorTag: 'frutal',
    flavorLabel: { es: 'Cold Brew con Naranja', en: 'Citrus & Cold Brew' },
    desc: {
      es: 'Cold brew, zumo de naranja natural recién exprimido, jarabe de goma y cubos de hielo.',
      en: 'Cold brew, fresh squeezed orange juice, simple cane syrup, and ice cubes.'
    },
    notes: {
      es: 'Contraste chispeante entre cítricos y café, retrogusto aromático refrescante en capas.',
      en: 'Sparkling citrus contrast meets smooth cold brew, delightfully layered and thirst-quenching.'
    },
    icon: 'fa-solid fa-lemon',
    badge: { es: '⭐ Creación Estrella', en: '⭐ Star Creation' }
  },
  {
    id: 'cold_brew_maracuya',
    name: { es: 'Cold Brew Maracuyá', en: 'Passionfruit Cold Brew' },
    category: 'cold_brew',
    categoryLabel: { es: 'Cold Brew de Autor', en: 'Signature Cold Brew' },
    price: 'S/ 14.00',
    priceNum: 14,
    flavorTag: 'frutal',
    flavorLabel: { es: 'Tropical & Maracuyá', en: 'Tropical Passionfruit' },
    desc: {
      es: 'Cold brew, zumo de maracuyá fresco de Chanchamayo, jarabe de goma y cubos de hielo.',
      en: 'Cold brew, fresh rainforest passionfruit juice, simple cane syrup, and ice cubes.'
    },
    notes: {
      es: 'Acidez tropical exótica combinada con las notas achocolatadas del cold brew.',
      en: 'Exotic tropical acidity balanced with deep chocolate undertones of cold brew.'
    },
    icon: 'fa-solid fa-sun',
    badge: { es: '⭐ 100% Selva Central', en: '⭐ Rainforest Pure' }
  },

  // --- FRAPPES (Menú pág. 3) ---
  {
    id: 'frappe_chocolate',
    name: { es: 'Frappé de Chocolate', en: 'Chocolate Frappe' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Golosos', en: 'Frappes & Treats' },
    price: 'S/ 15.00',
    priceNum: 15,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Cacao & Chocolate', en: 'Cacao & Chocolate' },
    desc: {
      es: 'Espresso, hielo granizado, chocolate fino, leche entera y corona de chantilly.',
      en: 'Espresso, crushed ice, fine chocolate, whole milk, and fluffy whipped cream.'
    },
    notes: {
      es: 'Cremoso, helado y extra chocolatoso con espiral de cacao sobre la crema.',
      en: 'Creamy, icy, deeply chocolatey with cacao drizzle over whipped cream.'
    },
    icon: 'fa-solid fa-blender',
    badge: { es: 'Cacao Puro', en: 'Pure Cacao' }
  },
  {
    id: 'frappe_caramelo',
    name: { es: 'Frappé de Caramelo', en: 'Caramel Frappe' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Golosos', en: 'Frappes & Treats' },
    price: 'S/ 15.00',
    priceNum: 15,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Caramelo Dorado', en: 'Golden Caramel' },
    desc: {
      es: 'Espresso, hielo granizado, caramelo artesanal, leche y crema chantilly.',
      en: 'Espresso, blended ice, golden caramel syrup, milk, and whipped cream.'
    },
    notes: {
      es: 'Dulzura envolvente de toffee, textura granizada suave y toque cafetero equilibrado.',
      en: 'Sweet buttery toffee, smooth icy texture, and balanced espresso punch.'
    },
    icon: 'fa-solid fa-blender',
    badge: { es: '⭐ Dulce Favorito', en: '⭐ Sweet Favorite' }
  },
  {
    id: 'frappe_algarrobina',
    name: { es: 'Frappé de Algarrobina', en: 'Algarrobina Frappe' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Golosos', en: 'Frappes & Treats' },
    price: 'S/ 15.00',
    priceNum: 15,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Algarrobina Peruana', en: 'Peruvian Algarrobina' },
    desc: {
      es: 'Espresso, hielo granizado, algarrobina pura de exportación, leche y chantilly.',
      en: 'Espresso, crushed ice, pure Peruvian carob syrup, milk, and whipped cream.'
    },
    notes: {
      es: 'Sabor nacional inconfundible, energizante natural y dulzor tostado tradicional.',
      en: 'Iconic national flavor, natural energy boost, and roasted honey-like sweetness.'
    },
    icon: 'fa-solid fa-blender',
    badge: { es: 'Sabor Nacional', en: 'Peruvian Pride' }
  },
  {
    id: 'frappe_capuchino',
    name: { es: 'Capuchino Frappé', en: 'Cappuccino Frappe' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Golosos', en: 'Frappes & Treats' },
    price: 'S/ 16.00',
    priceNum: 16,
    flavorTag: 'cremoso',
    flavorLabel: { es: 'Doble Shot Cafetero', en: 'Double Shot Coffee' },
    desc: {
      es: 'Espresso doble, hielo granizado, leche entera batida y corona de chantilly.',
      en: 'Double espresso, blended ice, whipped milk, and whipped cream topping.'
    },
    notes: {
      es: 'Para los verdaderos amantes del café que buscan la máxima frescura frappé.',
      en: 'For true coffee lovers desiring the purest espresso kick in ice-blended form.'
    },
    icon: 'fa-solid fa-blender',
    badge: { es: 'Fuerza Cafetera', en: 'Coffee Rich' }
  },
  {
    id: 'frappe_oreo',
    name: { es: 'Frappé Oreo', en: 'Oreo Frappe' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Golosos', en: 'Frappes & Treats' },
    price: 'S/ 16.00',
    priceNum: 16,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Galleta Oreo & Cacao', en: 'Oreo Cookie & Cacao' },
    desc: {
      es: 'Espresso, hielo granizado, galletas Oreo trituradas, leche entera y chantilly con trocitos de Oreo.',
      en: 'Espresso, blended ice, crushed Oreo cookies, milk, and whipped cream with Oreo crumble.'
    },
    notes: {
      es: 'Crujiente, goloso, combinación perfecta entre galleta de chocolate y café.',
      en: 'Crunchy, rich, quintessential harmony between dark cookie crumble and coffee.'
    },
    icon: 'fa-solid fa-blender',
    badge: { es: '⭐ El Más Pedido', en: '⭐ Number One Treat' }
  },
  {
    id: 'frappe_fresa',
    name: { es: 'Frappé de Fresa', en: 'Strawberry Frappe' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Golosos', en: 'Frappes & Treats' },
    price: 'S/ 16.00',
    priceNum: 16,
    flavorTag: 'frutal',
    flavorLabel: { es: 'Frutos Rojos & Café', en: 'Berry & Coffee' },
    desc: {
      es: 'Espresso, hielo granizado, pulpa fresca de fresa natural, leche y crema chantilly.',
      en: 'Espresso, blended ice, fresh natural strawberry fruit pulp, milk, and whipped cream.'
    },
    notes: {
      es: 'Divertido y veraniego balance frutal entre fresas frescas y café de especialidad.',
      en: 'Fun and summery fruit balance combining fresh strawberries with specialty coffee.'
    },
    icon: 'fa-solid fa-blender',
    badge: { es: 'Frutal Fresco', en: 'Fresh Berry' }
  },
  {
    id: 'frappe_chinchin',
    name: { es: 'Frappé Chin Chin', en: 'Chin Chin Frappe' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Golosos', en: 'Frappes & Treats' },
    price: 'S/ 16.00',
    priceNum: 16,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Chin Chin Crocante', en: 'Crunchy Chin Chin' },
    desc: {
      es: 'Espresso, hielo granizado, bolitas de chin chin crocantes de chocolate, leche y chantilly.',
      en: 'Espresso, blended ice, crispy chocolate chin chin pearls, milk, and whipped cream.'
    },
    notes: {
      es: 'Explosión crocante en cada sorbo con base de chocolate fino y espresso.',
      en: 'Crunchy explosion in every sip over a foundation of fine chocolate and espresso.'
    },
    icon: 'fa-solid fa-blender',
    badge: { es: 'Crocante & Divertido', en: 'Crispy & Fun' }
  },

  // --- BAR KFEST / COCTELERÍA (Menú pág. 4) ---
  {
    id: 'coffee_sour',
    name: { es: 'Coffee Sour', en: 'Coffee Sour' },
    category: 'bar_kfest',
    categoryLabel: { es: 'Bar Kfest (Coctelería)', en: 'Kfest Coffee Bar' },
    price: 'S/ 17.00',
    priceNum: 17,
    flavorTag: 'especial',
    flavorLabel: { es: 'Con Pisco Peruano', en: 'With Peruvian Pisco' },
    desc: {
      es: 'Espresso de especialidad, pisco quebranta peruano, zumo fresco de limón y jarabe de goma.',
      en: 'Specialty espresso, Peruvian quebranta pisco, fresh lime juice, and simple cane syrup.'
    },
    notes: {
      es: 'El coctel bandera del Perú transformado con café de altura: aromático, cítrico y vibrante.',
      en: 'Peru’s national cocktail reborn with highland espresso: aromatic, citrusy, and vibrant.'
    },
    icon: 'fa-solid fa-martini-glass-citrus',
    badge: { es: '⭐ Coctel Insignia', en: '⭐ Signature Cocktail' }
  },
  {
    id: 'baileys_affogato',
    name: { es: 'Baileys Affogato', en: 'Baileys Affogato' },
    category: 'bar_kfest',
    categoryLabel: { es: 'Bar Kfest (Coctelería)', en: 'Kfest Coffee Bar' },
    price: 'S/ 17.00',
    priceNum: 17,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Espresso, Helado & Baileys', en: 'Espresso, Gelato & Baileys' },
    desc: {
      es: 'Espresso caliente vertido sobre helado artesanal de vainilla y un generoso shot de Baileys.',
      en: 'Hot espresso poured over artisan vanilla gelato and a generous shot of original Baileys.'
    },
    notes: {
      es: 'Crema irlandesa untuosa, frío del helado y calidez del café en una copa sublime.',
      en: 'Velvety Irish cream, icy gelato, and warm espresso warmth in a sublime coupe.'
    },
    icon: 'fa-solid fa-ice-cream',
    badge: { es: 'Postre & Cóctel', en: 'Dessert & Cocktail' }
  },
  {
    id: 'affogato',
    name: { es: 'Affogato Clásico', en: 'Classic Affogato' },
    category: 'bar_kfest',
    categoryLabel: { es: 'Bar Kfest (Coctelería)', en: 'Kfest Coffee Bar' },
    price: 'S/ 14.00',
    priceNum: 14,
    flavorTag: 'cremoso',
    flavorLabel: { es: 'Espresso sobre Helado', en: 'Espresso over Gelato' },
    desc: {
      es: 'Shot de espresso caliente recién extraído sobre una bola de helado artesanal de vainilla.',
      en: 'Freshly pulled hot espresso shot drowning a scoop of artisan vanilla gelato.'
    },
    notes: {
      es: 'El mítico contraste italiano entre frío y calor con la crema dorada del café de Chanchamayo.',
      en: 'Iconic Italian hot-and-cold contrast illuminated by Chanchamayo specialty crema.'
    },
    icon: 'fa-solid fa-ice-cream',
    badge: { es: 'Clásico Italiano', en: 'Italian Classic' }
  },
  {
    id: 'menta_coffee',
    name: { es: 'Menta Coffee', en: 'Mint Coffee' },
    category: 'bar_kfest',
    categoryLabel: { es: 'Bar Kfest (Coctelería)', en: 'Kfest Coffee Bar' },
    price: 'S/ 17.00',
    priceNum: 17,
    flavorTag: 'frutal',
    flavorLabel: { es: 'Cold Brew & Licor de Menta', en: 'Cold Brew & Mint Liqueur' },
    desc: {
      es: 'Cold brew de la casa, licor fino de menta y gaseosa everest servido sobre rocas.',
      en: 'Signature cold brew, fine mint liqueur, and everest soda served over rocks.'
    },
    notes: {
      es: 'Frescura mentolada extrema, burbujas ligeras y propiedades digestivas.',
      en: 'Extreme menthol refreshment, crisp bubbles, and delightful digestive properties.'
    },
    icon: 'fa-solid fa-martini-glass',
    badge: { es: 'Frescura Total', en: 'Total Freshness' }
  },
  {
    id: 'wine_coffee',
    name: { es: 'Wine Coffee', en: 'Wine Coffee' },
    category: 'bar_kfest',
    categoryLabel: { es: 'Bar Kfest (Coctelería)', en: 'Kfest Coffee Bar' },
    price: 'S/ 17.00',
    priceNum: 17,
    flavorTag: 'especial',
    flavorLabel: { es: 'Café & Vino Selecto', en: 'Coffee & Fine Wine' },
    desc: {
      es: 'Copa de café de especialidad infusionado con vino tinto selecto de la casa.',
      en: 'Goblet of specialty coffee gently infused with selected house red wine.'
    },
    notes: {
      es: 'Aromas enológicos a uva madura, taninos aterciopelados y notas de roble.',
      en: 'Enological ripe grape bouquets, velvety tannins, and subtle oak undertones.'
    },
    icon: 'fa-solid fa-wine-glass',
    badge: { es: 'Elegancia Enológica', en: 'Wine Elegance' }
  },

  // --- LÍNEA VIRTUDES (Café de Especialidad en Bolsa - Menú págs. 5 y 6) ---
  {
    id: 'virtud_resiliencia',
    name: { es: 'Virtud Resiliencia (Geisha)', en: 'Resilience Profile (Geisha)' },
    category: 'virtudes',
    categoryLabel: { es: 'Línea Virtudes (Café en Bolsa)', en: 'Virtues Coffee Bags' },
    price: 'S/ 38.00',
    priceNum: 38,
    flavorTag: 'floral',
    flavorLabel: { es: 'Geisha 1,600 msnm · Jazmín & Miel', en: 'Geisha · Jasmine & Honey' },
    desc: {
      es: 'Variedad Geisha a 1600 msnm en Perené, Chanchamayo. Proceso lavado, tueste medio.',
      en: 'Geisha varietal grown at 1600 masl in Perené, Chanchamayo. Washed process, medium roast.'
    },
    notes: {
      es: 'Perfil floral a jazmín silvestre, miel de monte y acidez elegante a vino blanco. Cuerpo sedoso.',
      en: 'Floral jasmine bouquet, mountain honey, and elegant white wine acidity. Silky body.'
    },
    icon: 'fa-solid fa-crown',
    img: 'images/products/4_paquetes_virtudes.png',
    badge: { es: '🏆 Variedad Reina Geisha', en: '🏆 Queen Geisha' },
    isPack: true
  },
  {
    id: 'virtud_fortaleza',
    name: { es: 'Virtud Fortaleza (Bourbon)', en: 'Fortitude Profile (Bourbon)' },
    category: 'virtudes',
    categoryLabel: { es: 'Línea Virtudes (Café en Bolsa)', en: 'Virtues Coffee Bags' },
    price: 'S/ 30.00',
    priceNum: 30,
    flavorTag: 'intenso',
    flavorLabel: { es: 'Bourbon 1,750 msnm · Toffee & Cacao', en: 'Bourbon · Toffee & Cacao' },
    desc: {
      es: 'Variedad Bourbon a 1750 msnm en Perené. Proceso lavado, tueste medio.',
      en: 'Bourbon varietal at 1750 masl in Perené. Washed process, artisan medium roast.'
    },
    notes: {
      es: 'Vainilla bourbon, chocolate fino, toffee acaramelado y frutos secos. Acidez cítrica jugosa.',
      en: 'Bourbon vanilla, fine chocolate, caramelized toffee, and toasted nuts. Juicy citrus acidity.'
    },
    icon: 'fa-solid fa-shield-halved',
    img: 'images/products/blend_bolsa.png',
    badge: { es: '1,750 msnm', en: '1,750 masl' },
    isPack: true
  },
  {
    id: 'virtud_fe',
    name: { es: 'Virtud Fe (Catuai)', en: 'Faith Profile (Catuai)' },
    category: 'virtudes',
    categoryLabel: { es: 'Línea Virtudes (Café en Bolsa)', en: 'Virtues Coffee Bags' },
    price: 'S/ 30.00',
    priceNum: 30,
    flavorTag: 'frutal',
    flavorLabel: { es: 'Catuai 1,300 msnm · Lima & Canela', en: 'Catuai · Sweet Lime & Cinnamon' },
    desc: {
      es: 'Variedad Catuai a 1300 msnm en Perené, Chanchamayo. Proceso lavado, tueste medio.',
      en: 'Catuai varietal at 1300 masl in Perené. Washed process, medium roast.'
    },
    notes: {
      es: 'Frutal lima dulce, toffee acaramelado, canela aromática y fondo de vainilla. Cuerpo sedoso.',
      en: 'Sweet lime fruit, caramelized toffee, aromatic cinnamon, and vanilla finish. Silky body.'
    },
    icon: 'fa-solid fa-dove',
    img: 'images/products/twoproducto.png',
    badge: { es: 'Sedoso & Balanceado', en: 'Silky & Balanced' },
    isPack: true
  },
  {
    id: 'virtud_amor',
    name: { es: 'Virtud Amor (Catuai)', en: 'Love Profile (Catuai)' },
    category: 'virtudes',
    categoryLabel: { es: 'Línea Virtudes (Café en Bolsa)', en: 'Virtues Coffee Bags' },
    price: 'S/ 30.00',
    priceNum: 30,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Catuai Dulce · Base Chocolate', en: 'Sweet Catuai · Cacao Base' },
    desc: {
      es: 'Variedad Catuai a 1300 msnm. Proceso lavado, tueste medio de precisión.',
      en: 'Catuai varietal at 1300 masl. Washed process, precision medium roast.'
    },
    notes: {
      es: 'Frutal de lima dulce, base de chocolate fino, toffee y fondo de canela envolvente.',
      en: 'Sweet lime fruit, fine chocolate foundation, rich toffee, and enveloping cinnamon.'
    },
    icon: 'fa-solid fa-heart',
    img: 'images/products/singleproducto.png',
    badge: { es: 'Dulzura Envolvente', en: 'Enveloping Sweetness' },
    isPack: true
  },
  {
    id: 'virtud_paciencia',
    name: { es: 'Virtud Paciencia (Catimor)', en: 'Patience Profile (Catimor)' },
    category: 'virtudes',
    categoryLabel: { es: 'Línea Virtudes (Café en Bolsa)', en: 'Virtues Coffee Bags' },
    price: 'S/ 30.00',
    priceNum: 30,
    flavorTag: 'intenso',
    flavorLabel: { es: 'Catimor 1,600 msnm · Nuez & Panela', en: 'Catimor · Nutmeg & Panela' },
    desc: {
      es: 'Variedad Catimor a 1600 msnm en Perené. Proceso lavado, tueste medio-alto.',
      en: 'Catimor varietal at 1600 masl in Perené. Washed process, medium-dark roast.'
    },
    notes: {
      es: 'Herbal complejo, base de nuez moscada tostada y panela pura. Cuerpo oleoso y acidez baja.',
      en: 'Complex herbal notes, toasted nutmeg base, and pure panela. Oily body and low acidity.'
    },
    icon: 'fa-solid fa-hourglass-half',
    img: 'images/products/prod_22.png',
    badge: { es: 'Tueste Medio-Alto', en: 'Medium-Dark Roast' },
    isPack: true
  },
  {
    id: 'virtud_respeto',
    name: { es: 'Virtud Respeto (Caturra)', en: 'Respect Profile (Caturra)' },
    category: 'virtudes',
    categoryLabel: { es: 'Línea Virtudes (Café en Bolsa)', en: 'Virtues Coffee Bags' },
    price: 'S/ 30.00',
    priceNum: 30,
    flavorTag: 'frutal',
    flavorLabel: { es: 'Caturra 1,300 msnm · Tueste Canela', en: 'Caturra · Cinnamon Roast' },
    desc: {
      es: 'Variedad Caturra a 1300 msnm en Chanchamayo. Proceso lavado, tueste canela suave.',
      en: 'Caturra varietal at 1300 masl. Washed process, light cinnamon roast.'
    },
    notes: {
      es: 'Manzana verde crujiente, base de chocolate con leche y fondo de canela dulce. Cuerpo terso.',
      en: 'Crisp green apple, milk chocolate base, and sweet cinnamon finish. Smooth light body.'
    },
    icon: 'fa-solid fa-seedling',
    img: 'images/products/prod_21.png',
    badge: { es: 'Tueste Canela Suave', en: 'Light Cinnamon Roast' },
    isPack: true
  },
  {
    id: 'virtud_tolerancia',
    name: { es: 'Virtud Tolerancia (Blend)', en: 'Tolerance Profile (Blend)' },
    category: 'virtudes',
    categoryLabel: { es: 'Línea Virtudes (Café en Bolsa)', en: 'Virtues Coffee Bags' },
    price: 'S/ 30.00',
    priceNum: 30,
    flavorTag: 'floral',
    flavorLabel: { es: 'Blend de Altura 1,750 msnm', en: 'High Altitude Blend' },
    desc: {
      es: 'Blend equilibrado de variedades a 1750 msnm. Proceso lavado, tueste medio.',
      en: 'Balanced multi-varietal blend at 1750 masl. Washed process, medium roast.'
    },
    notes: {
      es: 'Flor de café, vainilla aromática, chocolate, toffee y frutos secos. Acidez cítrica balanceada.',
      en: 'Coffee flower, aromatic vanilla, chocolate, toffee, and dried fruits. Balanced citrus acidity.'
    },
    icon: 'fa-solid fa-scale-balanced',
    img: 'images/products/prod_23.png',
    badge: { es: 'Blend Armónico', en: 'Harmonious Blend' },
    isPack: true
  },
  {
    id: 'virtud_coldbrew_pack',
    name: { es: 'Pack Especial Cold Brew (Amor y Fortaleza)', en: 'Special Cold Brew Pack' },
    category: 'virtudes',
    categoryLabel: { es: 'Línea Virtudes (Café en Bolsa)', en: 'Virtues Coffee Bags' },
    price: 'S/ 30.00',
    priceNum: 30,
    flavorTag: 'frutal',
    flavorLabel: { es: 'Mezcla Especial para Extracción en Frío', en: 'Cold Extraction Blend' },
    desc: {
      es: 'Unión de 2 virtudes (Amor y Fortaleza) a 1750 msnm, calibrado con molienda especial para 18h frío.',
      en: 'Blend of 2 virtues (Love & Fortitude) at 1750 masl, calibrated grind for 18h cold steeping.'
    },
    notes: {
      es: 'Notas dulces a chocolate, frutos secos y miel silvestre. Rinde múltiples botellas de cold brew.',
      en: 'Sweet chocolate, toasted nuts and wildflower honey. Yields multiple cold brew bottles.'
    },
    icon: 'fa-solid fa-glass-water',
    img: 'images/products/60gr_blend.png',
    badge: { es: 'Ideal Cold Brew Casa', en: 'Ideal Home Cold Brew' },
    isPack: true
  }
];

export const QUIZ_MILK_OPTIONS: QuizOption[] = [
  {
    id: 'leche_entera',
    name: { es: 'Leche Entera Cremosa', en: 'Fresh Whole Milk' },
    price: 0,
    desc: { es: 'Receta clásica de la casa (Incluido)', en: 'Classic house recipe (Included)' },
    icon: 'fa-solid fa-cow'
  },
  {
    id: 'leche_deslactosada',
    name: { es: 'Leche Deslactosada', en: 'Lactose-Free Milk' },
    price: 3,
    desc: { es: 'Más ligera y fácil de digerir (+ S/ 3.00)', en: 'Lighter and easy on digestion (+ S/ 3.00)' },
    icon: 'fa-solid fa-droplet'
  },
  {
    id: 'leche_almendras',
    name: { es: 'Leche de Almendras', en: 'Almond Milk' },
    price: 5,
    desc: { es: '100% vegetal con notas sutiles a frutos secos (+ S/ 5.00)', en: '100% plant-based with nutty undertones (+ S/ 5.00)' },
    icon: 'fa-solid fa-seedling'
  }
];

export const QUIZ_GRIND_OPTIONS: QuizOption[] = [
  {
    id: 'grano',
    name: { es: 'En Grano Entero', en: 'Whole Bean' },
    price: 0,
    desc: { es: 'Conserva al máximo los aceites aromáticos para moler en casa', en: 'Locks in aromatic oils to grind fresh at home' },
    icon: 'fa-solid fa-seedling'
  },
  {
    id: 'molido_medio',
    name: { es: 'Molienda Media (V60 / Gota a Gota / Filtro)', en: 'Medium Grind (Pour Over / Drip)' },
    price: 0,
    desc: { es: 'Calibrada para extracción dulce y aromática', en: 'Calibrated for sweet aromatic extraction' },
    icon: 'fa-solid fa-filter'
  },
  {
    id: 'molido_grueso',
    name: { es: 'Molienda Gruesa (Prensa Francesa / Cold Brew)', en: 'Coarse Grind (French Press / Cold Brew)' },
    price: 0,
    desc: { es: 'Ideal para inmersión sin sedimentos finos', en: 'Ideal for full immersion without sediments' },
    icon: 'fa-solid fa-mug-hot'
  },
  {
    id: 'molido_fino',
    name: { es: 'Molienda Fina (Espresso / Moka Italiana)', en: 'Fine Grind (Espresso / Moka Pot)' },
    price: 0,
    desc: { es: 'Textura de azúcar impalpable para alta presión', en: 'Fine texture calibrated for stovetop or machine pressure' },
    icon: 'fa-solid fa-fire-burner'
  }
];

export const QUIZ_SPECIAL_OPTIONS: QuizOption[] = [
  {
    id: 'clasica',
    name: { es: 'Receta Clásica de Barista', en: 'Barista Classic Recipe' },
    price: 0,
    desc: { es: 'Proporciones exactas recomendadas por el barista (Incluido)', en: 'Exact recipe recommended by the barista (Included)' },
    icon: 'fa-solid fa-star'
  },
  {
    id: 'extra_shot',
    name: { es: 'Shot Extra de Espresso (+ S/ 8.00)', en: 'Extra Espresso Shot (+ S/ 8.00)' },
    price: 8,
    desc: { es: '+1 shot de espresso recién calibrado para mayor potencia', en: '+1 fresh espresso shot for maximum kick' },
    icon: 'fa-solid fa-bolt'
  },
  {
    id: 'sirope',
    name: { es: 'Shot de Sirope Artesanal (+ S/ 3.00)', en: 'Artisan Syrup Shot (+ S/ 3.00)' },
    price: 3,
    desc: { es: 'Toque dulce de vainilla, caramelo o avellana', en: 'Sweet touch of vanilla, caramel or hazelnut' },
    icon: 'fa-solid fa-cookie'
  }
];

export const QUIZ_FOOD_OPTIONS: QuizOption[] = [
  {
    id: 'none',
    name: { es: 'Solo mi café', en: 'Just my coffee' },
    price: 0,
    desc: { es: 'Disfrutar mi bebida o café sin adicionales', en: 'Enjoy my drink with no food pairing' },
    icon: 'fa-solid fa-circle-check'
  },
  {
    id: 'pan_sur',
    name: { es: 'Pan del Sur Artesanal (+ S/ 7.00)', en: 'Artisan Southern Bread (+ S/ 7.00)' },
    price: 7,
    desc: { es: 'Pan artesanal con aceituna, mixto o queso paria', en: 'Artisan bread with olives, ham & cheese or paria cheese' },
    icon: 'fa-solid fa-bread-slice'
  },
  {
    id: 'croissant_mixto',
    name: { es: 'Croissant Mixto Caliente (+ S/ 12.00)', en: 'Warm Ham & Cheese Croissant (+ S/ 12.00)' },
    price: 12,
    desc: { es: 'Hojaldre mantequilloso relleno de jamón y queso derretido', en: 'Buttery flaky pastry filled with melted ham and cheese' },
    icon: 'fa-solid fa-bacon'
  },
  {
    id: 'croissant_pollo',
    name: { es: 'Croissant de Pollo (+ S/ 15.00)', en: 'Chicken Pecan Croissant (+ S/ 15.00)' },
    price: 15,
    desc: { es: 'Relleno de pollo jugoso, apio fresco, mayonesa y pecanas', en: 'Shredded chicken, fresh celery, homemade mayo and pecans' },
    icon: 'fa-solid fa-drumstick-bite'
  },
  {
    id: 'croissant_atun',
    name: { es: 'Croissant de Atún (+ S/ 15.00)', en: 'Tuna & Egg Croissant (+ S/ 15.00)' },
    price: 15,
    desc: { es: 'Relleno de atún selecto, huevo duro y mayonesa', en: 'Tuna, hard-boiled egg and homemade mayo' },
    icon: 'fa-solid fa-fish'
  },
  {
    id: 'brownie',
    name: { es: 'Brownie Extra Chocolatoso (+ S/ 3.00)', en: 'Fudge Chocolate Brownie (+ S/ 3.00)' },
    price: 3,
    desc: { es: 'Brownie húmedo de puro chocolate bitter', en: 'Moist rich fudge brownie made with pure cacao' },
    icon: 'fa-solid fa-cookie-bite'
  },
  {
    id: 'croissant_dulce',
    name: { es: 'Croissant Dulce (+ S/ 12.00)', en: 'Sweet Filled Croissant (+ S/ 12.00)' },
    price: 12,
    desc: { es: 'Relleno de caramelo glaseado o chocolate con pecanas', en: 'Filled with dulce de leche caramel or chocolate & pecans' },
    icon: 'fa-solid fa-cake-candles'
  }
];
