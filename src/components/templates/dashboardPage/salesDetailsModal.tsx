import { Card, Descriptions, Modal, Space, Typography } from "antd";
const { Meta } = Card;
const { Text } = Typography;

function SalesDetailsModal({ isModalOpen, setIsModalOpen, salesDetails }: any) {

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal title="Sales request details" open={isModalOpen}
            okText=""
            onOk={() => {

            }}
            onCancel={handleCancel}>
            <Space direction="vertical">

                <Card title={""}>
                    <Descriptions column={2} title="Business Info">
                        <Descriptions.Item label="Name">{salesDetails.tenantName}</Descriptions.Item>
                        <Descriptions.Item label="Number">{salesDetails.number || "-"}</Descriptions.Item>
                        <Descriptions.Item label="Email">{salesDetails.email || "-"}</Descriptions.Item>
                        <Descriptions.Item label="Location">{salesDetails.location}</Descriptions.Item>
                    </Descriptions>

                </Card>
                <Card title={""}>

                    <Descriptions title="Sales Perrson Info">
                        <Descriptions.Item label="Name">{salesDetails.salesPerson}</Descriptions.Item>
                        <Descriptions.Item label="Number">{salesDetails.number || "-"}</Descriptions.Item>
                        <Descriptions.Item label="Email">{salesDetails.email || "-"}</Descriptions.Item>
                    </Descriptions>
                </Card>
                <Card title={""}>
                    <Descriptions column={2} title="Billing Info">
                        <Descriptions.Item label="System Price">{salesDetails.systemPrice || 20000}</Descriptions.Item>
                        <Descriptions.Item label="Selling Price">{salesDetails.price || 0}</Descriptions.Item>
                        <Descriptions.Item label="Duration">{salesDetails.duration || "Yearly"}</Descriptions.Item>
                    </Descriptions>
                </Card>

            </Space>
        </Modal>
    )
}

export default SalesDetailsModal