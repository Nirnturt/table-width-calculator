import { createSignal, createEffect } from 'solid-js';
import { changeLanguage, getCurrentLanguage } from '../i18n';

function LanguageSwitcher() {
  const [currentLang, setCurrentLang] = createSignal(getCurrentLanguage());

  // 切换语言
  const toggleLanguage = () => {
    const newLang = currentLang() === 'en' ? 'zh' : 'en';
    changeLanguage(newLang);
    setCurrentLang(newLang);
  };

  // 监听语言变化
  createEffect(() => {
    setCurrentLang(getCurrentLanguage());
  });

  return (
    <button
      onClick={toggleLanguage}
      class="p-2 rounded-md bg-element dark:bg-element-dark hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
      aria-label="切换语言"
      title={currentLang() === 'en' ? 'Switch to Chinese' : 'Switch to English'}
    >
      <span class="block h-5 w-5 flex items-center justify-center text-content dark:text-content-dark">
        {currentLang() === 'en' ? '🇨🇳' : '🇺🇸'}
      </span>
    </button>
  );
}

export default LanguageSwitcher; 