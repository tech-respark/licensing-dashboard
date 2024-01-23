import { Checkbox, Form, Input, InputNumber, Modal, Space } from "antd";

function ModuleModal({ isModalOpen, setIsModalOpen }: any) {
    const [form] = Form.useForm();

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    type FieldType = {
        name?: string;
        monthlyPricing?: number;
        quarterlyprice?: number;
        halfYearlyPrice?: number;
        yearlyPrice?: number;
        active?: boolean;
    };

    const onCreate = (values: any) => {
        console.log(values)
    }

    return (
        <Modal title="Add New Module" open={isModalOpen}
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
                    <Form.Item<FieldType>
                        label="Module Name"
                        name="name"
                        rules={[{ required: true, message: 'Please enter name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        name="active"
                        valuePropName="checked"
                        wrapperCol={{ offset: 8, span: 16 }}
                    >
                        <Checkbox>Active</Checkbox>
                    </Form.Item>

                    <Form.Item
                        label="Monthly Pricing"
                        name="monthlyPricing"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Quartrly Pricing"
                        name="quarterlyprice"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Half Yearly Pricing"
                        name="halfYearlyPrice"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Yearly Pricing"
                        name="yearlyPrice"
                        rules={[{ required: true, message: 'Please input!' }]}
                    >
                        <InputNumber style={{ width: '100%' }} />
                    </Form.Item>

                </Form>
            </Space>
        </Modal>
    )
}

export default ModuleModal