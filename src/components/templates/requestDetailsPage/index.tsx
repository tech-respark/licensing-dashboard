"use client"

import { ADMIN_ROLE, CEO_ROLE } from "@/constants/common";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getRequestById } from "@/lib/internalApi/requests";
import { getAuthUserState } from "@/redux/slices/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SalesDetailsModal from "../dashboardPage/salesDetailsModal";

function RequestDetailsPage({ requestId }: any) {

    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false)
    const [requestDetails, setRequestDetails] = useState(null);
    const userData = useAppSelector(getAuthUserState);

    useEffect(() => {
        setIsLoading(true)
        getRequestById(requestId).then((res: any) => {
            setIsLoading(false);
            console.log("original request", res.data)
            setRequestDetails(res.data)
            setIsLoading(false)
        })
    }, [])

    const handleModalResponse = () => {
        if (userData.roleName == CEO_ROLE || userData.roleName == ADMIN_ROLE) {
            router.push("/")
        } else {
            router.push("/sales")
        }
    }

    return (
        <div>
            {Boolean(requestDetails) &&
                <SalesDetailsModal handleModalResponse={() => handleModalResponse()} isModalOpen={Boolean(requestDetails)} setIsModalOpen={handleModalResponse} salesDetails={requestDetails} />}
        </div>
    )
}

export default RequestDetailsPage