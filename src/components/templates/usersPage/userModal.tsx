import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getRolesByProduct } from "@/lib/internalApi/roles";
import { createUser, updateUser } from "@/lib/internalApi/user";
import { getAuthUserState } from "@/redux/slices/auth";
import { showErrorToast, showSuccessToast } from "@/redux/slices/toast";
import { Card, Checkbox, Form, Input, Modal, Select, Space } from "antd";
import React, { useCallback, useEffect, useState } from "react";
const { Meta } = Card;

const dummyUser = {
    "name": "demo user3",
    "phoneNumber": "8873681999",
    "altPhoneNumber": "",
    "email": "demouser3@user.com",
    "password": "pwd",
    "designation": "Senior Sales Executive",
    "createdBy": "demo3",
    "createdByUserId": 1,
    "userProductIds": "1",
    "gender": "MALE",
    "active": true,
    "role": "SALES_STAFF",
}

function UserModal({ modalData, handleModalResponse }: any) {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const [rolesList, setRolesList] = useState<any[]>([]);
    const userData = useAppSelector(getAuthUserState);

    useEffect(() => {
        getRolesByProduct(userData?.userProductsList[0].productId).then((res: any) => {
            if (res.data) setRolesList(res.data)
        }).catch(function (error: any) {
            console.log(`/getRolesByProduct `, error);
        });
    }, [])

    interface FieldData {
        name: string | number | (string | number)[];
        value?: any;
        touched?: boolean;
        validating?: boolean;
        errors?: string[];
        label?: string;
    }

    const permissionsList = [
        { key: "dashboard", value: true, title: "Dashboard" },
        { key: "requestsDashboard", value: false, title: "Requests Dashboard" },
        { key: "clientsDashboard", value: false, title: "Clients Dashboard" },
        { key: "reportsDashboard", value: true, title: "Reports Dashboard" },
        { key: "usersDashboard", value: true, title: "Users Dashboard" },
    ]

    const defaultCheckedList = useCallback(
        () => {
            if (Boolean(modalData?.user?.userPermissionsList)) {
                const permissions: any = []
                permissionsList.map((permission: any) => {
                    if (modalData?.user?.userPermissionsList[permission.key]) permissions.push(permission.key)
                })
                return permissions;
            } else {
                return []
            }
        },
        [modalData],
    )

    const [checkedList, setCheckedList] = useState<any>(defaultCheckedList());

    const options = permissionsList.map(({ key, title }: any) => ({
        label: title,
        value: key,
    }));

    const handleCancel = () => {
        handleModalResponse();
    };

    const [fields, setFields] = useState<FieldData[]>([]);

    useEffect(() => {
        if (modalData.user) {
            console.log(modalData.user)
            setFields([
                { label: "Active", name: ["active"], value: modalData?.user?.active },
                { label: "Name", name: ["name"], value: modalData?.user?.name },
                { label: "Phone Number", name: ["phoneNumber"], value: modalData?.user?.phoneNumber },
                { label: "Email", name: ["email"], value: modalData?.user?.email },
                { label: "Password", name: ["password"], value: modalData?.user?.password },
                { label: "Role", name: ["roleId"], value: modalData?.user?.roleId },
                { label: "Alternate Number", name: ["altPhoneNumber"], value: modalData?.user?.altPhoneNumber },
                { label: "Designation", name: ["designation"], value: modalData?.user?.designation },
            ])
        } else {
            setFields([
                { label: "Active", name: ["active"], value: true },
                { label: "Name", name: ["name"], value: "" },
                { label: "Phone Number", name: ["phoneNumber"], value: "" },
                { label: "Email", name: ["email"], value: "" },
                { label: "Password", name: ["password"], value: "" },
                { label: "Role", name: ["roleId"], value: "" },
                { label: "Alternate Number", name: ["altPhoneNumber"], value: "" },
                { label: "Designation", name: ["designation"], value: "" },
            ])
        }
    }, [modalData])

    const getPermissions = () => {
        const permissionsListCopy: any = { productId: userData?.userProductsList[0].productId };
        permissionsList.map((p: any) => {
            permissionsListCopy[p.key] = checkedList.includes(p.key) ? 1 : 0
        })
        return permissionsListCopy;
    }

    const onCreate = (values: any) => {

        const details = {
            ...values,
            "userProductIds": "1",
            "gender": "MALE",
            // "userPermissionsList": [getPermissions()],
        }
        console.log("final details", details)
        if (modalData?.user?.id) {
            details.id = modalData?.user?.id;
            details.modifiedBy = userData.name;
            details.modifiedByUserId = userData.id;
        } else {
            details.createdBy = userData.name;
            details.createdByUserId = userData.id;
        }
        const api = modalData?.user?.id ? updateUser : createUser;
        api(details).then((res: any) => {
            dispatch(showSuccessToast("User created successfully."))
            handleModalResponse({ ...details, id: res?.data?.id || Math.random() })
            form.resetFields();
        })
            .catch((error: any) => {
                console.log(error)
                dispatch(showErrorToast(`User creation failed.error: ${error}`))
            })
    }

    const getRolesOptions = () => {
        return rolesList.filter((r: any) => r.roleName != "CEO").map((r: any) => ({ value: r.id, label: r.roleName }))
    }

    return (
        <Modal title={modalData?.user ? "Update User" : "Add New User"} open={modalData?.active}
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
                                        item.label == "Role" ? <Form.Item
                                            label="Role"
                                            name="roleId"
                                            rules={[{ required: true, message: `Please select role` }]}
                                        >
                                            <Select
                                                showSearch
                                                style={{ width: 200 }}
                                                placeholder="Search to Select"
                                                optionFilterProp="children"
                                                filterOption={(input, option) => (option?.label ?? '').includes(input)}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                options={getRolesOptions()}
                                            />
                                        </Form.Item> : <Form.Item
                                            label={item.label}
                                            name={item.name}
                                            rules={item.label == "Alternate Number" || item.label == "Designation" ? [] : [{ required: true, message: `Please enter your ${item.label}` }]}
                                        >
                                            <Input />
                                        </Form.Item>
                                    }
                                </React.Fragment>
                            })}

                        </Form>
                    </Card>
                </Space>
                {/* <Card style={{ width: "100%" }}>
                    <Space direction="vertical">
                        <Meta title="User Permissions" />
                        <Checkbox.Group
                            value={checkedList}
                            options={options as CheckboxOptionType[]}
                            onChange={(value) => {
                                setCheckedList(value as string[]);
                            }}
                        />
                    </Space>
                </Card> */}
            </Space>
        </Modal>
    )
}

export default UserModal