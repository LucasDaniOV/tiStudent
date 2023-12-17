import { useTranslation } from "next-i18next";

const GithubLoginButton: React.FC = () => {
  const { t } = useTranslation();
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const authUrl = `https://github.com/login/oauth/authorize?scope=read:user&client_id=${clientId}`;
  return (
    <a
      href={authUrl}
      className="bg-gray-500 hover:bg-gray-300 hover:text-black p-1"
    >
      {t("login.github")}
    </a>
  );
};

export default GithubLoginButton;
