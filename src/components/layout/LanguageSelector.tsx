import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' },
  { code: 'ar', name: 'العربية' },
];

const NAVBAR_BLUE = "#22eaff";

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);
  const isRtl = i18n.language === 'ar';

  const toggleDropdown = () => setIsOpen(!isOpen);

  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  // Positionnement conditionnel pour RTL et LTR
  const dropdownPosition = isRtl ? 'left-0' : 'right-0';

  return (
    <div className="relative">
      <button
        onClick={toggleDropdown}
        className="flex items-center space-x-1 bg-background-light/80 hover:bg-background-light p-2 rounded-full backdrop-blur-sm"
        aria-label="Select language"
      >
        <Globe size={20} color="#22eaff" />
      </button>

      {isOpen && (
        <div
          className={`absolute ${dropdownPosition} mt-2 w-40 rounded-md shadow-lg bg-background-light/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5 z-50`}
          style={{
            maxWidth: 'calc(100vw - 2rem)',
            [isRtl ? 'marginLeft' : 'marginRight']: '1rem',
            transform: isRtl ? 'translateX(0)' : 'translateX(0)',
          }}
        >
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`${
                  i18n.language === lang.code ? 'text-primary' : 'text-white'
                } block w-full text-left px-4 py-2 text-sm font-medium hover:bg-background-light transition-colors duration-200`}
                role="menuitem"
                style={{
                  letterSpacing: "0.04em",
                  color: i18n.language === lang.code ? '#22eaff' : '#fff',
                  fontFamily: "'Roboto', 'Noto Sans Arabic', sans-serif", // Police cohérente avec secours pour l'arabe
                  fontWeight: 500, // Forcer la graisse (équivalent à font-medium)
                }}
                onMouseOver={(e) => (e.currentTarget.style.color = NAVBAR_BLUE)}
                onMouseOut={(e) => (e.currentTarget.style.color = i18n.language === lang.code ? '#22eaff' : '#fff')}
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
