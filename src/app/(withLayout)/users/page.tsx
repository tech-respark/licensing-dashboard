import Loading from "@/app/loading"
import UsersPage from "@/components/templates/usersPage"
import { Suspense } from "react"

function page() {
    return (
        <Suspense fallback={<Loading page={'Dashboard'} />}>
            <UsersPage />
        </Suspense>
    )
}

export default page