
export interface DataType {
    key: string;
    businessName: string;
    businessType: string,
    createdBy: string,
    storeCount: string;
    referralSource: number;
}

export const TABLE_COLUMNS = () => [
    {
        title: 'Business Name',
        dataIndex: 'businessName',
        key: 'businessName',
    },
    {
        title: 'Business Type',
        dataIndex: 'businessType',
        key: 'businessType'
    },
    {
        title: 'Sales Person',
        dataIndex: 'createdBy',
        key: 'createdBy'
    },
    {
        title: 'Store Count',
        dataIndex: 'storeCount',
        key: 'storeCount',
    },
    {
        title: 'Referral Source',
        dataIndex: 'referralSource',
        key: 'referralSource'
    },
];