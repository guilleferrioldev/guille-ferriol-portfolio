import { useTranslation } from "react-i18next";

const SoftSkills = () => {
  const { t } = useTranslation();

  return (
    <>
            <h1 className="md:text-2xl font-semibold text-brown mt-5">{t("soft skills")}</h1>
            <ul className="list-disc pl-5">
                <li> {t("languages")} </li>
                <li> {t("troubleshooting")} </li>
                <li> {t("teamwork")} </li>
                <li> {t("adaptability")} </li>
                <li> {t("time management")} </li>
            </ul>
        </>
  );
};

export default SoftSkills;