import { ADMIN_ROLE, DATE_FORMAT, REQUEST_STATUSES, SALES_PERSON_ROLE, getDurationOptions } from "@/constants/common";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getClientById } from "@/lib/internalApi/clients";
import { createRequest, updateRequest } from "@/lib/internalApi/requests";
import { getAuthUserState } from "@/redux/slices/auth";
import { showErrorToast, showSuccessToast } from "@/redux/slices/toast";
import { removeObjRef } from "@/utils/common";
import { Button, Card, Checkbox, DatePicker, Descriptions, Divider, Form, Input, Modal, Select, Space, Typography, theme } from "antd";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import ClientModal from "../clientsPage/clientModal";
import RequestActions from "./requestActions";
const { Text } = Typography;
const { Meta } = Card;

const DummyModule = {
    "productId": 1,
    "tenantId": 2,
    "salesPersonName": "demo user3",
    "salesPersonId": 5,
    "createdBy": "demo3",
    "createdByUserId": 1,
    "systemGeneratedPrice": 150000,
    "sellingPrice": 145000,
    "type": "NEW",
    "storeSalesList": [
        {
            "storeId": 2,
            "planId": 2,
            "startDate": "2024-01-30",
            "endDate": "2024-04-30",
            "isTrial": false,
            "modulesList": [
                {
                    "moduleId": 4,
                    "active": true
                }
            ]
        }
    ],
    "statusesList": [
        {
            "status": "SAVED",
            "createdBy": "demo3",
            "createdByUserId": 1,
            "remark": "saved"
        }
    ]
}

