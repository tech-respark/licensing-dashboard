import Loading from "@/app/loading"
import ReportsPage from "@/components/templates/reportsPage"
import { Suspense } from "react"

function page() {
    return (
        <Suspense fallback={<Loading page={'Dashboard'} />}>
            <ReportsPage />
        </Suspense>
    )
}

export default page