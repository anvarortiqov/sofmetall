import React from 'react';
import { ShoppingCart, Check } from 'lucide-react';
import { Product, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface ProductCardProps {
  product: Product;
  language: Language;
  onAddToCart: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, language, onAddToCart }) => {
  const t = TRANSLATIONS;
  const name = language === 'uz' ? product.nameUz : product.nameRu;
  const [isAdded, setIsAdded] = React.useState(false);

  const handleAdd = () => {
    onAddToCart(product);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div className="group bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl hover:shadow-gray-200/50 transition-all duration-300 flex flex-col h-full transform hover:-translate-y-1">
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={name} 
          className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className="absolute top-3 left-3">
          <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
            {product.category}
          </span>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-5 flex-1 flex flex-col">
        <div className="flex-1">
          <h3 className="text-lg font-bold text-slate-900 mb-2 line-clamp-2 leading-tight group-hover:text-brand-red transition-colors">
            {name}
          </h3>
          <p className="text-sm text-slate-500 mb-4 flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-gray-300 rounded-full"></span>
            {product.specs}
          </p>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-50 flex items-center justify-between">
          <div>
            <div className="text-brand-red font-extrabold text-xl leading-none">
              {product.price.toLocaleString()}
              <span className="text-xs text-slate-400 font-medium ml-1">{t.som[language]}</span>
            </div>
            <span className="text-xs text-slate-400 font-medium mt-1 block">
              1 {product.unit} {t.price[language].toLowerCase()}
            </span>
          </div>
          
          <button
            onClick={handleAdd}
            className={`p-3 rounded-xl transition-all duration-300 flex items-center justify-center shadow-sm ${
              isAdded 
                ? 'bg-green-500 text-white' 
                : 'bg-slate-900 text-white hover:bg-brand-red'
            }`}
            aria-label="Add to cart"
          >
            {isAdded ? <Check size={20} /> : <ShoppingCart size={20} />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;