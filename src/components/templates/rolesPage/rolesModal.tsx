import { permissionsList } from "@/constants/common";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { createRole, updateRole } from "@/lib/internalApi/roles";
import { getAuthUserState } from "@/redux/slices/auth";
import { showErrorToast, showSuccessToast } from "@/redux/slices/toast";
import { Card, Checkbox, CheckboxOptionType, Form, Input, Modal, Space } from "antd";
import React, { useCallback, useEffect, useState } from "react";
const { Meta } = Card;

const dummyRole = {
    "roleName": "test 2",
    "productId": 1,
    "description": "test 2 description",
    "active": true,
    "rolePermissions": {
        "isApprover": 0,
        "dashboard": 1,
        "requestsDashboard": 1,
        "clientsDashboard": 0,
        "reportsDashboard": 0,
        "usersDashboard": 1,
        "createdBy": "demo3",
        "createdByUserId": 1
    }
}

function RolesModal({ modalData, handleModalResponse }: any) {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const userData = useAppSelector(getAuthUserState);

    interface FieldData {
        name: string | number | (string | number)[];
        value?: any;
        touched?: boolean;
        validating?: boolean;
        errors?: string[];
        label?: string;
    }

    const defaultCheckedList = useCallback(
        () => {
            if (Boolean(modalData?.role?.rolePermissions)) {
                const permissions: any = []
                permissionsList.map((permission: any) => {
                    if (modalData?.role?.rolePermissions[permission.key]) permissions.push(permission.key)
                })
                return permissions;
            } else {
                setCheckedList([])
                return []
            }
        },
        [modalData],
    )

    const [checkedList, setCheckedList] = useState<any>();
    useEffect(() => {
        setCheckedList(defaultCheckedList())
    }, [modalData])


    const options = permissionsList.map(({ key, title }: any) => ({
        label: title,
        value: key,
    }));

    const handleCancel = () => {
        handleModalResponse();
    };

    const [fields, setFields] = useState<FieldData[]>([]);

    useEffect(() => {
        if (modalData.role) {
            setFields([
                { label: "Role Name", name: ["roleName"], value: modalData?.role?.roleName },
                { label: "Role Description", name: ["description"], value: modalData?.role?.description },
                { label: "Active", name: ["active"], value: modalData?.role?.active },
            ])
        } else {
            setFields([
                { label: "Role Name", name: ["roleName"], value: "" },
                { label: "Role Description", name: ["description"], value: "" },
                { label: "Active", name: ["active"], value: true },
            ])
        }
    }, [modalData])

    const getPermissions = () => {
        const permissionsListCopy: any = {};
        if (modalData?.role?.id) {
            permissionsListCopy.id = modalData?.role?.rolePermissions?.id;
            permissionsListCopy.roleId = modalData?.role?.id;
            permissionsListCopy.modifiedBy = userData.name;
            permissionsListCopy.modifiedByUserId = userData.id;
        } else {
            permissionsListCopy.createdBy = userData.name;
            permissionsListCopy.createdByUserId = userData.id;
        }
        permissionsList.map((p: any) => {
            permissionsListCopy[p.key] = checkedList.includes(p.key) ? 1 : 0
        })
        return permissionsListCopy;
    }

    const onCreate = (values: any) => {

        const details = {
            ...values,
            "productId": userData?.userProductsList[0].productId,
            "rolePermissions": getPermissions(),
        }
        console.log("final details", details)
        if (modalData?.role?.id) {
            details.id = modalData?.role?.id;
            details.modifiedBy = userData.name;
            details.modifiedByUserId = userData.id;
        } else {
            details.createdBy = userData.name;
            details.createdByUserId = userData.id;
        }
        const api = modalData?.role?.id ? updateRole : createRole;
        api(details).then((res: any) => {
            dispatch(showSuccessToast("User created successfuly."))
            details.rolePermissions.id = res?.data.rolePermissions.id;
            handleModalResponse({ ...details, id: res?.data?.id })
            form.resetFields();
        })
            .catch((error: any) => {
                console.log(error)
                dispatch(showErrorToast(`User creation failed.error: ${error}`))
            })
    }

    return (
        <Modal title={modalData?.role ? "Update User" : "Add New User"} open={modalData?.active}
            okText="Submit"
            onOk={() => {
                form
                    .validateFields()
                    .then((values) => {
                        onCreate(values);
                    })
                    .catch((info) => {
                        console.log('Validate Failed:', info);
                    });
            }}
            onCancel={handleCancel}>
            <Space direction="vertical">
                <Space>
                    <Card title={""} style={{ width: "100%" }}>
                        <Form
                            name="Add-client"
                            style={{ width: "100%" }}
                            autoComplete="off"
                            form={form}
                            fields={fields}
                        >
                            {fields.map((item: any, i: number) => {
                                return <React.Fragment key={i}>
                                    {item.label == "Active" ?
                                        <Form.Item name={item.name} valuePropName="checked" noStyle>
                                            <Checkbox>{item.label}</Checkbox>
                                        </Form.Item> :
                                        <Form.Item
                                            label={item.label}
                                            name={item.name}
                                            rules={[{ required: true, message: `Please enter ${item.label}` }]}
                                        >
                                            <Input />
                                        </Form.Item>}
                                </React.Fragment>
                            })}
                        </Form>
                    </Card>
                </Space>
                <Card style={{ width: "100%" }}>
                    <Space direction="vertical">
                        <Space direction='vertical' size={20}>
                            <Meta title="Roles Permissions" />
                            <Checkbox.Group
                                style={{
                                    display: "flex",
                                    justifyContent: "flex-start",
                                    alignItems: "flex-start",
                                    // flexDirection: "column",
                                    gap: "20px"
                                }}
                                value={checkedList}
                                options={options as CheckboxOptionType[]}
                                onChange={(value) => {
                                    setCheckedList(value as string[]);
                                }}
                            />
                        </Space>
                    </Space>
                </Card>
            </Space>
        </Modal>
    )
}

export default RolesModal;