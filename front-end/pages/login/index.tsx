import Head from "next/head";
import Header from "@/components/header";
import UserLoginForm from "@/components/users/UserLoginForm";
import GithubLoginButton from "@/components/users/GithubLoginButton";
import { useEffect, useState } from "react";

const Login: React.FC = () => {
  const [user, setUser] = useState<string | null>(null);
  useEffect(() => {
    setUser(sessionStorage.getItem("loggedInUser"));
  }, []);

  //   let userObject = null;
  //   if (user) userObject = JSON.parse(user);
  return (
    <>
      <Head>
        <title>Login</title>
      </Head>
      <Header />{" "}
      {user ? (
        <>
          <main>
            <h1>Logout</h1>
            <form onSubmit={() => sessionStorage.removeItem("loggedInUser")}>
              <button type="submit">Logout</button>
            </form>
          </main>
        </>
      ) : (
        <main>
          <h1>Login</h1>
          <section>
            <UserLoginForm />
            <GithubLoginButton />
          </section>
        </main>
      )}
    </>
  );
};

export default Login;
