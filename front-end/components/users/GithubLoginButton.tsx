const GithubLoginButton: React.FC = () => {
    const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
    const authUrl = `https://github.com/login/oauth/authorize?scope=read:user&client_id=${clientId}`;
    return <a href={authUrl}>Sign in with GitHub</a>;
}

export default GithubLoginButton;
