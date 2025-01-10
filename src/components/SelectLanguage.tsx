import { useTranslation } from 'react-i18next';

const SelectLanguage = () => {
    const { i18n } = useTranslation();

    const handleChangeLanguage = (event: React.ChangeEvent<HTMLSelectElement>) => {
      i18n.changeLanguage(event.target.value);
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
    )
};



export default SelectLanguage;

