import Head from "next/head";
import Header from "@/components/header";
import UserLoginForm from "@/components/users/UserLoginForm";
import GithubLoginButton from "@/components/users/GithubLoginButton";

const Login: React.FC = () => {
    return (
        <>
        <Head>
            <title>Login</title>
        </Head>
        <Header />
        <main>
            <h1>Login</h1>
            <section>
                <UserLoginForm />
                <GithubLoginButton />
            </section>
        </main>
        </>
    );
}

export default Login;
