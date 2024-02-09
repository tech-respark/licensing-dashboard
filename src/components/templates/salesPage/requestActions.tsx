// import { REQUEST_STATUSES } from '@/constants/common'
import { DATE_FORMAT, REQUEST_STATUS_COLORS_LIST } from '@/constants/common';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { updateRequestStatus } from '@/lib/internalApi/requests';
import { getAuthUserState } from '@/redux/slices/auth';
import { toggleLoader } from '@/redux/slices/loader';
import { showErrorToast, showSuccessToast } from '@/redux/slices/toast';
import { Button, Input, Popconfirm, Space, Tag, Typography } from 'antd';
import dayjs from 'dayjs';
import { Fragment, useEffect, useState } from 'react';
import { getActionsAfterApprovedByAdmin } from './requestActions/APPROVED_BY_ADMIN';
import { getActionsAfterApprovedByCeo } from './requestActions/APPROVED_BY_CEO';
import { getActionsAfterApprovedByHos } from './requestActions/APPROVED_BY_HOS';
import { getActionsAfterInitiated } from './requestActions/INITIATED';
import { getActionsAfterNegotiated } from './requestActions/NEGOTIATED';
import { getActionsAfterOnboarded } from './requestActions/ONBOARDED';
import { getActionsAfterReject } from './requestActions/REJECTED';
const { Text } = Typography;

export const REQUEST_STATUSES = {
    "INITIATED": "INITIATED",

    "APPROVED_BY_HOS": "APPROVED_BY_HOS",
    "REJECTED_BY_HOS": "REJECTED_BY_HOS",
    "NEGOTIATE_BY_HOS": "NEGOTIATE_BY_HOS",

    "APPROVED_BY_CEO": "APPROVED_BY_CEO",
    "NEGOTIATE_BY_CEO": "NEGOTIATE_BY_CEO",
    "REJECTED_BY_CEO": "REJECTED_BY_CEO",

    "APPROVED_BY_ADMIN": "APPROVED_BY_ADMIN",
    "REJECTED_BY_ADMIN": "REJECTED_BY_ADMIN",
    "NEGOTIATE_BY_ADMIN": "NEGOTIATE_BY_ADMIN",

    "ONBOARDED": "ONBOARDED"
}

export const inititalActions = [
    { name: "Initiate", active: false, action: '' },
    { name: "Approve", active: false, action: '' },
    { name: "Negotiate", active: false, action: '' },
    { name: "Onboarded", active: false, action: '' },
    { name: "Reject", active: false, action: '' },
]

export type ACTION_TYPE = {
    name: string,
    active: boolean,
    action: string
}

