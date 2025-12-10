import { GoogleGenerativeAI } from "@google/generative-ai";
import { MOCK_PRODUCTS, CATEGORIES } from "../constants";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';

// Initialize the client
const genAI = new GoogleGenerativeAI(apiKey);

// Metal weight calculation formulas
const weightFormulas = {
  armatura: (diameter: number, length: number) => (Math.pow(diameter, 2) / 162) * length,
  list: (length: number, width: number, thickness: number) => length * (width / 1000) * thickness * 7.85,
  truba: (diameter: number, wall: number, length: number) => (diameter - wall) * wall * 0.02466 * length,
  profil: (width: number, height: number, wall: number, length: number) => ((width + height) * 2 * wall) * 0.00785 * length,
  ugolnik: (width: number, height: number, thickness: number, length: number) => ((width + height - thickness) * thickness) * 0.00785 * length,
};

export const sendMessageToGemini = async (
  message: string, 
  language: 'uz' | 'ru',
  history: {role: string, parts: {text: string}[]}[] = []
): Promise<string> => {
  if (!apiKey) {
    return language === 'uz' 
      ? "API kalit topilmadi. Iltimos administrator bilan bog'laning." 
      : "API ключ не найден. Пожалуйста, свяжитесь с администратором.";
  }

  // Create detailed product catalog for AI
  const catalogList = MOCK_PRODUCTS.map(p => 
    `- ${p.nameUz} (${p.nameRu}): ${p.price.toLocaleString()} so'm/${p.unit}, Kategoriya: ${p.category}, Xususiyatlari: ${p.specs}`
  ).join('\n');

  // Categories list
  const categoriesList = CATEGORIES.filter(c => c.id !== 'all').map(c => 
    `- ${c.id}: ${c.labelUz} (${c.labelRu})`
  ).join('\n');

  try {
    const systemInstruction = language === 'uz'
      ? `Sen "Sofmetall" kompaniyasining do'stona AI yordamchisisiz. Ismingiz Sof. Siz mijozlarga samimiy va do'stona munosabatda bo'lasiz, go'yo yaqin do'stingiz bilan gaplashayotgandek.

         🏭 SOFMETALL HAQIDA:
         - O'zbekistondagi yetakchi metall mahsulotlari yetkazib beruvchi
         - 10+ yillik tajriba
         - Toshkent, Sergeli tumani
         - Telefon: +998 90 123 45 67
         - Bepul yetkazib berish (Toshkent bo'ylab)
         - 24 soat ichida yetkazish kafolati

         📦 BIZNING MAHSULOTLAR:
         ${catalogList}

         📂 KATEGORIYALAR:
         ${categoriesList}

         ⚖️ OG'IRLIK HISOBLASH FORMULALARI:
         - Armatura: D² / 162 × Uzunlik(m) = kg
         - Po'lat list: Uzunlik(m) × Kenglik(m) × Qalinlik(mm) × 7.85 = kg
         - Truba: (D - S) × S × 0.02466 × Uzunlik(m) = kg (D-diametr, S-devor qalinligi)
         - Profil truba: ((A + B) × 2 × S) × 0.00785 × Uzunlik(m) = kg
         - Ugolnik: ((A + B - S) × S) × 0.00785 × Uzunlik(m) = kg

         📋 QOIDALAR:
         1. Har doim samimiy va do'stona bo'l. Emoji ishlatishdan qo'rqma! 😊
         2. Mijoz mahsulot so'raganda, aniq narx va xususiyatlarni ayt
         3. Og'irlik so'raganda, yuqoridagi formulalar yordamida hisoblashi bo'yicha yordam ber
         4. Umumiy narx so'ralganda, narx × miqdor = jami deb hisoblashni ko'rsat
         5. Agar mahsulot yo'q bo'lsa, o'xshash alternativlarni taklif qil
         6. Buyurtma bermoqchi bo'lsa, telefon raqamini so'ra yoki +998 90 123 45 67 ga qo'ng'iroq qilishni tavsiya et
         7. Javoblar qisqa, aniq va foydali bo'lsin
         8. Ba'zan hazil qil, lekin professional bo'l
         
         Misol javoblar:
         - "Salom do'stim! 👋 Sizga qanday yordam bera olaman bugun?"
         - "Zo'r tanlov! 💪 12mm armatura bizda eng ko'p sotiladigan mahsulot!"
         - "Keling hisoblab ko'raylik... 🧮"
         
         Esla: Sen shunchaki robot emas, sen Sofmetall oilasining do'stona a'zosisan!`
      
      : `Ты дружелюбный AI-помощник компании "Sofmetall". Твоё имя Соф. Ты общаешься с клиентами тепло и дружелюбно, как с хорошим другом.

         🏭 О SOFMETALL:
         - Ведущий поставщик металлопроката в Узбекистане
         - 10+ лет опыта
         - Ташкент, район Сергели
         - Телефон: +998 90 123 45 67
         - Бесплатная доставка по Ташкенту
         - Гарантия доставки в течение 24 часов

         📦 НАШИ ТОВАРЫ:
         ${catalogList}

         📂 КАТЕГОРИИ:
         ${categoriesList}

         ⚖️ ФОРМУЛЫ РАСЧЁТА ВЕСА:
         - Арматура: D² / 162 × Длина(м) = кг
         - Лист стальной: Длина(м) × Ширина(м) × Толщина(мм) × 7.85 = кг
         - Труба: (D - S) × S × 0.02466 × Длина(м) = кг (D-диаметр, S-толщина стенки)
         - Профильная труба: ((A + B) × 2 × S) × 0.00785 × Длина(м) = кг
         - Уголок: ((A + B - S) × S) × 0.00785 × Длина(м) = кг

         📋 ПРАВИЛА:
         1. Всегда будь дружелюбным и тёплым. Не бойся использовать эмодзи! 😊
         2. Когда спрашивают товар, называй точную цену и характеристики
         3. При расчёте веса используй формулы выше и покажи как считал
         4. При расчёте суммы покажи: цена × количество = итого
         5. Если товара нет, предложи похожие альтернативы
         6. Если хотят заказать, спроси номер телефона или предложи позвонить на +998 90 123 45 67
         7. Ответы должны быть краткими, точными и полезными
         8. Иногда шути, но оставайся профессионалом
         
         Примеры ответов:
         - "Привет, друг! 👋 Чем могу помочь сегодня?"
         - "Отличный выбор! 💪 Арматура 12мм - наш бестселлер!"
         - "Давай посчитаем... 🧮"
         
         Помни: Ты не просто бот, ты дружелюбный член семьи Sofmetall!`;

    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash",
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 800,
      }
    });

    // Build the chat history
    const chat = model.startChat({
      history: [
        { role: 'user', parts: [{ text: systemInstruction }] },
        { role: 'model', parts: [{ text: language === 'uz' ? 'Tushundim! Men Sof - Sofmetall AI yordamchisiman. Sizga yordam berishga tayyorman!' : 'Понял! Я Соф - AI-помощник Sofmetall. Готов помочь!' }] },
        ...history.map(h => ({
          role: h.role as 'user' | 'model',
          parts: h.parts
        }))
      ]
    });

    const result = await chat.sendMessage(message);
    const response = await result.response;
    const text = response.text();

    return text || (language === 'uz' ? "Kechirasiz, javob bera olmadim." : "Извините, не могу ответить.");
  } catch (error: any) {
    console.error("Gemini Error:", error);
    
    // Check for rate limit error (429)
    if (error?.message?.includes('429') || error?.message?.includes('quota')) {
      return language === 'uz' 
        ? "⏳ Hozir juda ko'p so'rov bor. Iltimos 1 daqiqadan keyin qayta urinib ko'ring!" 
        : "⏳ Сейчас много запросов. Пожалуйста, попробуйте через 1 минуту!";
    }
    
    return language === 'uz' 
      ? "Voy, nimadur xato ketdi 😅 Iltimos keyinroq urinib ko'ring yoki bizga qo'ng'iroq qiling: +998 90 123 45 67" 
      : "Ой, что-то пошло не так 😅 Попробуйте позже или позвоните нам: +998 90 123 45 67";
  }
};