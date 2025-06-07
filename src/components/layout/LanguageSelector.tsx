import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'ar', name: 'العربية' },
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  useEffect(() => {
    console.log("LanguageSelector - Langue actuelle :", i18n.language);
  }, [i18n.language]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (langCode: string) => {
    console.log("Changement de langue vers :", langCode);
    i18n.changeLanguage(langCode);
    localStorage.setItem('i18nextLng', langCode);
    setIsOpen(false);
  };

  const dropdownPosition = i18n.dir(i18n.language) === 'rtl' ? 'left-0 origin-top-left' : 'right-0 origin-top-right';

  return (
    <div className="relative z-50">
      <button
        onClick={toggleDropdown}
        className="flex items-center bg-black/60 hover:bg-black/80 p-2 rounded-full backdrop-blur-sm"
        aria-label="Select language"
        type="button"
      >
        <Globe size={20} color="#22eaff" />
      </button>

      {isOpen && (
        <div
          className={`absolute ${dropdownPosition} mt-2 w-40 rounded-md shadow-lg bg-black/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5 transform transition-transform duration-200`}
          dir={i18n.dir(i18n.language)}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`${
                  i18n.language === lang.code ? 'text-[#22eaff]' : 'text-white'
                } block w-full text-left px-4 py-2 text-sm hover:bg-black/70`}
                role="menuitem"
              >
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;