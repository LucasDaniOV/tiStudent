import { useTranslation } from "next-i18next";

const AuthorizationError: React.FC = () => {
  const { t } = useTranslation();
  return <>{t("authorization.error")}</>;
};

export default AuthorizationError;
