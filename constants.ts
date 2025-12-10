
import { Product, Translation } from './types';

export const TRANSLATIONS: Translation = {
  home: { uz: 'Bosh sahifa', ru: 'Главная' },
  catalog: { uz: 'Katalog', ru: 'Каталог' },
  services: { uz: 'Xizmatlar', ru: 'Услуги' },
  about: { uz: 'Biz haqimizda', ru: 'О нас' },
  contact: { uz: 'Aloqa', ru: 'Контакты' },
  calculator: { uz: 'Kalkulyator', ru: 'Калькулятор' },
  searchPlaceholder: { uz: 'Mahsulotni qidirish...', ru: 'Поиск продукта...' },
  addToCart: { uz: 'Savatga qo\'shish', ru: 'В корзину' },
  price: { uz: 'Narxi', ru: 'Цена' },
  som: { uz: "so'm", ru: 'сум' },
  aiHelper: { uz: 'AI Yordamchi', ru: 'AI Помощник' },
  aiGreeting: { 
    uz: 'Salom! Men Sofmetall AI yordamchisiman. Sizga qanday metall mahsuloti kerak? Narxlar va qoldiqlar bo\'yicha yordam bera olaman.', 
    ru: 'Здравствуйте! Я AI помощник Sofmetall. Какой металлопрокат вас интересует? Я могу помочь с ценами и наличием.' 
  },
  cart: { uz: 'Savat', ru: 'Корзина' },
  total: { uz: 'Jami', ru: 'Итого' },
  checkout: { uz: 'Buyurtma berish', ru: 'Оформить заказ' },
  emptyCart: { uz: 'Savatingiz bo\'sh', ru: 'Ваша корзина пуста' },
  ctaButton: { uz: 'Katalogni ko\'rish', ru: 'Смотреть каталог' },
  footerText: { uz: '© 2024 Sofmetall. Barcha huquqlar himoyalangan.', ru: '© 2024 Sofmetall. Все права защищены.' },
  partners: { uz: 'Bizning Hamkorlar', ru: 'Наши Партнеры' },
  servicesTitle: { uz: 'Bizning Xizmatlar', ru: 'Наши Услуги' },
  processTitle: { uz: 'Ishlash Jarayoni', ru: 'Процесс Работы' },
  contactUs: { uz: 'Biz bilan bog\'laning', ru: 'Свяжитесь с нами' },
  needConsultation: { uz: 'Maslahat kerakmi?', ru: 'Нужна консультация?' },
  consultationDesc: { 
    uz: 'Mutaxassislarimiz sizga loyihangiz uchun eng mos metallarni tanlashda yordam beradi.', 
    ru: 'Наши специалисты помогут вам выбрать наиболее подходящий металл для вашего проекта.' 
  },
  // About Us
  ourMission: { uz: 'Bizning Missiyamiz', ru: 'Наша Миссия' },
  missionText: { 
    uz: 'O\'zbekiston qurilish va sanoat sohasini yuqori sifatli, ishonchli va hamyonbop metall mahsulotlari bilan ta\'minlash orqali mamlakat rivojiga hissa qo\'shish.', 
    ru: 'Вносить вклад в развитие страны, обеспечивая строительный и промышленный секторы Узбекистана качественным, надежным и доступным металлопрокатом.' 
  },
  whyUs: { uz: 'Nega aynan biz?', ru: 'Почему выбирают нас?' },
  quality: { uz: 'Yuqori Sifat', ru: 'Высокое Качество' },
  delivery: { uz: 'Tezkor Yetkazish', ru: 'Быстрая Доставка' },
  price_adv: { uz: 'Hamyonbop Narxlar', ru: 'Доступные Цены' },
  // Calculator
  calcTitle: { uz: 'Metall Kalkulyatori', ru: 'Калькулятор Металла' },
  calcDesc: { uz: 'Mahsulot turini tanlang va o\'lchamlarni kiriting. Biz sizga aniq og\'irlikni hisoblab beramiz.', ru: 'Выберите тип продукта и введите размеры. Мы рассчитаем точный вес.' },
  diameter: { uz: 'Diametr D (mm)', ru: 'Диаметр D (мм)' },
  length: { uz: 'Uzunlik L (m)', ru: 'Длина L (м)' },
  width: { uz: 'Kenglik A (mm)', ru: 'Ширина A (мм)' },
  thickness: { uz: 'Qalinlik S (mm)', ru: 'Толщина S (мм)' },
  height: { uz: 'Balandlik B (mm)', ru: 'Высота B (мм)' },
  weight: { uz: 'Og\'irlik', ru: 'Вес' },
  calculate: { uz: 'Hisoblash', ru: 'Рассчитать' },
  result: { uz: 'Natija', ru: 'Результат' },
  wall: { uz: 'Devor qalinligi S', ru: 'Толщина стенки S' },
  // FAQ
  faqTitle: { uz: 'Ko\'p so\'raladigan savollar', ru: 'Часто задаваемые вопросы' },
  testimonialsTitle: { uz: 'Mijozlar fikri', ru: 'Отзывы клиентов' },
  history: { uz: 'Bizning Tarix', ru: 'Наша История' },
  // Additional translations
  products: { uz: 'Mahsulotlar', ru: 'Продукция' },
  search: { uz: 'Qidirish...', ru: 'Поиск...' },
  whatWeOffer: { uz: 'Biz taklif qilamiz', ru: 'Мы предлагаем' },
  howItWorks: { uz: 'Qanday ishlaydi', ru: 'Как это работает' },
  reviews: { uz: 'Sharhlar', ru: 'Отзывы' },
  testimonials: { uz: 'Mijozlar fikri', ru: 'Отзывы клиентов' },
  faq: { uz: 'Ko\'p so\'raladigan savollar', ru: 'Часто задаваемые вопросы' },
  trusted: { uz: 'Bizga ishonishadi', ru: 'Нам доверяют' },
  getInTouch: { uz: 'Bog\'lanish', ru: 'Связаться' },
  address: { uz: 'Manzil', ru: 'Адрес' },
  phone: { uz: 'Telefon', ru: 'Телефон' },
  email: { uz: 'Elektron pochta', ru: 'Эл. почта' },
  sendMessage: { uz: 'Xabar yuborish', ru: 'Отправить сообщение' },
  yourName: { uz: 'Ismingiz', ru: 'Ваше имя' },
  yourPhone: { uz: 'Telefon raqamingiz', ru: 'Ваш телефон' },
  yourMessage: { uz: 'Xabaringiz', ru: 'Ваше сообщение' },
  send: { uz: 'Yuborish', ru: 'Отправить' },
  quickLinks: { uz: 'Tezkor havolalar', ru: 'Быстрые ссылки' },
  mission: { uz: 'Missiyamiz', ru: 'Наша миссия' },
  vision: { uz: 'Bizning maqsadimiz', ru: 'Наша цель' },
  // AI Chatbot Section
  aiAssistant: { uz: 'AI Yordamchi', ru: 'AI Помощник' },
  aiChatTitle: { uz: 'Sun\'iy intellekt yordamchisi', ru: 'Умный AI помощник' },
  aiChatSubtitle: { uz: 'Savollaringizga 24/7 javob beramiz', ru: 'Отвечаем на ваши вопросы 24/7' },
  aiChatDesc: { 
    uz: 'Bizning zamonaviy AI yordamchimiz sizga metall mahsulotlari haqida barcha savollarga javob beradi. Narxlar, mavjudlik, texnik xususiyatlar - hamma narsani so\'rashingiz mumkin!', 
    ru: 'Наш современный AI-помощник ответит на все ваши вопросы о металлопрокате. Цены, наличие, технические характеристики - спрашивайте что угодно!' 
  },
  aiFeature1: { uz: 'Tezkor javoblar', ru: 'Быстрые ответы' },
  aiFeature2: { uz: '24/7 mavjud', ru: 'Доступен 24/7' },
  aiFeature3: { uz: 'Aniq ma\'lumotlar', ru: 'Точные данные' },
  startChat: { uz: 'Suhbatni boshlash', ru: 'Начать чат' },
  askAnything: { uz: 'Istalgan narsani so\'rang', ru: 'Спросите что угодно' }
};

