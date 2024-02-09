'use client'

import { ADMIN_ROLE, CEO_ROLE, DATE_FORMAT, REQUEST_STATUSES, SALES_PERSON_ROLE } from '@/constants/common';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getClientsByProduct } from '@/lib/internalApi/clients';
import { getModulesByProduct } from '@/lib/internalApi/module';
import { getDashboardRequests, getRequestById } from '@/lib/internalApi/requests';
import { getUsersByProduct } from '@/lib/internalApi/user';
import { getAuthUserState } from '@/redux/slices/auth';
import { toggleLoader } from '@/redux/slices/loader';
import type { CheckboxOptionType, TableProps } from 'antd';
import { Button, Card, Checkbox, Popover, Space, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { LuColumns, LuPieChart } from 'react-icons/lu';
import { getCurrentStatus } from '../requestUtils';
import { DataType, TABLE_COLUMNS } from '../salesPage/constant';
import CreateRequestModal from '../salesPage/createRequestModal';
import Styles from "./dashboardPage.module.scss";
import Filters from './filters';
import PieChartView from './pieChartView';
import SalesDetailsModal from './salesDetailsModal';
const { Text, Title } = Typography;

type OnChange = NonNullable<TableProps<DataType>['onChange']>;

function DashboardPage() {

    const [modalData, setModalData] = useState({ active: false, request: null });
    const [chartView, setChartView] = useState(false);
    const [salesRequestsList, setSalesRequestsList] = useState<DataType[]>([]);
    const userData = useAppSelector(getAuthUserState);
    const router = useRouter();
    const [clientsList, setClientsList] = useState<any[]>([]);
    const [modulesList, setModulesList] = useState<any[]>([]);
    const [usersList, setUsersList] = useState<any[]>([]);
    const dispatch = useAppDispatch();

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

    const fetchBaseData = () => {
        return new Promise((res: any, rej: any) => {
            if (clientsList.length != 0 && modulesList.length != 0 && usersList.length != 0) {
                res(true)
            } else {
                let clientsList: any = [];
                let usersList: any = [];
                let modulesList: any = [];

                getClientsByProduct(defaultFilters).then((res: any) => {
                    if (res.data) clientsList = res.data;
                }).catch(function (error: any) {
                    console.log(`/getClientsByProduct `, error);
                });

                getUsersByProduct(userData?.productId).then((res: any) => {
                    if (res.data) usersList = res.data.filter((u: any) => u.roleName == SALES_PERSON_ROLE);
                }).catch(function (error: any) {
                    console.log(`/getUsersByProduct `, error);
                });
                getModulesByProduct(userData?.productId).then((res: any) => {
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

    useEffect(() => {
        if (userData?.roleName && !(userData?.roleName == CEO_ROLE || userData?.roleName == ADMIN_ROLE)) {
            router.push("/sales")
        }
    }, [userData])


    const fetchRequests = () => {
        dispatch(toggleLoader(true))
        getDashboardRequests(
            {
                ...filters,
                orderBy: "sellingPrice",
                fromDate: dayjs(filters.fromDate).format(DATE_FORMAT),
                toDate: dayjs(filters.toDate).format(DATE_FORMAT)
            }
        ).then((res: any) => {
            if (res.data) {
                setSalesRequestsList(res.data)
                dispatch(toggleLoader(false))
            } else {
                setSalesRequestsList([])
                dispatch(toggleLoader(false))
            }
        })
    }

    useEffect(() => {
        fetchRequests()
    }, [filters])

    const handleModalResponse = () => {
        fetchRequests();
        setModalData({ active: false, request: null })
    }

    const handleChange: OnChange = (pagination: any) => {
        console.log('Various parameters', pagination);
        setFilters({ ...filters, pageNumber: pagination.current })
    };

    const defaultCheckedList = TABLE_COLUMNS().map((item) => item.key as string);

    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    const options = TABLE_COLUMNS().map(({ key, title }) => ({
        label: title,
        value: key
    }));

    const newColumns = TABLE_COLUMNS().map((item) => ({
        ...item,
        hidden: !checkedList.includes(item.key as string),
    }));

    const renderColumnsSettings = () => {
        return <Space direction='vertical'>
            <Checkbox.Group
                style={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                    flexDirection: "column",
                    gap: "10px"
                }}
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
            <Button type='primary' onClick={() => setChartView(!chartView)} icon={<LuPieChart />}>{!chartView ? "Chart" : "Table"} View</Button>
            <Text className={Styles.label}>Sales Requests Table</Text>
            {chartView ? <Button disabled={true} icon={<LuColumns />}>Columns</Button> : <Popover title="Show or Hide Columns" content={renderColumnsSettings()}>
                <Button disabled={chartView} icon={<LuColumns />}>Columns</Button>
            </Popover>}
        </Space>
    }

    return (
        <>
            <div className={Styles.dashboardWrapper} >
                <Card title={renderHeaders()}
                    extra={<Filters defaultFilters={defaultFilters} setInitialFilters={setFilters} initialFilters={filters} />}
                    bodyStyle={{
                        paddingBottom: 0
                    }}
                >
                    {!chartView ? <Table
                        onRow={(record: any) => {
                            return {
                                onClick: () => {
                                    dispatch(toggleLoader(true));
                                    fetchBaseData().then(() => {
                                        getRequestById(record.saleId).then((res: any) => {
                                            dispatch(toggleLoader(false));
                                            console.log("original request", res.data)
                                            setModalData({ active: true, request: res.data })
                                        })
                                    })
                                },
                            };
                        }}
                        bordered
                        rowKey={(record) => record.key}
                        pagination={{ pageSize: 10 }}
                        // scroll={{ x: 1500, y: 500 }}
                        columns={newColumns}
                        dataSource={salesRequestsList}
                        onChange={handleChange} />
                        : <>
                            <Space direction='vertical'>
                                <PieChartView type="salesPersonName" valueKey="Total" salesRequestsList={salesRequestsList} />
                                <PieChartView type="currentStatus" valueKey="Count" salesRequestsList={salesRequestsList} />
                            </Space>
                        </>
                    }
                </Card>
            </div>

            {Boolean(modalData.active) && <>

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
                    {modalData.active && <SalesDetailsModal
                        handleModalResponse={handleModalResponse}
                        isModalOpen={modalData.active}
                        setIsModalOpen={() => setModalData({ active: false, request: null })}
                        salesDetails={modalData.request}
                    />}
                </>}
            </>}

            {/* {Boolean(isModalOpen) && <SalesDetailsModal handleModalResponse={handleModalResponse} isModalOpen={Boolean(isModalOpen)} setIsModalOpen={setIsModalOpen} salesDetails={isModalOpen} />} */}
        </>
    );
}

export default DashboardPage