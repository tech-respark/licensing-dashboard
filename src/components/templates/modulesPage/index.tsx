"use client"
import { ModulesList } from "@/dummyData/modules";
import { Badge, Button, Card, Space } from "antd";
import React, { useState } from "react";
import ModuleModal from "./moduleModal";
import Styles from "./modulePage.module.scss";
const { Meta } = Card;

function ModulePage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Space className={Styles.userpageWrap}
            align='start'
            direction="vertical"
            styles={{ item: { width: "100%" } }}
        >
            <Space align="end">
                <Card key={"Add-new"} title={""} style={{ width: "100%" }} >
                    <Meta title={<Space><Button type="dashed" onClick={() => setIsModalOpen(true)}>Add New Module</Button></Space>} />
                </Card>
            </Space>
            <Space className={Styles.usersList} wrap>
                {ModulesList.map((moduleDetails: any) => {
                    return <React.Fragment key={moduleDetails.key}>
                        <Badge dot color={moduleDetails.active ? "green" : "red"}>
                            <Card key={moduleDetails.key} title={moduleDetails.name} extra={<Button type="dashed" onClick={() => setIsModalOpen(true)}>View</Button>} style={{ width: 300 }}>
                                <Meta description={`Monthly Price : ${moduleDetails.monthlyPricing}`} />
                                <Meta description={`Quartrly Pricing : ${moduleDetails.quarterlyprice}`} />
                                <Meta description={`Half Yearly Pricing : ${moduleDetails.halfYearlyPrice}`} />
                                <Meta description={`Yearly Pricing : ${moduleDetails.yearlyPrice}`} />
                            </Card>
                        </Badge>
                    </React.Fragment>
                })}
            </Space>
            <ModuleModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </Space>
    )
}

export default ModulePage