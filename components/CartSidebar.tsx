import React from 'react';
import { X, Trash2, Plus, Minus } from 'lucide-react';
import { CartItem, Language } from '../types';
import { TRANSLATIONS } from '../constants';

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  language: Language;
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onCheckout: () => void;
}

const CartSidebar: React.FC<CartSidebarProps> = ({
  isOpen,
  onClose,
  items,
  language,
  onUpdateQuantity,
  onRemoveItem,
  onCheckout
}) => {
  const t = TRANSLATIONS;
  
  if (!isOpen) return null;

  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm transition-opacity" onClick={onClose}></div>
      
      <div className="absolute inset-y-0 right-0 max-w-full flex">
        <div className="w-screen max-w-md bg-white shadow-xl flex flex-col h-full animate-slide-in-right">
          
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-6 border-b border-gray-100 sm:px-6">
            <h2 className="text-lg font-bold text-slate-900">{t.cart[language]}</h2>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-500">
              <X size={24} />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 space-y-6">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-slate-500">
                <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <Trash2 size={32} className="opacity-30" />
                </div>
                <p className="text-lg font-medium">{t.emptyCart[language]}</p>
              </div>
            ) : (
              items.map((item) => (
                <div key={item.id} className="flex py-2">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                    <img
                      src={item.image}
                      alt={language === 'uz' ? item.nameUz : item.nameRu}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>

                  <div className="ml-4 flex flex-1 flex-col">
                    <div>
                      <div className="flex justify-between text-base font-medium text-slate-900">
                        <h3 className="line-clamp-1">{language === 'uz' ? item.nameUz : item.nameRu}</h3>
                        <p className="ml-4">{item.price.toLocaleString()}</p>
                      </div>
                      <p className="mt-1 text-sm text-slate-500">{item.specs}</p>
                    </div>
                    <div className="flex flex-1 items-end justify-between text-sm">
                      <div className="flex items-center border border-gray-300 rounded-md">
                        <button 
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          className="p-1 hover:bg-gray-100 text-slate-600"
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-2 font-medium">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-gray-100 text-slate-600"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() => onRemoveItem(item.id)}
                        className="font-medium text-brand-red hover:text-red-800 flex items-center"
                      >
                        <Trash2 size={16} className="mr-1" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          <div className="border-t border-gray-100 px-4 py-6 sm:px-6 bg-gray-50">
            <div className="flex justify-between text-base font-bold text-slate-900 mb-4">
              <p>{t.total[language]}</p>
              <p>{total.toLocaleString()} {t.som[language]}</p>
            </div>
            <button
              onClick={onCheckout}
              disabled={items.length === 0}
              className={`w-full flex items-center justify-center rounded-md border border-transparent px-6 py-3 text-base font-medium text-white shadow-sm ${
                items.length === 0 ? 'bg-gray-300 cursor-not-allowed' : 'bg-brand-red hover:bg-red-700'
              }`}
            >
              {t.checkout[language]}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSidebar;