import Head from "next/head";
import Header from "@/components/header";
import UserLoginForm from "@/components/users/UserLoginForm";
import GithubLoginButton from "@/components/users/GithubLoginButton";
import { useEffect, useState } from "react";
import ProfileCreateForm from "@/components/profiles/ProfileCreateForm";
import { useRouter } from "next/router";

const Login: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    setUser(sessionStorage.getItem("loggedInUser"));
  }, [user]);

  //   let userObject = null;
  //   if (user) userObject = JSON.parse(user);
  return (
    <>
      <Head>
        <title>{user ? "Logout" : "Login"}</title>
      </Head>
      <Header />{" "}
      {user ? (
        <>
          <main>
            <h1>Are you sure you want to leave?</h1>
            <form
              onSubmit={() => {
                sessionStorage.removeItem("loggedInUser");
              }}
            >
              <button type="submit">Yes</button>
            </form>
          </main>
        </>
      ) : (
        <main className="login">
          {}
          <>
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
          </>
        </main>
      )}
    </>
  );
};

export default Login;