export const HERO_SLIDES = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=2070', // Construction site dark
    titleUz: 'Sifatli metall mahsulotlari ishonchli hamkoringizdan',
    titleRu: 'Качественный металлопрокат от надежного партнера',
    subtitleUz: 'Qurilish va ishlab chiqarish uchun eng yaxshi narxlar',
    subtitleRu: 'Лучшие цены для строительства и производства'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1565610222536-ef125c59da2e?auto=format&fit=crop&q=80&w=2070', // Industrial warehouse
    titleUz: 'Keng assortimentdagi ombor',
    titleRu: 'Широкий ассортимент на складе',
    subtitleUz: 'Barcha turdagi metall mahsulotlari doimiy zaxirada',
    subtitleRu: 'Все виды металлопроката всегда в наличии'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1533240217032-47530a618335?auto=format&fit=crop&q=80&w=2070', // Steel beams
    titleUz: 'O\'zbekiston bo\'ylab yetkazib berish',
    titleRu: 'Доставка по всему Узбекистану',
    subtitleUz: 'Tezkor va xavfsiz logistika xizmati',
    subtitleRu: 'Быстрая и безопасная логистика'
  }
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    nameUz: 'Armatura A500C Ø12mm',
    nameRu: 'Арматура А500С Ø12мм',
    category: 'armatura',
    price: 8500,
    unit: 'm',
    image: 'https://placehold.co/800x600/dc2626/ffffff?text=Armatura+12mm', 
    specs: 'A500C, Uzunligi 11.7m',
  },
  {
    id: '2',
    nameUz: 'Profil truba 40x40x2mm',
    nameRu: 'Профильная труба 40x40x2мм',
    category: 'truba',
    price: 12000,
    unit: 'm',
    image: 'https://placehold.co/800x600/1e40af/ffffff?text=Profil+40x40', 
    specs: 'Stal 3, Kvadrat',
  },
  {
    id: '3',
    nameUz: 'Po\'lat list 3mm (1.25x2.5m)',
    nameRu: 'Лист стальной 3мм (1.25x2.5м)',
    category: 'list',
    price: 450000,
    unit: 'don',
    image: 'https://placehold.co/800x600/374151/ffffff?text=List+3mm', 
    specs: 'Hot rolled, ST3ps',
  },
  {
    id: '4',
    nameUz: 'Ugolnik 50x50x4mm',
    nameRu: 'Уголок 50x50x4мм',
    category: 'ugolnik',
    price: 15000,
    unit: 'm',
    image: 'https://placehold.co/800x600/059669/ffffff?text=Ugolnik+50x50', 
    specs: 'Teng tomonli, GOST 8509-93',
  },
  {
    id: '5',
    nameUz: 'Shveller 10U',
    nameRu: 'Швеллер 10У',
    category: 'shveller',
    price: 65000,
    unit: 'm',
    image: 'https://placehold.co/800x600/7c3aed/ffffff?text=Shveller+10U', 
    specs: 'GOST 8240-97',
  },
  {
    id: '6',
    nameUz: 'Armatura A500C Ø16mm',
    nameRu: 'Арматура А500С Ø16мм',
    category: 'armatura',
    price: 14500,
    unit: 'm',
    image: 'https://placehold.co/800x600/dc2626/ffffff?text=Armatura+16mm',
    specs: 'A500C, Mustahkam',
  },
  {
    id: '7',
    nameUz: 'Temir Truba Ø32mm',
    nameRu: 'Труба стальная Ø32мм',
    category: 'truba',
    price: 18000,
    unit: 'm',
    image: 'https://placehold.co/800x600/1e40af/ffffff?text=Truba+32mm',
    specs: 'Suv-gaz quvuri, GOST 3262-75',
  },
  {
    id: '8',
    nameUz: 'List 5mm (1.5x6m)',
    nameRu: 'Лист 5мм (1.5x6м)',
    category: 'list',
    price: 950000,
    unit: 'don',
    image: 'https://placehold.co/800x600/374151/ffffff?text=List+5mm',
    specs: 'Stal 3, Sanoatbop',
  },
  {
    id: '9',
    nameUz: 'Armatura A400 Ø10mm',
    nameRu: 'Арматура А400 Ø10мм',
    category: 'armatura',
    price: 6500,
    unit: 'm',
    image: 'https://placehold.co/800x600/dc2626/ffffff?text=Armatura+10mm',
    specs: 'A400, Uzunligi 11.7m',
  },
  {
    id: '10',
    nameUz: 'Profil truba 60x40x3mm',
    nameRu: 'Профильная труба 60x40x3мм',
    category: 'truba',
    price: 22000,
    unit: 'm',
    image: 'https://placehold.co/800x600/1e40af/ffffff?text=Profil+60x40',
    specs: 'Stal 3, To\'g\'ri burchakli',
  },
  {
    id: '11',
    nameUz: 'Ugolnik 75x75x6mm',
    nameRu: 'Уголок 75x75x6мм',
    category: 'ugolnik',
    price: 28000,
    unit: 'm',
    image: 'https://placehold.co/800x600/059669/ffffff?text=Ugolnik+75x75',
    specs: 'Teng tomonli, GOST 8509-93',
  },
  {
    id: '12',
    nameUz: 'Shveller 14U',
    nameRu: 'Швеллер 14У',
    category: 'shveller',
    price: 95000,
    unit: 'm',
    image: 'https://placehold.co/800x600/7c3aed/ffffff?text=Shveller+14U',
    specs: 'GOST 8240-97, Konstruksion',
  },
  {
    id: '13',
    nameUz: 'Armatura A500C Ø20mm',
    nameRu: 'Арматура А500С Ø20мм',
    category: 'armatura',
    price: 22500,
    unit: 'm',
    image: 'https://placehold.co/800x600/dc2626/ffffff?text=Armatura+20mm',
    specs: 'A500C, Kuchaytirilgan',
  },
  {
    id: '14',
    nameUz: 'Qora truba Ø57mm',
    nameRu: 'Труба чёрная Ø57мм',
    category: 'truba',
    price: 35000,
    unit: 'm',
    image: 'https://placehold.co/800x600/1e40af/ffffff?text=Truba+57mm',
    specs: 'Elektr payvandlangan',
  },
  {
    id: '15',
    nameUz: 'Rifli list 4mm (1.25x2.5m)',
    nameRu: 'Лист рифленый 4мм (1.25x2.5м)',
    category: 'list',
    price: 650000,
    unit: 'don',
    image: 'https://placehold.co/800x600/374151/ffffff?text=Rifli+List',
    specs: 'Rombik shaklli, ST3',
  },
  {
    id: '16',
    nameUz: 'Ugolnik 63x63x5mm',
    nameRu: 'Уголок 63x63x5мм',
    category: 'ugolnik',
    price: 21000,
    unit: 'm',
    image: 'https://placehold.co/800x600/059669/ffffff?text=Ugolnik+63x63',
    specs: 'Teng tomonli, Stal 3',
  }
];