function CreateRequestModal({ modalData, handleModalResponse, clientsList, modulesList, usersList, setClientsList }: any) {
    const [form] = Form.useForm();
    const { token } = theme.useToken()
    const dispatch = useAppDispatch();
    const userData = useAppSelector(getAuthUserState);
    const [showAddClientModal, setShowAddClientModal] = useState(false);
    const [storesDetails, setStoresDetails] = useState<any>([]);
    const [discountPercentage, setDiscountPercentage] = useState("")
    const [error, setError] = useState({ id: "", text: "" })
    const defaultDuration: any = "yearlyPrice";
    const [rejectionRemarkPoppup, setRejectionRemarkPoppup] = useState({ active: false, remark: "" })
    const [requestDetails, setRequestDetails] = useState(modalData?.request)

    useEffect(() => {
        if (Boolean(modalData?.request?.id) && Boolean(modulesList?.length)) {
            setRequestDetails(modalData?.request);
            //update discount %  
            setDiscountPercentage(modalData.request.discountPercentage)

            const updatedStoresList: any[] = []
            modalData?.request?.storeSalesList?.map((store: any) => {
                //update modules list
                const storeDetails: any = { ...store }

                storeDetails.modulesList = [];
                modulesList.map((module: any) => {
                    const moduleDetails = removeObjRef(module);
                    if (store.modulesList.find((m: any) => m.moduleId == moduleDetails.id)?.id) {
                        moduleDetails.selected = true;
                    } else moduleDetails.selected = false;
                    storeDetails.modulesList.push(moduleDetails)
                })

                storeDetails.total = storeDetails.modulesList.reduce((a: any, b: any) => a + (b.selected ? Number(b[form.getFieldValue("duration")]) : 0), 0)

                //update start and end date
                storeDetails.startDate = storeDetails.startDate;
                storeDetails.endDate = storeDetails.endDate;

                updatedStoresList.push(storeDetails)
            })
            updateTotal(updatedStoresList)
            // setStoresDetails(updatedStoresList)
        }
    }, [modalData, modulesList])

    useEffect(() => {
        console.log("storesDetails", storesDetails)
        setError({ id: "", text: "" })
    }, [storesDetails])

    const updateTotal = (storesDetails: any) => {
        storesDetails.map((store: any) => {
            store.total = store.modulesList.reduce((a: any, b: any) => a + (b.selected ? Number(b[form.getFieldValue("duration")]) : 0), 0)
        })
        setStoresDetails(removeObjRef(storesDetails))
    }

    const getEndDate = (startDate: any, duration: any) => {
        const initialDate = dayjs(startDate)
        let endDate: any = initialDate.format(DATE_FORMAT);;
        switch (duration) {
            case "monthlyPrice":
                endDate = dayjs(initialDate.add(1, "month")).format(DATE_FORMAT);
                break;
            case "quarterlyPrice":
                endDate = dayjs(initialDate.add(3, "month")).format(DATE_FORMAT);
                break;
            case "halfYearlyPrice":
                endDate = dayjs(initialDate.add(6, "month")).format(DATE_FORMAT);
                break;
            case "yearlyPrice":
                endDate = dayjs(initialDate.add(12, "month")).format(DATE_FORMAT);
                break;
            default:
                break;
        }
        return endDate;
    }

    useEffect(() => {
        if (form.getFieldValue("client")) {
            if (!Boolean(requestDetails)) {
                getClientById(form.getFieldValue("client")).then((res: any) => {
                    const stores = res.data?.storeInfoList?.filter((s: any) => s.active);
                    stores.map((store: any) => {
                        store.startDate = dayjs(dayjs()).format(DATE_FORMAT);
                        store.endDate = getEndDate(store.startDate, defaultDuration)
                        store.modulesList = modulesList.filter((m: any) => m.active);
                    })
                    setStoresDetails(stores)
                })
            }
        }
    }, [Form.useWatch('client', form)])

    useEffect(() => {
        if (form.getFieldValue("duration") && Boolean(storesDetails?.length)) {
            storesDetails.map((store: any) => {
                store.endDate = getEndDate(store.startDate, form.getFieldValue("duration"));
            })
            updateTotal(storesDetails)
        }
    }, [Form.useWatch('duration', form)])

    const handleCancel = () => {
        handleModalResponse();
    };

    const getstoreSalesList = () => {
        const storesList: any = [];
        storesDetails.map((store: any) => {
            storesList.push({
                "storeId": store.id,
                "planId": null,
                "startDate": dayjs(store.startDate).format(DATE_FORMAT),
                "endDate": dayjs(store.endDate).format(DATE_FORMAT),
                "generatedStorePrice": Number(store.total),
                "isTrial": false,
                "modulesList": store.modulesList.filter((module: any) => module.selected).map((m: any) => ({ moduleId: m.id }))
            })
        })
        return storesList;
    }

    const getStatusList = (action: string) => {
        const statusList = Boolean(requestDetails?.id) ? removeObjRef(requestDetails?.statusesList) : [];
        if (action == "UPDATE") return statusList;
        return {
            "status": action,
            "createdBy": userData.name,
            "createdByUserId": userData.id,
            "remark": rejectionRemarkPoppup.remark
        }
    }

    const onCreateUpdate = (values: any, action: string) => {
        const isAnyDateNotSelected = storesDetails.find((s: any) => !Boolean(s.startDate) || !Boolean(s.endDate))
        if (Boolean(isAnyDateNotSelected)) {
            setError({ id: `${isAnyDateNotSelected.id}-date`, text: "Select Date" });
            return
        }
        if (values.salesPerson == userData?.name) values.salesPerson = usersList.find((s: any) => s.name == values.salesPerson).id;

        const requestData = {
            ...requestDetails,
            "productId": userData?.userProductsList[0].productId,
            "tenantId": values.client,
            "salesPersonName": usersList.find((s: any) => s.id == values.salesPerson).name,
            "salesPersonId": values.salesPerson,
            "systemGeneratedPrice": Number(storesDetails.reduce((a: any, b: any) => a + Number(b.total), 0)),
            "discountPercentage": Number(discountPercentage),
            "sellingPrice": Number(Number(storesDetails.reduce((a: any, b: any) => a + Number(b.total), 0))) - Number((Number(discountPercentage) / 100) * Number((storesDetails.reduce((a: any, b: any) => a + Number(b.total), 0)).toFixed(2))),
            "type": "NEW",
            "remark": form.getFieldValue("remark"),
            "storeSalesList": getstoreSalesList(),
            "updatedStatus": getStatusList(action),
        }
        console.log("requestData", requestData)
        onSubmit(requestData);
    }

    const onSubmit = (values: any) => {

        const details = { ...values, productId: userData?.userProductsList[0].productId }
        if (requestDetails?.id) {
            details.id = requestDetails?.id;
            details.modifiedBy = userData.name;
            details.modifiedByUserId = userData.id;
        } else {
            details.createdBy = userData.name;
            details.createdByUserId = userData.id;
        }

        const api = requestDetails?.id ? updateRequest : createRequest;

        api(details).then((res: any) => {
            dispatch(showSuccessToast("Request created successfully."))
            handleModalResponse(res.data);
            form.resetFields();
        })
            .catch((error: any) => {
                console.log(error)
                dispatch(showErrorToast(`Request creation failed error: ${error}`))
            })
    }

    const handleAddClientModalResponse = (data: any) => {
        if (data?.id) {
            const listCopy: any[] = [...clientsList]
            listCopy.unshift(data);
            setClientsList(listCopy)
            form.setFieldValue("client", data?.id)
        }
        setShowAddClientModal(false);
    }

    const getClientsOptions = () => {
        return clientsList.map((details: any) => ({ value: details.id, label: details.businessName }))
    }

    const getSPOptions = () => {
        return usersList.map((details: any) => ({ value: details.id, label: details.name }))
    }

    const onFormSubmit = (action: any) => {
        form.validateFields().then((values) => {
            if (action) {
                if ((action == REQUEST_STATUSES.REJECTED_BY_CEO || action == REQUEST_STATUSES.REJECTED_BY_HOS) && !Boolean(rejectionRemarkPoppup.remark)) {
                    dispatch(showErrorToast("Please enter rejection remark"))
                    setError({ id: "rejectionRemark", text: "Please enter rejection remark" })
                    return;
                } else {
                    setRejectionRemarkPoppup({ active: false, remark: "" })
                    onCreateUpdate(values, action);
                }
            }
        }).catch((info) => {
            console.log('Validate Failed:', info);
        });
    }

    const updateNewStatus = (newStatus: any) => {
        const statusList = removeObjRef(requestDetails?.statusesList);
        statusList.push(newStatus);
        setRequestDetails({ ...requestDetails, statusesList: statusList })
    }

    const getCurrentStatus = () => {
        return Boolean(requestDetails?.id) ? requestDetails?.statusesList[requestDetails?.statusesList?.length - 1].status : ""
    }

    return (
        <Modal title={requestDetails ? "Update Request" : "Add New Request"} open={modalData?.active}
            styles={{
                body: {
                    width: "100%",
                    maxHeight: 500,
                    overflow: "auto"
                }
            }}
            maskClosable={false}
            cancelText="Close"
            cancelButtonProps={{ type: "dashed" }}
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <CancelBtn />
                    {Boolean(userData?.roleName == SALES_PERSON_ROLE || userData?.roleName == ADMIN_ROLE) && <>
                        {!getCurrentStatus() && <Button type="primary" onClick={() => onFormSubmit(REQUEST_STATUSES.INITIATED)}>Initiate</Button>}
                        {getCurrentStatus() == REQUEST_STATUSES.INITIATED && <Button type="primary" onClick={() => onFormSubmit("UPDATE")}>Update</Button>}
                    </>}
                    {<RequestActions handleModalResponse={handleModalResponse} requestDetails={requestDetails} updateNewStatus={updateNewStatus} />}
                </>)}
            onCancel={handleCancel}>
            <Space direction="vertical">
                <Card title={""} style={{ width: "100%" }}>
                    <Form
                        name="Add-client"
                        style={{ width: "100%" }}
                        autoComplete="off"
                        form={form}
                        layout="vertical"
                        initialValues={{
                            client: requestDetails?.tenantId,
                            salesPerson: requestDetails?.salesPersonId,
                            discountPercentage: requestDetails?.discountPercentage,
                            remark: requestDetails?.remark,
                            duration: requestDetails?.duration || defaultDuration,
                        }}
                    >
                        <Space direction="vertical">
                            <Space>
                                <Form.Item
                                    label="Client Details"
                                    name="client"
                                    rules={[{ required: true, message: `Please select client` }]}
                                >
                                    <Select
                                        showSearch
                                        style={{ width: 200 }}
                                        placeholder="Search to Select"
                                        optionFilterProp="children"
                                        filterOption={(input: any, option: any) => (option?.label ?? '').includes(input)}
                                        filterSort={(optionA: any, optionB: any) =>
                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                        }
                                        options={getClientsOptions()}
                                    />
                                </Form.Item>
                                <Button type="link" onClick={() => setShowAddClientModal(true)}>Add New Client</Button>
                            </Space>

                            <Form.Item
                                label="Sales Persons Details"
                                name="salesPerson"
                                rules={[{ required: true, message: `Please select sales person` }]}
                            >
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA: any, optionB: any) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={getSPOptions()}
                                />
                            </Form.Item>

                            <Form.Item
                                label="Plan Duration"
                                name="duration"
                                rules={[{ required: true, message: `Please select duration` }]}
                            >
                                <Select
                                    showSearch
                                    style={{ width: 200 }}
                                    placeholder="Search to Select"
                                    optionFilterProp="children"
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
                                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                    }
                                    options={getDurationOptions()}
                                />
                            </Form.Item>

                            {form.getFieldValue("client") ?
                                <Text>Select Store Details</Text> :
                                <Text>Select Client for store details</Text>}
                            {storesDetails?.map((storeDetails: any, storeIndex: number) => {
                                return <React.Fragment key={Math.random()}>
                                    <Card
                                        title={
                                            <Space style={{ justifyContent: "space-between", width: "100%" }}>
                                                <Text className="cap-text" style={{ fontSize: 16, color: token.colorPrimary }}>Store {storeIndex + 1} : {storeDetails.name}</Text>
                                            </Space>
                                        }
                                        style={{ width: 400 }}
                                    >
                                        <Space direction="vertical" >
                                            <Text>Select Start Date</Text>
                                            <Space>
                                                <DatePicker
                                                    allowClear={false}
                                                    defaultValue={dayjs(storeDetails?.startDate, DATE_FORMAT)}
                                                    inputReadOnly
                                                    format={DATE_FORMAT}
                                                    status={error.id == `${storeDetails.id}-date` ? "error" : ""} style={{ width: '100%' }}
                                                    onChange={(e: any) => {
                                                        const storesCopy = [...storesDetails];
                                                        storesCopy[storeIndex].startDate = e ? e['$d'] : null;
                                                        storesCopy[storeIndex].endDate = e ? dayjs(getEndDate(e['$d'], form.getFieldValue("duration")), DATE_FORMAT) : null;
                                                        setStoresDetails(storesCopy)
                                                    }}
                                                />
                                                <Text>End Date:</Text>
                                                <DatePicker
                                                    defaultValue={dayjs(storeDetails?.endDate, DATE_FORMAT)}
                                                    inputReadOnly
                                                    disabled
                                                    value={dayjs(storeDetails?.endDate, DATE_FORMAT)}
                                                    format={DATE_FORMAT}
                                                />
                                            </Space>

                                            <Space direction="vertical">
                                                <Text>Select Modules</Text>
                                                {storeDetails.modulesList.map((moduleDetails: any, moduleIndex: number) => {
                                                    return <React.Fragment key={moduleIndex}>
                                                        <Checkbox checked={moduleDetails.selected}
                                                            onChange={() => {
                                                                const storesCopy = [...storesDetails];
                                                                storesCopy[storeIndex].modulesList[moduleIndex].selected = !storesCopy[storeIndex].modulesList[moduleIndex].selected;
                                                                updateTotal(storesCopy)
                                                            }}>
                                                            {moduleDetails.name}
                                                        </Checkbox>
                                                    </React.Fragment>
                                                })}
                                            </Space>

                                        </Space>

                                        <Divider />
                                        <Meta title={`Total ${storeDetails.total || 0}`} />

                                    </Card>
                                </React.Fragment>
                            })}

                            <Form.Item label="Discount (%)" name="discountPercentage">
                                <Input min={0} maxLength={2} onChange={(e) => setDiscountPercentage(e.target.value)} />
                            </Form.Item>

                            <Form.Item label="Remark" name="remark">
                                <Input />
                            </Form.Item>

                            <Descriptions column={1} title="Pricing Breakdown">
                                <Descriptions.Item label="System Generated Total">{Number(storesDetails.reduce((a: any, b: any) => a + Number(b.total), 0))}</Descriptions.Item>
                                {Boolean(discountPercentage) && <Descriptions.Item label="Dicount">{Number(discountPercentage)} %</Descriptions.Item>}
                                {Boolean(discountPercentage) && <Descriptions.Item label="Dicounted Amount">{((Number(discountPercentage) / 100) * Number((storesDetails.reduce((a: any, b: any) => a + Number(b.total), 0)).toFixed(2))).toFixed(2)}</Descriptions.Item>}
                                <Descriptions.Item label="Amount To Pay">{(Number(storesDetails.reduce((a: any, b: any) => a + Number(b.total), 0))) - Number((Number(discountPercentage) / 100) * Number((storesDetails.reduce((a: any, b: any) => a + Number(b.total), 0)).toFixed(2)))}</Descriptions.Item>
                            </Descriptions>

                        </Space>
                    </Form>
                </Card>
            </Space>
            {showAddClientModal && <ClientModal modalData={{ active: true, client: null }} handleModalResponse={handleAddClientModalResponse} />}
        </Modal>
    )
}

export default CreateRequestModal