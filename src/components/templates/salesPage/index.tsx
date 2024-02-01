"use client"
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAllRequests, getRequestById } from "@/lib/internalApi/requests";
import { getAuthUserState } from "@/redux/slices/auth";
import type { TableColumnsType, TableProps } from 'antd';
import { Button, Card, Space, Table } from "antd";
import { useEffect, useState } from "react";
import CreateRequestModal from "./createRequestModal";
import Styles from "./salespage.module.scss";

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

function SalesPage() {

    const [requestList, setRequestList] = useState<any[]>([]);
    const userData = useAppSelector(getAuthUserState);
    const [modalData, setModalData] = useState({ active: false, request: null });

    useEffect(() => {
        getAllRequests().then((res: any) => {
            if (res.data) setRequestList(res.data)
        }).catch(function (error: any) {
            console.log(`/getUsersByProduct `, error);
        });
    }, [])

    const data: DataType[] = [...requestList];

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
            key: 'businessAddress'
        },
        {
            title: 'Sales Person',
            dataIndex: 'createdBy',
            key: 'createdBy'
        },
    ];
    const handleChange: OnChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
    };

    const handleModalResponse = (data: any) => {
        if (data?.id) {
            const listCopy: any[] = [...requestList]
            let index = requestList.findIndex((u: any) => u.id == data.id);
            if (index == -1) {
                listCopy.unshift(data);
            } else {
                listCopy[index] = data
            }
            setRequestList(listCopy)
        }
        setModalData({ active: false, request: null })
    }

    return (
        <>
            <Space className={Styles.dashboardWrapper} direction='vertical'>
                <Card title="All Sales List" extra={<Space>
                    <Button type='primary' size='large' onClick={() => setModalData({ active: true, request: null })}>Add New Request</Button>
                </Space>}>
                    <Table
                        onRow={(record: any, rowIndex: any) => {
                            return {
                                onClick: (event) => {
                                    console.log(record)
                                    getRequestById(record.id).then((res: any) => {
                                        setModalData({ active: true, request: res.data })
                                    })
                                }, // click row
                            };
                        }}
                        bordered
                        pagination={{ pageSize: 10 }}
                        scroll={{ x: 1500, y: 500 }}
                        columns={columns} dataSource={data}
                    //  onChange={handleChange} 
                    />
                </Card>
            </Space>
            {modalData.active && <CreateRequestModal modalData={modalData} handleModalResponse={handleModalResponse} />}
        </>
    )
}

export default SalesPage