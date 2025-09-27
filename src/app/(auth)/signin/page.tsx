import Loader from '@/components/global/loader';
import { LoginForm } from '@/modules/auth/ui/components/login-form';
import { Suspense } from 'react';

const SignInPage = () => {
    return (
        <div className='w-screen h-screen'>
            <Suspense fallback={<Loader />}>
                <LoginForm />
            </Suspense>
        </div>
    )
}

export default SignInPage