export const CATEGORIES = [
  { id: 'all', labelUz: 'Barchasi', labelRu: 'Все', image: '' },
  { id: 'armatura', labelUz: 'Armatura', labelRu: 'Арматура', image: 'https://images.unsplash.com/photo-1626861858547-50b3e55139fb?auto=format&fit=crop&q=80&w=600' },
  { id: 'truba', labelUz: 'Trubalar', labelRu: 'Трубы', image: 'https://images.unsplash.com/photo-1518659685710-188b39352e06?auto=format&fit=crop&q=80&w=600' },
  { id: 'list', labelUz: 'Listlar', labelRu: 'Листы', image: 'https://images.unsplash.com/photo-1567093322480-9606977465bf?auto=format&fit=crop&q=80&w=600' },
  { id: 'ugolnik', labelUz: 'Ugolnik', labelRu: 'Уголок', image: 'https://images.unsplash.com/photo-1611562688086-444cb3f90506?auto=format&fit=crop&q=80&w=600' },
  { id: 'shveller', labelUz: 'Shveller', labelRu: 'Швеллер', image: 'https://images.unsplash.com/photo-1535063406552-921b38b8d9bd?auto=format&fit=crop&q=80&w=600' },
];

export const SERVICES = [
  {
    id: 'consulting',
    titleUz: 'Professional Maslahat',
    titleRu: 'Профессиональная Консультация',
    descUz: 'Loyiha uchun to\'g\'ri metall tanlashda mutaxassis maslahati. Biz sizga xarajatlarni optimallashtirishga yordam beramiz.',
    descRu: 'Консультация специалиста по выбору металла для проекта. Мы поможем вам оптимизировать расходы.',
    icon: 'Headphones'
  },
  {
    id: 'cutting',
    titleUz: 'Lazerni va Plazmali Kesish',
    titleRu: 'Лазерная и Плазменная Резка',
    descUz: 'Har qanday qalinlikdagi metallarni yuqori aniqlikda kesish xizmati. Bizda zamonaviy CNC uskunalar mavjud.',
    descRu: 'Услуги высокоточной резки металла любой толщины. У нас есть современное оборудование с ЧПУ.',
    icon: 'Scissors'
  },
  {
    id: 'welding',
    titleUz: 'Payvandlash Ishlari',
    titleRu: 'Сварочные Работы',
    descUz: 'Sanoat va qurilish konstruksiyalarini sifatli payvandlash. Barcha turdagi payvandlash usullari.',
    descRu: 'Качественная сварка промышленных и строительных конструкций. Все виды сварочных работ.',
    icon: 'Flame'
  },
  {
    id: 'delivery',
    titleUz: 'Maxsus Transportda Yetkazish',
    titleRu: 'Доставка Спецтранспортом',
    descUz: 'Uzun o\'lchamli yuklarni obyektgacha xavfsiz yetkazib berish. Toshkent va viloyatlar bo\'ylab.',
    descRu: 'Безопасная доставка длинномерных грузов до объекта. По Ташкенту и областям.',
    icon: 'Truck'
  }
];

