import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, X, Bot, Loader2, Sparkles, Calculator, Package, HelpCircle } from 'lucide-react';
import { Language, ChatMessage } from '../types';
import { TRANSLATIONS } from '../constants';
import { sendMessageToGemini } from '../services/geminiService';

interface AIChatProps {
  language: Language;
}

const AIChat: React.FC<AIChatProps> = ({ language }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const t = TRANSLATIONS;

  // Samimiy salomlashish xabari
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (language === 'uz') {
      if (hour < 12) return "Xayrli tong! ☀️ Men Sof - Sofmetall AI yordamchisiman. Bugun sizga qanday yordam bera olaman?";
      if (hour < 18) return "Salom do'stim! 👋 Men Sof - sizning metall bo'yicha yordamchingiz. Qanday savollaringiz bor?";
      return "Xayrli kech! 🌙 Men Sof - Sofmetall yordamchisi. Sizga qanday xizmat qila olaman?";
    } else {
      if (hour < 12) return "Доброе утро! ☀️ Я Соф - AI-помощник Sofmetall. Чем могу помочь сегодня?";
      if (hour < 18) return "Привет, друг! 👋 Я Соф - ваш помощник по металлу. Какие у вас вопросы?";
      return "Добрый вечер! 🌙 Я Соф - помощник Sofmetall. Чем могу быть полезен?";
    }
  };

  // Initialize with greeting
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{
        role: 'model',
        text: getGreeting()
      }]);
    }
  }, [language, messages.length]);

  // Scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) scrollToBottom();
  }, [messages, isOpen]);

  const handleSend = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: 'user', text: inputText };
    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Prepare history for API
      const history = messages.map(m => ({
        role: m.role === 'model' ? 'model' : 'user',
        parts: [{ text: m.text }]
      }));

      const responseText = await sendMessageToGemini(userMessage.text, language, history);
      
      setMessages(prev => [...prev, {
        role: 'model',
        text: responseText
      }]);
    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'model',
        text: language === 'uz' 
          ? "Voy, nimadur xato ketdi 😅 Qaytadan urinib ko'ring!" 
          : "Ой, что-то пошло не так 😅 Попробуйте ещё раз!",
        isError: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Quick action buttons
  const quickActions = language === 'uz' 
    ? [
        { icon: Package, text: "Mahsulotlar", query: "Qanday mahsulotlaringiz bor?" },
        { icon: Calculator, text: "Og'irlik", query: "Armatura og'irligini hisoblashga yordam bering" },
        { icon: HelpCircle, text: "Narxlar", query: "Eng ko'p sotiladigan mahsulotlar narxi qancha?" }
      ]
    : [
        { icon: Package, text: "Товары", query: "Какие у вас есть товары?" },
        { icon: Calculator, text: "Вес", query: "Помогите рассчитать вес арматуры" },
        { icon: HelpCircle, text: "Цены", query: "Сколько стоят популярные товары?" }
      ];

  const handleQuickAction = (query: string) => {
    setInputText(query);
  };

  return (
    <>
      {/* Floating Button with pulse animation */}
      <button
        data-chat-trigger
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 p-4 bg-gradient-to-r from-brand-red to-red-600 text-white rounded-full shadow-2xl hover:shadow-red-500/50 hover:scale-110 transition-all duration-300 z-40 ${isOpen ? 'hidden' : 'flex'} items-center justify-center group`}
      >
        <MessageSquare size={28} className="group-hover:scale-110 transition-transform" />
        {/* Pulse effect */}
        <span className="absolute inset-0 rounded-full bg-brand-red animate-ping opacity-30"></span>
        {/* Online indicator */}
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white flex items-center justify-center">
          <span className="w-2 h-2 bg-white rounded-full animate-pulse"></span>
        </span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-full max-w-[400px] h-[550px] bg-white rounded-3xl shadow-2xl z-50 flex flex-col overflow-hidden border border-gray-200 animate-slide-up">
          {/* Header - Premium gradient */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 p-5 flex items-center justify-between text-white relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-red/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
            
            <div className="flex items-center space-x-3 relative z-10">
              <div className="relative">
                <div className="bg-gradient-to-br from-brand-red to-red-600 p-2.5 rounded-2xl shadow-lg">
                  <Bot size={24} />
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-900 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></span>
                </span>
              </div>
              <div>
                <h3 className="font-bold text-base flex items-center gap-2">
                  Sof <Sparkles className="w-4 h-4 text-yellow-400" />
                </h3>
                <p className="text-xs text-slate-400 flex items-center">
                  {language === 'uz' ? 'Sofmetall AI Yordamchi' : 'AI-помощник Sofmetall'}
                </p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="relative z-10 w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                {msg.role === 'model' && (
                  <div className="w-8 h-8 bg-gradient-to-br from-brand-red/20 to-red-100 rounded-xl flex items-center justify-center mr-2 flex-shrink-0">
                    <Bot size={16} className="text-brand-red" />
                  </div>
                )}
                <div 
                  className={`max-w-[75%] rounded-2xl p-4 text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-gradient-to-r from-brand-red to-red-600 text-white rounded-tr-sm shadow-lg shadow-red-500/20' 
                      : 'bg-white text-slate-700 border border-gray-100 rounded-tl-sm shadow-md'
                  } ${msg.isError ? 'bg-red-50 text-red-600 border-red-200' : ''}`}
                >
                  <div className="whitespace-pre-wrap">{msg.text}</div>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start animate-fade-in">
                <div className="w-8 h-8 bg-gradient-to-br from-brand-red/20 to-red-100 rounded-xl flex items-center justify-center mr-2">
                  <Bot size={16} className="text-brand-red" />
                </div>
                <div className="bg-white rounded-2xl rounded-tl-sm p-4 border border-gray-100 shadow-md">
                  <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-brand-red rounded-full animate-bounce"></span>
                      <span className="w-2 h-2 bg-brand-red rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                      <span className="w-2 h-2 bg-brand-red rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
                    </div>
                    <span className="text-xs text-slate-400">
                      {language === 'uz' ? 'Sof yozmoqda...' : 'Соф печатает...'}
                    </span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Actions */}
          {messages.length <= 2 && !isLoading && (
            <div className="px-4 pb-2">
              <p className="text-xs text-slate-400 mb-2">
                {language === 'uz' ? '⚡ Tez savollar:' : '⚡ Быстрые вопросы:'}
              </p>
              <div className="flex gap-2 flex-wrap">
                {quickActions.map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickAction(action.query)}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-100 hover:bg-brand-red hover:text-white text-slate-600 rounded-full text-xs font-medium transition-all duration-200"
                  >
                    <action.icon size={12} />
                    {action.text}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-gray-100">
            <div className="flex items-center gap-3 bg-gray-100 rounded-2xl p-1.5 pl-4">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={language === 'uz' ? "Xabar yozing..." : "Введите сообщение..."}
                className="flex-1 bg-transparent border-none text-sm focus:outline-none text-slate-700 placeholder-slate-400"
              />
              <button
                onClick={handleSend}
                disabled={isLoading || !inputText.trim()}
                className="p-2.5 bg-gradient-to-r from-brand-red to-red-600 text-white rounded-xl hover:shadow-lg hover:shadow-red-500/30 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 disabled:hover:shadow-none"
              >
                <Send size={18} />
              </button>
            </div>
            <p className="text-[10px] text-slate-400 text-center mt-2">
              {language === 'uz' ? 'Powered by Gemini AI 🤖' : 'Работает на Gemini AI 🤖'}
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default AIChat;