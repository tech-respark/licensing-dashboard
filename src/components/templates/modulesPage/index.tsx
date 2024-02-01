"use client"
import { useAppSelector } from "@/hooks/useAppSelector";
import { getModulesByProduct } from "@/lib/internalApi/module";
import { getAuthUserState } from "@/redux/slices/auth";
import { Button, Card, Space } from "antd";
import { useEffect, useState } from "react";
import ModuleModal from "./moduleModal";
import Styles from "./modulePage.module.scss";
const { Meta } = Card;

function ModulePage() {
    const [modalData, setModalData] = useState({ active: false, module: null });
    const [moduleList, setModulesList] = useState<any[]>([]);
    const userData = useAppSelector(getAuthUserState);

    useEffect(() => {
        getModulesByProduct(userData.userProductsList[0].productId).then((res: any) => {
            if (res.data) setModulesList(res.data)
        }).catch(function (error: any) {
            console.log(`/getUsersByProduct `, error);
        });
    }, [])

    const handleModalResponse = (data: any) => {
        if (data?.id) {
            const moduleListCopy: any[] = [...moduleList]
            let index = moduleList.findIndex((u: any) => u.id == data.id);
            if (index == -1) {
                moduleListCopy.unshift(data);
            } else {
                moduleListCopy[index] = data
            }
            setModulesList(moduleListCopy)
        }
        setModalData({ active: false, module: null })
    }

    return (
        <Space className={Styles.userpageWrap}
            align='start'
            direction="vertical"
            styles={{ item: { width: "100%" } }}
        >
            <Space align="end">
                <Button size="large" type="primary" onClick={() => setModalData({ active: true, module: null })}>Add New Module</Button>
            </Space>
            <Space className={Styles.moduleList} wrap>
                {moduleList.map((moduleDetails: any) => {
                    return <Card
                        // onClick={() => setModalData({ active: true, module: moduleDetails })}
                        key={Math.random()}
                        title={moduleDetails.name}
                        style={{ width: 300 }}
                        actions={[
                            <Button onClick={() => setModalData({ active: true, module: moduleDetails })} key={Math.random()} >View Details</Button>
                        ]}
                    >
                        <Meta description={`Monthly Price : ${moduleDetails.monthlyPrice}`} />
                        <Meta description={`Quartrly Pricing : ${moduleDetails.quarterlyPrice}`} />
                        <Meta description={`Half Yearly Pricing : ${moduleDetails.halfYearlyPrice}`} />
                        <Meta description={`Yearly Pricing : ${moduleDetails.yearlyPrice}`} />
                    </Card>
                })}
            </Space>
            <ModuleModal modalData={modalData} handleModalResponse={handleModalResponse} />
        </Space>
    )
}

export default ModulePage