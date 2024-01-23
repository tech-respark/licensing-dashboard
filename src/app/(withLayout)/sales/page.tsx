import Loading from "@/app/loading"
import SalesPage from "@/components/templates/salesPage"
import { Suspense } from "react"

function page() {
    return (
        <Suspense fallback={<Loading page={'Dashboard'} />}>
            <SalesPage />
        </Suspense>
    )
}

export default page