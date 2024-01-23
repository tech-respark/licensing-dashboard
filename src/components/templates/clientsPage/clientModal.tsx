import { Form, Input, Modal, Space } from "antd";
import React from "react";

function ClientModal({ isModalOpen, setIsModalOpen }: any) {
    const [form] = Form.useForm();

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const fildsList = [
        "tenantName",
        "name",
        "number",
        "email",
        "address",
        "source",
        "tenantType",
        "tenantAddress",
        "city",
        "state",
        "country",
        "storesCount",
    ]

    type FieldType = {
        tenantName?: string;
        name?: string;
        number?: string;
        email?: string;
        address?: string;
        source?: string;
        tenantType?: string;
        tenantAddress?: string;
        city?: string;
        state?: string;
        country?: string;
        storesCount?: string;
    };

    const onCreate = (values: any) => {
        console.log(values)
    }

    return (
        <Modal title="Add New Client" open={isModalOpen}
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
            <Space style={{ marginTop: 20 }}>
                <Form
                    name="Add-client"
                    style={{ maxWidth: 600, maxHeight: 500, overflow: "auto" }}
                    autoComplete="off"
                    form={form}
                // layout="vertical"
                >
                    {fildsList.map((item: any, i: number) => {
                        return <React.Fragment key={i}>
                            <Form.Item<FieldType>
                                label={item}
                                name={item}
                                rules={[{ required: true, message: `Please input your ${item}` }]}
                            >
                                <Input />
                            </Form.Item>
                        </React.Fragment>
                    })}

                </Form>
            </Space>
        </Modal>
    )
}

export default ClientModal