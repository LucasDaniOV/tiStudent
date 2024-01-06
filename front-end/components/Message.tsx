import { useTranslation } from "next-i18next";

const Message: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center p-20">
      <div className="p-10 bg-tistudent-blue rounded-xl">
        <p className="text-xl">{t("home.message")}</p>
      </div>
    </div>
  );
};

export default Message;
