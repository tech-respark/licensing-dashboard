import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { createClient, updateClient } from "@/lib/internalApi/clients";
import { getAuthUserState } from "@/redux/slices/auth";
import { showErrorToast, showSuccessToast } from "@/redux/slices/toast";
import { Button, Card, Checkbox, Form, Input, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
import { LuX } from "react-icons/lu";

const dummyClient = {
    "name": "XYZ SPA 2",
    "phoneNumber": "8709090991",
    "address": "near metro station",
    "email": "tenant5@tenant.com",
    "referralSource": "EMAIL",
    "productId": 1,
    "businessType": "SPA",
    "businessName": "XYZ",
    "businessAddress": "near metro station",
    "createdBy": "demo user3",
    "createdByUserId": 4,
    "city": "PUNE",
    "state": "MAHARASHTRA",
    "country": "INDIA",
    "storeInfoList": [
        {
            "name": "WAKAD",
            "phoneNumber": "9090909091",
            "email": "store6@store.com",
            "city": "PUNE",
            "state": "MAHARASHTRA",
            "country": "INDIA",
            "active": true
        }
    ]
}


function ClientModal({ modalData, handleModalResponse }: any) {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const userData = useAppSelector(getAuthUserState);

    interface FieldData {
        name: string | number | (string | number)[];
        value?: any;
        touched?: boolean;
        validating?: boolean;
        errors?: string[];
        label?: string;
    }

    const handleCancel = () => {
        handleModalResponse();
        form.resetFields();
    };

    const [fields, setFields] = useState<FieldData[]>([]);

    useEffect(() => {
        if (modalData?.client) {
            console.log("modalData?.client", modalData?.client)
            setFields([
                { label: "Active", name: ["active"], value: modalData?.client.active },
                { label: "Business Name", name: ["businessName"], value: modalData?.client.businessName },
                { label: "Owner Name", name: ["name"], value: modalData?.client.name },
                { label: "Business Type", name: ["businessType"], value: modalData?.client.businessType },
                { label: "Business Address", name: ["businessAddress"], value: modalData?.client.businessAddress },
                { label: "Phone Number", name: ["phoneNumber"], value: modalData?.client.phoneNumber },
                { label: "Address", name: ["address"], value: modalData?.client.address },
                { label: "Email", name: ["email"], value: modalData?.client.email },
                { label: "City", name: ["city"], value: modalData?.client.city },
                { label: "State", name: ["state"], value: modalData?.client.state },
                { label: "Country", name: ["country"], value: modalData?.client.country },
                { label: "Referral or Source", name: ["referralSource"], value: modalData?.client.referralSource },
            ])
        } else {
            setFields([
                { label: "Active", name: ["active"], value: true },
                { label: "Business Name", name: ["businessName"], value: "" },
                { label: "Owner Name", name: ["name"], value: "" },
                { label: "Business Type", name: ["businessType"], value: "" },
                { label: "Business Address", name: ["businessAddress"], value: "" },
                { label: "Phone Number", name: ["phoneNumber"], value: "" },
                { label: "Address", name: ["address"], value: "" },
                { label: "Email", name: ["email"], value: "" },
                { label: "City", name: ["city"], value: "" },
                { label: "State", name: ["state"], value: "" },
                { label: "Country", name: ["country"], value: "" },
                { label: "Referral or Source", name: ["referralSource"], value: "" },
            ])
        }
    }, [modalData])

    const onCreate = (values: any) => {
        console.log(values)
        const details = {
            ...values,
            productId: userData?.userProductsList[0].productId
        }
        if (modalData?.client?.id) {
            details.id = modalData?.client?.id;
            details.modifiedBy = userData.name;
            details.modifiedByUserId = userData.id;
            details.storeCount = modalData?.client?.storeCount;
        } else {
            details.createdBy = userData.name;
            details.createdByUserId = userData.id;
        }
        const api = modalData?.client?.id ? updateClient : createClient;

        api(details).then((res: any) => {
            if (modalData?.client?.id) dispatch(showSuccessToast("Client updated successfully."))
            else dispatch(showSuccessToast("Client created successfully."))

            handleModalResponse({ ...details, id: res?.data?.id })
        })
            .catch((error: any) => {
                console.log(error)
                dispatch(showErrorToast(`Client creation failed.error: ${error}`))
            })
    }

    return (
        <Modal title={modalData?.client ? "Update Client" : "Add New Client"} open={modalData?.active}
            okText="Submit"
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        form.resetFields();
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
            styles={{
                body: {
                    width: "100%",
                    maxHeight: 500,
                    overflow: "auto"
                }
            }}
            onCancel={handleCancel}>
            <Space direction="vertical">
                <Space>
                    <Card title={""} style={{ width: "100%" }}>
                        <Form
                            name="Add-client"
                            style={{ width: "100%" }}
                            autoComplete="off"
                            form={form}
                            fields={fields}
                            initialValues={{ storeInfoList: modalData?.client?.storeInfoList }}
                        >
                            {fields.map((item: any, i: number) => {
                                return <React.Fragment key={Math.random()}>
                                    {item.label == "Active" ?
                                        <Form.Item name={item.name} valuePropName="checked" noStyle>
                                            <Checkbox>{item.label}</Checkbox>
                                        </Form.Item> :
                                        <Form.Item
                                            label={item.label}
                                            name={item.name}
                                            rules={[{ required: true, message: `Please enter your ${item.label}` }]}
                                        >
                                            <Input />
                                        </Form.Item>}
                                </React.Fragment>
                            })}

                            <Form.List name="storeInfoList">
                                {(fields, { add, remove }) => (
                                    <div key={Math.random()} style={{ display: 'flex', rowGap: 16, flexDirection: 'column' }}>
                                        {fields.map((field) => (
                                            <Card
                                                size="small"
                                                title={`Store: ${field.name + 1}`}
                                                key={Math.random()}
                                                extra={<LuX onClick={() => remove(field.name)} />}
                                            >
                                                <Space wrap>
                                                    <Space key={field.key}>
                                                        <Form.Item name={[field.name, 'name']} rules={[{ required: true, message: `Please enter store name` }]}>
                                                            <Input placeholder="name" />
                                                        </Form.Item>
                                                        <Form.Item name={[field.name, 'active']} valuePropName="checked" >
                                                            <Checkbox>Active</Checkbox>
                                                        </Form.Item>
                                                    </Space>

                                                    <Space key={field.key}>
                                                        <Form.Item name={[field.name, 'email']}>
                                                            <Input placeholder="email" />
                                                        </Form.Item>
                                                        <Form.Item name={[field.name, 'phoneNumber']}>
                                                            <Input placeholder="Phoone Number" />
                                                        </Form.Item>
                                                    </Space>

                                                    <Space key={field.key}>
                                                        <Form.Item name={[field.name, 'city']}>
                                                            <Input placeholder="City" />
                                                        </Form.Item>
                                                        <Form.Item name={[field.name, 'state']}>
                                                            <Input placeholder="State" />
                                                        </Form.Item>
                                                        <Form.Item name={[field.name, 'country']}>
                                                            <Input placeholder="Country" />
                                                        </Form.Item>
                                                    </Space>
                                                </Space>

                                            </Card>
                                        ))}

                                        <Button type="dashed" onClick={() => add()} block>
                                            + Add Store
                                        </Button>
                                    </div>
                                )}
                            </Form.List>


                        </Form>
                    </Card>
                </Space>
            </Space>
        </Modal>
    )
}

export default ClientModal