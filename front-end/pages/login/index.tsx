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

  // let userObject = null;
  // if (user) userObject = JSON.parse(user);
  return (
    <>
      <Head>
        <title>{user ? "Logout" : "Login"}</title>
      </Head>
      <Header current="login" />{" "}
      <main className="flex flex-row align-middle items-center justify-center">
        {user ? (
          <section className="m-10 mt-0">
            <h1 className="text-center text-xl">
              Are you sure you want to leave?
            </h1>
            <form
              onSubmit={() => {
                sessionStorage.removeItem("loggedInUser");
              }}
            >
              <button type="submit" className="text-center hover:bg-gray-500">
                Yes
              </button>
            </form>
          </section>
        ) : (
          <>
            <section className="m-10 mt-0">
              <h1 className="text-center text-xl">Login</h1>
              <UserLoginForm />
            </section>

            <section className="w-max">
              <GithubLoginButton />
            </section>
            <section className="m-10 mt-0">
              <h1>Or create new profile</h1>
              <ProfileCreateForm />
            </section>
          </>
        )}
      </main>
    </>
  );
};

export default Login;
