const GithubLoginButton: React.FC = () => {
  const clientId = process.env.NEXT_PUBLIC_GITHUB_CLIENT_ID;
  const authUrl = `https://github.com/login/oauth/authorize?scope=read:user&client_id=${clientId}`;
  return (
    <a
      href={authUrl}
      className="bg-gray-500 hover:bg-gray-300 hover:text-black p-1"
    >
      Sign in with GitHub
    </a>
  );
};

export default GithubLoginButton;
