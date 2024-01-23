"use client"
import { SaalesPersonsList } from "@/dummyData/sales";
import { Button, Card, Space } from "antd";
import { useState } from "react";
import UserModal from "./userModal";
import Styles from "./usersPage.module.scss";
const { Meta } = Card;

function UsersPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Space className={Styles.userpageWrap}
            align='start'
            direction="vertical"
            styles={{ item: { width: "100%" } }}
        >
            <Space align="end">
                <Button size="large" type="primary" onClick={() => setIsModalOpen(true)}>Add New User</Button>
            </Space>
            <Space className={Styles.usersList} wrap>
                {SaalesPersonsList.map((salesDetails: any) => {
                    return <Card key={salesDetails.key} title={salesDetails.name} extra={<Button type="dashed" onClick={() => setIsModalOpen(true)}>View</Button>} style={{ width: 300 }}>
                        <Meta title={`Total Sale : ${salesDetails.total}`} description={`Client Onboarded ${salesDetails.count}`} />
                    </Card>
                })}
            </Space>
            <UserModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Space>
    )
}

export default UsersPage