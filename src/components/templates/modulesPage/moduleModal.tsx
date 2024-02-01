import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { createModule, updateModule } from "@/lib/internalApi/module";
import { getAuthUserState } from "@/redux/slices/auth";
import { showErrorToast, showSuccessToast } from "@/redux/slices/toast";
import { Card, Checkbox, Form, Input, InputNumber, Modal, Space } from "antd";
import React, { useEffect, useState } from "react";
const { Meta } = Card;

const DummyModule = {
    "name": "POS 2",
    "productId": 1,
    "active": true,
    "monthlyPrice": 2000,
    "quarterlyPrice": 5800,
    "halfYearlyPrice": 11000,
    "yearlyPrice": 21000
}

function ModuleModal({ modalData, handleModalResponse }: any) {
    const [form] = Form.useForm();
    console.log("modalData", modalData?.module?.active)
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
    };

    const [fields, setFields] = useState<FieldData[]>([]);

    useEffect(() => {
        if (modalData.module) {
            setFields([
                { label: "Name", name: ["name"], value: modalData?.module?.name },
                { label: "Monthly Price", name: ["monthlyPrice"], value: modalData?.module?.monthlyPrice },
                { label: "Quarterly Price", name: ["quarterlyPrice"], value: modalData?.module?.quarterlyPrice },
                { label: "Half Yearly price", name: ["halfYearlyPrice"], value: modalData?.module?.halfYearlyPrice },
                { label: "Yearly Price", name: ["yearlyPrice"], value: modalData?.module?.yearlyPrice },
                { label: "Active", name: ["active"], value: modalData?.module?.active },
            ])
        } else {
            setFields([
                { label: "Name", name: ["name"], value: "" },
                { label: "Monthly Price", name: ["monthlyPrice"], value: "" },
                { label: "Quarterly Price", name: ["quarterlyPrice"], value: "" },
                { label: "Half Yearly price", name: ["halfYearlyPrice"], value: "" },
                { label: "Yearly Price", name: ["yearlyPrice"], value: "" },
                { label: "Active", name: ["active"], value: true },
            ])
        }
    }, [modalData])


    const onCreate = (values: any) => {

        const details = { ...values, productId: userData.userProductsList[0].productId }
        if (modalData?.module?.id) {
            details.id = modalData?.module?.id;
            details.modifiedBy = userData.name;
            details.modifiedByUserId = userData.id;
        } else {
            details.createdBy = userData.name;
            details.createdByUserId = userData.id;
        }
        const api = modalData?.module?.id ? updateModule : createModule;

        api(details).then((res: any) => {
            dispatch(showSuccessToast("Module created successfuly."))
            handleModalResponse({ ...details, id: res?.data?.id || Math.random() })
        })
            .catch((error: any) => {
                console.log(error)
                dispatch(showErrorToast(`Module creation failed error: ${error}`))
            })
    }

    return (
        <Modal title={modalData?.module ? "Update Module" : "Add New Module"} open={modalData?.active}
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
                        >
                            {fields.map((item: any, i: number) => {
                                return <React.Fragment key={i}>
                                    {item.label == "Active" ?
                                        <Form.Item name={item.name} valuePropName="checked" noStyle>
                                            <Checkbox>{item.label}</Checkbox>
                                        </Form.Item> :
                                        <Form.Item
                                            label={item.label}
                                            name={item.name}
                                            rules={[{ required: true, message: `Please enter your ${item.label}` }]}
                                        >
                                            {item.label == "Name" ? <Input /> : <InputNumber />}
                                        </Form.Item>}
                                </React.Fragment>
                            })}
                        </Form>
                    </Card>
                </Space>
            </Space>
        </Modal>
    )
}

export default ModuleModal