function RequestActions({ extraActions, CancelBtn, handleModalResponse, requestDetails, updateNewStatus }: any) {

    const [remarkPopup, setRemarkPopup] = useState({ active: false, remark: "" })
    const [negotiationPopup, setNegotiationPopup] = useState({ active: false, remark: "", price: 0 })
    const [error, setError] = useState({ id: "", text: "" })
    const userData = useAppSelector(getAuthUserState);

    const currentStatus = Boolean(requestDetails?.id) ? requestDetails?.statusesList[requestDetails?.statusesList.length - 1] : null;
    const inititatedStatus = requestDetails?.statusesList[0];
    const negotiationStatus = requestDetails?.statusesList.find((s: any) => s.status.toLowerCase().includes("negotiate") || s.status.toLowerCase().includes("nigotiate"));
    const rejectionStatus = requestDetails?.statusesList.find((s: any) => s.status.toLowerCase().includes("reject"));

    const currentRole = userData?.roleName;
    const dispatch = useAppDispatch()
    const [actionsList, setActionsList] = useState([...inititalActions])

    const getActions = () => {
        let actions = [...inititalActions];

        if (Boolean(currentStatus?.status)) {
            //after request created
            switch (currentStatus?.status) {//status
                case REQUEST_STATUSES.INITIATED:
                    actions = getActionsAfterInitiated(currentRole)
                    break;

                //for HOS
                case REQUEST_STATUSES.APPROVED_BY_HOS:
                    actions = getActionsAfterApprovedByHos(currentRole)
                    break;
                case REQUEST_STATUSES.REJECTED_BY_HOS:
                    actions = getActionsAfterReject(currentRole)
                    break;
                case REQUEST_STATUSES.NEGOTIATE_BY_HOS:
                    actions = getActionsAfterNegotiated(currentRole)
                    break;

                //for CEO
                case REQUEST_STATUSES.APPROVED_BY_CEO:
                    actions = getActionsAfterApprovedByCeo(currentRole)
                    break;
                case REQUEST_STATUSES.REJECTED_BY_CEO:
                    actions = getActionsAfterReject(currentRole)
                    break;
                case REQUEST_STATUSES.NEGOTIATE_BY_CEO:
                    actions = getActionsAfterNegotiated(currentRole)
                    break;

                //for ADMIN
                case REQUEST_STATUSES.APPROVED_BY_ADMIN:
                    actions = getActionsAfterApprovedByAdmin(currentRole)
                    break;
                case REQUEST_STATUSES.REJECTED_BY_ADMIN:
                    actions = getActionsAfterReject(currentRole)
                    break;
                case REQUEST_STATUSES.NEGOTIATE_BY_ADMIN:
                    actions = getActionsAfterNegotiated(currentRole)
                    break;

                case REQUEST_STATUSES.ONBOARDED:
                    actions = getActionsAfterOnboarded(currentRole)
                    break;

                default:
                    break;
            }
            return actions;
        } else return []
    }

    useEffect(() => {
        setActionsList(getActions());
    }, [])

    const onRejectRequest = (action: string) => {
        if (!Boolean(remarkPopup.remark)) {
            dispatch(showErrorToast("Please enter rejection remark"))
            setError({ id: "rejectionRemark", text: "Please enter rejection remark" })
            return;
        } else {
            const newStatus = {
                "status": action,
                "createdBy": userData.name,
                "createdByUserId": userData.id,
                "price": 0,
                "discountPercentage": 0,
                "remark": remarkPopup.remark
            }
            updateRequest(newStatus)
            console.log("onRejectRequest", newStatus)
            setRemarkPopup({ active: false, remark: "" })
        }
    }

    const onNegotiateRequest = (action: string) => {
        if (!Boolean(negotiationPopup.price)) {
            dispatch(showErrorToast("Please enter price to negotiate"))
            setError({ id: "negotiationPrice", text: "Please enter rejection remark" })
            return;
        } else {
            const newStatus = {
                "status": action,
                "createdBy": userData.name,
                "createdByUserId": userData.id,
                "price": negotiationPopup.price,
                "discountPercentage": 0,
                "remark": negotiationPopup.remark
            }
            console.log("onNegotiateRequest", newStatus)
            updateRequest(newStatus)
        }
    }

    const updateRequest = (newStatus: any) => {

        dispatch(toggleLoader(true))
        updateRequestStatus({
            id: requestDetails.id,
            updatedStatus: newStatus
        }).then((res: any) => {
            dispatch(showSuccessToast("Request updated successfully."))
            updateNewStatus(res.data.statusesList[res.data.statusesList.length - 1]);
            setRemarkPopup({ active: false, remark: "" })
            setNegotiationPopup({ active: false, remark: "", price: 0 })
            handleModalResponse()
            dispatch(toggleLoader(false))
        })
            .catch((error: any) => {
                console.log(error)
                dispatch(toggleLoader(false))
                dispatch(showErrorToast(`Request updation failed error: ${error}`))
            })
    }

    const onSubmitAction = (action: any) => {
        console.log("onSubmitAction", action)
        let price = 0;
        let discountPercentage = 0;
        if (Boolean(negotiationStatus) && (action == REQUEST_STATUSES.APPROVED_BY_ADMIN || action == REQUEST_STATUSES.APPROVED_BY_CEO)) {
            price = negotiationStatus.price;
            discountPercentage = ((Number(requestDetails.sellingPrice) - Number(negotiationStatus.price)) / Number(requestDetails.sellingPrice)) * 100;
        }
        const newStatus = {
            "status": action,
            "createdBy": userData.name,
            "createdByUserId": userData.id,
            "price": price,
            "discountPercentage": discountPercentage,
            "remark": ""
        }
        updateRequest(newStatus)
    }


    const getRequestDetailsTagline = (requestDetails: any) => {

        return (
            <>
                {Boolean(requestDetails) ?
                    <Tag
                        style={{
                            maxWidth: "100%",
                            lineHeight: 2,
                            display: "flex",
                            textAlign: "left",
                            justifyContent: "flex-start",
                            alignItems: "flex-start",
                            flexWrap: "wrap",
                            // fontSize: 14
                        }}
                        color={REQUEST_STATUS_COLORS_LIST[currentStatus.status]}>
                        <>This request is initiated by&nbsp;
                            {inititatedStatus.createdBy} ({dayjs(inititatedStatus.createdOn).format(DATE_FORMAT)})
                            and it is in {currentStatus.status} ({dayjs(inititatedStatus.createdOn).format(DATE_FORMAT)}) state.</>
                        <br />
                        {Boolean(negotiationStatus) && <>Negotiation price is: {negotiationStatus?.price}</>}.&nbsp;
                        {Boolean(negotiationStatus) && Boolean(negotiationStatus?.remark) && <>Negotiation remark is: {negotiationStatus?.remark}</>}
                        {Boolean(rejectionStatus) && <>Request rejected due to {rejectionStatus?.remark}</>}
                    </Tag>
                    : <>
                    </>}
            </>
        )
    }


    return (
        <>
            <Space direction='vertical'>
                <Space>
                    {getRequestDetailsTagline(requestDetails)}
                </Space>
                <Space>
                    {CancelBtn}
                    {extraActions}
                    {actionsList.map((actionDetails: ACTION_TYPE, i: number) => {
                        return <Fragment key={i}>

                            {Boolean(actionDetails.name == "Reject" && actionDetails.active) && <>
                                <Popconfirm
                                    icon={<></>}
                                    trigger={"click"}
                                    open={remarkPopup.active}
                                    title={`Reject the request`}
                                    description={<>
                                        <Space direction="vertical">
                                            <Space direction="vertical">
                                                <Text>Please Enter reason for rejection:</Text>
                                                <Input
                                                    status={error.id == "rejectionRemark" ? "error" : ""}
                                                    value={remarkPopup.remark}
                                                    onChange={(e) => {
                                                        setError({ id: "", text: "" });
                                                        setRemarkPopup({ ...remarkPopup, remark: e.target.value })
                                                    }}
                                                    placeholder="Enter reason for rejection" />
                                            </Space>
                                        </Space>
                                    </>}
                                    onCancel={() => setRemarkPopup({ active: false, remark: "" })}
                                    onConfirm={() => onRejectRequest(actionDetails.action)}
                                    okText="Reject"
                                    cancelText="Cancel"
                                >
                                    <Button type="default" danger onClick={() => setRemarkPopup({ active: true, remark: "" })}>Reject</Button>
                                </Popconfirm>
                            </>}

                            {Boolean(actionDetails.name == "Negotiate" && actionDetails.active) && <>
                                <Popconfirm
                                    trigger={"click"}
                                    open={negotiationPopup.active}
                                    title={`Negotiate the request`}
                                    description={<>
                                        <Space direction="vertical">
                                            <Space direction="vertical">
                                                <Text>Please enter expected negotiation price:</Text>
                                                <Input
                                                    status={error.id == "negotiationPrice" ? "error" : ""}
                                                    value={negotiationPopup.price}
                                                    onChange={(e: any) => {
                                                        setError({ id: "", text: "" });
                                                        setNegotiationPopup({ ...negotiationPopup, price: e.target.value })
                                                    }}
                                                    placeholder="Enter price" />
                                            </Space>
                                            <Space direction="vertical" style={{ width: "100%" }}>
                                                <Text>Please enter remark if any:</Text>
                                                <Input
                                                    style={{ width: "100%" }}
                                                    value={negotiationPopup.remark}
                                                    onChange={(e: any) => {
                                                        setError({ id: "", text: "" });
                                                        setNegotiationPopup({ ...negotiationPopup, remark: e.target.value })
                                                    }}
                                                    placeholder="Enter remark" />
                                            </Space>
                                        </Space>
                                    </>}
                                    onCancel={() => setNegotiationPopup({ active: false, remark: "", price: 0 })}
                                    onConfirm={() => onNegotiateRequest(actionDetails.action)}
                                    okText="Negotiate"
                                    cancelText="Cancel"
                                    icon={<></>}
                                >
                                    <Button type="default" onClick={() => setNegotiationPopup({ active: true, remark: "", price: 0 })}>Negotiate</Button>
                                </Popconfirm>
                            </>}

                            {Boolean((actionDetails.name == "Approve" && actionDetails.active) || (actionDetails.name == "Initiate" && actionDetails.active) || (actionDetails.name == "Onboarded" && actionDetails.active)) && <>
                                <Popconfirm
                                    icon={<></>}
                                    title={`${actionDetails.name} the request`}
                                    description={`Are you sure you want to ${actionDetails.name} this request?`}
                                    onConfirm={() => onSubmitAction(actionDetails.action)}
                                    okText="Yes Sure"
                                    cancelText="Cancel"
                                >
                                    <Button type="primary">{`${actionDetails.name}`}</Button>
                                </Popconfirm>
                            </>}
                        </Fragment>
                    })}
                </Space>
            </Space>
        </>
    )
}

export default RequestActions