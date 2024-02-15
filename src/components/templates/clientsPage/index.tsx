'use client'

import { DATE_FORMAT } from '@/constants/common';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getClientById, getClientsByProduct } from '@/lib/internalApi/clients';
import { getAuthUserState } from '@/redux/slices/auth';
import { toggleLoader } from '@/redux/slices/loader';
import type { TableProps } from 'antd';
import { Button, Card, Space, Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
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
    const dispatch = useAppDispatch()
    const [paginationProps, setPaginationProps] = useState({
        pageSize: 10,
        total: 0,
        showSizeChanger: true,
        pageSizeOptions: ['10', '20', '30', '40', '50'],
        current: 1
    })
    const defaultFilters = {
        "filters": [],
        "productId": userData?.productId,
        "userId": null,
        "currentStatus": null,
        "sortBy": "DESC",
        "orderBy": "",
        "fromDate": new Date(),
        "toDate": new Date(),
        "pageNumber": 1,
        "recordsPerPage": 10,
    }
    const [filters, setFilters] = useState(defaultFilters)

    const fetchRequests = () => {
        const filtersList: any = { ...filters };
        delete filtersList.currentStatus;

        dispatch(toggleLoader(true))
        getClientsByProduct({
            ...filters,
            userId: Boolean(userData?.rolePermissions?.clients) ? filters.userId : userData?.id,
            fromDate: dayjs(filters.fromDate).format(DATE_FORMAT),
            toDate: dayjs(filters.toDate).format(DATE_FORMAT)
        }).then((res: any) => {
            dispatch(toggleLoader(false))
            if (res.data) {
                setPaginationProps({ ...paginationProps, total: res.totalNumberOfRecords })
                setClientsList(res.data)
            } else setClientsList([])
        })
    }

    useEffect(() => {
        if (userData?.productId) fetchRequests()
    }, [filters])

    const handleModalResponse = (data: any) => {
        fetchRequests()
        setModalData({ active: false, client: null })
    }

    const handleChange: OnChange = (pagination: any) => {
        setPaginationProps({ ...paginationProps, pageSize: pagination.pageSize, current: pagination.current })
        setFilters({ ...filters, pageNumber: pagination.current, recordsPerPage: pagination.pageSize })
        if (pagination.pageSize != filters.recordsPerPage) {//reset if number of records per page changed
            setFilters({ ...filters, pageNumber: 1, recordsPerPage: pagination.pageSize })
            setPaginationProps({ ...paginationProps, pageSize: pagination.pageSize, current: 1 })
        }
        console.log('Various parameters', pagination);
    };

    const data: DataType[] = [...clientsList];

    return (
        <>
            <Space className={Styles.dashboardWrapper} direction='vertical'>
                <Card title="All Clients List"
                    extra={
                        <Space>
                            <Button type='primary' onClick={() => setModalData({ active: true, client: null })}>Add New Client</Button>
                            <Filters hide={"status"} defaultFilters={defaultFilters} setInitialFilters={setFilters} initialFilters={filters} />
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
                        pagination={{ ...paginationProps, showSizeChanger: paginationProps.total > 10 }}
                        // scroll={{ x: 1500, y: 500 }}
                        columns={TABLE_COLUMNS()}
                        dataSource={data}
                        onChange={handleChange} />
                </Card>
            </Space>
            {modalData.active && <ClientModal modalData={modalData} handleModalResponse={handleModalResponse} />}
        </>
    )
}

export default ClientsPage