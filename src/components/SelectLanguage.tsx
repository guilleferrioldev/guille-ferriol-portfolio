import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const SelectLanguage = () => {
    const { i18n } = useTranslation();
    const [currentLanguage, setCurrentLanguage] = useState<string>('en');

    const getLanguageFromUrl = () => {
        const params = new URLSearchParams(window.location.search);
        return params.get('language') || 'en';
      };

    const setLanguageInUrl = (language: string) => {
        const params = new URLSearchParams(window.location.search);
        params.set('language', language);
        window.history.replaceState({}, '', `${window.location.pathname}?${params.toString()}`);
      };

    const initialLanguage = getLanguageFromUrl();

    useEffect(() => {
        setCurrentLanguage(initialLanguage)
    },[initialLanguage])

    useEffect(() => {
        i18n.changeLanguage(currentLanguage);
      }, [currentLanguage, i18n]);


    const handleChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
      const selectedLanguage = event.target.value;
      setCurrentLanguage(selectedLanguage)
      setLanguageInUrl(selectedLanguage);
    };

  return (
    <select
      className="w-[60px] h-7 rounded-lg font-semibold text-sm text-center pointer-events-auto cursor-pointer border-2 border-gray-900 border-opacity-80 hover:border-opacity-100 bg-transparent p-0"
      onChange={handleChangeLanguage}
      value={i18n.language}
    >
      <option value="en">EN</option>
      <option value="es">ES</option>
    </select>
  );
};

export default SelectLanguage;
