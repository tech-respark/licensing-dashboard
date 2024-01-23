import LoginPage from '@/components/templates/loginPage'
import React, { Suspense } from 'react'
import Loading from '../../loading'

function page() {
    return <React.Fragment>
        <Suspense fallback={<Loading page={'Login'} />}>
            <LoginPage />
        </Suspense>
    </React.Fragment>
}

export default page