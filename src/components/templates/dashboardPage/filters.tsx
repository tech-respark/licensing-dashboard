import { REQUEST_STATUSES, SALES_PERSON_ROLE } from '@/constants/common';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getUsersByProduct } from '@/lib/internalApi/user';
import { getAuthUserState } from '@/redux/slices/auth';
import { Button, DatePicker, Divider, Popover, Select, Space, Typography } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { LuFilter, LuX } from 'react-icons/lu';
import Styles from "./dashboardPage.module.scss";
const { Text } = Typography;

function Filters({ defaultFilters, hide = "", initialFilters, setInitialFilters }: any) {
    const [statusOptions, setStatusOptions] = useState<any>([])
    const userData = useAppSelector(getAuthUserState);
    const [salesPersonsList, setSalesPersonsList] = useState([])
    const [openFiltersPopup, setOpenFiltersPopup] = useState(false)
    const [filters, setFilters] = useState(initialFilters);

    useEffect(() => {
        setFilters(initialFilters);
    }, [openFiltersPopup])

    useEffect(() => {
        const options: any = [];
        Object.keys(REQUEST_STATUSES).map((status: string) => {
            options.push({ label: status, value: status })
        })
        setStatusOptions(options)

        if (userData?.productId) {
            getUsersByProduct(userData?.productId).then((res: any) => {
                if (res.data) setSalesPersonsList(res.data.filter((u: any) => u.roleName == SALES_PERSON_ROLE).map((u: any) => (
                    { value: u.id, label: u.name }
                )))
            }).catch(function (error: any) {
                console.log(`/getUsersByProduct `, error);
            });
        }
    }, [])

    const onClear = () => {
        setInitialFilters(defaultFilters);
        setOpenFiltersPopup(false);
    }

    const onUpdateFilters = () => {
        setInitialFilters(filters);
        setOpenFiltersPopup(false);
    }

    const renderFilterContent = () => {
        return <Space direction='vertical' className={Styles.filterWrap} size={20}>
            <Space>
                <Space direction='vertical'>
                    <Text>Start Date</Text>
                    <DatePicker inputReadOnly allowClear={false} value={dayjs(filters.fromDate)} onChange={(e: any) => setFilters({ ...filters, fromDate: e['$d'] })} />
                </Space>
                <Space direction='vertical'>
                    <Text>End Date</Text>
                    <DatePicker inputReadOnly allowClear={false} value={dayjs(filters.toDate)} onChange={(e: any) => setFilters({ ...filters, toDate: e['$d'] })} />
                </Space>
            </Space>

            {!Boolean(hide.includes("status")) && <Space direction='vertical'>
                <Text>Status</Text>
                <Select
                    allowClear
                    showSearch
                    style={{ width: 250 }}
                    placeholder="Search status"
                    optionFilterProp="children"
                    filterOption={(input: any, option: any) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA: any, optionB: any) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    value={filters.currentStatus}
                    onChange={(value: any) => setFilters({ ...filters, currentStatus: value })}
                    options={statusOptions}
                />
            </Space>}

            {Boolean(userData?.rolePermissions?.usersDashboard) && <Space direction='vertical'>
                <Text>Sales Persons</Text>
                <Select
                    allowClear
                    showSearch
                    style={{ width: 250 }}
                    placeholder="Search salesPerson"
                    optionFilterProp="children"
                    filterOption={(input: any, option: any) => (option?.label ?? '').includes(input)}
                    filterSort={(optionA: any, optionB: any) =>
                        (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                    }
                    value={filters.userId}
                    onChange={(value: any) => setFilters({ ...filters, userId: value })}
                    options={salesPersonsList}
                />
            </Space>}

            <Divider style={{ margin: 10 }} />

            <Space className={Styles.actionsButtons}>
                <Button onClick={onClear}>Clear</Button>
                <Button onClick={onUpdateFilters} type='primary'>Update</Button>
            </Space>
        </Space>
    }
    return (
        <>
            <Popover
                title={<Space className={Styles.filtersTitle} >
                    <Text>Filters</Text>
                    <Button onClick={() => setOpenFiltersPopup(false)} shape='circle' icon={<LuX />}></Button>
                </Space>}
                open={openFiltersPopup}
                content={renderFilterContent()}
                placement="bottomRight"
                trigger={"click"}
            >
                <Button onClick={() => setOpenFiltersPopup(true)} type='dashed' icon={<LuFilter />}>Filters</Button>
            </Popover>
        </>
    )
}

export default Filters