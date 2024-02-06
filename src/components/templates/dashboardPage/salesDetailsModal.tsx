import { Card, Descriptions, Divider, Modal, Space, Typography } from "antd";
import { Fragment } from "react";
const { Meta } = Card;
const { Text } = Typography;

function SalesDetailsModal({ isModalOpen, setIsModalOpen, salesDetails }: any) {

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    return (
        <Modal title="Sales request details"
            open={isModalOpen}
            okText=""
            onOk={() => { }}
            styles={{

                content: { width: 600 },
                body: {
                    width: "100%",
                    maxHeight: 500,
                    overflow: "auto"
                }
            }}
            onCancel={handleCancel}>
            <Space direction="vertical">

                <Card title={""}>
                    <Descriptions column={2} title="">
                        <Descriptions.Item label="Invoice Number">{salesDetails.saleSummary.invoiceNumber}</Descriptions.Item>
                        <Descriptions.Item label="Expiry Date">{salesDetails.saleSummary.expiryDate}</Descriptions.Item>
                        <Descriptions.Item label="Status">{salesDetails.saleSummary.currentStatus}</Descriptions.Item>
                        <Descriptions.Item label="Sale Type">{salesDetails.saleSummary.saleType}</Descriptions.Item>
                        <Descriptions.Item label="License Key">{salesDetails.saleSummary.licenseKey}</Descriptions.Item>
                    </Descriptions>
                </Card>

                <Card title={""}>
                    <Descriptions column={2} title="Business Info">
                        <Descriptions.Item label="Name">{salesDetails.saleSummary.tenantBusinessName}</Descriptions.Item>
                        <Descriptions.Item label="Owner">{salesDetails.saleSummary.tenantName}</Descriptions.Item>
                        {Boolean(salesDetails.number) && <Descriptions.Item label="Number">{salesDetails.number || "-"}</Descriptions.Item>}
                        {Boolean(salesDetails.email) && <Descriptions.Item label="Email">{salesDetails.email || "-"}</Descriptions.Item>}
                        <Descriptions.Item label="City">{salesDetails.saleSummary.tenantCity}</Descriptions.Item>
                        <Descriptions.Item label="State">{salesDetails.saleSummary.tenantState}</Descriptions.Item>
                        <Descriptions.Item label="Country">{salesDetails.saleSummary.tenantCountry}</Descriptions.Item>
                    </Descriptions>

                    <Divider style={{ margin: 10 }} />

                    <Descriptions title="Sales Perrson Info">
                        <Descriptions.Item label="Name">{salesDetails.salesPersonName}</Descriptions.Item>
                    </Descriptions>

                    <Divider style={{ margin: 10 }} />

                    <Descriptions column={1} title="Stores Info">
                        {salesDetails.storeSalesList.map((storeDetails: any, i: number) => {
                            return <Space key={i}>
                                <Descriptions column={1} title={`${i + 1}) ${storeDetails.storeName}`}>
                                    <Descriptions.Item label="Start Date">{storeDetails.startDate}</Descriptions.Item>
                                    <Descriptions.Item label="End Date">{storeDetails.endDate}</Descriptions.Item>
                                    <Descriptions.Item label="System Generated Module price">{storeDetails.generatedStorePrice}</Descriptions.Item>
                                    <Descriptions.Item label="Module List">
                                        <Space >
                                            {storeDetails.modulesList.map((moduleDetails: any, mi: number) => {
                                                return <Fragment>
                                                    <Text>{moduleDetails.moduleName}</Text>
                                                </Fragment>
                                            })}
                                        </Space>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Space>
                        })}
                    </Descriptions>

                    <Descriptions column={2} title="Billing Info">
                        <Descriptions.Item label="System Price">{salesDetails.systemGeneratedPrice || 0}</Descriptions.Item>
                        <Descriptions.Item label="Discount">{salesDetails.discountPercentage || 0} %</Descriptions.Item>
                        <Descriptions.Item label="Selling Price">{salesDetails.sellingPrice || 0}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </Space>
        </Modal>
    )
}

export default SalesDetailsModal