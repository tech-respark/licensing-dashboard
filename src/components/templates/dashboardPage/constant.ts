import type { TableColumnsType } from 'antd';

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

export const TABLE_COLUMNS: TableColumnsType<DataType> = [
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
        title: 'Price',
        dataIndex: 'sellingPrice',
        key: 'sellingPrice'
    },
    {
        title: 'Expiry Date',
        dataIndex: 'expiryDate',
        key: 'expiryDate'
    },
    {
        title: 'Sales Person',
        dataIndex: 'salesPersonName',
        key: 'salesPersonName'
    },
];