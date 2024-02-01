import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getClientById, getClientsByProduct } from "@/lib/internalApi/clients";
import { createModule, getModulesByProduct } from "@/lib/internalApi/module";
import { createRequest } from "@/lib/internalApi/requests";
import { getUsersByProduct } from "@/lib/internalApi/user";
import { getAuthUserState } from "@/redux/slices/auth";
import { showErrorToast, showSuccessToast } from "@/redux/slices/toast";
import { Button, Card, Checkbox, Descriptions, Divider, Form, Input, Modal, Select, Space, Typography } from "antd";
import React, { useEffect, useState } from "react";
import ClientModal from "../clientsPage/clientModal";
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
            "storeSalesModulesList": [
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

function CreateRequestModal({ modalData, handleModalResponse }: any) {
    const [form] = Form.useForm();
    const selectedClient = Form.useWatch('client', form);
    const discount = Form.useWatch('discount', form);
    const dispatch = useAppDispatch();
    const userData = useAppSelector(getAuthUserState);
    const [clientsList, setClientsList] = useState<any[]>([]);
    const [showAddClientModal, setShowAddClientModal] = useState(false);
    const [moduleList, setModulesList] = useState<any[]>([]);
    const [usersList, setUsersList] = useState<any[]>([]);
    const [storesDetails, setStoresDetails] = useState<any>([]);
    const [clientDetails, setClientDetails] = useState<any>(null)

    useEffect(() => {
        if (selectedClient) {
            getClientById(selectedClient).then((res: any) => {
                setClientDetails(res.data)
                const stores = res.data.storeInfoList;
                stores.map((store: any) => {
                    store.storeSalesModulesList = moduleList.map((m: any) => ({ ...m, moduleId: m.id, active: false, name: m.name }));
                })
                setStoresDetails(stores)
            })
        }
    }, [selectedClient])

    const updateTotal = (storesDetails: any) => {
        storesDetails.map((store: any) => {
            store.total = store.storeSalesModulesList.reduce((a: any, b: any) => a + (b.active ? Number(b[form.getFieldValue("duration")]) : 0), 0)
        })
        setStoresDetails([...storesDetails])
    }

    useEffect(() => {
        if (form.getFieldValue("duration")) {
            updateTotal(storesDetails)
        }
    }, [Form.useWatch('duration', form)])

    useEffect(() => {
        getClientsByProduct(userData.userProductsList[0].productId).then((res: any) => {
            if (res.data) setClientsList(res.data)
        }).catch(function (error: any) {
            console.log(`/getClientsByProduct `, error);
        });
        getUsersByProduct(userData.userProductsList[0].productId).then((res: any) => {
            if (res.data) setUsersList(res.data)
            form.setFieldValue("salesPerson", userData.name)
        }).catch(function (error: any) {
            console.log(`/getUsersByProduct `, error);
        });
        getModulesByProduct(userData.userProductsList[0].productId).then((res: any) => {
            if (res.data) setModulesList(res.data)
        }).catch(function (error: any) {
            console.log(`/getUsersByProduct `, error);
        });
    }, [])

    const handleCancel = () => {
        handleModalResponse();
    };

    const onSubmit = (values: any) => {

        const details = { ...values, productId: userData.userProductsList[0].productId }
        if (modalData?.module?.id) {
            details.id = modalData?.module?.id;
            details.modifiedBy = userData.name;
            details.modifiedByUserId = userData.id;
        } else {
            details.createdBy = userData.name;
            details.createdByUserId = userData.id;
        }
        const api = modalData?.request?.id ? createRequest : createModule;

        api(details).then((res: any) => {
            dispatch(showSuccessToast("Module created successfuly."))
            handleModalResponse({ ...details, id: res?.data?.id || Math.random() })
            form.resetFields();
        })
            .catch((error: any) => {
                console.log(error)
                dispatch(showErrorToast(`Module creation failed error: ${error}`))
            })
    }

    const onCreate = (values: any) => {
        console.log('values', values)
        console.log('storesDetails', storesDetails)

    }

    const handleAddClientModalResponse = (data: any) => {
        if (data?.id) {
            const listCopy: any[] = [...clientsList]
            listCopy.unshift(data);
            setClientsList(listCopy)
        }
        form.setFieldValue("client", data.id)
        setShowAddClientModal(false);
    }

    const getClientsOptions = () => {
        return clientsList.map((details: any) => ({ value: details.id, label: details.name }))
    }

    const getSPOptions = () => {
        return usersList.map((details: any) => ({ value: details.id, label: details.name }))
    }

    const getDurationOptions = () => {
        return [
            { label: "Monthly Price", value: "monthlyPrice" },
            { label: "Quarterly Price", value: "quarterlyPrice" },
            { label: "Half Yearly price", value: "halfYearlyPrice" },
            { label: "Yearly Price", value: "yearlyPrice" },
        ]
    }

    return (
        <Modal title={modalData?.request ? "Update Module" : "Add New Module"} open={modalData?.active}
            okText="Submit"
            styles={{
                body: {
                    width: "100%",
                    maxHeight: 500,
                    overflow: "auto"
                }
            }}
            // onOk={onCreateRequest}
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
            onCancel={handleCancel}>
            <Space direction="vertical">
                <Card title={""} style={{ width: "100%" }}>
                    <Form
                        name="Add-client"
                        style={{ width: "100%" }}
                        autoComplete="off"
                        form={form}
                        layout="vertical"
                    >
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
                                    filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                    filterSort={(optionA, optionB) =>
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
                                filterSort={(optionA, optionB) =>
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

                        <Space direction="vertical">
                            <Text>Select Store Wise Modules</Text>
                            <Space direction="vertical">
                                {storesDetails?.map((storeDetails: any, storeIndex: number) => {
                                    return <React.Fragment key={storeDetails.id}>
                                        <Card title={storeDetails.name} style={{ width: 400 }}>

                                            {storeDetails.storeSalesModulesList.map((moduleDetails: any, moduleIndex: number) => {
                                                return <React.Fragment key={moduleIndex}>
                                                    <Checkbox checked={moduleDetails.active} onChange={() => {
                                                        const storesCopy = [...storesDetails];
                                                        storesCopy[storeIndex].storeSalesModulesList[moduleIndex].active = !storesCopy[storeIndex].storeSalesModulesList[moduleIndex].active;
                                                        updateTotal(storesCopy)
                                                    }}>
                                                        {moduleDetails.name}
                                                    </Checkbox>
                                                </React.Fragment>
                                            })}

                                            <Divider />
                                            <Meta title={`Total ${storeDetails.total || 0}`} />

                                        </Card>
                                    </React.Fragment>
                                })}
                            </Space>
                        </Space>

                        <Form.Item label="Discount (%)" name="discount"> <Input /></Form.Item>
                        <Form.Item label="Remark" name="remark"> <Input /></Form.Item>

                        <Descriptions column={1} title="Pricing Breakdown">
                            <Descriptions.Item label="System Generated Total">{storesDetails.reduce((a: any, b: any) => a + Number(b.total), 0)}</Descriptions.Item>
                            <Descriptions.Item label="Dicounted Amount">{(discount) / 100 * storesDetails.reduce((a: any, b: any) => a + Number(b.total), 0)}</Descriptions.Item>
                            <Descriptions.Item label="Amount To Pay">{(storesDetails.reduce((a: any, b: any) => a + Number(b.total), 0)) - ((discount) / 100 * storesDetails.reduce((a: any, b: any) => a + Number(b.total), 0))}</Descriptions.Item>
                        </Descriptions>

                    </Form>
                </Card>
            </Space>
            {showAddClientModal && <ClientModal modalData={{ active: true, client: null }} handleModalResponse={handleAddClientModalResponse} />}
        </Modal>
    )
}

export default CreateRequestModal