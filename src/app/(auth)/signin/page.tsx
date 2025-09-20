import { LoginForm } from '@/modules/auth/ui/components/login-form'
import React, { Suspense } from 'react'

const SignInPage = () => {
    return (
        <div className='w-screen h-screen'>
            <Suspense fallback={<div>Loading...</div>}>
            <LoginForm />
            </Suspense>
        </div>
    )
}

export default SignInPage
