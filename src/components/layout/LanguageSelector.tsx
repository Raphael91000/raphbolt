import React from 'react';
import { useTranslation } from 'react-i18next';
import { Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'es', name: 'Español' }
];

const LanguageSelector: React.FC = () => {
  const { i18n } = useTranslation();
  const [isOpen, setIsOpen] = React.useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);
  
  const changeLanguage = (langCode: string) => {
    i18n.changeLanguage(langCode);
    setIsOpen(false);
  };

  return (
    <div className="fixed top-5 right-5 z-50">
      <button 
        onClick={toggleDropdown}
        className="flex items-center space-x-1 bg-background-light/80 hover:bg-background-light p-2 rounded-full backdrop-blur-sm"
        aria-label="Select language"
      >
        <Globe size={20} color="#00DCD9" />
      </button>
      
      {isOpen && (
        <div className="absolute right-0 mt-2 w-40 rounded-md shadow-lg bg-background-light/90 backdrop-blur-sm ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => changeLanguage(lang.code)}
                className={`${
                  i18n.language === lang.code ? 'text-primary' : 'text-white'
                } block w-full text-left px-4 py-2 text-sm hover:bg-background-light`}
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