'use client'

import { useAppSelector } from '@/hooks/useAppSelector';
import { getClientById, getClientsByProduct } from '@/lib/internalApi/clients';
import { getAuthUserState } from '@/redux/slices/auth';
import type { TableColumnsType, TableProps } from 'antd';
import { Button, Card, Space, Table } from 'antd';
import { useEffect, useState } from 'react';
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
    const [modalData, setModalData] = useState({ active: false, client: null });
    const [clientsList, setClientsList] = useState<any[]>([]);
    const userData = useAppSelector(getAuthUserState);
    const [filteredInfo, setFilteredInfo] = useState<Filters>({});
    const [sortedInfo, setSortedInfo] = useState<Sorts>({});

    const handleChange: OnChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
        setFilteredInfo(filters);
        setSortedInfo(sorter as Sorts);
    };


    useEffect(() => {
        getClientsByProduct(userData.userProductsList[0].productId).then((res: any) => {
            if (res.data) setClientsList(res.data)
        }).catch(function (error: any) {
            console.log(`/getClientsByProduct `, error);
        });
    }, [])

    const handleModalResponse = (data: any) => {
        if (data?.id) {
            const moduleListCopy: any[] = [...clientsList]
            let index = clientsList.findIndex((u: any) => u.id == data.id);
            if (index == -1) {
                moduleListCopy.unshift(data);
            } else {
                moduleListCopy[index] = data
            }
            setClientsList(moduleListCopy)
        }
        setModalData({ active: false, client: null })
    }


    const data: DataType[] = [...clientsList];

    const columns: TableColumnsType<DataType> = [
        {
            title: 'Business Name',
            dataIndex: 'businessName',
            key: 'businessName',
        },
        {
            title: 'Client Name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Number',
            dataIndex: 'phoneNumber',
            key: 'phoneNumber',
        },
        {
            title: 'Stores Count',
            dataIndex: 'storeCount',
            key: 'storeCount',
        },
        {
            title: 'Business Location',
            dataIndex: 'businessAddress',
            key: 'businessAddress',
            // filters: [
            //     { text: 'Pune', value: 'Pune' },
            //     { text: 'Mumbai', value: 'Mumbai' },
            //     { text: 'Banglore', value: 'Banglore' },
            //     { text: 'Dubai', value: 'Dubai' },
            // ],
            // filteredValue: filteredInfo.location || null,
            // onFilter: (value: any, record) => record.location.includes(value),
            // sorter: (a, b) => a.location.length - b.location.length,
            // sortOrder: sortedInfo.columnKey === 'location' ? sortedInfo.order : null,
            // ellipsis: true,
        },
        {
            title: 'Sales Person',
            dataIndex: 'createdBy',
            key: 'createdBy',
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
                <Card title="All Clients List" extra={<Space>
                    <Button type='primary' size='large' onClick={() => setModalData({ active: true, client: null })}>Add New Client</Button>
                </Space>}>
                    <Table
                        onRow={(record: any, rowIndex: any) => {
                            return {
                                onClick: (event) => {
                                    console.log(record)
                                    getClientById(record.id).then((res: any) => {
                                        setModalData({ active: true, client: res.data })
                                    })
                                }, // click row
                            };
                        }}
                        bordered
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 1500, y: 500 }}
                        columns={columns} dataSource={data} onChange={handleChange} />
                </Card>
            </Space>
            {modalData.active && <ClientModal modalData={modalData} handleModalResponse={handleModalResponse} />}
        </>
    )
}

export default ClientsPage