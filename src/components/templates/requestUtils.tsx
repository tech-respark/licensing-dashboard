import { REQUEST_STATUS_COLORS_LIST } from "@/constants/common";
import { Tag } from "antd";

export const getCurrentStatus = (requestDetails: any) => {
    return Boolean(requestDetails?.id) ? requestDetails?.statusesList[requestDetails?.statusesList?.length - 1].status : ""
}

export const getStatusWithTag = (status: any) => {
    const getStatusColor = REQUEST_STATUS_COLORS_LIST[status];
    return <Tag color={getStatusColor} key={status} >
        {status}
    </Tag>
}