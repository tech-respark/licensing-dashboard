import { Tag } from 'antd';

export interface DataType {
    key: string;
    productName: string;
    tenantName: string;
    clientName: string,
    salesPerson: string,
    stores: string;
    price: number;
    location: string;
}

export const TABLE_COLUMNS = () => [
    {
        title: 'Business Name',
        dataIndex: 'tenantName',
        key: 'tenantName',
    },
    {
        title: 'Sales Person',
        dataIndex: 'salesPersonName',
        key: 'salesPersonName'
    },
    {
        title: 'Selling Price',
        dataIndex: 'sellingPrice',
        key: 'sellingPrice'
    },
    {
        title: 'Invoice',
        dataIndex: 'invoiceNumber',
        key: 'invoiceNumber'
    },
    {
        title: 'Status',
        dataIndex: 'currentStatus',
        key: 'currentStatus',
        render: (_: any, { currentStatus }: any) => {
            let color = "green";
            if (currentStatus.toLowerCase().includes("reject")) color = "red";
            if (currentStatus.includes("APPROVED_BY_HOS")) color = "cyan";
            if (currentStatus.includes("approve")) color = "green";
            if (currentStatus.toLowerCase().includes("onboard")) color = "blue";
            if (currentStatus.toLowerCase().includes("nigotiate")) color = "purple";
            return <>
                <Tag color={color} key={currentStatus}>
                    {currentStatus}
                </Tag>
            </>
        }
    },
];