import { removeObjRef } from "@/utils/common";
import { Card, Descriptions, Divider, Modal, Space, Typography } from "antd";
import { Fragment, useState } from "react";
import RequestActions from "../salesPage/requestActions";
const { Meta } = Card;
const { Text } = Typography;

function SalesDetailsModal({ isModalOpen, setIsModalOpen, salesDetails, handleModalResponse }: any) {

    const [requestDetails, setRequestDetails] = useState(salesDetails);

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const updateNewStatus = (newStatus: any) => {
        const statusList = removeObjRef(requestDetails?.statusesList);
        statusList.push(newStatus);
        setRequestDetails({ ...requestDetails, statusesList: statusList })
    }

    return (
        <Modal title="Sales request details"
            open={isModalOpen}
            okText=""
            footer={(_, { OkBtn, CancelBtn }) => (
                <>
                    <CancelBtn />
                    {<RequestActions handleModalResponse={handleModalResponse} requestDetails={requestDetails} updateNewStatus={updateNewStatus} />}
                </>)}
            onOk={() => {

            }}
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
                        <Descriptions.Item label="Invoice Number">{requestDetails.saleSummary.invoiceNumber}</Descriptions.Item>
                        <Descriptions.Item label="Expiry Date">{requestDetails.saleSummary.expiryDate}</Descriptions.Item>
                        <Descriptions.Item label="Status">{requestDetails.saleSummary.currentStatus}</Descriptions.Item>
                        <Descriptions.Item label="Sale Type">{requestDetails.saleSummary.saleType}</Descriptions.Item>
                        <Descriptions.Item label="License Key">{requestDetails.saleSummary.licenseKey}</Descriptions.Item>
                    </Descriptions>
                </Card>

                <Card title={""}>
                    <Descriptions column={2} title="Business Info">
                        <Descriptions.Item label="Name">{requestDetails.saleSummary.tenantBusinessName}</Descriptions.Item>
                        <Descriptions.Item label="Owner">{requestDetails.saleSummary.tenantName}</Descriptions.Item>
                        {Boolean(requestDetails.number) && <Descriptions.Item label="Number">{requestDetails.number || "-"}</Descriptions.Item>}
                        {Boolean(requestDetails.email) && <Descriptions.Item label="Email">{requestDetails.email || "-"}</Descriptions.Item>}
                        <Descriptions.Item label="City">{requestDetails.saleSummary.tenantCity}</Descriptions.Item>
                        <Descriptions.Item label="State">{requestDetails.saleSummary.tenantState}</Descriptions.Item>
                        <Descriptions.Item label="Country">{requestDetails.saleSummary.tenantCountry}</Descriptions.Item>
                    </Descriptions>

                    <Divider style={{ margin: 10 }} />

                    <Descriptions title="Sales Perrson Info">
                        <Descriptions.Item label="Name">{requestDetails.salesPersonName}</Descriptions.Item>
                    </Descriptions>

                    <Divider style={{ margin: 10 }} />

                    <Descriptions column={1} title="Stores Info">
                        {requestDetails.storeSalesList.map((storeDetails: any, i: number) => {
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

                    <Descriptions column={2} title="Status History">
                        {requestDetails.statusesList.map((statusDetails: any, si: number) => {
                            <Space key={si}>
                                <Descriptions column={1} title={`${statusDetails.status}`}>
                                    <Descriptions.Item label="Created By">{statusDetails.createdBy}</Descriptions.Item>
                                    {Boolean(statusDetails.remark) && <Descriptions.Item label="Remark">{statusDetails.remark}</Descriptions.Item>}
                                </Descriptions>
                            </Space>
                        })}
                    </Descriptions>

                    <Descriptions column={2} title="Billing Info">
                        <Descriptions.Item label="System Price">{requestDetails.systemGeneratedPrice || 0}</Descriptions.Item>
                        <Descriptions.Item label="Discount">{requestDetails.discountPercentage || 0} %</Descriptions.Item>
                        <Descriptions.Item label="Selling Price">{requestDetails.sellingPrice || 0}</Descriptions.Item>
                    </Descriptions>
                </Card>
            </Space>
        </Modal>
    )
}

export default SalesDetailsModal