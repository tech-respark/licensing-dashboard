'use client'

import Loading from '@/app/loading';
import { DATE_FORMAT } from '@/constants/common';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getClientById, getClientsByProduct } from '@/lib/internalApi/clients';
import { getAuthUserState } from '@/redux/slices/auth';
import type { TableProps } from 'antd';
import { Button, Card, Space, Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { INITIAL_FILTERS } from '../dashboardPage';
import Filters from '../dashboardPage/filters';
import ClientModal from './clientModal';
import Styles from "./clientsPage.module.scss";
import { TABLE_COLUMNS } from './constant';

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

function ClientsPage() {
    const [modalData, setModalData] = useState({ active: false, client: null });
    const [clientsList, setClientsList] = useState<any[]>([]);
    const userData = useAppSelector(getAuthUserState);
    const [isLoading, setIsLoading] = useState(false)

    const [filters, setFilters] = useState(INITIAL_FILTERS)

    const fetchRequests = () => {
        const filtersList: any = { ...filters };
        delete filtersList.currentStatus;

        setIsLoading(true)
        getClientsByProduct({
            ...filters,
            userId: Boolean(userData?.rolePermissions?.clientsDashboard) ? filters.userId : userData?.id,
            fromDate: dayjs(filters.fromDate).format(DATE_FORMAT),
            toDate: dayjs(filters.toDate).format(DATE_FORMAT)
        }).then((res: any) => {
            setIsLoading(false)
            if (res.data) {
                setClientsList(res.data)
            } else setClientsList([])
        })
    }

    useEffect(() => {
        fetchRequests()
    }, [filters])

    const handleModalResponse = (data: any) => {
        fetchRequests()
        setModalData({ active: false, client: null })
    }

    const handleChange: OnChange = (pagination: any) => {
        console.log('Various parameters', pagination);
        setFilters({ ...filters, pageNumber: pagination.current })
    };

    const data: DataType[] = [...clientsList];

    return (
        <>
            <Space className={Styles.dashboardWrapper} direction='vertical'>
                <Card title="All Clients List"
                    extra={
                        <Space>
                            <Button type='primary' onClick={() => setModalData({ active: true, client: null })}>Add New Client</Button>
                            <Filters hide={"status"} setInitialFilters={setFilters} initialFilters={filters} />
                        </Space>}
                >
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
                        rowKey={(record) => record.id}
                        bordered
                        pagination={{ pageSize: 10 }}
                        // scroll={{ x: 1500, y: 500 }}
                        columns={TABLE_COLUMNS()}
                        dataSource={data}
                        onChange={handleChange} />
                </Card>
            </Space>
            {isLoading && <Loading />}
            {modalData.active && <ClientModal modalData={modalData} handleModalResponse={handleModalResponse} />}
        </>
    )
}

export default ClientsPage