export const PROCESS_STEPS = [
  {
    step: '01',
    titleUz: 'Buyurtma berish',
    titleRu: 'Оформление заказа',
    descUz: 'Sayt orqali yoki telefon orqali kerakli xizmatni tanlaysiz.',
    descRu: 'Вы выбираете необходимую услугу через сайт или по телефону.',
  },
  {
    step: '02',
    titleUz: 'Hisob-kitob va Tasdiqlash',
    titleRu: 'Расчет и Подтверждение',
    descUz: 'Mutaxassislarimiz loyihani o\'rganib, aniq narxni hisoblab beradilar.',
    descRu: 'Наши специалисты изучают проект и рассчитывают точную стоимость.',
  },
  {
    step: '03',
    titleUz: 'Bajarish va Topshirish',
    titleRu: 'Выполнение и Сдача',
    descUz: 'Xizmat yuqori sifatda bajariladi va sizga o\'z vaqtida topshiriladi.',
    descRu: 'Услуга выполняется качественно и сдается вам в срок.',
  },
];

export const PARTNERS = [
  { name: 'O\'zmetkombinat', logoText: 'UZMET', logo: 'https://via.placeholder.com/150x50/1e293b/ffffff?text=UZMET' },
  { name: 'Toshkent Metall', logoText: 'TMZ', logo: 'https://via.placeholder.com/150x50/1e293b/ffffff?text=TMZ' },
  { name: 'Bekobod Stal', logoText: 'BEKOBOD', logo: 'https://via.placeholder.com/150x50/1e293b/ffffff?text=BEKOBOD' },
  { name: 'Samarqand Metall', logoText: 'SAMMET', logo: 'https://via.placeholder.com/150x50/1e293b/ffffff?text=SAMMET' },
  { name: 'Navoiy Kon', logoText: 'NKMK', logo: 'https://via.placeholder.com/150x50/1e293b/ffffff?text=NKMK' },
  { name: 'Almalyk Mining', logoText: 'AGMK', logo: 'https://via.placeholder.com/150x50/1e293b/ffffff?text=AGMK' },
];

