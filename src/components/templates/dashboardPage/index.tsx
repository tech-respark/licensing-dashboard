'use client'

import Loading from '@/app/loading';
import { DATE_FORMAT } from '@/constants/common';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getDashboardRequests, getRequestById } from '@/lib/internalApi/requests';
import { getAuthUserState } from '@/redux/slices/auth';
import type { CheckboxOptionType, TableProps } from 'antd';
import { Button, Card, Checkbox, Popover, Space, Table, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { LuColumns, LuPieChart } from 'react-icons/lu';
import { DataType, TABLE_COLUMNS } from './constant';
import Styles from "./dashboardPage.module.scss";
import Filters from './filters';
import SalesDetailsModal from './salesDetailsModal';
import SalesPersonSale from './salesPersonSale';
const { Text, Title } = Typography;

type OnChange = NonNullable<TableProps<DataType>['onChange']>;

export const INITIAL_FILTERS = {
    "filters": [],
    "productId": 1,
    "userId": null,
    "currentStatus": null,
    "sortBy": "DESC",
    "orderBy": "sellingPrice",
    "fromDate": new Date(),
    "toDate": new Date(),
    "pageNumber": 1,
    "recordsPerPage": 10,
}
function DashboardPage() {

    const [isModalOpen, setIsModalOpen] = useState(null);
    const [chartView, setChartView] = useState(false);
    const [salesRequestsList, setSalesRequestsList] = useState<DataType[]>([]);
    const userData = useAppSelector(getAuthUserState);
    const [isLodaing, setIsLodaing] = useState(false)

    const [filters, setFilters] = useState(INITIAL_FILTERS)

    const fetchRequests = () => {
        setIsLodaing(true)
        getDashboardRequests(
            {
                ...filters,
                fromDate: dayjs(filters.fromDate).format(DATE_FORMAT),
                toDate: dayjs(filters.toDate).format(DATE_FORMAT)
            }
        ).then((res: any) => {
            if (res.data) {
                setSalesRequestsList(res.data)
                setIsLodaing(false)
            } else {
                setSalesRequestsList([])
                setIsLodaing(false)
            }
        })
    }

    useEffect(() => {
        fetchRequests()
    }, [filters])

    const handleChange: OnChange = (pagination, filters, sorter) => {
        console.log('Various parameters', pagination, filters, sorter);
    };

    const defaultCheckedList = TABLE_COLUMNS.map((item) => item.key as string);

    const [checkedList, setCheckedList] = useState(defaultCheckedList);

    const options = TABLE_COLUMNS.map(({ key, title }) => ({
        label: title,
        value: key
    }));

    const newColumns = TABLE_COLUMNS.map((item) => ({
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
                    extra={<Filters setInitialFilters={setFilters} initialFilters={filters} />}
                    bodyStyle={{
                        paddingBottom: 0
                    }}
                >
                    {!chartView ? <Table
                        onRow={(record: any) => {
                            return {
                                onClick: () => {
                                    console.log(record)
                                    setIsLodaing(true);
                                    getRequestById(record.saleId).then((res: any) => {
                                        setIsLodaing(false);
                                        console.log("original request", res.data)
                                        setIsModalOpen({ ...res.data, saleSummary: record })
                                    })
                                },
                            };
                        }}
                        bordered
                        rowKey={(record) => record.id}
                        pagination={{ pageSize: 10 }}
                        // scroll={{ x: 1500, y: 500 }}
                        columns={newColumns} dataSource={salesRequestsList} onChange={handleChange} />
                        : <SalesPersonSale />}
                </Card>
            </div>
            {Boolean(isModalOpen) && <SalesDetailsModal isModalOpen={Boolean(isModalOpen)} setIsModalOpen={setIsModalOpen} salesDetails={isModalOpen} />}
            {isLodaing && <Loading />}
        </>
    );
}

export default DashboardPage