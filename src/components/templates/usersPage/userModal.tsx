import { Card, Checkbox, CheckboxOptionType, Form, Input, Modal, Space } from "antd";
import React, { useState } from "react";
const { Meta } = Card;

function UserModal({ isModalOpen, setIsModalOpen }: any) {
    const [form] = Form.useForm();

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const fildsList = [
        "name",
        "number",
        "email",
        "address",
        "city",
        "state",
        "country",
    ]

    type FieldType = {
        name?: string;
        number?: string;
        email?: string;
        address?: string;
        city?: string;
        state?: string;
        country?: string;
    };

    const onCreate = (values: any) => {
        console.log(values)
    }

    const permissionsList = [
        { key: "1", title: "Dashboard" },
        { key: "2", title: "Plans" },
        { key: "3", title: "Module" },
        { key: "4", title: "Clients" },
    ]
    const defaultCheckedList = permissionsList.map((item) => item.key as string);
    const [checkedList, setCheckedList] = useState(defaultCheckedList);
    const options = permissionsList.map(({ key, title }: any) => ({
        label: title,
        value: key,
    }));
    return (
        <Modal title="Add New User" open={isModalOpen}
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
            // styles={{
            //     content: { maxHeight: 500, overflow: "auto", }
            // }}
            onCancel={handleCancel}>
            <Space direction="vertical">
                <Space>
                    <Card title={"User Details"} style={{ width: "100%" }}>
                        <Form
                            name="Add-client"
                            style={{ width: "100%" }}
                            autoComplete="off"
                            form={form}
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
                    </Card>
                </Space>
                <Card style={{ width: "100%" }}>
                    <Space direction="vertical">
                        <Meta title="User Permissions" />
                        <Checkbox.Group
                            value={checkedList}
                            options={options as CheckboxOptionType[]}
                            onChange={(value) => {
                                setCheckedList(value as string[]);
                            }}
                        />
                    </Space>
                </Card>
            </Space>
        </Modal>
    )
}

export default UserModal