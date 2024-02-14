import { DATE_FORMAT } from "@/constants/common";
import { removeObjRef } from "@/utils/common";
import { Card, Descriptions, Divider, Modal, Space, Typography } from "antd";
import dayjs from "dayjs";
import { Fragment, useState } from "react";
import { getStatusWithTag } from "../requestUtils";
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
        <>
            <Modal title="Sales request details"
                open={isModalOpen}
                okText=""
                footer={(_, { OkBtn, CancelBtn }) => (
                    <>
                        {<RequestActions CancelBtn={<CancelBtn />} handleModalResponse={handleModalResponse} requestDetails={requestDetails} updateNewStatus={updateNewStatus} />}
                    </>)}
                onOk={() => {

                }}
                styles={{
                    content: { width: 630 },
                    body: {
                        width: "100%",
                        maxHeight: 500,
                        overflow: "auto"
                    }
                }}
                cancelText="Close"
                onCancel={handleCancel}>
                <Space direction="vertical">
                    <Card title={""}>
                        <Descriptions column={2} title="">
                            <Descriptions.Item label="Invoice Number">{requestDetails.invoiceNumber}</Descriptions.Item>
                            <Descriptions.Item label="Status">{getStatusWithTag(requestDetails.currentStatus)}</Descriptions.Item>
                            <Descriptions.Item label="Sale Type">{requestDetails.type}</Descriptions.Item>
                        </Descriptions>
                    </Card>

                    <Card title={""}>
                        <Descriptions column={2} title="Business Info">
                            <Descriptions.Item label="Name">{requestDetails.tenantBusinessName}</Descriptions.Item>
                            <Descriptions.Item label="Owner">{requestDetails.tenantName}</Descriptions.Item>
                            {Boolean(requestDetails.number) && <Descriptions.Item label="Number">{requestDetails.number || "-"}</Descriptions.Item>}
                            {Boolean(requestDetails.email) && <Descriptions.Item label="Email">{requestDetails.email || "-"}</Descriptions.Item>}
                            <Descriptions.Item label="City">{requestDetails.tenantCity}</Descriptions.Item>
                            <Descriptions.Item label="State">{requestDetails.tenantState}</Descriptions.Item>
                            <Descriptions.Item label="Country">{requestDetails.tenantCountry}</Descriptions.Item>
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
                                                    return <Fragment key={mi}>
                                                        <Text>{moduleDetails.moduleName}</Text>
                                                    </Fragment>
                                                })}
                                            </Space>
                                        </Descriptions.Item>
                                    </Descriptions>
                                </Space>
                            })}
                        </Descriptions>

                        <Divider style={{ margin: 10 }} />

                        <Descriptions column={2} title="Status History">
                            {requestDetails.statusesList.map((statusDetails: any, si: number) => {
                                return <Space key={si}>
                                    <Descriptions column={1} title={getStatusWithTag(statusDetails.status)}>
                                        <Descriptions.Item label="Created By">{statusDetails.createdBy}</Descriptions.Item>
                                        <Descriptions.Item label="Created On">{dayjs(statusDetails.createdOn).format(DATE_FORMAT)}</Descriptions.Item>
                                        {Boolean(statusDetails.remark) && <Descriptions.Item label="Remark">{statusDetails.remark}</Descriptions.Item>}
                                    </Descriptions>
                                </Space>
                            })}
                        </Descriptions>

                        <Divider style={{ margin: 10 }} />

                        <Descriptions column={2} title="Billing Info">
                            <Descriptions.Item label="System Price">{requestDetails.systemGeneratedPrice || 0}</Descriptions.Item>
                            <Descriptions.Item label="Discount">{requestDetails.discountPercentage || 0} %</Descriptions.Item>
                            <Descriptions.Item label="Selling Price">{requestDetails.sellingPrice || 0}</Descriptions.Item>
                        </Descriptions>

                        <Divider style={{ margin: 10 }} />
                        {Boolean(requestDetails?.paymentsList?.length) && <Descriptions column={1} title={`Payment History - ${requestDetails.pendingAmount ? "Pending" : "Paid"}`}>
                            {requestDetails.paymentsList.map((paymentDetails: any, si: number) => {
                                return <Space key={si}>
                                    <Descriptions column={3}>
                                        <Descriptions.Item label="Payment">{paymentDetails.paymentValue}</Descriptions.Item>
                                        <Descriptions.Item label="Updated By">{paymentDetails.createdBy}</Descriptions.Item>
                                        <Descriptions.Item label="Paid On">{dayjs(paymentDetails.createdOn).format(DATE_FORMAT)}</Descriptions.Item>
                                        {Boolean(paymentDetails.remark) && <Descriptions.Item label="Remark">{paymentDetails.remark}</Descriptions.Item>}
                                    </Descriptions>
                                </Space>
                            })}
                        </Descriptions>}
                    </Card>
                </Space>
            </Modal>
        </>
    )
}

export default SalesDetailsModal