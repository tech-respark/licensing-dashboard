import Loading from "@/app/loading"
import PlansPage from "@/components/templates/plansPage"
import { Suspense } from "react"

function page() {
    return (
        <Suspense fallback={<Loading page={'Dashboard'} />}>
            <PlansPage />
        </Suspense>
    )
}

export default page