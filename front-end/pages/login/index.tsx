import Head from "next/head";
import Header from "@/components/header";
import UserLoginForm from "@/components/users/UserLoginForm";
import GithubLoginButton from "@/components/users/GithubLoginButton";
import { useEffect, useState } from "react";
import ProfileCreateForm from "@/components/profiles/ProfileCreateForm";

const Login: React.FC = () => {
  const [profile, setProfile] = useState<string | null>(null);
  useEffect(() => {
    setProfile(sessionStorage.getItem("loggedInProfile"));
  }, []);

  //   let userObject = null;
  //   if (user) userObject = JSON.parse(user);
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Header />{" "}
      {profile ? (
        <>
          <main>
            <h1>Logout</h1>
            <form
              onSubmit={() => {
                sessionStorage.removeItem("loggedInProfile");
              }}
            >
              <button type="submit">Logout</button>
            </form>
          </main>
        </>
      ) : (
        <main className="login">
          <section>
            <h1>Login</h1>
            <section>
              <UserLoginForm />
              <GithubLoginButton />
            </section>
          </section>
          <section>
            <h1>Or create new profile</h1>
            <section>
              <ProfileCreateForm />
            </section>
          </section>
        </main>
      )}
    </>
  );
};

export default Login;
