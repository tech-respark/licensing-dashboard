'use client'

import { salesList } from '@/dummyData/sales';
import type { CheckboxOptionType, TableColumnsType, TableProps } from 'antd';
import { Button, Card, Checkbox, Popover, Space, Table, Typography } from 'antd';
import { useState } from 'react';
import Styles from "./dashboardPage.module.scss";
import SalesPersonSale from './salesPersonSale';
const { Text } = Typography;
interface DataType {
    key: string;
    productName: string;
    tenantName: string;
    clientName: string,
    salesPerson: string,
    stores: string;
    price: number;
    location: string;
}

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

function DashboardPage() {
    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});

    const handleChange: OnChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as Sorts);
    };

    const clearAll = () => {
        setFilteredInfo({});
        setSortedInfo({});
    };

    const data: DataType[] = [...salesList, ...salesList];

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Product Name',
            dataIndex: 'productName',
            key: 'productName',
            filters: [
                { text: 'Respark', value: 'Respark' },
                { text: 'Demyto', value: 'Demyto' },
            ],
            filteredValue: filteredInfo.productName || null,
            onFilter: (value: any, record: DataType) => record.productName.includes(value),
            sorter: (a, b) => a.productName.length - b.productName.length,
            sortOrder: sortedInfo.columnKey === 'productName' ? sortedInfo.order : null,
            // ellipsis: true,
        },
        {
            title: 'Business Name',
            dataIndex: 'tenantName',
            key: 'tenantName',
        },
        {
            title: 'Stores',
            dataIndex: 'stores',
            key: 'stores',
        },
        {
            title: 'Client Name',
            dataIndex: 'clientName',
            key: 'clientName',
        },
        {
            title: 'Price',
            dataIndex: 'price',
            key: 'price',
            sorter: (a, b) => a.price - b.price,
            sortOrder: sortedInfo.columnKey === 'price' ? sortedInfo.order : null,
            // ellipsis: true,
        },
        {
            title: 'Location',
            dataIndex: 'location',
            key: 'location',
            filters: [
                { text: 'Pune', value: 'Pune' },
                { text: 'Mumbai', value: 'Mumbai' },
                { text: 'Banglore', value: 'Banglore' },
                { text: 'Dubai', value: 'Dubai' },
            ],
            filteredValue: filteredInfo.location || null,
            onFilter: (value: any, record) => record.location.includes(value),
            sorter: (a, b) => a.location.length - b.location.length,
            sortOrder: sortedInfo.columnKey === 'location' ? sortedInfo.order : null,
            // ellipsis: true,
        },
        {
            title: 'Sales Person',
            dataIndex: 'salesPerson',
            key: 'salesPerson',
            filters: [
                { text: 'Unnati', value: 'Unnati' },
                { text: 'Mayank', value: 'Mayank' },
                { text: 'Ashish', value: 'Ashish' },
                { text: 'Kiara', value: 'Kiara' },
                { text: 'Karishma', value: 'Karishma' },
            ],
            filteredValue: filteredInfo.salesPerson || null,
            onFilter: (value: any, record: DataType) => record.salesPerson.includes(value),
            sorter: (a, b) => a.salesPerson.length - b.salesPerson.length,
            sortOrder: sortedInfo.columnKey === 'salesPerson' ? sortedInfo.order : null,
            // ellipsis: true,
        },
    ];

    const defaultCheckedList = columns.map((item) => item.key as string);

    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    const options = columns.map(({ key, title }) => ({
        label: title,
        value: key,
    }));

    const newColumns = columns.map((item) => ({
        ...item,
        hidden: !checkedList.includes(item.key as string),
    }));

    const renderColumnsSettings = () => {
        return <Space wrap style={{ width: 300 }} className={Styles.columnSettings}>
            <Checkbox.Group
                value={checkedList}
                options={options as CheckboxOptionType[]}
                onChange={(value) => {
                    setCheckedList(value as string[]);
                }}
            />
        </Space>
    }

    const renderHeaders = () => {
        return <Space className={Styles.tableHeader}>
            <Text className={Styles.label}>Sales Requests Table</Text>
            <Popover title="Show/Hide Columns" content={renderColumnsSettings()}>
                <Button>Columns</Button>
            </Popover>
        </Space>
    }

    return (
        <>
            <Space className={Styles.dashboardWrapper} direction='vertical'>
                <Card title={renderHeaders()} extra={<Button type='dashed' onClick={clearAll}>Clear Filters</Button>}>
                    <Table
                        bordered
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 1500, y: 500 }}
                        columns={newColumns} dataSource={data} onChange={handleChange} />
                </Card>

                <Card title={"Sales Person Wise Sales"}>
                    <SalesPersonSale />
                </Card>
            </Space>
        </>
    );
}

export default DashboardPage