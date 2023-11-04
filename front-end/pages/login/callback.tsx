import UserService from '@/services/UserService';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

const CallbackPage = () => {
    const router = useRouter();
    const code = router.query.code as string;

    const fetchGithubUser = async (code: string) => {
        const res = await UserService.getGithubUser(code);
        const user = await res.json();
        if (!user) {
            alert('Login failed');
            return router.push('/login');
        } 
        sessionStorage.setItem('name', user.name);
        router.push('/');
    }

    useEffect(() => {
        if (code) fetchGithubUser(code);
    }, [code]);

    return (
        <>
            <div>Processing...</div>
        </>
    );
};

export default CallbackPage;
