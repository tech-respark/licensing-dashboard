"use client"
import { useAppSelector } from "@/hooks/useAppSelector";
import { getRolesByProduct } from "@/lib/internalApi/roles";
import { getAuthUserState } from "@/redux/slices/auth";
import { Button, Card, Space } from "antd";
import { useEffect, useState } from "react";
import RolesModal from "./rolesModal";
import Styles from "./rolesPage.module.scss";
const { Meta } = Card;

function RolesPage() {
    const [modalData, setModalData] = useState({ active: false, role: null });
    const [rolesList, setRolesList] = useState<any[]>([]);
    const userData = useAppSelector(getAuthUserState);

    useEffect(() => {
        if (userData?.productId) {
            getRolesByProduct(userData?.productId).then((res: any) => {
                if (res.data) setRolesList(res.data)
            }).catch(function (error: any) {
                console.log(`/getRolesByProduct `, error);
            });
        }
    }, [])

    const handleModalResponse = (data: any) => {
        if (data?.id) {
            const listCopy: any[] = [...rolesList]
            let index = rolesList.findIndex((u: any) => u.id == data.id);
            if (index == -1) {
                listCopy.unshift(data);
            } else {
                listCopy[index] = data
            }
            setRolesList(listCopy)
        }
        setModalData({ active: false, role: null })
    }

    return (
        <Space className={Styles.userpageWrap}
            align='start'
            direction="vertical"
            styles={{ item: { width: "100%" } }}
        >
            <Space align="end">
                <Button size="large" type="primary" onClick={() => setModalData({ active: true, role: null })}>Add New Role</Button>
            </Space>
            <Space className={Styles.rolesList} wrap>
                {rolesList.map((details: any) => {
                    return <Card
                        key={Math.random()}
                        title={`${details.roleName} Role`}
                        style={{ width: 300 }}
                        actions={[
                            <Button onClick={() => setModalData({ active: true, role: details })} key={Math.random()} >View Details</Button>
                        ]}
                    >
                        <Space size={20} direction="vertical">
                            <Meta description={details.description} />
                            {/* <Space direction="vertical">
                                <Meta title="Permissions Granted:" />
                                {Object.keys(details?.rolePermissions || {}).map((permision: any) => {
                                    return <React.Fragment key={permision}>
                                        {Boolean(details.rolePermissions[permision]) && <Meta description={permision} />}
                                    </React.Fragment>
                                })}
                            </Space> */}
                        </Space>
                    </Card>
                })}
            </Space>
            <RolesModal modalData={modalData} handleModalResponse={handleModalResponse} />
        </Space>
    )
}

export default RolesPage