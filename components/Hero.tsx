import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, Play, Shield, Truck, Clock, Award } from 'lucide-react';
import { Language } from '../types';
import { TRANSLATIONS, HERO_SLIDES } from '../constants';

interface HeroProps {
  language: Language;
  onCtaClick?: () => void;
}

const Hero: React.FC<HeroProps> = ({ language, onCtaClick }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const t = TRANSLATIONS;

  // Auto-play slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      setTimeout(() => setIsAnimating(false), 1000);
    }
  };

  const stats = [
    { value: '10+', labelUz: 'Yillik tajriba', labelRu: 'Лет опыта', icon: <Award className="w-5 h-5" /> },
    { value: '5000+', labelUz: 'Mijozlar', labelRu: 'Клиентов', icon: <Shield className="w-5 h-5" /> },
    { value: '24/7', labelUz: 'Qo\'llab-quvvatlash', labelRu: 'Поддержка', icon: <Clock className="w-5 h-5" /> },
    { value: '50k+', labelUz: 'Tonna yetkazildi', labelRu: 'Тонн доставлено', icon: <Truck className="w-5 h-5" /> },
  ];

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-slate-900">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.02)_25%,rgba(255,255,255,0.02)_50%,transparent_50%,transparent_75%,rgba(255,255,255,0.02)_75%)] bg-[length:60px_60px]"></div>
      </div>

      {/* Slides */}
      {HERO_SLIDES.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-1000 ease-out ${
            index === currentSlide ? 'opacity-100 z-10 scale-100' : 'opacity-0 z-0 scale-105'
          }`}
        >
          {/* Background Image with Ken Burns Effect */}
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-transform duration-[8000ms] ease-out ${
              index === currentSlide ? 'scale-110' : 'scale-100'
            }`}
            style={{ backgroundImage: `url(${slide.image})` }}
          ></div>
          
          {/* Premium Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/80 to-slate-900/30"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-transparent to-slate-900/40"></div>
          
          {/* Decorative Elements */}
          <div className="absolute top-20 right-20 w-96 h-96 bg-brand-red/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        </div>
      ))}

      {/* Main Content */}
      <div className="relative z-20 h-full min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 text-sm text-white/90">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                {language === 'uz' ? "O'zbekiston №1 metall yetkazuvchi" : "Поставщик металла №1 в Узбекистане"}
              </div>

              {/* Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-black tracking-tight text-white leading-[1.1]">
                {language === 'uz' ? (
                  <>
                    <span className="block">Ishonchli</span>
                    <span className="block text-brand-red">Metall Hamkor</span>
                  </>
                ) : (
                  <>
                    <span className="block">Надежный</span>
                    <span className="block text-brand-red">Металл Партнер</span>
                  </>
                )}
              </h1>

              {/* Subtitle */}
              <p className="text-lg sm:text-xl text-gray-300 max-w-xl leading-relaxed">
                {language === 'uz' 
                  ? "10 yildan ortiq tajriba bilan O'zbekiston bo'ylab sifatli metall mahsulotlarini eng qulay narxlarda yetkazib beramiz. Qurilish va sanoat uchun ishonchli tanlov."
                  : "Более 10 лет опыта поставки качественного металлопроката по всему Узбекистану по лучшим ценам. Надежный выбор для строительства и промышленности."
                }
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button 
                  onClick={onCtaClick}
                  className="group relative px-8 py-4 bg-brand-red text-white font-bold rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-red-500/30 hover:-translate-y-1"
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {t.ctaButton[language]}
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-red-700 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                </button>
                
                <button className="group flex items-center justify-center gap-3 px-8 py-4 bg-white/5 backdrop-blur-md border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-all duration-300">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-brand-red group-hover:scale-110 transition-all">
                    <Play className="w-4 h-4 ml-0.5" fill="currentColor" />
                  </div>
                  {language === 'uz' ? "Video ko'rish" : "Смотреть видео"}
                </button>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1,2,3,4,5].map((i) => (
                    <div key={i} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-gradient-to-br from-gray-300 to-gray-400 flex items-center justify-center text-xs font-bold text-slate-700">
                      {['A', 'J', 'D', 'M', 'S'][i-1]}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="flex items-center gap-1 text-yellow-400">
                    {[1,2,3,4,5].map((i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-400 mt-1">
                    <span className="text-white font-semibold">5,000+</span> {language === 'uz' ? 'mamnun mijozlar' : 'довольных клиентов'}
                  </p>
                </div>
              </div>
            </div>

            {/* Right Content - Stats Card */}
            <div className="hidden lg:block">
              <div className="relative">
                {/* Floating Stats Cards */}
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, idx) => (
                    <div 
                      key={idx}
                      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-6 hover:bg-white/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                        idx % 2 === 0 ? 'mt-0' : 'mt-8'
                      }`}
                    >
                      <div className="w-12 h-12 bg-brand-red/20 rounded-2xl flex items-center justify-center text-brand-red mb-4">
                        {stat.icon}
                      </div>
                      <div className="text-3xl sm:text-4xl font-black text-white mb-1">{stat.value}</div>
                      <div className="text-gray-400 text-sm font-medium">
                        {language === 'uz' ? stat.labelUz : stat.labelRu}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Decorative Circle */}
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full"></div>
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button 
        onClick={prevSlide}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 text-white backdrop-blur-xl transition-all duration-300 border border-white/10 hidden md:flex items-center justify-center hover:scale-110"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-30 w-14 h-14 rounded-full bg-white/5 hover:bg-white/10 text-white backdrop-blur-xl transition-all duration-300 border border-white/10 hidden md:flex items-center justify-center hover:scale-110"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-3">
        {HERO_SLIDES.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`relative h-1 rounded-full transition-all duration-500 overflow-hidden ${
              idx === currentSlide ? 'w-12 bg-brand-red' : 'w-6 bg-white/30 hover:bg-white/50'
            }`}
          />
        ))}
      </div>

      {/* Bottom Gradient Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent z-20"></div>
    </div>
  );
};

export default Hero;