import { useTranslation } from "react-i18next";

const AISkills = () => {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="md:text-lg font-semibold text-brown mt-3">{t("ai assisted development")}</h1>
      <ul className="list-disc pl-5 text-sm leading-snug">
        <li> {t("ai tools")}</li>
        <li> {t("spec driven development")} · {t("harness engineering")} · {t("loop engineering")}</li>
      </ul>
    </>
  );
};

export default AISkills;
