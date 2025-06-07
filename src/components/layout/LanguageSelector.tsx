import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', key: 'lang.en', emoji: '🇬🇧' },
  { code: 'fr', key: 'lang.fr', emoji: '🇫🇷' },
  { code: 'es', key: 'lang.es', emoji: '🇪🇸' },
  { code: 'ar', key: 'lang.ar', emoji: '🇸🇦' },
];

const LanguageSelector: React.FC = () => {
  const { i18n, t } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);
    setIsOpen(false);
  };

  const dropdownPosition =
    i18n.dir(i18n.language) === 'rtl'
      ? 'left-0 origin-top-left'
      : 'right-0 origin-top-right';

  return (
    <div className="relative z-50">
      <button
        onClick={toggleDropdown}
        className="flex items-center bg-black/60 hover:bg-black/80 p-2 rounded-full backdrop-blur-sm"
        aria-label={t('selectLanguage')}
        type="button"
      >
        <Globe size={20} color="#22eaff" />
      </button>

      {isOpen && (
        <div
          className={`absolute ${dropdownPosition} mt-2 w-44 rounded-md shadow-lg bg-black/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5 transform transition-transform duration-200`}
          dir={i18n.dir(i18n.language)}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`${
                  i18n.language === lang.code ? 'text-[#22eaff]' : 'text-white'
                } flex items-center gap-2 w-full text-left px-4 py-2 text-sm hover:bg-black/70`}
                role="menuitem"
              >
                <span className="text-base">{lang.emoji}</span>
                {t(lang.key)}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
