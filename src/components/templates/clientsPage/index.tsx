'use client'

import { clientsList } from '@/dummyData/clients';
import type { TableColumnsType, TableProps } from 'antd';
import { Button, Card, Space, Table } from 'antd';
import { useState } from 'react';
import ClientModal from './clientModal';
import Styles from "./clientsPage.module.scss";

interface DataType {
    key: string;
    tenantName: string;
    clientName: string,
    salesPerson: string,
    stores: string;
    date: string;
    number: string;
    location: string;
}

type OnChange = NonNullable<TableProps<DataType>['onChange']>;
type Filters = Parameters<OnChange>[1];

type GetSingle<T> = T extends (infer U)[] ? U : never;
type Sorts = GetSingle<Parameters<OnChange>[2]>;

function ClientsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const addClient = () => {
        setIsModalOpen(true)
    }

    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});

    const handleChange: OnChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as Sorts);
    };

    const data: DataType[] = [...clientsList];

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Business Name',
            dataIndex: 'tenantName',
            key: 'tenantName',
        },
        {
            title: 'Client Name',
            dataIndex: 'clientName',
            key: 'clientName',
        },
        {
            title: 'Number',
            dataIndex: 'number',
            key: 'number',
        },
        {
            title: 'Stores',
            dataIndex: 'stores',
            key: 'stores',
        },
        {
            title: 'Date Onboarded',
            dataIndex: 'date',
            key: 'date',
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

    return (
        <>
            <Space className={Styles.dashboardWrapper} direction='vertical'>
                <Card title="All Clients List" extra={<Button type='primary' size='large' onClick={addClient}>Add New Client</Button>}>
                    <Table
                        bordered
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 1500, y: 500 }}
                        columns={columns} dataSource={data} onChange={handleChange} />
                </Card>
            </Space>
            <ClientModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </>
    )
}

export default ClientsPage