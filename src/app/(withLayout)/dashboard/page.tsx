import Loading from '@/app/loading'
import DashboardPage from '@/components/templates/dashboardPage'
import { Suspense } from 'react'

function page() {
    return (
        <Suspense fallback={<Loading page={'Dashboard'} />}>
            <DashboardPage />
        </Suspense>
    )
}

export default page