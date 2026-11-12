export type CoffeeCategoryKey =
  | 'calientes'
  | 'desayunos_combos'
  | 'filtrados'
  | 'iced'
  | 'frappes'
  | 'cold_brew'
  | 'panaderia_postres'
  | 'bar_kfest'
  | 'virtudes';

export interface CoffeeMenuItem {
  id: string;
  name: { es: string; en: string };
  category: CoffeeCategoryKey;
  categoryLabel: { es: string; en: string };
  price: string;
  priceNum: number;
  flavorTag: string;
  flavorLabel: { es: string; en: string };
  desc: { es: string; en: string };
  notes: { es: string; en: string };
  icon: string;
  badge?: { es: string; en: string };
  isRecommended?: boolean;
  img?: string;
  allowsMilk?: boolean;
  isPack?: boolean;
  schedule?: string;
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

export interface CartaCategoryTab {
  id: string;
  name: { es: string; en: string };
  icon: string;
}

export const CARTA_CATEGORIES: CartaCategoryTab[] = [
  { id: 'todos', name: { es: 'Toda la Carta', en: 'Full Menu' }, icon: 'fa-solid fa-utensils' },
  { id: 'calientes', name: { es: 'Bebidas Calientes', en: 'Warm Drinks' }, icon: 'fa-solid fa-mug-hot' },
  { id: 'desayunos_combos', name: { es: 'Desayunos & Combos', en: 'Breakfast & Combos' }, icon: 'fa-solid fa-sun' },
  { id: 'filtrados', name: { es: 'Filtrados', en: 'Pour Over' }, icon: 'fa-solid fa-filter' },
  { id: 'iced', name: { es: 'Cafés Helados', en: 'Iced Coffee' }, icon: 'fa-solid fa-snowflake' },
  { id: 'frappes', name: { es: 'Frappés & Shakes', en: 'Frappes & Shakes' }, icon: 'fa-solid fa-blender' },
  { id: 'cold_brew', name: { es: 'Cold Brew', en: 'Cold Brew' }, icon: 'fa-solid fa-glass-water' },
  { id: 'panaderia_postres', name: { es: 'Panadería & Postres', en: 'Bakery & Sweets' }, icon: 'fa-solid fa-bread-slice' },
  { id: 'bar_kfest', name: { es: 'Bar Kfest', en: 'Coffee Bar' }, icon: 'fa-solid fa-martini-glass-citrus' },
  { id: 'virtudes', name: { es: 'Línea Virtudes', en: 'Virtues Line' }, icon: 'fa-solid fa-seedling' }
];

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
    name: { es: 'Frappés & Shakes', en: 'Frappes & Shakes' },
    desc: {
      es: 'Hielo granizado con chantilly: Oreo, Chocolate, Caramelo, Algarrobina, Fresa, Shakes y Chin Chin.',
      en: 'Blended ice & whipped cream: Oreo, Chocolate, Caramel, Algarrobina, Strawberry, Shakes or Chin Chin.'
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
    id: 'desayunos_combos',
    name: { es: 'Desayunos & Combos', en: 'Breakfast & Combos' },
    desc: {
      es: 'Parisino, Fish, Amanecer y combos con Pan del Sur, Croissants rellenos y Brownie.',
      en: 'Parisian, Fish, Sunrise breakfasts and combos with Southern bread, stuffed croissants and brownies.'
    },
    icon: 'fa-solid fa-sun',
    tag: { es: 'Desde S/ 13.00', en: 'From S/ 13.00' }
  },
  {
    id: 'panaderia_postres',
    name: { es: 'Panadería & Postres', en: 'Bakery & Sweets' },
    desc: {
      es: 'Pan del Sur artesanal, Croissants de pollo, atún o jamón y queso, Brownies y Affogatos.',
      en: 'Artisan Southern bread, chicken, tuna or ham & cheese croissants, brownies, and affogatos.'
    },
    icon: 'fa-solid fa-bread-slice',
    tag: { es: 'Desde S/ 3.00', en: 'From S/ 3.00' }
  },
  {
    id: 'bar_kfest',
    name: { es: 'Bar Kfest (Coctelería)', en: 'Kfest Coffee Bar' },
    desc: {
      es: 'Coffee Sour con pisco peruano, Baileys Affogato, Menta Coffee y Wine Coffee de autor.',
      en: 'Coffee Sour with Peruvian pisco, Baileys Affogato, Mint Coffee and Wine Coffee creations.'
    },
    icon: 'fa-solid fa-martini-glass-citrus',
    tag: { es: 'S/ 17.00 c/u', en: 'S/ 17.00 each' }
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
  desayunos_combos: [
    { id: 'todos', label: { es: 'Todos', en: 'All' } },
    { id: 'desayuno', label: { es: 'Desayunos (8-11 AM)', en: 'Breakfasts (8-11 AM)' } },
    { id: 'combo', label: { es: 'Combos Todo el Día', en: 'All-Day Combos' } }
  ],
  filtrados: [
    { id: 'todos', label: { es: 'Todos', en: 'All' } },
    { id: 'tradicional', label: { es: 'Tradición Selva (Mupeco)', en: 'Rainforest Heritage' } },
    { id: 'floral', label: { es: 'Taza Limpia (V60 / Chemex)', en: 'Clean & Floral' } },
    { id: 'intenso', label: { es: 'Inmersión (Prensa)', en: 'Full Immersion' } },
    { id: 'especial', label: { es: 'Ritual 3 Cafés', en: '3-Cup Ritual' } }
  ],
  iced: [
    { id: 'todos', label: { es: 'Todos', en: 'All' } },
    { id: 'intenso', label: { es: 'Negro & Helado', en: 'Black & Iced' } },
    { id: 'cremoso', label: { es: 'Cremoso con Leche', en: 'Milky Cold' } },
    { id: 'dulce', label: { es: 'Dulce con Siropes', en: 'Flavored Sweets' } }
  ],
  frappes: [
    { id: 'todos', label: { es: 'Todos', en: 'All' } },
    { id: 'dulce', label: { es: 'Oreo & Goloso', en: 'Oreo & Sweets' } },
    { id: 'cremoso', label: { es: 'Cafetero', en: 'Coffee Rich' } },
    { id: 'frutal', label: { es: 'Shakes & Frutales', en: 'Shakes & Fruity' } }
  ],
  cold_brew: [
    { id: 'todos', label: { es: 'Todos', en: 'All' } },
    { id: 'intenso', label: { es: 'Puro Clásico', en: 'Classic Pure' } },
    { id: 'frutal', label: { es: 'Cítrico & Tropical', en: 'Citrus & Tropical' } },
    { id: 'envasada', label: { es: 'Botella para Llevar', en: 'To-Go Bottle' } }
  ],
  panaderia_postres: [
    { id: 'todos', label: { es: 'Todos', en: 'All' } },
    { id: 'salado', label: { es: 'Panadería Salada', en: 'Savory Bakery' } },
    { id: 'dulce', label: { es: 'Postres & Dulces', en: 'Desserts & Sweets' } }
  ],
  bar_kfest: [
    { id: 'todos', label: { es: 'Todos', en: 'All' } },
    { id: 'especial', label: { es: 'Con Pisco o Vino', en: 'Pisco or Wine' } },
    { id: 'dulce', label: { es: 'Con Baileys & Helado', en: 'Baileys & Gelato' } },
    { id: 'frutal', label: { es: 'Menta & Refrescante', en: 'Mint & Refreshing' } }
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
  // ==================== 1. BEBIDAS CALIENTES (Pág. 2) ====================
  {
    id: 'espresso',
    name: { es: 'Espresso', en: 'Espresso' },
    category: 'calientes',
    categoryLabel: { es: 'Bebidas Calientes', en: 'Warm Drinks' },
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
    icon: 'fa-solid fa-mug-hot'
  },
  {
    id: 'espresso_doble',
    name: { es: 'Espresso Doble', en: 'Double Espresso' },
    category: 'calientes',
    categoryLabel: { es: 'Bebidas Calientes', en: 'Warm Drinks' },
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
    icon: 'fa-solid fa-bolt'
  },
  {
    id: 'americano',
    name: { es: 'Americano', en: 'Americano' },
    category: 'calientes',
    categoryLabel: { es: 'Bebidas Calientes', en: 'Warm Drinks' },
    price: 'S/ 8.00',
    priceNum: 8,
    flavorTag: 'intenso',
    flavorLabel: { es: 'Equilibrado & Limpio', en: 'Balanced & Clean' },
    desc: {
      es: 'Espresso con agua caliente pura a temperatura precisa.',
      en: 'Specialty espresso combined with pure hot water at precise brewing temperature.'
    },
    notes: {
      es: 'Taza limpia, notas a caramelo suave, frutos secos y acidez sutil agradable.',
      en: 'Clean cup, mild caramel notes, dried fruits, and pleasant subtle acidity.'
    },
    icon: 'fa-solid fa-mug-saucer',
    isRecommended: true,
    badge: { es: '⭐ Favorito', en: '⭐ Favorite' }
  },
  {
    id: 'capuchino',
    name: { es: 'Capuchino', en: 'Cappuccino' },
    category: 'calientes',
    categoryLabel: { es: 'Bebidas Calientes', en: 'Warm Drinks' },
    price: 'S/ 12.00',
    priceNum: 12,
    flavorTag: 'cremoso',
    flavorLabel: { es: 'Cremoso con Leche', en: 'Creamy with Milk' },
    desc: {
      es: 'Espresso doble y leche entera vaporizada con microespuma sedosa.',
      en: 'Double espresso and steamed whole milk with dense, silky microfoam.'
    },
    notes: {
      es: 'Dulzor natural de la leche cremosa, notas a panela de altura y textura aterciopelada.',
      en: 'Natural milk sweetness, highland panela hints, and velvety smooth texture.'
    },
    icon: 'fa-solid fa-mug-hot',
    isRecommended: true,
    badge: { es: '⭐ El Más Pedido', en: '⭐ Best Seller' },
    allowsMilk: true
  },
  {
    id: 'cafe_latte',
    name: { es: 'Café Latte', en: 'Caffè Latte' },
    category: 'calientes',
    categoryLabel: { es: 'Bebidas Calientes', en: 'Warm Drinks' },
    price: 'S/ 12.00',
    priceNum: 12,
    flavorTag: 'cremoso',
    flavorLabel: { es: 'Suave & Lácteo', en: 'Smooth & Milky' },
    desc: {
      es: 'Espresso y leche entera vaporizada con delicada corona de espuma.',
      en: 'Specialty espresso with generous steamed milk and a delicate velvety cap.'
    },
    notes: {
      es: 'Muy suave en paladar, dulce lácteo envolvente, toques a toffee y fácil de beber.',
      en: 'Gentle on the palate, creamy toffee undertones, extremely smooth.'
    },
    icon: 'fa-solid fa-mug-saucer',
    allowsMilk: true
  },
  {
    id: 'mokaccino',
    name: { es: 'Mokaccino', en: 'Mochaccino' },
    category: 'calientes',
    categoryLabel: { es: 'Bebidas Calientes', en: 'Warm Drinks' },
    price: 'S/ 15.00',
    priceNum: 15,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Dulce & Chocolatoso', en: 'Sweet & Chocolate' },
    desc: {
      es: 'Espresso, leche entera y chocolate fino de origen Chanchamayo.',
      en: 'Espresso, steamed whole milk, and fine Chanchamayo origin dark chocolate.'
    },
    notes: {
      es: 'Fusión de cacao al 70%, crema láctea y la vivacidad del café de altura.',
      en: '70% rich cacao blend, velvety milk cream, and high-altitude espresso vigor.'
    },
    icon: 'fa-solid fa-cookie-bite',
    allowsMilk: true
  },
  {
    id: 'cafe_bombon',
    name: { es: 'Café Bombón', en: 'Café Bombón' },
    category: 'calientes',
    categoryLabel: { es: 'Bebidas Calientes', en: 'Warm Drinks' },
    price: 'S/ 15.00',
    priceNum: 15,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Dulce & Meloso', en: 'Sweet & Indulgent' },
    desc: {
      es: 'Espresso, leche entera y leche condensada artesanal.',
      en: 'Intense espresso layered over a luscious base of condensed milk and warm milk.'
    },
    notes: {
      es: 'Dulzor acaramelado profundo, contraste visual en capas y cuerpo voluptuoso.',
      en: 'Deep caramelized sweetness, layered visual delight, and indulgent full body.'
    },
    icon: 'fa-solid fa-jar-wheat',
    allowsMilk: true
  },
  {
    id: 'babyccino',
    name: { es: 'Babyccino', en: 'Babyccino' },
    category: 'calientes',
    categoryLabel: { es: 'Bebidas Calientes', en: 'Warm Drinks' },
    price: 'S/ 8.00',
    priceNum: 8,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Sin Cafeína · Algarrobina', en: 'Caffeine-Free' },
    desc: {
      es: 'Algarrobina peruana, leche entera y marshmello.',
      en: 'Natural Peruvian algarrobina, frothy warm milk, and floating marshmallows.'
    },
    notes: {
      es: '0% cafeína, dulce aroma a algarrobina norteña, reconfortante y suave.',
      en: '0% caffeine, golden algarrobina aroma, gentle and comforting.'
    },
    icon: 'fa-solid fa-heart',
    allowsMilk: true
  },

  // ==================== 2. DESAYUNOS & COMBOS (Pág. 2) ====================
  {
    id: 'desayuno_parisino',
    name: { es: 'Desayuno Parisino', en: 'Parisian Breakfast' },
    category: 'desayunos_combos',
    categoryLabel: { es: 'Desayunos & Combos', en: 'Breakfast & Combos' },
    price: 'S/ 22.00',
    priceNum: 22,
    flavorTag: 'desayuno',
    flavorLabel: { es: 'Desayuno Clásico (8-11 AM)', en: 'Classic Breakfast (8-11 AM)' },
    desc: {
      es: 'Café americano caliente, Pan del Sur artesanal y vaso de jugo de naranja natural.',
      en: 'Hot Americano coffee, artisan Southern bread and fresh orange juice.'
    },
    notes: {
      es: 'Disponible de 8:00 AM a 11:00 AM. La combinación perfecta para iniciar la jornada.',
      en: 'Available 8:00 AM to 11:00 AM. The ideal energetic start to your day.'
    },
    icon: 'fa-solid fa-sun',
    schedule: '8:00 AM - 11:00 AM'
  },
  {
    id: 'desayuno_fish',
    name: { es: 'Desayuno Fish', en: 'Fish Breakfast' },
    category: 'desayunos_combos',
    categoryLabel: { es: 'Desayunos & Combos', en: 'Breakfast & Combos' },
    price: 'S/ 28.00',
    priceNum: 28,
    flavorTag: 'desayuno',
    flavorLabel: { es: 'Desayuno Marino Proteico', en: 'Protein Breakfast (8-11 AM)' },
    desc: {
      es: 'Café americano, croissant relleno con atún selecto y vaso de jugo de naranja.',
      en: 'Americano coffee, flaky croissant stuffed with tuna filling, and fresh orange juice.'
    },
    notes: {
      es: 'Disponible de 8:00 AM a 11:00 AM. Nutritivo, fresco y completo.',
      en: 'Available 8:00 AM to 11:00 AM. Nutritious, fresh, and satisfying.'
    },
    icon: 'fa-solid fa-fish',
    schedule: '8:00 AM - 11:00 AM'
  },
  {
    id: 'desayuno_amanecer',
    name: { es: 'Desayuno Amanecer', en: 'Sunrise Breakfast' },
    category: 'desayunos_combos',
    categoryLabel: { es: 'Desayunos & Combos', en: 'Breakfast & Combos' },
    price: 'S/ 20.00',
    priceNum: 20,
    flavorTag: 'desayuno',
    flavorLabel: { es: 'Desayuno Croissant Mixto', en: 'Croissant Breakfast (8-11 AM)' },
    desc: {
      es: 'Café americano, croissant mixto (jamón y queso caliente) y jugo de naranja.',
      en: 'Americano coffee, warm ham and cheese croissant, and fresh orange juice.'
    },
    notes: {
      es: 'Disponible de 8:00 AM a 11:00 AM. Queso derretido y hojaldre crujiente.',
      en: 'Available 8:00 AM to 11:00 AM. Melty cheese and crispy golden pastry.'
    },
    icon: 'fa-solid fa-cloud-sun',
    schedule: '8:00 AM - 11:00 AM'
  },
  {
    id: 'combo_pan_sur',
    name: { es: 'Combo Americano + Pan del Sur', en: 'Americano + Southern Bread Combo' },
    category: 'desayunos_combos',
    categoryLabel: { es: 'Desayunos & Combos', en: 'Breakfast & Combos' },
    price: 'S/ 15.00',
    priceNum: 15,
    flavorTag: 'combo',
    flavorLabel: { es: 'Combo Todo el Día', en: 'All-Day Combo' },
    desc: {
      es: 'Americano + Pan artesanal con relleno mixto, aceituna o queso paria.',
      en: 'Americano coffee + artisan bread filled with mixed ham/cheese, olives or paria cheese.'
    },
    notes: {
      es: '¡Cambia el americano por capuchino por solo +S/ 2.00!',
      en: 'Upgrade Americano to Cappuccino for just +S/ 2.00!'
    },
    icon: 'fa-solid fa-bread-slice'
  },
  {
    id: 'combo_croissant_mixto',
    name: { es: 'Combo Americano + Croissant Mixto', en: 'Americano + Ham & Cheese Croissant' },
    category: 'desayunos_combos',
    categoryLabel: { es: 'Desayunos & Combos', en: 'Breakfast & Combos' },
    price: 'S/ 15.00',
    priceNum: 15,
    flavorTag: 'combo',
    flavorLabel: { es: 'Combo Todo el Día', en: 'All-Day Combo' },
    desc: {
      es: 'Americano + Croissant mixto (jamón inglés y queso fundido).',
      en: 'Americano coffee + warm flaky croissant filled with ham and melted cheese.'
    },
    notes: {
      es: '¡Cambia el americano por capuchino por solo +S/ 2.00!',
      en: 'Upgrade Americano to Cappuccino for just +S/ 2.00!'
    },
    icon: 'fa-solid fa-bacon'
  },
  {
    id: 'combo_brownie',
    name: { es: 'Combo Americano + Brownie', en: 'Americano + Brownie Combo' },
    category: 'desayunos_combos',
    categoryLabel: { es: 'Desayunos & Combos', en: 'Breakfast & Combos' },
    price: 'S/ 13.00',
    priceNum: 13,
    flavorTag: 'combo',
    flavorLabel: { es: 'Combo Dulce', en: 'Sweet Combo' },
    desc: {
      es: 'Americano caliente + Brownie húmedo extra chocolatoso.',
      en: 'Hot Americano coffee + rich fudge chocolate brownie.'
    },
    notes: {
      es: '¡Cambia el americano por capuchino por solo +S/ 2.00!',
      en: 'Upgrade Americano to Cappuccino for just +S/ 2.00!'
    },
    icon: 'fa-solid fa-cookie-bite'
  },
  {
    id: 'combo_croissant_pollo',
    name: { es: 'Combo Americano + Croissant Pollo', en: 'Americano + Chicken Croissant' },
    category: 'desayunos_combos',
    categoryLabel: { es: 'Desayunos & Combos', en: 'Breakfast & Combos' },
    price: 'S/ 20.00',
    priceNum: 20,
    flavorTag: 'combo',
    flavorLabel: { es: 'Combo Contundente', en: 'Hearty Combo' },
    desc: {
      es: 'Americano + Croissant relleno de pollo con apio, mayonesa casera y pecanas.',
      en: 'Americano + croissant stuffed with shredded chicken, celery, mayo and pecans.'
    },
    notes: {
      es: '¡Cambia el americano por capuchino por solo +S/ 2.00!',
      en: 'Upgrade Americano to Cappuccino for just +S/ 2.00!'
    },
    icon: 'fa-solid fa-drumstick-bite'
  },

  // ==================== 3. FILTRADOS (Pág. 2) ====================
  {
    id: 'mupeco',
    name: { es: 'Mupeco', en: 'Mupeco' },
    category: 'filtrados',
    categoryLabel: { es: 'Filtrados de Especialidad', en: 'Specialty Pour Over' },
    price: 'S/ 10.00',
    priceNum: 10,
    flavorTag: 'tradicional',
    flavorLabel: { es: 'Cafetera Peruana de Selva', en: 'Peruvian Rainforest Brewer' },
    desc: {
      es: 'Cafetera peruana y café de especialidad a elección.',
      en: 'Traditional Peruvian brewer with your choice of specialty coffee.'
    },
    notes: {
      es: 'Extracción patrimonial de Chanchamayo. Taza aromática, cuerpo medio y dulzor pronunciado.',
      en: 'Chanchamayo heritage extraction. Aromatic cup, medium body and sweet finish.'
    },
    icon: 'fa-solid fa-mug-saucer',
    isRecommended: true,
    badge: { es: '⭐ Tradición Peruana', en: '⭐ Peruvian Heritage' }
  },
  {
    id: 'v60',
    name: { es: 'V60', en: 'V60 Pour Over' },
    category: 'filtrados',
    categoryLabel: { es: 'Filtrados de Especialidad', en: 'Specialty Pour Over' },
    price: 'S/ 10.00',
    priceNum: 10,
    flavorTag: 'floral',
    flavorLabel: { es: 'Cafetera Japonesa Cónica', en: 'Japanese Conical Brewer' },
    desc: {
      es: 'Cafetera japonesa y café de especialidad a elección.',
      en: 'Japanese conical brewer with your choice of single origin coffee.'
    },
    notes: {
      es: 'Taza sedosa, cristalina, acidez brillante y notas florales y frutales muy definidas.',
      en: 'Silky, crystal clean cup with bright acidity and distinct floral notes.'
    },
    icon: 'fa-solid fa-filter'
  },
  {
    id: 'chemex',
    name: { es: 'Chemex', en: 'Chemex' },
    category: 'filtrados',
    categoryLabel: { es: 'Filtrados de Especialidad', en: 'Specialty Pour Over' },
    price: 'S/ 10.00',
    priceNum: 10,
    flavorTag: 'floral',
    flavorLabel: { es: 'Cafetera Inglesa de Vidrio', en: 'Classic Glass Brewer' },
    desc: {
      es: 'Cafetera de vidrio con filtro grueso y café de especialidad a elección.',
      en: 'Classic glass brewer with thick paper filter and choice of specialty coffee.'
    },
    notes: {
      es: 'Brillo supremo, cuerpo liviano y limpio, cero sedimentos y dulzura transparente.',
      en: 'Supreme clarity, clean light body, zero sediments, and crystalline sweetness.'
    },
    icon: 'fa-solid fa-flask'
  },
  {
    id: 'prensa_francesa',
    name: { es: 'Prensa Francesa', en: 'French Press' },
    category: 'filtrados',
    categoryLabel: { es: 'Filtrados de Especialidad', en: 'Specialty Pour Over' },
    price: 'S/ 9.00',
    priceNum: 9,
    flavorTag: 'intenso',
    flavorLabel: { es: 'Inmersión Total', en: 'Full Immersion' },
    desc: {
      es: 'Cafetera francesa de inmersión y café de especialidad a elección.',
      en: 'French immersion press with choice of specialty roast.'
    },
    notes: {
      es: 'Cuerpo denso y aceitoso, notas chocolatadas profundas y sensación envolvente.',
      en: 'Dense, rich oily body, deep chocolate undertones, and comforting texture.'
    },
    icon: 'fa-solid fa-mug-hot'
  },
  {
    id: 'ritual_virtudes',
    name: { es: 'Ritual Virtudes', en: 'Virtues Ritual' },
    category: 'filtrados',
    categoryLabel: { es: 'Filtrados de Especialidad', en: 'Specialty Pour Over' },
    price: 'S/ 22.00',
    priceNum: 22,
    flavorTag: 'especial',
    flavorLabel: { es: 'Cata de 3 Filtrados', en: '3-Filter Tasting Experience' },
    desc: {
      es: 'Experiencia de 3 filtrados en mupeco, con 3 diferentes cafés de especialidad a elección.',
      en: 'Experience of 3 pour-over extractions in mupeco with 3 different specialty coffees.'
    },
    notes: {
      es: 'Viaje sensorial comparativo por diferentes altitudes, variedades y perfiles del Fundo.',
      en: 'Comparative sensory journey across altitudes, varieties, and estate flavor profiles.'
    },
    icon: 'fa-solid fa-award',
    isRecommended: true,
    badge: { es: '⭐ Experiencia Top', en: '⭐ Top Experience' }
  },

  // ==================== 4. ICED (Cafés Helados - Pág. 3) ====================
  {
    id: 'iced_coffee',
    name: { es: 'Iced Coffee', en: 'Iced Coffee' },
    category: 'iced',
    categoryLabel: { es: 'Cafés Helados (Iced)', en: 'Iced Coffee' },
    price: 'S/ 12.00',
    priceNum: 12,
    flavorTag: 'intenso',
    flavorLabel: { es: 'Espresso Frío Puro', en: 'Pure Cold Espresso' },
    desc: {
      es: 'Espresso y cubos de hielo.',
      en: 'Double espresso pulled fresh over ice cubes.'
    },
    notes: {
      es: 'Refrescante, directo, notas tostadas limpias y final seco vigorizante.',
      en: 'Crisp, bold, clean roasted notes and invigorating dry finish.'
    },
    icon: 'fa-solid fa-snowflake'
  },
  {
    id: 'iced_capuchino',
    name: { es: 'Capuchino Helado', en: 'Iced Cappuccino' },
    category: 'iced',
    categoryLabel: { es: 'Cafés Helados (Iced)', en: 'Iced Coffee' },
    price: 'S/ 14.00',
    priceNum: 14,
    flavorTag: 'cremoso',
    flavorLabel: { es: 'Cremoso con Jarabe', en: 'Creamy with Simple Syrup' },
    desc: {
      es: 'Espresso, leche entera, jarabe de goma y cubos de hielo.',
      en: 'Espresso, whole milk, simple syrup, and ice cubes.'
    },
    notes: {
      es: 'Textura cremosa y fría con el dulzor exacto para mitigar el calor.',
      en: 'Creamy chilled texture with balanced sweetness to beat the heat.'
    },
    icon: 'fa-solid fa-glass-water',
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
    flavorLabel: { es: 'Vainilla Francesa', en: 'French Vanilla' },
    desc: {
      es: 'Espresso, leche entera, jarabe de vainilla y cubos de hielo.',
      en: 'Espresso, whole milk, fragrant vanilla syrup, and ice cubes.'
    },
    notes: {
      es: 'Aroma delicado a vainilla, suavidad láctea y balance fresco.',
      en: 'Delicate vanilla fragrance, milky softness, and fresh balance.'
    },
    icon: 'fa-solid fa-wand-magic-sparkles',
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
      es: 'Espresso, leche entera, caramelo y cubos de hielo.',
      en: 'Espresso, whole milk, rich caramel drizzle, and ice cubes.'
    },
    notes: {
      es: 'Vetas de caramelo dulce, toffee tostado y balance perfecto con el café.',
      en: 'Sweet caramel ribbons, roasted toffee, and flawless coffee harmony.'
    },
    icon: 'fa-solid fa-jar-wheat',
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
      es: 'Espresso, leche entera, crema de cacao y cubos de hielo.',
      en: 'Espresso, whole milk, rich cacao cream, and ice cubes.'
    },
    notes: {
      es: 'El encuentro entre cacao denso y café helado sobre rocas.',
      en: 'Delicious harmony of rich cacao cream and chilled espresso.'
    },
    icon: 'fa-solid fa-ice-cream',
    isRecommended: true,
    badge: { es: '⭐ Recomendado', en: '⭐ Recommended' },
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
      es: 'Espresso, leche entera, jarabe de avellana y cubos de hielo.',
      en: 'Espresso, whole milk, roasted hazelnut syrup, and ice cubes.'
    },
    notes: {
      es: 'Notas tostadas a praliné, aroma a bosque y cuerpo aterciopelado.',
      en: 'Roasted praline notes, nutty fragrance, and velvety chilled body.'
    },
    icon: 'fa-solid fa-cubes-stacked',
    allowsMilk: true
  },

  // ==================== 5. SHAKE & FRAPPES (Pág. 3) ====================
  {
    id: 'shake_fresa',
    name: { es: 'Shake de Fresa', en: 'Strawberry Shake' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Shakes', en: 'Frappes & Shakes' },
    price: 'S/ 16.00',
    priceNum: 16,
    flavorTag: 'frutal',
    flavorLabel: { es: 'Batido con Helado', en: 'Ice Cream Shake' },
    desc: {
      es: 'Leche, helado artesanal y fresas naturales.',
      en: 'Fresh milk, artisan gelato, and natural ripe strawberries.'
    },
    notes: {
      es: 'Batido cremoso y refrescante con fruta real.',
      en: 'Creamy and refreshing shake made with real fruit.'
    },
    icon: 'fa-solid fa-blender'
  },
  {
    id: 'shake_maracuya',
    name: { es: 'Shake de Maracuyá', en: 'Passionfruit Shake' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Shakes', en: 'Frappes & Shakes' },
    price: 'S/ 16.00',
    priceNum: 16,
    flavorTag: 'frutal',
    flavorLabel: { es: 'Cítrico & Cremoso', en: 'Citrus & Creamy' },
    desc: {
      es: 'Leche, helado artesanal y maracuyá de Chanchamayo.',
      en: 'Fresh milk, artisan gelato, and Chanchamayo passionfruit.'
    },
    notes: {
      es: 'Acidez tropical equilibrada con la cremosidad del helado.',
      en: 'Tropical passionfruit tartness balanced with velvety gelato.'
    },
    icon: 'fa-solid fa-blender'
  },
  {
    id: 'shake_lucuma',
    name: { es: 'Shake de Lúcuma', en: 'Lucuma Shake' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Shakes', en: 'Frappes & Shakes' },
    price: 'S/ 16.00',
    priceNum: 16,
    flavorTag: 'frutal',
    flavorLabel: { es: 'Oro de los Incas', en: 'Peruvian Lucuma' },
    desc: {
      es: 'Leche, helado artesanal y lúcuma de seda.',
      en: 'Fresh milk, artisan gelato, and Peruvian lucuma fruit.'
    },
    notes: {
      es: 'Sabor acaramelado tradicional peruano, denso y sedoso.',
      en: 'Traditional butterscotch Peruvian flavor, rich and smooth.'
    },
    icon: 'fa-solid fa-blender'
  },
  {
    id: 'frappe_chocolate',
    name: { es: 'Frappé de Chocolate', en: 'Chocolate Frappe' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Shakes', en: 'Frappes & Shakes' },
    price: 'S/ 15.00',
    priceNum: 15,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Hielo Granizado & Cacao', en: 'Blended Cacao' },
    desc: {
      es: 'Espresso, hielo granizado, chocolate, leche y chantilly.',
      en: 'Espresso, blended ice, chocolate, milk and whipped cream.'
    },
    notes: {
      es: 'Corona abundante de crema chantilly sobre batido de cacao y café.',
      en: 'Generous whipped cream crown over cold chocolate espresso shake.'
    },
    icon: 'fa-solid fa-ice-cream'
  },
  {
    id: 'frappe_caramelo',
    name: { es: 'Frappé de Caramelo', en: 'Caramel Frappe' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Shakes', en: 'Frappes & Shakes' },
    price: 'S/ 15.00',
    priceNum: 15,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Caramelo & Chantilly', en: 'Caramel & Cream' },
    desc: {
      es: 'Espresso, hielo granizado, caramelo, leche y chantilly.',
      en: 'Espresso, blended ice, caramel, milk and whipped cream.'
    },
    notes: {
      es: 'Hilos dorados de caramelo y textura suave de frappé.',
      en: 'Golden caramel drizzle with smooth icy coffee texture.'
    },
    icon: 'fa-solid fa-ice-cream',
    isRecommended: true,
    badge: { es: '⭐ Recomendado', en: '⭐ Recommended' }
  },
  {
    id: 'frappe_algarrobina',
    name: { es: 'Frappé de Algarrobina', en: 'Algarrobina Frappe' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Shakes', en: 'Frappes & Shakes' },
    price: 'S/ 15.00',
    priceNum: 15,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Algarrobina Peruana', en: 'Peruvian Algarrobina' },
    desc: {
      es: 'Espresso, hielo granizado, algarrobina, leche y chantilly.',
      en: 'Espresso, blended ice, algarrobina, milk and whipped cream.'
    },
    notes: {
      es: 'Dulzura rústica y nutritiva de algarrobina con café de altura.',
      en: 'Rustic, nutritious algarrobina sweetness paired with highland coffee.'
    },
    icon: 'fa-solid fa-ice-cream'
  },
  {
    id: 'frappe_capuchino',
    name: { es: 'Frappé Capuchino', en: 'Cappuccino Frappe' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Shakes', en: 'Frappes & Shakes' },
    price: 'S/ 16.00',
    priceNum: 16,
    flavorTag: 'cremoso',
    flavorLabel: { es: 'Espresso Doble Frappé', en: 'Double Espresso Frappe' },
    desc: {
      es: 'Espresso doble, hielo granizado, leche y chantilly.',
      en: 'Double espresso, blended ice, milk and whipped cream.'
    },
    notes: {
      es: 'Mayor potencia de café en formato helado y frappé.',
      en: 'Higher coffee kick in a frozen whipped format.'
    },
    icon: 'fa-solid fa-ice-cream'
  },
  {
    id: 'frappe_oreo',
    name: { es: 'Frappé de Oreo', en: 'Oreo Frappe' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Shakes', en: 'Frappes & Shakes' },
    price: 'S/ 16.00',
    priceNum: 16,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Galleta Oreo & Chantilly', en: 'Oreo Cookie & Cream' },
    desc: {
      es: 'Espresso, hielo granizado, galletas oreo, leche y chantilly.',
      en: 'Espresso, blended ice, oreo cookies, milk and whipped cream.'
    },
    notes: {
      es: 'Trozos crujientes de galleta negra con café y crema.',
      en: 'Crunchy crushed chocolate cookies blended with espresso.'
    },
    icon: 'fa-solid fa-cookie',
    isRecommended: true,
    badge: { es: '⭐ El Más Popular', en: '⭐ Most Popular' }
  },
  {
    id: 'frappe_fresa',
    name: { es: 'Frappé de Fresa', en: 'Strawberry Frappe' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Shakes', en: 'Frappes & Shakes' },
    price: 'S/ 16.00',
    priceNum: 16,
    flavorTag: 'frutal',
    flavorLabel: { es: 'Fresa & Chantilly', en: 'Strawberry & Cream' },
    desc: {
      es: 'Espresso, hielo granizado, fresa, leche y chantilly.',
      en: 'Espresso, blended ice, fresh strawberries, milk and whipped cream.'
    },
    notes: {
      es: 'Contraste frutal de fresa dulce con espresso de especialidad.',
      en: 'Fruity strawberry contrast with rich specialty espresso.'
    },
    icon: 'fa-solid fa-ice-cream'
  },
  {
    id: 'frappe_chinchin',
    name: { es: 'Frappé Chin Chin', en: 'Chin Chin Frappe' },
    category: 'frappes',
    categoryLabel: { es: 'Frappés & Shakes', en: 'Frappes & Shakes' },
    price: 'S/ 16.00',
    priceNum: 16,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Chin Chin Crujiente', en: 'Chin Chin Crunch' },
    desc: {
      es: 'Espresso, hielo granizado, chin chin, leche y chantilly.',
      en: 'Espresso, blended ice, chin chin chocolate pearls, milk and whipped cream.'
    },
    notes: {
      es: 'Perlas crocantes de chocolate con chantilly y café.',
      en: 'Crispy chocolate pearls over rich espresso frappe.'
    },
    icon: 'fa-solid fa-candy-cane'
  },

  // ==================== 6. COLD BREW (Pág. 3) ====================
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
      es: 'Vaso de cold brew y cubos de hielo.',
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
      es: 'Cold brew, zumo de naranja, jarabe de goma y cubos de hielo.',
      en: 'Cold brew, fresh squeezed orange juice, simple cane syrup, and ice cubes.'
    },
    notes: {
      es: 'Vibrante combinación cítrica de naranja fresca con los taninos dulces del cold brew.',
      en: 'Vibrant citrus punch of fresh orange combined with smooth cold brew.'
    },
    icon: 'fa-solid fa-lemon',
    isRecommended: true,
    badge: { es: '⭐ Estrella Refrescante', en: '⭐ Refreshing Star' }
  },
  {
    id: 'cold_brew_maracuya',
    name: { es: 'Cold Brew Maracuyá', en: 'Passionfruit Cold Brew' },
    category: 'cold_brew',
    categoryLabel: { es: 'Cold Brew de Autor', en: 'Signature Cold Brew' },
    price: 'S/ 14.00',
    priceNum: 14,
    flavorTag: 'frutal',
    flavorLabel: { es: 'Fruta de la Pasión', en: 'Passionfruit & Cold Brew' },
    desc: {
      es: 'Cold brew, zumo de maracuyá, jarabe de goma y cubos de hielo.',
      en: 'Cold brew, pure passionfruit juice, simple cane syrup, and ice cubes.'
    },
    notes: {
      es: 'Acidez exótica de la selva central que despierta los sentidos al instante.',
      en: 'Exotic rainforest acidity that immediately awakens your senses.'
    },
    icon: 'fa-solid fa-wine-glass'
  },
  {
    id: 'botella_coldbrew',
    name: { es: 'Cold Brew en Botella 330ml', en: 'Cold Brew Bottle 330ml' },
    category: 'cold_brew',
    categoryLabel: { es: 'Bebidas Envasadas', en: 'Bottled To-Go' },
    price: 'S/ 16.00',
    priceNum: 16,
    flavorTag: 'envasada',
    flavorLabel: { es: 'Listo para Llevar', en: 'Ready to Drink' },
    desc: {
      es: 'Botella de vidrio de 330ml de Cold Brew puro extraído en frío por 18 horas.',
      en: '330ml glass bottle of pure 18-hour cold brew, ready to take anywhere.'
    },
    notes: {
      es: 'Guárdalo en tu refrigerador para disfrutar cuando quieras.',
      en: 'Keep refrigerated to enjoy anytime on the go.'
    },
    icon: 'fa-solid fa-bottle-water'
  },
  {
    id: 'botella_avellana',
    name: { es: 'Avellana Latte 330ml', en: 'Hazelnut Latte 330ml' },
    category: 'cold_brew',
    categoryLabel: { es: 'Bebidas Envasadas', en: 'Bottled To-Go' },
    price: 'S/ 16.00',
    priceNum: 16,
    flavorTag: 'envasada',
    flavorLabel: { es: 'Listo para Llevar', en: 'Ready to Drink' },
    desc: {
      es: 'Botella de vidrio de 330ml de café latte con jarabe de avellana y leche.',
      en: '330ml glass bottle of hazelnut latte with cold milk, ready to drink.'
    },
    notes: {
      es: 'Cremoso, dulce y listo para llevar.',
      en: 'Creamy, sweet, and perfectly chilled.'
    },
    icon: 'fa-solid fa-bottle-water'
  },

  // ==================== 7. PANADERÍA & POSTRES (Pág. 4) ====================
  {
    id: 'pan_del_sur',
    name: { es: 'Pan del Sur', en: 'Southern Bread' },
    category: 'panaderia_postres',
    categoryLabel: { es: 'Panadería & Postres', en: 'Bakery & Sweets' },
    price: 'S/ 7.00',
    priceNum: 7,
    flavorTag: 'salado',
    flavorLabel: { es: 'Pan Artesanal', en: 'Artisan Bread' },
    desc: {
      es: 'Pan artesanal con aceituna, relleno mixto o queso paria.',
      en: 'Artisan bread with olives, ham & cheese or Andean paria cheese.'
    },
    notes: {
      es: 'Miga suave, corteza dorada al horno de leña.',
      en: 'Soft crumb, golden rustic crust.'
    },
    icon: 'fa-solid fa-bread-slice'
  },
  {
    id: 'croissant_simple',
    name: { es: 'Croissant Francés', en: 'Butter Croissant' },
    category: 'panaderia_postres',
    categoryLabel: { es: 'Panadería & Postres', en: 'Bakery & Sweets' },
    price: 'S/ 7.00',
    priceNum: 7,
    flavorTag: 'salado',
    flavorLabel: { es: 'Hojaldre Mantequilloso', en: 'Flaky Pastry' },
    desc: {
      es: 'Hojaldre dorado y mantequilloso por dentro.',
      en: 'Golden flaky layers with rich butter inside.'
    },
    notes: {
      es: 'Crujiente al morder, aireado y recién horneado.',
      en: 'Crispy outer shell, airy and freshly baked.'
    },
    icon: 'fa-solid fa-bacon'
  },
  {
    id: 'croissant_mixto_item',
    name: { es: 'Croissant Mixto', en: 'Ham & Cheese Croissant' },
    category: 'panaderia_postres',
    categoryLabel: { es: 'Panadería & Postres', en: 'Bakery & Sweets' },
    price: 'S/ 12.00',
    priceNum: 12,
    flavorTag: 'salado',
    flavorLabel: { es: 'Jamón & Queso Caliente', en: 'Warm Ham & Cheese' },
    desc: {
      es: 'Croissant relleno de jamón y queso, servido caliente.',
      en: 'Flaky croissant stuffed with savory ham and melted cheese, served hot.'
    },
    notes: {
      es: 'El clásico indiscutible que combina con cualquier café.',
      en: 'The undisputed classic pairing with any specialty roast.'
    },
    icon: 'fa-solid fa-bacon',
    isRecommended: true,
    badge: { es: '⭐ Clásico', en: '⭐ Classic' }
  },
  {
    id: 'croissant_pollo_item',
    name: { es: 'Croissant de Pollo', en: 'Chicken Croissant' },
    category: 'panaderia_postres',
    categoryLabel: { es: 'Panadería & Postres', en: 'Bakery & Sweets' },
    price: 'S/ 15.00',
    priceNum: 15,
    flavorTag: 'salado',
    flavorLabel: { es: 'Pollo, Apio & Pecanas', en: 'Chicken, Celery & Pecans' },
    desc: {
      es: 'Croissant relleno de pollo con apio, mayonesa y pecanas.',
      en: 'Croissant stuffed with chicken salad, fresh celery, homemade mayo and pecans.'
    },
    notes: {
      es: 'Contundente, crocante por las pecanas y muy jugoso.',
      en: 'Hearty, crunchy from the pecans, and delightfully juicy.'
    },
    icon: 'fa-solid fa-drumstick-bite',
    isRecommended: true,
    badge: { es: '⭐ Favorito Salado', en: '⭐ Savory Favorite' }
  },
  {
    id: 'croissant_atun_item',
    name: { es: 'Croissant de Atún', en: 'Tuna Croissant' },
    category: 'panaderia_postres',
    categoryLabel: { es: 'Panadería & Postres', en: 'Bakery & Sweets' },
    price: 'S/ 15.00',
    priceNum: 15,
    flavorTag: 'salado',
    flavorLabel: { es: 'Atún, Huevo & Mayonesa', en: 'Tuna & Egg Salad' },
    desc: {
      es: 'Croissant relleno de atún, huevo y mayonesa.',
      en: 'Flaky croissant stuffed with tuna salad, hard-boiled egg and mayonnaise.'
    },
    notes: {
      es: 'Sabor marino suave, fresco y abundante.',
      en: 'Light, fresh, protein-rich filling.'
    },
    icon: 'fa-solid fa-fish'
  },
  {
    id: 'brownie_item',
    name: { es: 'Brownie de Chocolate', en: 'Chocolate Fudge Brownie' },
    category: 'panaderia_postres',
    categoryLabel: { es: 'Panadería & Postres', en: 'Bakery & Sweets' },
    price: 'S/ 3.00',
    priceNum: 3,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Puro Chocolate', en: 'Pure Chocolate' },
    desc: {
      es: 'Brownie húmedo de chocolate extra chocolatoso.',
      en: 'Rich, moist double chocolate fudge brownie.'
    },
    notes: {
      es: 'El acompañante más dulce para tu espresso o americano por solo S/ 3.00.',
      en: 'The sweetest little companion to your espresso for only S/ 3.00.'
    },
    icon: 'fa-solid fa-cookie-bite'
  },
  {
    id: 'croissant_caramelo',
    name: { es: 'Croissant con Caramelo', en: 'Caramel Glazed Croissant' },
    category: 'panaderia_postres',
    categoryLabel: { es: 'Panadería & Postres', en: 'Bakery & Sweets' },
    price: 'S/ 12.00',
    priceNum: 12,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Glaseado Dulce', en: 'Caramel Glaze' },
    desc: {
      es: 'Croissant relleno de caramelo con glaseado dulce.',
      en: 'Croissant filled with rich caramel and sweet outer glaze.'
    },
    notes: {
      es: 'Dulzor suave que complementa a la perfección cualquier filtrado.',
      en: 'Delicate sweetness that perfectly complements pour-over coffee.'
    },
    icon: 'fa-solid fa-cake-candles'
  },
  {
    id: 'croissant_chocolate',
    name: { es: 'Croissant con Chocolate', en: 'Chocolate Pecan Croissant' },
    category: 'panaderia_postres',
    categoryLabel: { es: 'Panadería & Postres', en: 'Bakery & Sweets' },
    price: 'S/ 14.00',
    priceNum: 14,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Chocolate con Pecanas', en: 'Chocolate & Pecans' },
    desc: {
      es: 'Croissant relleno de chocolate con pecanas tostadas.',
      en: 'Flaky croissant stuffed with dark chocolate and roasted pecans.'
    },
    notes: {
      es: 'Chocolate derretido y nueces crocantes.',
      en: 'Melted dark chocolate and crunchy nuts.'
    },
    icon: 'fa-solid fa-cookie'
  },
  {
    id: 'croissant_helado',
    name: { es: 'Croissant con Helado', en: 'Croissant with Gelato' },
    category: 'panaderia_postres',
    categoryLabel: { es: 'Panadería & Postres', en: 'Bakery & Sweets' },
    price: 'S/ 17.00',
    priceNum: 17,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Helado, Chocolate & Fresas', en: 'Gelato, Choc & Berries' },
    desc: {
      es: 'Croissant relleno de chocolate, helado de vainilla y fresas frescas.',
      en: 'Croissant filled with warm chocolate, vanilla gelato and fresh strawberries.'
    },
    notes: {
      es: 'Contraste frío-caliente, postre de autor de nuestra cafetería.',
      en: 'Hot-cold contrast dessert signature from our coffee bar.'
    },
    icon: 'fa-solid fa-ice-cream'
  },
  {
    id: 'affogato_postre',
    name: { es: 'Affogato Clásico', en: 'Classic Affogato' },
    category: 'panaderia_postres',
    categoryLabel: { es: 'Panadería & Postres', en: 'Bakery & Sweets' },
    price: 'S/ 14.00',
    priceNum: 14,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Espresso sobre Helado', en: 'Espresso over Gelato' },
    desc: {
      es: 'Espresso de especialidad vertido sobre bola de helado de vainilla.',
      en: 'Hot specialty espresso poured over a scoop of artisan vanilla gelato.'
    },
    notes: {
      es: 'La amargura noble del café fundiéndose con la crema helada de vainilla.',
      en: 'Noble coffee aromatics melting with velvety cold vanilla gelato.'
    },
    icon: 'fa-solid fa-mug-hot'
  },

  // ==================== 8. BAR KFEST (Coctelería - Pág. 4) ====================
  {
    id: 'baileys_affogato',
    name: { es: 'Baileys Affogato', en: 'Baileys Affogato' },
    category: 'bar_kfest',
    categoryLabel: { es: 'Bar Kfest (Coctelería)', en: 'Kfest Coffee Bar' },
    price: 'S/ 17.00',
    priceNum: 17,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Con Crema Irlandesa', en: 'With Irish Cream' },
    desc: {
      es: 'Espresso con helado de vainilla y licor Baileys.',
      en: 'Hot espresso poured over rich vanilla gelato and Baileys Irish cream.'
    },
    notes: {
      es: 'Fusión de crema irlandesa, notas tostadas de espresso y helado cremoso.',
      en: 'Fusion of Irish cream liqueur, roasted espresso notes, and velvety gelato.'
    },
    icon: 'fa-solid fa-martini-glass'
  },
  {
    id: 'coffee_sour',
    name: { es: 'Coffee Sour', en: 'Coffee Sour' },
    category: 'bar_kfest',
    categoryLabel: { es: 'Bar Kfest (Coctelería)', en: 'Kfest Coffee Bar' },
    price: 'S/ 17.00',
    priceNum: 17,
    flavorTag: 'especial',
    flavorLabel: { es: 'Coctel con Pisco Peruano', en: 'Signature Pisco Cocktail' },
    desc: {
      es: 'Espresso, pisco puro peruano, limón fresco y jarabe de goma batido en coctelera.',
      en: 'Fresh espresso, pure Peruvian pisco, fresh lime juice and simple syrup shaken with ice.'
    },
    notes: {
      es: 'La versión cafetera del clásico Pisco Sour nacional. Acidez cítrica vibrante y espuma densa.',
      en: 'Coffee tribute to the Peruvian Pisco Sour. Citrus sparkle, dense foam and smooth kick.'
    },
    icon: 'fa-solid fa-martini-glass-citrus',
    isRecommended: true,
    badge: { es: '⭐ Coctel Insignia', en: '⭐ Signature Cocktail' }
  },
  {
    id: 'wine_coffee',
    name: { es: 'Wine Coffee', en: 'Wine Coffee' },
    category: 'bar_kfest',
    categoryLabel: { es: 'Bar Kfest (Coctelería)', en: 'Kfest Coffee Bar' },
    price: 'S/ 17.00',
    priceNum: 17,
    flavorTag: 'especial',
    flavorLabel: { es: 'Copa de Café de Vino', en: 'Wine & Coffee Glass' },
    desc: {
      es: 'Copa de café de vino de autor.',
      en: 'Artisan wine and specialty coffee infusion served in an elegant goblet.'
    },
    notes: {
      es: 'Notas a frutos rojos macerados, taninos elegantes y perfume de café.',
      en: 'Notes of macerated berries, delicate wine tannins, and perfumed coffee finish.'
    },
    icon: 'fa-solid fa-wine-glass'
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
      es: 'Cold brew, licor de menta y gaseosa Everest.',
      en: 'Cold brew, green mint liqueur, and sparkling Everest soda on ice.'
    },
    notes: {
      es: 'Frescura glacial inigualable con la intensidad aromática del café reposado en frío.',
      en: 'Unmatched icy freshness with the aromatic intensity of 18-hour cold brew.'
    },
    icon: 'fa-solid fa-glass-water',
    isRecommended: true,
    badge: { es: '⭐ Ultra Refrescante', en: '⭐ Ultra Refreshing' }
  },

  // ==================== 9. LÍNEA VIRTUDES (Café en Bolsa - Págs. 5 y 6) ====================
  {
    id: 'virtud_respeto',
    name: { es: 'Virtud Respeto · Caturra', en: 'Respect Virtue · Caturra' },
    category: 'virtudes',
    categoryLabel: { es: 'Línea Virtudes', en: 'Virtues Line' },
    price: 'S/ 32.00',
    priceNum: 32,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Caturra 1,300 msnm', en: 'Caturra 1,300m' },
    desc: {
      es: '“Reconocer al otro, aceptar sus diferencias y valorar su dignidad.” Caturra lavado, tueste canela.',
      en: '“Acknowledge others, embrace differences, value dignity.” Washed Caturra, cinnamon roast.'
    },
    notes: {
      es: 'Notas a manzana verde, base de chocolate y fondo de canela. Cuerpo terso, acidez suave. Métodos: Chemex, Mupeco, V60.',
      en: 'Green apple, chocolate base, cinnamon undertones. Smooth acidity. Best for: Chemex, Mupeco, V60.'
    },
    icon: 'fa-solid fa-seedling',
    badge: { es: 'Tueste Canela', en: 'Cinnamon Roast' },
    isPack: true
  },
  {
    id: 'virtud_fortaleza',
    name: { es: 'Virtud Fortaleza · Bourbon', en: 'Strength Virtue · Bourbon' },
    category: 'virtudes',
    categoryLabel: { es: 'Línea Virtudes', en: 'Virtues Line' },
    price: 'S/ 35.00',
    priceNum: 35,
    flavorTag: 'intenso',
    flavorLabel: { es: 'Bourbon 1,750 msnm', en: 'Bourbon 1,750m' },
    desc: {
      es: '“Caer, levantarse y seguir.” Bourbon de altura lavado, tueste medio de máxima energía.',
      en: '“Fall, rise, and keep going.” High altitude washed Bourbon, medium roast.'
    },
    notes: {
      es: 'Notas a vainilla, chocolate, toffee y frutos secos. Cuerpo jugoso, acidez cítrica. Métodos: Chemex, Aeropress, V60.',
      en: 'Vanilla, dark chocolate, toffee, and roasted nuts. Juicy body. Best for: Chemex, Aeropress, V60.'
    },
    icon: 'fa-solid fa-fire',
    badge: { es: '1,750 msnm', en: '1,750 masl' },
    isPack: true
  },
  {
    id: 'virtud_fe',
    name: { es: 'Virtud Fe · Catuai', en: 'Faith Virtue · Catuai' },
    category: 'virtudes',
    categoryLabel: { es: 'Línea Virtudes', en: 'Virtues Line' },
    price: 'S/ 32.00',
    priceNum: 32,
    flavorTag: 'dulce',
    flavorLabel: { es: 'Catuai 1,300 msnm', en: 'Catuai 1,300m' },
    desc: {
      es: '“Más que creer, es confiar y avanzar con seguridad.” Catuai lavado, tueste medio.',
      en: '“More than believing, it is trusting and moving forward.” Washed Catuai, medium roast.'
    },
    notes: {
      es: 'Notas a lima dulce, toffee, canela y fondo de vainilla. Cuerpo sedoso, acidez suave. Métodos: Chemex, Aeropress, V60.',
      en: 'Sweet lime, toffee, cinnamon and vanilla finish. Silky body. Best for: Chemex, Aeropress, V60.'
    },
    icon: 'fa-solid fa-dove',
    badge: { es: 'Catuai Dulce', en: 'Sweet Catuai' },
    isPack: true
  },
  {
    id: 'virtud_amor',
    name: { es: 'Virtud Amor · Catuai Frutal', en: 'Love Virtue · Fruity Catuai' },
    category: 'virtudes',
    categoryLabel: { es: 'Línea Virtudes', en: 'Virtues Line' },
    price: 'S/ 32.00',
    priceNum: 32,
    flavorTag: 'frutal',
    flavorLabel: { es: 'Catuai 1,300 msnm', en: 'Catuai 1,300m' },
    desc: {
      es: '“La compañía perfecta para quienes avanzan con determinación brindando claridad en cada paso.”',
      en: '“The ideal companion for those advancing with determination and heart in every step.”'
    },
    notes: {
      es: 'Notas a frutal lima dulce, base de chocolate, toffee y canela. Cuerpo sedoso. Métodos: Chemex, Aeropress, V60.',
      en: 'Sweet lime fruit, chocolate base, toffee and cinnamon. Silky body. Best for: Chemex, Aeropress, V60.'
    },
    icon: 'fa-solid fa-heart',
    badge: { es: 'Frutal & Chocolate', en: 'Fruity & Choc' },
    isPack: true
  },
  {
    id: 'virtud_paciencia',
    name: { es: 'Virtud Paciencia · Catimor', en: 'Patience Virtue · Catimor' },
    category: 'virtudes',
    categoryLabel: { es: 'Línea Virtudes', en: 'Virtues Line' },
    price: 'S/ 30.00',
    priceNum: 30,
    flavorTag: 'intenso',
    flavorLabel: { es: 'Catimor 1,600 msnm', en: 'Catimor 1,600m' },
    desc: {
      es: '“Confiar en los tiempos y mantener la calma.” Catimor lavado de altura, tueste medio-alto.',
      en: '“Trust the timing and stay calm.” High altitude washed Catimor, medium-dark roast.'
    },
    notes: {
      es: 'Notas herbales, base de nuez moscada y panela. Cuerpo oleoso denso, acidez baja. Métodos: Prensa Francesa, Mupeco, Espresso.',
      en: 'Herbal hints, nutmeg base, panela. Dense oily body, low acidity. Best for: French Press, Mupeco, Espresso.'
    },
    icon: 'fa-solid fa-clock',
    badge: { es: 'Tueste Medio-Alto', en: 'Medium-Dark' },
    isPack: true
  },
  {
    id: 'virtud_resiliencia',
    name: { es: 'Virtud Resiliencia · Geisha Exclusivo', en: 'Resilience Virtue · Rare Geisha' },
    category: 'virtudes',
    categoryLabel: { es: 'Línea Virtudes', en: 'Virtues Line' },
    price: 'S/ 45.00',
    priceNum: 45,
    flavorTag: 'floral',
    flavorLabel: { es: 'Geisha 1,600 msnm', en: 'Geisha 1,600m' },
    desc: {
      es: '“La virtud silenciosa que no presume, pero que transforma.” Variedad Geisha selecta de altura.',
      en: '“The quiet virtue that doesn’t boast, but transforms.” Rare high altitude Geisha.'
    },
    notes: {
      es: 'Perfil floral a jazmín, miel virgen y acidez a vino blanco. Cuerpo sedoso, acidez suave y brillante. Métodos: Chemex, Mupeco, V60.',
      en: 'Floral jasmine, pure honey and white wine acidity. Silky body, bright sweetness. Best for: Chemex, Mupeco, V60.'
    },
    icon: 'fa-solid fa-crown',
    isRecommended: true,
    badge: { es: '⭐ Geisha Exclusivo', en: '⭐ Rare Geisha' },
    isPack: true
  },
  {
    id: 'virtud_tolerancia',
    name: { es: 'Virtud Tolerancia · Blend Maestro', en: 'Tolerance Virtue · Master Blend' },
    category: 'virtudes',
    categoryLabel: { es: 'Línea Virtudes', en: 'Virtues Line' },
    price: 'S/ 35.00',
    priceNum: 35,
    flavorTag: 'intenso',
    flavorLabel: { es: 'Blend de Altura 1,750 msnm', en: 'Highland Blend 1,750m' },
    desc: {
      es: '“Mezclarnos con nuestras diferencias para ser más fuertes.” Unión armónica de orígenes y variedades.',
      en: '“Blending our differences to become stronger.” Harmonious union of estate origins and varieties.'
    },
    notes: {
      es: 'Notas a flor de café, vainilla, chocolate, toffee y frutos secos. Cuerpo jugoso, acidez cítrica. Métodos: Prensa Francesa, Mupeco, Espresso.',
      en: 'Coffee blossom, vanilla, chocolate, toffee and nuts. Juicy body. Best for: French Press, Mupeco, Espresso.'
    },
    icon: 'fa-solid fa-handshake',
    badge: { es: 'Blend 1,750m', en: '1,750m Blend' },
    isPack: true
  },
  {
    id: 'virtud_coldbrew_pack',
    name: { es: 'Cold Brew Virtudes (Amor + Fortaleza)', en: 'Virtues Cold Brew Blend' },
    category: 'virtudes',
    categoryLabel: { es: 'Línea Virtudes', en: 'Virtues Line' },
    price: 'S/ 16.00',
    priceNum: 16,
    flavorTag: 'intenso',
    flavorLabel: { es: 'Extracción 18h en Frío', en: '18h Cold Steep' },
    desc: {
      es: '“Proceso sencillo y delicioso.” La unión de 2 virtudes (AMOR y FORTALEZA) para un cold brew dulce y equilibrado.',
      en: '“Simple and delicious.” The union of 2 virtues (LOVE & STRENGTH) for a sweet, balanced cold brew.'
    },
    notes: {
      es: '18 horas de extracción en frío. Notas a chocolate, frutos secos y miel para tomar solo o en coctelería.',
      en: '18 hours cold steep. Notes of chocolate, nuts, and honey. Great on its own or in cocktails.'
    },
    icon: 'fa-solid fa-glass-water',
    badge: { es: '18 Horas', en: '18 Hours' },
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
