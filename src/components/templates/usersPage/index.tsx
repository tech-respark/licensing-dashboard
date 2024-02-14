"use client"
import { useAppSelector } from "@/hooks/useAppSelector";
import { getRolesByProduct } from "@/lib/internalApi/roles";
import { getUsersByProduct } from "@/lib/internalApi/user";
import { getAuthUserState } from "@/redux/slices/auth";
import { Button, Card, Space } from "antd";
import { useEffect, useState } from "react";
import UserModal from "./userModal";
import Styles from "./usersPage.module.scss";
const { Meta } = Card;

function UsersPage() {
    const [modalData, setModalData] = useState({ active: false, user: null });
    const [usersList, setUsersList] = useState<any[]>([]);
    const userData = useAppSelector(getAuthUserState);
    const [rolesList, setRolesList] = useState<any[]>([]);

    useEffect(() => {
        if (userData?.productId) {
            getUsersByProduct(userData?.productId).then((res: any) => {
                if (res.data) {
                    setUsersList(res.data)
                }
            }).catch(function (error: any) {
                console.log(`/getUsersByProduct `, error);
            });
            getRolesByProduct(userData?.productId).then((res: any) => {
                if (res.data) setRolesList(res.data)
            }).catch(function (error: any) {
                console.log(`/getRolesByProduct `, error);
            });
        }
    }, [])

    const handleModalResponse = (data: any) => {
        if (data?.id) {
            const usersListCopy: any[] = [...usersList]
            let index = usersList.findIndex((u: any) => u.id == data.id);
            if (index == -1) {
                usersListCopy.unshift(data);
            } else {
                usersListCopy[index] = data
            }
            setUsersList(usersListCopy)
        }
        setModalData({ active: false, user: null })
    }

    return (
        <Space className={Styles.userpageWrap}
            align='start'
            direction="vertical"
            styles={{ item: { width: "100%" } }}
        >
            <Space align="end">
                <Button size="large" type="primary" onClick={() => setModalData({ active: true, user: null })}>Add New User</Button>
            </Space>
            <Space className={Styles.usersList} wrap>
                {usersList.map((userDetails: any) => {
                    return <Card
                        // onClick={() => setModalData({ active: true, user: userDetails })}
                        key={Math.random()}
                        title={userDetails.name}
                        style={{ width: 300 }}
                        actions={[
                            <Button onClick={() => setModalData({ active: true, user: userDetails })} key={Math.random()} >View Details</Button>
                        ]}
                    >
                        <Meta title={userDetails.phoneNumber} description={`${userDetails.email}`} />
                    </Card>
                })}
            </Space>
            <UserModal rolesList={rolesList} modalData={modalData} handleModalResponse={handleModalResponse} />
        </Space>
    )
}

export default UsersPage