"use client"
import Loading from "@/app/loading";
import { DATE_FORMAT, SALES_PERSON_ROLE } from "@/constants/common";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getClientsByProduct } from "@/lib/internalApi/clients";
import { getModulesByProduct } from "@/lib/internalApi/module";
import { getAllRequests, getRequestById } from "@/lib/internalApi/requests";
import { getUsersByProduct } from "@/lib/internalApi/user";
import { getAuthUserState } from "@/redux/slices/auth";
import type { TableProps } from 'antd';
import { Button, Card, Space, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Filters from "../dashboardPage/filters";
import { TABLE_COLUMNS } from "./constant";
import CreateRequestModal from "./createRequestModal";
import Styles from "./salespage.module.scss";

export const INITIAL_FILTERS = {
    "filters": [],
    "productId": 1,
    "userId": null,
    "currentStatus": null,
    "sortBy": "DESC",
    "orderBy": "",
    "fromDate": new Date(),
    "toDate": new Date(),
    "pageNumber": 1,
    "recordsPerPage": 10,
}

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

    const userData = useAppSelector(getAuthUserState);
    const [modalData, setModalData] = useState({ active: false, request: null });
    const [clientsList, setClientsList] = useState<any[]>([]);
    const [modulesList, setModulesList] = useState<any[]>([]);
    const [usersList, setUsersList] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false)
    const [salesRequestsList, setSalesRequestsList] = useState<DataType[]>([]);
    const [filters, setFilters] = useState(INITIAL_FILTERS)

    const fetchRequests = () => {
        setIsLoading(true)
        getAllRequests({
            ...filters,
            userId: Boolean(userData?.rolePermissions?.requestsDashboard) ? filters.userId : userData?.id,
            fromDate: dayjs(filters.fromDate).format(DATE_FORMAT),
            toDate: dayjs(filters.toDate).format(DATE_FORMAT)
        }).then((res: any) => {
            setIsLoading(false)
            if (res.data) {
                setSalesRequestsList(res.data)
            }
        })
    }

    useEffect(() => {
        fetchRequests()
    }, [filters])

    const fetchBaseData = () => {
        return new Promise((res: any, rej: any) => {
            if (clientsList.length != 0 && modulesList.length != 0 && usersList.length != 0) {
                res(true)
            } else {
                let clientsList: any = [];
                let usersList: any = [];
                let modulesList: any = [];

                getClientsByProduct(INITIAL_FILTERS).then((res: any) => {
                    if (res.data) clientsList = res.data;
                }).catch(function (error: any) {
                    console.log(`/getClientsByProduct `, error);
                });

                getUsersByProduct(userData?.userProductsList[0].productId).then((res: any) => {
                    if (res.data) usersList = res.data.filter((u: any) => u.roleName == SALES_PERSON_ROLE);
                }).catch(function (error: any) {
                    console.log(`/getUsersByProduct `, error);
                });
                getModulesByProduct(userData?.userProductsList[0].productId).then((res: any) => {
                    if (res.data) modulesList = res.data;
                }).catch(function (error: any) {
                    console.log(`/getModulesByProduct `, error);
                });
                const dataInterval = setInterval(() => {
                    if (clientsList.length != 0 && modulesList.length != 0 && usersList.length != 0) {
                        setClientsList(clientsList)
                        setUsersList(usersList)
                        setModulesList(modulesList)
                        clearInterval(dataInterval);
                        res(true)
                    }
                }, 1000)
            }
        })
    }

    const data: DataType[] = [...salesRequestsList];

    const handleModalResponse = (data: any) => {
        // if (data?.id) {
        //     const listCopy: any[] = [...salesRequestsList]
        //     let index = salesRequestsList.findIndex((u: any) => u.id == data.id);
        //     if (index == -1) {
        //         listCopy.unshift(data);
        //     } else {
        //         listCopy[index] = data
        //     }
        //     setSalesRequestsList(listCopy)
        // }
        fetchRequests()
        setModalData({ active: false, request: null })
    }

    const handleChange: OnChange = (pagination: any) => {
        console.log('Various parameters', pagination);
        setFilters({ ...filters, pageNumber: pagination.current })
    };

    return (
        <>
            <Space className={Styles.dashboardWrapper} direction='vertical'>
                <Card title="All Sales List"
                    extra={
                        <Space>
                            <Button type='primary' onClick={() => {
                                setIsLoading(true);
                                fetchBaseData().then(() => {
                                    setIsLoading(false);
                                    setModalData({ active: true, request: null })
                                })
                            }}>Add New Request</Button>
                            <Filters setInitialFilters={setFilters} initialFilters={filters} />
                        </Space>}
                >
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
                        columns={TABLE_COLUMNS().filter((c: any) => c.key !== "expiryDate")}
                        dataSource={data}
                        onChange={handleChange}
                    />
                </Card>
            </Space>
            {isLoading && <Loading />}

            {modalData.active && <CreateRequestModal
                clientsList={clientsList}
                modulesList={modulesList}
                usersList={usersList}
                modalData={modalData}
                setClientsList={setClientsList}
                handleModalResponse={handleModalResponse} />}
        </>
    )
}

export default SalesPage