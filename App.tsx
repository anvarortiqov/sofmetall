
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import CartSidebar from './components/CartSidebar';
import AIChat from './components/AIChat';
import { MOCK_PRODUCTS, CATEGORIES, SERVICES, PARTNERS, TRANSLATIONS, PROCESS_STEPS, FAQ_ITEMS, TESTIMONIALS } from './constants';
import { Language, Product, CartItem } from './types';
import { Filter, Search, MapPin, Phone, Mail, Facebook, Instagram, Send, ShieldCheck, Truck, Box, ArrowRight, Layers, Scissors, Flame, Headphones, Factory, CheckCircle2, Ruler, Award, Target, ChevronDown, ChevronUp, Star, Quote, Scale, MessageCircle, Bot, Sparkles, Zap } from 'lucide-react';

// Extracted Component to follow React Hook Rules
interface FAQItemProps {
  item: { qUz: string; qRu: string; aUz: string; aRu: string };
  language: Language;
}

const FAQItem: React.FC<FAQItemProps> = ({ item, language }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-md">
       <button 
         onClick={() => setIsOpen(!isOpen)}
         className="w-full flex items-center justify-between p-6 text-left bg-white font-bold text-lg text-slate-900"
       >
          {language === 'uz' ? item.qUz : item.qRu}
          {isOpen ? <ChevronUp className="text-brand-red"/> : <ChevronDown className="text-slate-400"/>}
       </button>
       <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isOpen ? 'max-h-48' : 'max-h-0'}`}>
          <div className="p-6 pt-0 text-slate-500 leading-relaxed bg-white border-t border-gray-50">
             {language === 'uz' ? item.aUz : item.aRu}
          </div>
       </div>
    </div>
  );
};

const App: React.FC = () => {
  const [language, setLanguage] = useState<Language>('uz');
  const [activeTab, setActiveTab] = useState('home');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Calculator State
  const [calcCategory, setCalcCategory] = useState('armatura');
  const [calcInputs, setCalcInputs] = useState({
    diameter: 12,
    length: 1,
    width: 1000,
    thickness: 1,
    height: 40,
    wall: 2
  });
  const [calcResult, setCalcResult] = useState(0);

  const t = TRANSLATIONS;

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => 
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id: string, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id: string) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const filteredProducts = MOCK_PRODUCTS.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const searchLower = searchQuery.toLowerCase();
    const matchesSearch = 
      product.nameUz.toLowerCase().includes(searchLower) || 
      product.nameRu.toLowerCase().includes(searchLower);
    return matchesCategory && matchesSearch;
  });

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Truck': return <Truck className="w-12 h-12" />;
      case 'Scissors': return <Scissors className="w-12 h-12" />;
      case 'Flame': return <Flame className="w-12 h-12" />;
      case 'Headphones': return <Headphones className="w-12 h-12" />;
      default: return <Box className="w-12 h-12" />;
    }
  };

  const calculateWeight = () => {
    let weight = 0;
    const { diameter, length, width, thickness, height, wall } = calcInputs;
    
    // Simple formulas for demo purposes (Steel Density approx 7850 kg/m3)
    switch(calcCategory) {
      case 'armatura':
        // Formula: (D^2 / 162) * L for kg
        weight = (Math.pow(diameter, 2) / 162) * length;
        break;
      case 'list':
        // Formula: L(m) * W(m) * T(mm) * 7.85
        weight = (length) * (width / 1000) * thickness * 7.85;
        break;
      case 'truba':
        // Formula: (D - S) * S * 0.02466 * L
        // Correcting formula to avoid negative if D < S (though practically D > S)
        const d = Math.max(diameter, wall + 0.1);
        weight = (d - wall) * wall * 0.02466 * length;
        break;
      case 'profil':
        // Approx for Square tube: ((W + H) * 2 * S) * 0.00785 * L
        weight = ((width + height) * 2 * wall) * 0.00785 * length; // Simplified
        break;
      case 'ugolnik':
        // Approx: (W + H - t) * t * 0.00785 * L
        weight = (width + width - thickness) * thickness * 0.00785 * length;
        break;
      default:
        weight = 0;
    }
    setCalcResult(parseFloat(Math.max(0, weight).toFixed(2)));
  }

  // Auto calculate when inputs change
  React.useEffect(() => {
    calculateWeight();
  }, [calcInputs, calcCategory]);

  const renderCalculator = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
           <span className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2 block">Sofmetall Tools</span>
           <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">{t.calcTitle[language]}</h1>
           <p className="text-slate-500 text-lg">{t.calcDesc[language]}</p>
        </div>

        {/* Top Category Tabs */}
        <div className="flex justify-center mb-8 overflow-x-auto no-scrollbar pb-4 px-2">
          <div className="flex bg-white p-2 rounded-2xl shadow-sm border border-gray-100 space-x-2">
            {[
              { id: 'armatura', labelUz: 'Armatura', labelRu: 'Арматура', icon: <Box size={20}/> },
              { id: 'truba', labelUz: 'Truba', labelRu: 'Труба', icon: <CheckCircle2 size={20}/> },
              { id: 'list', labelUz: 'List', labelRu: 'Лист', icon: <Layers size={20}/> },
              { id: 'profil', labelUz: 'Profil', labelRu: 'Профиль', icon: <Box size={20}/> },
              { id: 'ugolnik', labelUz: 'Ugolnik', labelRu: 'Уголок', icon: <Ruler size={20}/> },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setCalcCategory(item.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl transition-all font-bold whitespace-nowrap ${
                  calcCategory === item.id 
                    ? 'bg-brand-red text-white shadow-lg' 
                    : 'text-slate-500 hover:bg-gray-50 hover:text-slate-800'
                }`}
              >
                {item.icon}
                {language === 'uz' ? item.labelUz : item.labelRu}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Inputs Section */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
             <div className="space-y-6">
                {/* Dynamic Inputs */}
                {(calcCategory === 'armatura' || calcCategory === 'truba') && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.diameter[language]}</label>
                    <div className="relative">
                      <input 
                        type="number"
                        min="0"
                        value={calcInputs.diameter}
                        onChange={(e) => setCalcInputs({...calcInputs, diameter: Math.max(0, Number(e.target.value))})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red font-bold text-slate-900"
                      />
                      <span className="absolute right-4 top-3.5 text-gray-400 text-sm font-bold">mm</span>
                    </div>
                  </div>
                )}
                
                {(calcCategory === 'list' || calcCategory === 'profil' || calcCategory === 'ugolnik') && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.width[language]}</label>
                    <div className="relative">
                      <input 
                        type="number"
                        min="0"
                        value={calcInputs.width}
                        onChange={(e) => setCalcInputs({...calcInputs, width: Math.max(0, Number(e.target.value))})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red font-bold text-slate-900"
                      />
                      <span className="absolute right-4 top-3.5 text-gray-400 text-sm font-bold">mm</span>
                    </div>
                  </div>
                )}

                {calcCategory === 'profil' && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{t.height[language]}</label>
                    <div className="relative">
                      <input 
                        type="number"
                        min="0"
                        value={calcInputs.height}
                        onChange={(e) => setCalcInputs({...calcInputs, height: Math.max(0, Number(e.target.value))})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red font-bold text-slate-900"
                      />
                       <span className="absolute right-4 top-3.5 text-gray-400 text-sm font-bold">mm</span>
                    </div>
                  </div>
                )}

                {(calcCategory !== 'armatura') && (
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">{calcCategory === 'truba' || calcCategory === 'profil' ? t.wall[language] : t.thickness[language]}</label>
                    <div className="relative">
                      <input 
                        type="number"
                        min="0"
                        value={calcCategory === 'truba' || calcCategory === 'profil' ? calcInputs.wall : calcInputs.thickness}
                        onChange={(e) => setCalcInputs(calcCategory === 'truba' || calcCategory === 'profil' ? {...calcInputs, wall: Math.max(0, Number(e.target.value))} : {...calcInputs, thickness: Math.max(0, Number(e.target.value))})}
                        className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red font-bold text-slate-900"
                      />
                       <span className="absolute right-4 top-3.5 text-gray-400 text-sm font-bold">mm</span>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{t.length[language]}</label>
                  <div className="relative">
                    <input 
                      type="number"
                      min="0"
                      value={calcInputs.length}
                      onChange={(e) => setCalcInputs({...calcInputs, length: Math.max(0, Number(e.target.value))})}
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-brand-red font-bold text-slate-900"
                    />
                    <span className="absolute right-4 top-3.5 text-gray-400 text-sm font-bold">m</span>
                  </div>
                  <input 
                    type="range" 
                    min="1" 
                    max="12"
                    step="0.1"
                    value={calcInputs.length} 
                    onChange={(e) => setCalcInputs({...calcInputs, length: Number(e.target.value)})}
                    className="w-full mt-4 accent-brand-red h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
             </div>
          </div>

          {/* Visualization Section */}
          <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 flex flex-col items-center justify-center relative overflow-hidden min-h-[400px]">
             {/* Background Grid */}
             <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.03)_1px,transparent_1px)] bg-[size:20px_20px]"></div>
             
             <div className="relative z-10 w-full flex-1 flex items-center justify-center mb-8">
               {calcCategory === 'armatura' && (
                 <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-xl transform transition-all duration-500 hover:scale-105">
                   <circle cx="100" cy="100" r="80" fill="#e2e8f0" stroke="#1e293b" strokeWidth="4"/>
                   <path d="M40 100 L160 100" stroke="#1e293b" strokeWidth="2" strokeDasharray="5,5"/>
                   <path d="M60 40 L140 160" stroke="#94a3b8" strokeWidth="2"/>
                   <path d="M40 80 L160 80" stroke="#94a3b8" strokeWidth="2"/>
                   <path d="M40 120 L160 120" stroke="#94a3b8" strokeWidth="2"/>
                   {/* Arrow */}
                   <path d="M10 100 L30 90 M10 100 L30 110" stroke="#D6001C" strokeWidth="3" fill="none"/>
                   <line x1="10" y1="100" x2="190" y2="100" stroke="#D6001C" strokeWidth="2" />
                   <path d="M190 100 L170 90 M190 100 L170 110" stroke="#D6001C" strokeWidth="3" fill="none"/>
                   <text x="100" y="85" textAnchor="middle" fill="#D6001C" fontWeight="bold" fontSize="16">D = {calcInputs.diameter}mm</text>
                 </svg>
               )}
               {calcCategory === 'truba' && (
                  <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-xl transform transition-all duration-500 hover:scale-105">
                    <circle cx="100" cy="100" r="80" fill="none" stroke="#1e293b" strokeWidth="15"/>
                    <line x1="20" y1="100" x2="180" y2="100" stroke="#D6001C" strokeWidth="2"/>
                    <text x="100" y="90" textAnchor="middle" fill="#D6001C" fontWeight="bold">D = {calcInputs.diameter}mm</text>
                     <line x1="100" y1="180" x2="100" y2="195" stroke="#D6001C" strokeWidth="2"/>
                     <text x="100" y="210" textAnchor="middle" fill="#D6001C" fontWeight="bold" fontSize="12">S = {calcInputs.wall}mm</text>
                  </svg>
               )}
               {calcCategory === 'list' && (
                 <svg width="200" height="150" viewBox="0 0 200 150" className="drop-shadow-xl transform transition-all duration-500 hover:scale-105">
                    <rect x="20" y="40" width="160" height="10" fill="#cbd5e1" stroke="#1e293b" strokeWidth="2"/>
                    <path d="M20 50 L40 100 L200 100 L180 50 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2"/>
                    <line x1="20" y1="30" x2="180" y2="30" stroke="#D6001C" strokeWidth="2"/>
                    <text x="100" y="25" textAnchor="middle" fill="#D6001C" fontWeight="bold">A = {calcInputs.width}mm</text>
                 </svg>
               )}
               {calcCategory === 'profil' && (
                 <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-xl transform transition-all duration-500 hover:scale-105">
                    <rect x="40" y="50" width="120" height="100" fill="none" stroke="#1e293b" strokeWidth="8"/>
                    <line x1="40" y1="35" x2="160" y2="35" stroke="#D6001C" strokeWidth="2"/>
                    <text x="100" y="25" textAnchor="middle" fill="#D6001C" fontWeight="bold">A = {calcInputs.width}mm</text>
                    <line x1="25" y1="50" x2="25" y2="150" stroke="#D6001C" strokeWidth="2"/>
                    <text x="15" y="100" textAnchor="middle" fill="#D6001C" fontWeight="bold" transform="rotate(-90 15,100)">B = {calcInputs.height}mm</text>
                 </svg>
               )}
               {calcCategory === 'ugolnik' && (
                 <svg width="200" height="200" viewBox="0 0 200 200" className="drop-shadow-xl transform transition-all duration-500 hover:scale-105">
                    <path d="M50 50 L50 150 L150 150 L150 130 L70 130 L70 50 Z" fill="#e2e8f0" stroke="#1e293b" strokeWidth="2"/>
                    <line x1="50" y1="165" x2="150" y2="165" stroke="#D6001C" strokeWidth="2"/>
                    <text x="100" y="180" textAnchor="middle" fill="#D6001C" fontWeight="bold">A = {calcInputs.width}mm</text>
                 </svg>
               )}
             </div>

             <div className="text-center w-full bg-slate-50 p-6 rounded-2xl border border-gray-200">
                <span className="text-slate-500 font-bold uppercase text-xs tracking-wider block mb-1">{t.weight[language].toUpperCase()}</span>
                <div className="text-5xl font-black text-brand-red mb-2 tracking-tight">
                  {calcResult} <span className="text-2xl text-slate-400">kg</span>
                </div>
                <div className="text-sm text-slate-400 font-medium bg-white inline-block px-3 py-1 rounded-full border border-gray-100 shadow-sm">
                  Formula: {calcCategory === 'armatura' ? 'D² / 162 × L' : 'Standard GOST'}
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAbout = () => (
    <div className="min-h-screen bg-white">
      {/* About Hero Parallax */}
      <div className="bg-slate-900 h-[500px] relative overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=2070')] bg-cover bg-center fixed-bg opacity-30"></div>
        <div className="relative z-10 text-center px-4">
          <span className="text-brand-red font-bold uppercase tracking-[0.2em] mb-4 block animate-fade-in-up">Sofmetall</span>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight animate-fade-in-up delay-100">
             {language === 'uz' ? 'Bizning Tariximiz' : 'Наша История'}
          </h1>
          <p className="text-gray-300 text-xl max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-200 font-light">
            {language === 'uz' 
             ? 'Kichik sexdan boshlanib, O\'zbekistonning yetakchi metall yetkazib beruvchisiga aylanish yo\'li.' 
             : 'Путь от небольшого цеха до ведущего поставщика металла в Узбекистане.'}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        {/* Statistics Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-32 -mt-32 relative z-20">
          {[
            { labelUz: 'Yillik Tajriba', labelRu: 'Лет опыта', val: '10+' },
            { labelUz: 'Mijozlar', labelRu: 'Клиентов', val: '5000+' },
            { labelUz: 'Loyihalar', labelRu: 'Проектов', val: '120+' },
            { labelUz: 'Tonnalab Metall', labelRu: 'Тонн металла', val: '50k+' },
          ].map((stat, idx) => (
            <div key={idx} className="bg-white p-8 rounded-3xl shadow-xl text-center border border-gray-100 hover:transform hover:-translate-y-2 transition-transform duration-300">
               <div className="text-4xl md:text-5xl font-black text-brand-red mb-2">{stat.val}</div>
               <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">{language === 'uz' ? stat.labelUz : stat.labelRu}</div>
            </div>
          ))}
        </div>

        {/* Timeline Section */}
        <div className="mb-24">
           <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">{t.history[language]}</h2>
              <div className="h-1.5 w-24 bg-brand-red mx-auto rounded-full"></div>
           </div>
           
           <div className="relative">
             {/* Line */}
             <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-200 hidden md:block"></div>
             
             <div className="space-y-12 relative">
                {[
                  { year: '2014', titleUz: 'Kompaniya tashkil topdi', titleRu: 'Основание компании', descUz: 'Kichik omborxona bilan o\'z faoliyatimizni boshladik.', descRu: 'Мы начали свою деятельность с небольшого склада.' },
                  { year: '2017', titleUz: 'Yangi omborxona', titleRu: 'Новый склад', descUz: 'Yangi zamonaviy omborxona ochildi.', descRu: 'Открылся новый современный склад.' },
                  { year: '2020', titleUz: 'Mintaqaviy kengayish', titleRu: 'Региональное расширение', descUz: 'Butun O\'zbekiston bo\'ylab yetkazib berish tarmog\'ini kengaytirdik.', descRu: 'Расширили сеть доставки по всему Узбекистану.' },
                  { year: '2024', titleUz: 'Yetakchi kompaniya', titleRu: 'Лидер рынка', descUz: 'O\'zbekistondagi yetakchi metall yetkazib beruvchiga aylandik.', descRu: 'Стали ведущим поставщиком металла в Узбекистане.' },
                ].map((item, idx) => (
                  <div key={idx} className={`flex flex-col md:flex-row items-center md:gap-8 ${idx % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                    <div className={`md:w-1/2 ${idx % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                      <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                        <div className="text-brand-red font-black text-2xl mb-2">{item.year}</div>
                        <h3 className="font-bold text-lg text-slate-900 mb-2">{language === 'uz' ? item.titleUz : item.titleRu}</h3>
                        <p className="text-slate-500">{language === 'uz' ? item.descUz : item.descRu}</p>
                      </div>
                    </div>
                    <div className="hidden md:flex w-4 h-4 bg-brand-red rounded-full border-4 border-white shadow-lg z-10"></div>
                    <div className="md:w-1/2"></div>
                  </div>
                ))}
             </div>
           </div>
        </div>

        {/* Mission & Vision */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24">
          <div className="bg-gradient-to-br from-brand-red to-red-700 p-10 rounded-3xl text-white">
            <Target className="w-12 h-12 mb-6"/>
            <h3 className="text-2xl font-bold mb-4">{t.mission[language]}</h3>
            <p className="text-red-100 leading-relaxed">
              {language === 'uz' 
                ? 'Mijozlarimizga sifatli metall mahsulotlarni eng qulay narxlarda va tezkor yetkazib berish bilan ta\'minlash.' 
                : 'Обеспечивать наших клиентов качественной металлопродукцией по лучшим ценам с быстрой доставкой.'}
            </p>
          </div>
          <div className="bg-slate-900 p-10 rounded-3xl text-white">
            <Award className="w-12 h-12 mb-6"/>
            <h3 className="text-2xl font-bold mb-4">{t.vision[language]}</h3>
            <p className="text-slate-300 leading-relaxed">
              {language === 'uz' 
                ? 'Markaziy Osiyo bo\'ylab metall sanoatida yetakchi va ishonchli hamkor bo\'lish.' 
                : 'Стать лидером и надежным партнером в металлургической отрасли по всей Центральной Азии.'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderHome = () => (
    <div className="min-h-screen bg-gray-50">
      <Hero language={language} onCtaClick={() => setActiveTab('catalog')} />
      
      {/* Premium Trust Badges Section */}
      <div className="relative bg-white py-20 overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/50 to-white"></div>
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl translate-y-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <ShieldCheck className="w-8 h-8"/>, labelUz: 'Sifat kafolati', labelRu: 'Гарантия качества', descUz: 'GOST sertifikatlari', descRu: 'Сертификаты ГОСТ' },
              { icon: <Truck className="w-8 h-8"/>, labelUz: 'Tezkor yetkazish', labelRu: 'Быстрая доставка', descUz: '24 soat ichida', descRu: 'В течение 24 часов' },
              { icon: <Scale className="w-8 h-8"/>, labelUz: 'Aniq og\'irlik', labelRu: 'Точный вес', descUz: 'Elektron tarozida', descRu: 'На электронных весах' },
              { icon: <Headphones className="w-8 h-8"/>, labelUz: '24/7 qo\'llab-quvvatlash', labelRu: 'Поддержка 24/7', descUz: 'Har doim aloqada', descRu: 'Всегда на связи' },
            ].map((item, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white rounded-3xl p-6 shadow-lg shadow-gray-100/50 border border-gray-100 hover:shadow-xl hover:shadow-brand-red/10 hover:border-brand-red/20 transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-gradient-to-br from-brand-red to-red-600 rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/30">
                  {item.icon}
                </div>
                <h3 className="font-bold text-lg text-slate-900 mb-1">{language === 'uz' ? item.labelUz : item.labelRu}</h3>
                <p className="text-sm text-slate-500">{language === 'uz' ? item.descUz : item.descRu}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Featured Categories Section */}
      <div className="bg-slate-900 py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.03%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-brand-red/20 text-brand-red font-bold uppercase tracking-widest text-sm px-4 py-2 rounded-full mb-4">
              <Layers className="w-4 h-4" />
              {t.catalog[language]}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">
              {language === 'uz' ? 'Mahsulot Kategoriyalari' : 'Категории Продукции'}
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {language === 'uz' 
                ? 'Barcha turdagi metall mahsulotlarini keng assortimentda taqdim etamiz' 
                : 'Предлагаем широкий ассортимент всех видов металлопроката'}
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {CATEGORIES.filter(c => c.id !== 'all').map((cat, idx) => (
              <button
                key={cat.id}
                onClick={() => { setSelectedCategory(cat.id); setActiveTab('catalog'); }}
                className="group relative aspect-square rounded-3xl overflow-hidden bg-slate-800 hover:scale-105 transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/50 to-transparent z-10"></div>
                <div className="absolute inset-0 bg-brand-red/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 p-4">
                  <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-white/20 transition-all duration-300">
                    <Box className="w-8 h-8 text-white" />
                  </div>
                  <span className="text-white font-bold text-lg text-center">
                    {language === 'uz' ? cat.labelUz : cat.labelRu}
                  </span>
                  <span className="text-white/60 text-sm mt-1 group-hover:text-white/80 transition-colors">
                    {MOCK_PRODUCTS.filter(p => p.category === cat.id).length} {language === 'uz' ? 'mahsulot' : 'товаров'}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Products Showcase Section */}
      <div id="products" className="bg-white py-24 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-6">
            <div>
              <span className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2 block">{t.catalog[language]}</span>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900">{t.products[language]}</h2>
            </div>
            <button 
              onClick={() => setActiveTab('catalog')}
              className="group inline-flex items-center gap-2 text-brand-red font-bold hover:gap-4 transition-all"
            >
              {language === 'uz' ? 'Barcha mahsulotlar' : 'Все товары'}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Category Filter */}
          <div className="flex gap-3 mb-10 overflow-x-auto no-scrollbar pb-2">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-6 py-3 rounded-2xl font-bold transition-all whitespace-nowrap ${
                  selectedCategory === cat.id 
                    ? 'bg-brand-red text-white shadow-lg shadow-red-500/30' 
                    : 'bg-gray-100 text-slate-600 hover:bg-gray-200'
                }`}
              >
                {language === 'uz' ? cat.labelUz : cat.labelRu}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.slice(0, 8).map(product => (
              <ProductCard key={product.id} product={product} language={language} onAddToCart={addToCart} />
            ))}
          </div>

          {filteredProducts.length > 8 && (
            <div className="text-center mt-12">
              <button 
                onClick={() => setActiveTab('catalog')}
                className="px-8 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-colors shadow-xl"
              >
                {language === 'uz' ? `Yana ${filteredProducts.length - 8} ta mahsulot` : `Ещё ${filteredProducts.length - 8} товаров`}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Services Section - Premium */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-red/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="inline-flex items-center gap-2 bg-white/10 text-white font-bold uppercase tracking-widest text-sm px-4 py-2 rounded-full mb-4">
              {t.whatWeOffer[language]}
            </span>
            <h2 className="text-3xl md:text-5xl font-black text-white mb-4">{t.services[language]}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {language === 'uz' 
                ? 'Metall mahsulotlari bilan bog\'liq barcha xizmatlarni bir joyda taqdim etamiz' 
                : 'Предоставляем все услуги, связанные с металлопродукцией, в одном месте'}
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {SERVICES.map((service, idx) => (
              <div 
                key={idx} 
                className="group relative bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 hover:bg-brand-red hover:border-brand-red transition-all duration-500 hover:-translate-y-2"
              >
                <div className="w-16 h-16 bg-brand-red/20 group-hover:bg-white/20 rounded-2xl flex items-center justify-center text-brand-red group-hover:text-white mb-6 transition-all duration-300">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{language === 'uz' ? service.titleUz : service.titleRu}</h3>
                <p className="text-slate-400 group-hover:text-white/80 transition-colors leading-relaxed">{language === 'uz' ? service.descUz : service.descRu}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Steps - Premium */}
      <div className="bg-white py-24 relative overflow-hidden">
        <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-100 hidden lg:block"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="text-center mb-20">
            <span className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2 block">{t.howItWorks[language]}</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">{t.processTitle[language]}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="relative text-center group">
                <div className="relative z-10 w-24 h-24 bg-gradient-to-br from-brand-red to-red-600 text-white rounded-3xl flex items-center justify-center text-4xl font-black mx-auto mb-8 shadow-2xl shadow-red-500/30 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                  {step.step}
                </div>
                <h4 className="font-bold text-xl text-slate-900 mb-3">{language === 'uz' ? step.titleUz : step.titleRu}</h4>
                <p className="text-slate-500 leading-relaxed">{language === 'uz' ? step.descUz : step.descRu}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Banner */}
      <div className="bg-brand-red py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-3xl md:text-4xl font-black text-white mb-4">
            {language === 'uz' ? 'Buyurtma berishga tayyormisiz?' : 'Готовы сделать заказ?'}
          </h3>
          <p className="text-red-100 text-lg mb-8 max-w-xl mx-auto">
            {language === 'uz' 
              ? 'Bizga qo\'ng\'iroq qiling yoki so\'rov yuboring. Mutaxassislarimiz 15 daqiqa ichida javob beradi.' 
              : 'Позвоните нам или отправьте заявку. Наши специалисты ответят в течение 15 минут.'}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:+998901234567" className="px-8 py-4 bg-white text-brand-red font-bold rounded-2xl hover:bg-gray-100 transition-colors shadow-xl inline-flex items-center justify-center gap-2">
              <Phone className="w-5 h-5" />
              +998 90 123 45 67
            </a>
            <button 
              onClick={() => setActiveTab('contact')}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-2xl hover:bg-white/20 transition-colors inline-flex items-center justify-center gap-2"
            >
              {t.sendMessage[language]}
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      {/* Testimonials - Premium */}
      <div className="bg-gray-50 py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-red/5 rounded-full blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2 block">{t.reviews[language]}</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">{t.testimonials[language]}</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((item, idx) => (
              <div key={idx} className="group bg-white p-8 rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-100 relative hover:-translate-y-2 transition-all duration-300">
                <Quote className="absolute top-6 right-6 w-12 h-12 text-brand-red/10 group-hover:text-brand-red/20 transition-colors"/>
                <div className="flex items-center gap-1 text-amber-400 mb-6">
                  {[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 fill-current"/>)}
                </div>
                <p className="text-slate-600 mb-8 leading-relaxed text-lg">{language === 'uz' ? item.textUz : item.textRu}</p>
                <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                  <img src={item.avatar} alt={item.name} className="w-14 h-14 rounded-2xl object-cover"/>
                  <div>
                    <div className="font-bold text-slate-900 text-lg">{item.name}</div>
                    <div className="text-sm text-slate-500">{language === 'uz' ? item.roleUz : item.roleRu}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* AI Chatbot Section - Premium */}
      <div className="relative py-24 overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"></div>
        <div className="absolute inset-0">
          {/* Floating particles effect */}
          <div className="absolute top-20 left-10 w-2 h-2 bg-brand-red rounded-full animate-pulse"></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-blue-500 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-purple-500 rounded-full animate-pulse delay-500"></div>
          <div className="absolute top-1/3 right-1/3 w-4 h-4 bg-brand-red/50 rounded-full animate-pulse delay-700"></div>
          <div className="absolute bottom-20 right-10 w-2 h-2 bg-cyan-400 rounded-full animate-pulse delay-1000"></div>
        </div>
        {/* Gradient orbs */}
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-brand-red/20 rounded-full blur-[120px] -translate-y-1/2"></div>
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-blue-500/20 rounded-full blur-[100px] translate-y-1/2"></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-purple-500/10 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2"></div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md text-white font-bold uppercase tracking-widest text-sm px-5 py-2.5 rounded-full mb-6 border border-white/20">
                <Bot className="w-4 h-4 text-brand-red" />
                {t.aiAssistant[language]}
                <Sparkles className="w-4 h-4 text-yellow-400" />
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 leading-tight">
                {t.aiChatTitle[language]}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-red to-orange-500">
                  {t.aiChatSubtitle[language]}
                </span>
              </h2>
              
              <p className="text-slate-400 text-lg mb-10 leading-relaxed max-w-xl">
                {t.aiChatDesc[language]}
              </p>

              {/* Feature Pills */}
              <div className="flex flex-wrap gap-4 mb-10 justify-center lg:justify-start">
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/10">
                  <Zap className="w-5 h-5 text-yellow-400" />
                  <span className="text-white font-semibold">{t.aiFeature1[language]}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/10">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-white font-semibold">{t.aiFeature2[language]}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-sm px-5 py-3 rounded-2xl border border-white/10">
                  <CheckCircle2 className="w-5 h-5 text-brand-red" />
                  <span className="text-white font-semibold">{t.aiFeature3[language]}</span>
                </div>
              </div>

              {/* CTA Button */}
              <button 
                onClick={() => {
                  const chatButton = document.querySelector('[data-chat-trigger]') as HTMLButtonElement;
                  if (chatButton) chatButton.click();
                }}
                className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-brand-red to-red-600 text-white font-bold px-8 py-4 rounded-2xl shadow-2xl shadow-red-500/30 hover:shadow-red-500/50 transition-all duration-300 hover:scale-105"
              >
                <MessageCircle className="w-6 h-6" />
                {t.startChat[language]}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                
                {/* Glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-brand-red to-red-600 rounded-2xl blur-xl opacity-50 group-hover:opacity-70 transition-opacity -z-10"></div>
              </button>
            </div>

            {/* Right - Chat Preview Card */}
            <div className="relative">
              {/* Main Chat Card */}
              <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl border border-white/20 shadow-2xl overflow-hidden">
                {/* Chat Header */}
                <div className="bg-gradient-to-r from-brand-red to-red-600 p-6">
                  <div className="flex items-center gap-4">
                    <div className="relative">
                      <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center shadow-lg">
                        <Bot className="w-8 h-8 text-brand-red" />
                      </div>
                      <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      </div>
                    </div>
                    <div>
                      <h4 className="text-white font-bold text-lg">Sofmetall AI</h4>
                      <p className="text-red-100 text-sm">{language === 'uz' ? 'Onlayn • Tayyor yordam berish' : 'Онлайн • Готов помочь'}</p>
                    </div>
                  </div>
                </div>

                {/* Chat Messages Preview */}
                <div className="p-6 space-y-4 bg-slate-900/50">
                  {/* AI Message */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-brand-red/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-brand-red" />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-none px-5 py-4 max-w-[80%] border border-white/10">
                      <p className="text-white text-sm leading-relaxed">
                        {language === 'uz' 
                          ? 'Salom! 👋 Men Sofmetall AI yordamchisiman. Sizga qanday yordam bera olaman?' 
                          : 'Привет! 👋 Я AI-помощник Sofmetall. Чем могу помочь?'}
                      </p>
                    </div>
                  </div>

                  {/* User Message */}
                  <div className="flex gap-3 justify-end">
                    <div className="bg-brand-red rounded-2xl rounded-tr-none px-5 py-4 max-w-[80%]">
                      <p className="text-white text-sm">
                        {language === 'uz' ? 'Armatura narxi qancha?' : 'Сколько стоит арматура?'}
                      </p>
                    </div>
                  </div>

                  {/* AI Response with typing indicator */}
                  <div className="flex gap-3">
                    <div className="w-10 h-10 bg-brand-red/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Bot className="w-5 h-5 text-brand-red" />
                    </div>
                    <div className="bg-white/10 backdrop-blur-sm rounded-2xl rounded-tl-none px-5 py-4 border border-white/10">
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                        <div className="w-2 h-2 bg-white/60 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Input Preview */}
                <div className="p-4 border-t border-white/10 bg-slate-900/30">
                  <div className="flex items-center gap-3 bg-white/5 rounded-xl px-4 py-3 border border-white/10">
                    <input 
                      type="text" 
                      placeholder={t.askAnything[language]}
                      className="flex-1 bg-transparent text-white placeholder-white/40 outline-none text-sm"
                      disabled
                    />
                    <button className="w-10 h-10 bg-brand-red rounded-xl flex items-center justify-center hover:bg-red-600 transition-colors">
                      <Send className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Decorative elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-brand-red to-orange-500 rounded-3xl rotate-12 opacity-20 blur-sm"></div>
              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-500 rounded-3xl -rotate-12 opacity-20 blur-sm"></div>
              
              {/* Stats badge */}
              <div className="absolute -bottom-4 right-8 bg-white rounded-2xl shadow-2xl px-6 py-4 border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-black text-slate-900">98%</div>
                    <div className="text-sm text-slate-500">{language === 'uz' ? 'Aniq javoblar' : 'Точных ответов'}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="bg-white py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2 block">FAQ</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900">{t.faq[language]}</h2>
          </div>
          <div className="space-y-4">
            {FAQ_ITEMS.map((item, idx) => (
              <FAQItem key={idx} item={item} language={language} />
            ))}
          </div>
        </div>
      </div>

      {/* Partners Section - Premium */}
      <div className="bg-slate-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2 block">{t.trusted[language]}</span>
            <h2 className="text-2xl md:text-3xl font-bold text-white">{t.partners[language]}</h2>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {PARTNERS.map((partner, idx) => (
              <div key={idx} className="px-8 py-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300">
                <span className="text-white font-bold text-xl">{partner.logoText}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  const renderCatalog = () => (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <span className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2 block">{t.catalog[language]}</span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4">{t.products[language]}</h2>
          <div className="h-1.5 w-24 bg-brand-red mx-auto rounded-full"></div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-10">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
             <div className="relative w-full md:w-1/3">
               <Search className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
               <input
                 type="text"
                 placeholder={t.search[language]}
                 value={searchQuery}
                 onChange={(e) => setSearchQuery(e.target.value)}
                 className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-brand-red focus:border-brand-red transition font-medium"
               />
             </div>
             <div className="flex gap-2 overflow-x-auto no-scrollbar w-full md:w-auto">
               {CATEGORIES.map(cat => (
                 <button
                   key={cat.id}
                   onClick={() => setSelectedCategory(cat.id)}
                   className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-bold transition-all whitespace-nowrap ${selectedCategory === cat.id ? 'bg-brand-red text-white shadow-lg' : 'bg-gray-100 text-slate-600 hover:bg-gray-200'}`}
                 >
                   <Filter size={16} />
                   {language === 'uz' ? cat.labelUz : cat.labelRu}
                 </button>
               ))}
             </div>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} language={language} onAddToCart={addToCart} />
          ))}
        </div>
        {filteredProducts.length === 0 && (
          <div className="text-center py-20 text-slate-500 text-lg">
            {language === 'uz' ? 'Mahsulot topilmadi' : 'Товары не найдены'}
          </div>
        )}
      </div>
    </div>
  );

  const renderServices = () => (
    <div className="min-h-screen bg-gray-50">
      {/* Services Hero */}
      <div className="bg-slate-900 py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2 block">{t.whatWeOffer[language]}</span>
            <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4">{t.services[language]}</h2>
            <p className="text-slate-400 max-w-2xl mx-auto">
              {language === 'uz' 
                ? 'Professional xizmatlar va yuqori sifatli metall mahsulotlari bilan sizga xizmat qilamiz' 
                : 'Мы предоставляем профессиональные услуги и качественную металлопродукцию'}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {SERVICES.map((service, idx) => (
              <div key={idx} className="bg-slate-800 p-8 rounded-3xl text-center group hover:bg-brand-red transition-colors duration-300 border border-slate-700 hover:border-brand-red">
                <div className="text-brand-red group-hover:text-white transition-colors duration-300 mb-6 flex justify-center">
                  {getIcon(service.icon)}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{language === 'uz' ? service.titleUz : service.titleRu}</h3>
                <p className="text-slate-400 group-hover:text-red-100 transition-colors duration-300">{language === 'uz' ? service.descUz : service.descRu}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Process Steps */}
      <div className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <span className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2 block">{t.howItWorks[language]}</span>
             <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">{t.processTitle[language]}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PROCESS_STEPS.map((step, idx) => (
              <div key={idx} className="text-center relative">
                 {idx < PROCESS_STEPS.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gray-200">
                       <ArrowRight className="absolute -right-3 -top-2.5 text-gray-300"/>
                    </div>
                 )}
                 <div className="w-20 h-20 bg-brand-red text-white rounded-2xl flex items-center justify-center text-3xl font-black mx-auto mb-6 shadow-xl relative z-10">
                   {step.step}
                 </div>
                 <h4 className="font-bold text-lg text-slate-900 mb-2">{language === 'uz' ? step.titleUz : step.titleRu}</h4>
                 <p className="text-slate-500 text-sm">{language === 'uz' ? step.descUz : step.descRu}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-brand-red py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
            {language === 'uz' ? 'Loyihangiz uchun maslahat kerakmi?' : 'Нужна консультация для вашего проекта?'}
          </h3>
          <p className="text-red-100 mb-8">
            {language === 'uz' 
              ? 'Mutaxassislarimiz sizga yordam berishga tayyor' 
              : 'Наши специалисты готовы вам помочь'}
          </p>
          <button 
            onClick={() => setActiveTab('contact')}
            className="bg-white text-brand-red px-8 py-4 rounded-xl font-bold hover:bg-gray-100 transition-colors shadow-lg"
          >
            {t.contactUs[language]}
          </button>
        </div>
      </div>
    </div>
  );
  
  const renderContact = () => (
    <div className="min-h-screen bg-gray-50 py-24">
       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
             <span className="text-brand-red font-bold uppercase tracking-widest text-sm mb-2 block">{t.getInTouch[language]}</span>
             <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900">{t.contact[language]}</h2>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             {/* Contact Info */}
             <div className="space-y-8">
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex items-start gap-6">
                   <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-7 h-7 text-brand-red"/>
                   </div>
                   <div>
                      <h4 className="font-bold text-lg text-slate-900 mb-1">{t.address[language]}</h4>
                      <p className="text-slate-500">Toshkent, Sergeli tumani, Yangi Sergeli MFY</p>
                   </div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex items-start gap-6">
                   <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Phone className="w-7 h-7 text-brand-red"/>
                   </div>
                   <div>
                      <h4 className="font-bold text-lg text-slate-900 mb-1">{t.phone[language]}</h4>
                      <a href="tel:+998901234567" className="text-slate-500 hover:text-brand-red transition">+998 90 123 45 67</a>
                   </div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 flex items-start gap-6">
                   <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center flex-shrink-0">
                      <Mail className="w-7 h-7 text-brand-red"/>
                   </div>
                   <div>
                      <h4 className="font-bold text-lg text-slate-900 mb-1">{t.email[language]}</h4>
                      <a href="mailto:info@sofmetall.uz" className="text-slate-500 hover:text-brand-red transition">info@sofmetall.uz</a>
                   </div>
                </div>
                {/* Map */}
                <div className="aspect-video rounded-3xl overflow-hidden shadow-lg border border-gray-100">
                   <iframe 
                     src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2996.0!2d69.2!3d41.3!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDE4JzAwLjAiTiA2OcKwMTInMDAuMCJF!5e0!3m2!1sen!2s!4v1600000000000!5m2!1sen!2s" 
                     width="100%" 
                     height="100%" 
                     style={{border:0}} 
                     allowFullScreen 
                     loading="lazy"
                     title="Sofmetall Location"
                   ></iframe>
                </div>
             </div>
             {/* Contact Form */}
             <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
                <h3 className="text-2xl font-bold text-slate-900 mb-8">{t.sendMessage[language]}</h3>
                <form className="space-y-6">
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{t.yourName[language]}</label>
                      <input type="text" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red focus:border-brand-red transition bg-gray-50"/>
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{t.yourPhone[language]}</label>
                      <input type="tel" className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red focus:border-brand-red transition bg-gray-50"/>
                   </div>
                   <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">{t.yourMessage[language]}</label>
                      <textarea rows={4} className="w-full px-5 py-4 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-red focus:border-brand-red transition bg-gray-50 resize-none"></textarea>
                   </div>
                   <button type="submit" className="w-full bg-brand-red text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-colors shadow-lg flex items-center justify-center gap-2">
                      <Send size={20}/> {t.send[language]}
                   </button>
                </form>
             </div>
          </div>
       </div>
    </div>
  );

  return (
    <div className="font-sans">
      <Navbar 
        language={language} 
        setLanguage={setLanguage} 
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        toggleCart={() => setIsCartOpen(true)}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      
      {activeTab === 'home' && renderHome()}
      {activeTab === 'catalog' && renderCatalog()}
      {activeTab === 'calculator' && renderCalculator()}
      {activeTab === 'services' && renderServices()}
      {activeTab === 'about' && renderAbout()}
      {activeTab === 'contact' && renderContact()}
      
      <CartSidebar 
        isOpen={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        items={cartItems} 
        language={language}
        updateQuantity={updateQuantity}
        removeItem={removeItem}
      />
      
      <AIChat language={language} />
      
      {/* Footer */}
      <footer className="bg-slate-900 text-white pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
             <div>
                <div className="flex items-center gap-2 mb-6">
                   <Factory className="w-8 h-8 text-brand-red"/>
                   <span className="text-2xl font-black">SOF<span className="text-brand-red">METALL</span></span>
                </div>
                <p className="text-slate-400 leading-relaxed mb-6">
                  {language === 'uz' ? 'O\'zbekistondagi eng ishonchli metall yetkazib beruvchi. Sifat va tezkorlik - bizning ustuvorligimiz.' : 'Самый надежный поставщик металла в Узбекистане. Качество и скорость - наши приоритеты.'}
                </p>
                <div className="flex gap-4">
                   <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-brand-red transition-colors"><Facebook size={20}/></a>
                   <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-brand-red transition-colors"><Instagram size={20}/></a>
                   <a href="#" className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-brand-red transition-colors"><Send size={20}/></a>
                </div>
             </div>
             <div>
                <h4 className="font-bold text-lg mb-6">{t.quickLinks[language]}</h4>
                <ul className="space-y-3">
                   <li><button onClick={() => setActiveTab('home')} className="text-slate-400 hover:text-white transition">{t.home[language]}</button></li>
                   <li><button onClick={() => setActiveTab('calculator')} className="text-slate-400 hover:text-white transition">{t.calculator[language]}</button></li>
                   <li><button onClick={() => setActiveTab('about')} className="text-slate-400 hover:text-white transition">{t.about[language]}</button></li>
                   <li><button onClick={() => setActiveTab('contact')} className="text-slate-400 hover:text-white transition">{t.contact[language]}</button></li>
                </ul>
             </div>
             <div>
                <h4 className="font-bold text-lg mb-6">{t.products[language]}</h4>
                <ul className="space-y-3">
                   {CATEGORIES.filter(c => c.id !== 'all').slice(0,5).map(cat => (
                      <li key={cat.id}><a href="#products" className="text-slate-400 hover:text-white transition">{language === 'uz' ? cat.labelUz : cat.labelRu}</a></li>
                   ))}
                </ul>
             </div>
             <div>
                <h4 className="font-bold text-lg mb-6">{t.contact[language]}</h4>
                <ul className="space-y-3 text-slate-400">
                   <li className="flex items-center gap-3"><MapPin size={18} className="text-brand-red flex-shrink-0"/> Toshkent, Sergeli</li>
                   <li className="flex items-center gap-3"><Phone size={18} className="text-brand-red flex-shrink-0"/> +998 90 123 45 67</li>
                   <li className="flex items-center gap-3"><Mail size={18} className="text-brand-red flex-shrink-0"/> info@sofmetall.uz</li>
                </ul>
             </div>
          </div>
          <div className="border-t border-slate-800 pt-8 text-center text-slate-500 text-sm">
             © {new Date().getFullYear()} Sofmetall. {language === 'uz' ? 'Barcha huquqlar himoyalangan.' : 'Все права защищены.'}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;