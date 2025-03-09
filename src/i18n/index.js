import { createSignal, createRoot } from 'solid-js';
import zhTranslation from './locales/zh.json';
import enTranslation from './locales/en.json';

// 创建词典
const dict = {
  en: enTranslation,
  zh: zhTranslation
};

// 创建可以在组件外部使用的国际化上下文
export const i18nRoot = createRoot(() => {
  // 获取用户首选语言
  const getUserLanguage = () => {
    const savedLang = localStorage.getItem('app-language');
    if (savedLang) return savedLang;
    
    // 从浏览器获取语言，如果不是zh开头的，默认为英文
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang?.startsWith('zh') ? 'zh' : 'en';
  };

  // 创建locale信号
  const [locale, setLocale] = createSignal(getUserLanguage());
  
  // 创建获取当前语言词典的函数
  const getDict = () => dict[locale()] || dict.en;
  
  // 简单的翻译函数，根据键获取文本
  const t = (key, params = {}, defaultValue = '') => {
    const dictionary = getDict();
    
    // 分割键以支持嵌套对象，例如 "app.title"
    const keys = key.split('.');
    let value = dictionary;
    
    // 遍历键获取嵌套值
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        value = null;
        break;
      }
    }
    
    // 如果没有找到值，使用默认值或键本身
    if (value === null || value === undefined) {
      value = defaultValue || key;
    }
    
    // 简单替换参数，例如 {{name}}
    if (typeof value === 'string') {
      return value.replace(/{{([^}]+)}}/g, (_, name) => {
        return params[name.trim()] || '';
      });
    }
    
    return value;
  };
  
  // 设置语言并保存到localStorage
  const changeLanguage = (newLocale) => {
    setLocale(newLocale);
    localStorage.setItem('app-language', newLocale);
  };
  
  // 获取当前语言
  const getCurrentLanguage = () => locale();
  
  return { locale, changeLanguage, getCurrentLanguage, t };
});

// 导出常用函数，方便组件使用
export const { t, changeLanguage, getCurrentLanguage } = i18nRoot; 