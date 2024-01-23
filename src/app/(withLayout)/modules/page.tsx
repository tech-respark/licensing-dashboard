import Loading from "@/app/loading"
import ModulesPage from "@/components/templates/modulesPage"
import { Suspense } from "react"

function page() {
    return (
        <Suspense fallback={<Loading page={'Dashboard'} />}>
            <ModulesPage />
        </Suspense>
    )
}

export default page