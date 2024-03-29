import { getStatusWithTag } from "../requestUtils";

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
        title: 'Invoice',
        dataIndex: 'invoiceNumber',
        key: 'invoiceNumber'
    },
    {
        title: 'Start Date',
        dataIndex: 'startDate',
        key: 'startDate'
    },
    {
        title: 'Business Name',
        dataIndex: 'tenantBusinessName',
        key: 'tenantBusinessName',
    },
    {
        title: 'Store Name',
        dataIndex: 'storeName',
        key: 'storeName',
    },
    {
        title: 'Selling Price',
        dataIndex: 'sellingPrice',
        key: 'sellingPrice'
    },
    {
        title: 'Expiry Date',
        dataIndex: 'expiryDate',
        key: 'expiryDate'
    },

    {
        title: 'Pending Amount',
        dataIndex: 'pendingAmount',
        key: 'pendingAmount',
    },
    {
        title: 'Sales Person',
        dataIndex: 'salesPersonName',
        key: 'salesPersonName'
    },
    {
        title: 'Status',
        dataIndex: 'currentStatus',
        key: 'currentStatus',
        render: (_: any, { currentStatus }: any) => {
            return <>{getStatusWithTag(currentStatus)}</>
        }
    },
];