export const FAQ_ITEMS = [
  {
    qUz: "Mahsulotlar sertifikatlanganmi?",
    qRu: "Продукция сертифицирована?",
    aUz: "Ha, barcha mahsulotlarimiz sifat sertifikatiga va GOST standartlariga javob beradi.",
    aRu: "Да, вся наша продукция имеет сертификаты качества и соответствует стандартам ГОСТ."
  },
  {
    qUz: "Yetkazib berish narxi qancha?",
    qRu: "Сколько стоит доставка?",
    aUz: "Yetkazib berish narxi masofa va yuk og'irligiga qarab hisoblanadi. 5 tonnadan ortiq buyurtmalar uchun Toshkent shahri ichida bepul.",
    aRu: "Стоимость доставки рассчитывается исходя из расстояния и веса груза. Для заказов свыше 5 тонн доставка по Ташкенту бесплатная."
  },
  {
    qUz: "To'lov turlari qanaqa?",
    qRu: "Какие есть виды оплаты?",
    aUz: "Siz naqd pul, pul o'tkazish (perechislenie) va korporativ karta orqali to'lov qilishingiz mumkin.",
    aRu: "Вы можете оплатить наличными, перечислением и корпоративной картой."
  }
];

export const TESTIMONIALS = [
  {
    name: "Alisher Vahobov",
    roleUz: "Qurilish firmasi rahbari",
    roleRu: "Руководитель строительной фирмы",
    textUz: "Sofmetall bilan 3 yildan beri ishlaymiz. Har doim o'z vaqtida va sifatli. Narxlar bozorga nisbatan juda hamyonbop.",
    textRu: "Работаем с Sofmetall уже 3 года. Всегда вовремя и качественно. Цены очень доступные по сравнению с рынком.",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Jamshid Tursunov",
    roleUz: "Korxona boshlig'i",
    roleRu: "Начальник цеха",
    textUz: "Bizga nostandart o'lchamdagi listlar kerak edi, ular tezda kesib, yetkazib berishdi. Xizmat ko'rsatish a'lo darajada.",
    textRu: "Нам нужны были листы нестандартных размеров, они быстро нарезали и доставили. Сервис на высшем уровне.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=150&h=150"
  },
  {
    name: "Dilnoza Karimova",
    roleUz: "Loyiha menejeri",
    roleRu: "Менеджер проекта",
    textUz: "Juda professional jamoa. Har bir savolimizga tez va aniq javob berishadi. Tavsiya qilaman!",
    textRu: "Очень профессиональная команда. На каждый вопрос отвечают быстро и точно. Рекомендую!",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=150&h=150"
  }
];
