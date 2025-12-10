
import React from 'react';
import { ShoppingCart, Menu, X, Search, Phone, Calculator } from 'lucide-react';
import { Language, Translation } from '../types';
import { TRANSLATIONS } from '../constants';

interface NavbarProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  cartCount: number;
  toggleCart: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({ 
  language, 
  setLanguage, 
  cartCount, 
  toggleCart,
  activeTab,
  setActiveTab
}) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const t = TRANSLATIONS;

  const navLinks = [
    { id: 'home', label: t.home[language] },
    { id: 'catalog', label: t.catalog[language] },
    { id: 'calculator', label: t.calculator[language] },
    { id: 'services', label: t.services[language] },
    { id: 'about', label: t.about[language] },
    { id: 'contact', label: t.contact[language] },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          
          {/* Logo */}
          <div 
            className="flex-shrink-0 flex items-center cursor-pointer gap-2 group"
            onClick={() => setActiveTab('home')}
          >
            <div className="w-10 h-10 bg-brand-red rounded-lg flex items-center justify-center text-white font-black text-xl shadow-lg shadow-red-500/30 group-hover:scale-105 transition-transform">
              S
            </div>
            <span className="font-bold text-2xl tracking-tight text-slate-900 group-hover:text-brand-dark transition-colors">
              SOF<span className="text-brand-red">METALL</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-6 lg:space-x-8 items-center">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
                className={`text-sm font-bold uppercase tracking-wide transition-all ${
                  activeTab === link.id 
                    ? 'text-brand-red border-b-2 border-brand-red pb-1' 
                    : 'text-slate-600 hover:text-brand-red hover:pb-1'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <div className="flex items-center text-slate-600 bg-gray-100 py-1.5 px-3 rounded-full hidden lg:flex">
              <Phone size={16} className="mr-2 text-brand-red" />
              <span className="text-xs font-bold">+998 90 123-45-67</span>
            </div>

            {/* Language Switcher */}
            <div className="flex border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setLanguage('uz')}
                className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                  language === 'uz' ? 'bg-brand-red text-white' : 'bg-white text-slate-600 hover:bg-gray-100'
                }`}
              >
                UZ
              </button>
              <button
                onClick={() => setLanguage('ru')}
                className={`px-3 py-1.5 text-xs font-bold transition-colors ${
                  language === 'ru' ? 'bg-brand-red text-white' : 'bg-white text-slate-600 hover:bg-gray-100'
                }`}
              >
                RU
              </button>
            </div>

            {/* Cart Icon */}
            <button 
              onClick={toggleCart}
              className="relative p-2 text-slate-600 hover:text-brand-red transition-all transform hover:scale-110"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 inline-flex items-center justify-center w-5 h-5 text-xs font-bold leading-none text-white transform bg-brand-red rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center md:hidden gap-4">
             <button 
              onClick={toggleCart}
              className="relative p-2 text-slate-600"
            >
              <ShoppingCart size={24} />
              {cartCount > 0 && (
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-brand-red rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-slate-600 hover:text-slate-900 focus:outline-none"
            >
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 animate-slide-in-right">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  setActiveTab(link.id);
                  setIsMenuOpen(false);
                }}
                className={`block w-full text-left px-3 py-4 rounded-md text-base font-bold uppercase ${
                  activeTab === link.id ? 'bg-red-50 text-brand-red border-l-4 border-brand-red' : 'text-slate-700 hover:bg-gray-50'
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="px-3 py-4 flex items-center justify-between border-t border-gray-100 mt-2">
               <span className="text-slate-600 font-medium">Til / Язык</span>
               <div className="flex border border-gray-300 rounded overflow-hidden">
                <button
                  onClick={() => setLanguage('uz')}
                  className={`px-3 py-1 text-xs font-bold ${
                    language === 'uz' ? 'bg-brand-red text-white' : 'bg-white text-slate-600'
                  }`}
                >
                  UZ
                </button>
                <button
                  onClick={() => setLanguage('ru')}
                  className={`px-3 py-1 text-xs font-bold ${
                    language === 'ru' ? 'bg-brand-red text-white' : 'bg-white text-slate-600'
                  }`}
                >
                  RU
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
