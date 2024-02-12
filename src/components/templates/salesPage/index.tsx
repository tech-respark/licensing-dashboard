"use client"
import { ADMIN_ROLE, DATE_FORMAT, SALES_PERSON_ROLE } from "@/constants/common";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getClientsByProduct } from "@/lib/internalApi/clients";
import { getModulesByProduct } from "@/lib/internalApi/module";
import { getAllRequests, getRequestById } from "@/lib/internalApi/requests";
import { getUsersByProduct } from "@/lib/internalApi/user";
import { getAuthUserState } from "@/redux/slices/auth";
import { toggleLoader } from "@/redux/slices/loader";
import type { TableProps } from 'antd';
import { Button, Card, Space, Table } from "antd";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import Filters from "../dashboardPage/filters";
import SalesDetailsModal from "../dashboardPage/salesDetailsModal";
import { getCurrentStatus } from "../requestUtils";
import { TABLE_COLUMNS } from "./constant";
import CreateRequestModal from "./createRequestModal";
import { REQUEST_STATUSES } from "./requestActions";
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

    const userData = useAppSelector(getAuthUserState);
    const [modalData, setModalData] = useState({ active: false, request: null });
    const [clientsList, setClientsList] = useState<any[]>([]);
    const [modulesList, setModulesList] = useState<any[]>([]);
    const [usersList, setUsersList] = useState<any[]>([]);
    const [salesRequestsList, setSalesRequestsList] = useState<DataType[]>([]);
    const dispatch = useAppDispatch()

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
        dispatch(toggleLoader(true))
        getAllRequests({
            ...filters,
            userId: Boolean(userData?.rolePermissions?.requestsDashboard) ? filters.userId : userData?.id,
            fromDate: dayjs(filters.fromDate).format(DATE_FORMAT),
            toDate: dayjs(filters.toDate).format(DATE_FORMAT)
        }).then((res: any) => {
            dispatch(toggleLoader(false))
            if (res.data) {
                setSalesRequestsList(res.data)
            }
        })
    }

    useEffect(() => {
        if (userData?.productId) fetchRequests()
    }, [filters])

    const fetchBaseData = () => {
        return new Promise((res: any, rej: any) => {
            if (clientsList.length != 0 && modulesList.length != 0 && usersList.length != 0) {
                res(true)
            } else {
                let clientsList: any = null;
                let usersList: any = null;
                let modulesList: any = null;

                getClientsByProduct(defaultFilters).then((res: any) => {
                    if (res.data) clientsList = res.data;
                }).catch(function (error: any) {
                    console.log(`/getClientsByProduct `, error);
                });

                getUsersByProduct(userData?.productId).then((res: any) => {
                    if (res.data) usersList = res.data.filter((u: any) => u.userProductsList[0].roleName == SALES_PERSON_ROLE);
                }).catch(function (error: any) {
                    console.log(`/getUsersByProduct `, error);
                });
                getModulesByProduct(userData?.productId).then((res: any) => {
                    if (res.data) modulesList = res.data;
                }).catch(function (error: any) {
                    console.log(`/getModulesByProduct `, error);
                });
                const dataInterval = setInterval(() => {
                    if (Boolean(clientsList) && Boolean(modulesList) && Boolean(usersList)) {
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
                                dispatch(toggleLoader(true));
                                fetchBaseData().then(() => {
                                    dispatch(toggleLoader(false));
                                    setModalData({ active: true, request: null })
                                })
                            }}>Add New Request</Button>
                            <Filters defaultFilters={defaultFilters} setInitialFilters={setFilters} initialFilters={filters} />
                        </Space>}
                >
                    <Table
                        onRow={(record: any) => {
                            return {
                                onClick: () => {
                                    dispatch(toggleLoader(true));
                                    fetchBaseData().then(() => {
                                        getRequestById(record.id).then((res: any) => {
                                            dispatch(toggleLoader(false));
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
                        columns={TABLE_COLUMNS().filter((c: any) => (c.key !== "expiryDate") && (c.key == "salesPersonName" ? Boolean(userData?.rolePermissions?.requestsDashboard) : true))}
                        dataSource={data}
                        onChange={handleChange}
                    />
                </Card>
            </Space>

            {modalData.active && <>

                {Boolean(!modalData.request) || (userData?.roleName == ADMIN_ROLE || userData?.roleName == SALES_PERSON_ROLE) && (getCurrentStatus(modalData.request) !== REQUEST_STATUSES.ONBOARDED && getCurrentStatus(modalData.request) !== REQUEST_STATUSES.APPROVED_BY_ADMIN && getCurrentStatus(modalData.request) !== REQUEST_STATUSES.APPROVED_BY_CEO && !getCurrentStatus(modalData.request)?.toLowerCase().includes("reject")) ? <>
                    <CreateRequestModal
                        clientsList={clientsList}
                        modulesList={modulesList}
                        usersList={usersList}
                        modalData={modalData}
                        setClientsList={setClientsList}
                        handleModalResponse={handleModalResponse}
                    />
                </> : <>
                    <SalesDetailsModal
                        handleModalResponse={handleModalResponse}
                        isModalOpen={modalData.active}
                        setIsModalOpen={() => setModalData({ active: false, request: null })}
                        salesDetails={modalData.request}
                    />
                </>}

            </>}
        </>
    )
}

export default SalesPage