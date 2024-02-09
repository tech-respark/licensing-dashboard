"use client"

import { ADMIN_ROLE, CEO_ROLE } from "@/constants/common";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getRequestById } from "@/lib/internalApi/requests";
import { getAuthUserState } from "@/redux/slices/auth";
import { toggleLoader } from "@/redux/slices/loader";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import SalesDetailsModal from "../dashboardPage/salesDetailsModal";

function RequestDetailsPage({ requestId }: any) {

    const router = useRouter();
    const [requestDetails, setRequestDetails] = useState(null);
    const userData = useAppSelector(getAuthUserState);
    const dispatch = useAppDispatch()
    useEffect(() => {
        dispatch(toggleLoader(true))
        getRequestById(requestId).then((res: any) => {
            dispatch(toggleLoader(false))
            console.log("original request", res.data)
            setRequestDetails(res.data)
            dispatch(toggleLoader(false))
        })
    }, [])

    const handleModalResponse = () => {
        if (userData?.roleName == CEO_ROLE || userData?.roleName == ADMIN_ROLE) {
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