import Head from "next/head";
import Header from "@/components/header";
import UserLoginForm from "@/components/users/UserLoginForm";
import GithubLoginButton from "@/components/users/GithubLoginButton";
import { useEffect, useState } from "react";
import ProfileCreateForm from "@/components/profiles/ProfileCreateForm";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Login: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  const { t } = useTranslation();
  useEffect(() => {
    setUser(sessionStorage.getItem("loggedInUser"));
  }, [user]);

  // let userObject = null;
  // if (user) userObject = JSON.parse(user);
  return (
    <>
      <Head>
        <title>{user ? t("header.nav.logout") : t("header.nav.login")}</title>
      </Head>
      <Header current="login" />{" "}
      <main className="flex flex-row align-middle items-center justify-center">
        {user ? (
          <section className="m-10 mt-0 text-center">
            <h1 className="text-center text-xl">{t("logout.message")}</h1>
            <form
              onSubmit={() => {
                sessionStorage.removeItem("loggedInUser");
              }}
            >
              <button
                type="submit"
                className="text-center hover:bg-gray-500 p-1 text-xl"
              >
                {t("logout.button")}
              </button>
            </form>
          </section>
        ) : (
          <>
            <section className="m-10 mt-0">
              <h1 className="text-center text-xl">{t("login.message")}</h1>
              <UserLoginForm />
            </section>

            <section className="w-max">
              <GithubLoginButton />
            </section>
            <section className="m-10 mt-0">
              <h1>{t("login.profile.message")}</h1>
              <ProfileCreateForm />
            </section>
          </>
        )}
      </main>
    </>
  );
};

export const getServerSideProps = async (context: any) => {
  const { locale } = context;
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "en", ["common"])),
    },
  };
};

export default Login;
