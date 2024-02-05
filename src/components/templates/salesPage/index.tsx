"use client"
import Loading from "@/app/loading";
import { SALES_PERSON_ROLE } from "@/constants/common";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getClientsByProduct } from "@/lib/internalApi/clients";
import { getModulesByProduct } from "@/lib/internalApi/module";
import { getAllRequests, getRequestById } from "@/lib/internalApi/requests";
import { getRolesByProduct } from "@/lib/internalApi/roles";
import { getUsersByProduct } from "@/lib/internalApi/user";
import { getAuthUserState } from "@/redux/slices/auth";
import type { TableColumnsType, TableProps } from 'antd';
import { Button, Card, Space, Table } from "antd";
import { useEffect, useState } from "react";
import CreateRequestModal from "./createRequestModal";
import Styles from "./salespage.module.scss";

const dummyRequest = {
    "id": 30,
    "productId": 1,
    "productName": "RESPARK",
    "tenantId": 2,
    "tenantName": "HAIR SALON 2",
    "salesPersonId": 5,
    "salesPersonName": "demo user3",
    "createdOn": "2024-01-30T09:25:08.163029Z",
    "createdBy": "demo3",
    "createdByUserId": 1,
    "modifiedOn": "2024-01-30T09:25:08.156022Z",
    "modifiedBy": null,
    "modifiedByUserId": null,
    "systemGeneratedPrice": 150000,
    "sellingPrice": 145000,
    "discountPercentage": null,
    "discountValue": null,
    "type": "NEW",
    "invoiceNumber": "RESPK00030",
    "pendingAmount": null,
    "remark": null,
    "currentStatus": "SENT_TO_CLIENT",
    "paymentsList": null,
    "statusesList": null,
    "storeSalesList": null
}

interface DataType {
    key: string;
    tenantName: string;
    salesPersonName: string,
    sellingPrice: string,
    discountPercentage: string;
    currentStatus: string;
}

type OnChange = NonNullable<TableProps<DataType>['onChange']>;

function SalesPage() {

    const [requestList, setRequestList] = useState<any[]>([]);
    const userData = useAppSelector(getAuthUserState);
    const [modalData, setModalData] = useState({ active: false, request: null });
    const [clientsList, setClientsList] = useState<any[]>([]);
    const [modulesList, setModulesList] = useState<any[]>([]);
    const [usersList, setUsersList] = useState<any[]>([]);
    const [rolesList, setRolesList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const fetchBaseData = () => {
        return new Promise((res: any, rej: any) => {
            if (clientsList.length != 0 && modulesList.length != 0 && usersList.length != 0 && rolesList.length != 0) {
                res(true)
            } else {
                let clientsList: any = [];
                let usersList: any = [];
                let modulesList: any = [];
                let rolesList: any = [];

                getClientsByProduct(userData?.userProductsList[0].productId).then((res: any) => {
                    if (res.data) clientsList = res.data;
                }).catch(function (error: any) {
                    console.log(`/getClientsByProduct `, error);
                });

                getUsersByProduct(userData?.userProductsList[0].productId).then((res: any) => {
                    //remove this logic after rolename comming in loggedinuser obj
                    if (res.data) usersList = res.data.filter((u: any) => u.roleId == 13);
                    //remove this logic after rolename comming in loggedinuser obj

                    //enable this logic after rolename comming in loggedinuser obj
                    if (res.data && false) usersList = res.data.filter((u: any) => u.roleName == SALES_PERSON_ROLE);
                    //enable this logic after rolename comming in loggedinuser obj

                }).catch(function (error: any) {
                    console.log(`/getUsersByProduct `, error);
                });
                getModulesByProduct(userData?.userProductsList[0].productId).then((res: any) => {
                    if (res.data) modulesList = res.data;
                }).catch(function (error: any) {
                    console.log(`/getModulesByProduct `, error);
                });
                getRolesByProduct(userData?.userProductsList[0].productId).then((res: any) => {
                    if (res.data) rolesList = res.data;
                }).catch(function (error: any) {
                    console.log(`/getRolesByProduct `, error);
                });
                const dataInterval = setInterval(() => {
                    if (clientsList.length != 0 && modulesList.length != 0 && usersList.length != 0 && rolesList.length != 0) {
                        setClientsList(clientsList)
                        setUsersList(usersList)
                        setModulesList(modulesList)
                        setRolesList(rolesList)
                        clearInterval(dataInterval);
                        res(true)
                    }
                }, 1000)
            }
        })
    }

    const fetchAllRequestsList = () => {
        getAllRequests().then((res: any) => {
            if (res.data) setRequestList(res.data)
        }).catch(function (error: any) {
            console.log(`/getUsersByProduct `, error);
        });
    }

    useEffect(() => {
        fetchAllRequestsList()
    }, [])


    const data: DataType[] = [...requestList];

    const columns: TableColumnsType<DataType> = [
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
            title: 'Discount',
            dataIndex: 'discountPercentage',
            key: 'discountPercentage'
        },
        {
            title: 'Status',
            dataIndex: 'currentStatus',
            key: 'currentStatus'
        },
    ];

    const handleModalResponse = (data: any) => {
        // fetchAllRequestsList()
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
                    <Button type='primary' size='large' onClick={() => {
                        setIsLoading(true);
                        fetchBaseData().then(() => {
                            setIsLoading(false);
                            setModalData({ active: true, request: null })
                        })
                    }}>Add New Request</Button>
                </Space>}>
                    <Table
                        onRow={(record: any) => {
                            return {
                                onClick: () => {
                                    setIsLoading(true);
                                    fetchBaseData().then(() => {
                                        getRequestById(record.id).then((res: any) => {
                                            setIsLoading(false);
                                            console.log("original request", res.data)
                                            setModalData({ active: true, request: res.data })
                                        })
                                    })
                                }, // click row
                            };
                        }}
                        rowKey={(record) => record.id}
                        bordered
                        pagination={{ pageSize: 10 }}
                        // scroll={{ x: 1500, y: 500 }}
                        columns={columns} dataSource={data}
                    //  onChange={handleChange} 
                    />
                </Card>
            </Space>
            {isLoading && <Loading />}
            {modalData.active && <CreateRequestModal
                clientsList={clientsList}
                modulesList={modulesList}
                usersList={usersList}
                modalData={modalData}
                rolesList={rolesList}
                setClientsList={setClientsList}
                handleModalResponse={handleModalResponse} />}
        </>
    )
}

export default SalesPage