import { useTranslation } from "react-i18next";

const TechnicalSkills = () => {
   const { t } = useTranslation(); 

    return (
        <>
            <h1 className="md:text-lg font-semibold text-brown">{t("technical skills")}</h1>
            <ul className="list-disc pl-5 text-sm leading-snug">
                <li> {t("data manipulation")}</li>
                <li> {t("dsa")}</li>
                <li> {t("design patterns")}</li>
                <li> {t("design principles")}</li>
                <li> {t("paradigms")}</li>
                <li> {t("software architecture")}</li>
                <li> {t("system design")}</li>
                <li> {t("rest apis")}</li>
                <li> {t("automated testing")}</li>
            </ul>
        </>
    )
}

export default TechnicalSkills;

