import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { createUser, updateUser } from "@/lib/internalApi/user";
import { getAuthUserState } from "@/redux/slices/auth";
import { showErrorToast, showSuccessToast } from "@/redux/slices/toast";
import { Card, Checkbox, CheckboxOptionType, Form, Input, Modal, Space } from "antd";
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
    console.log("modalData", modalData?.user?.active)
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

    // console.log("defaultCheckedList", defaultCheckedList())
    // console.log("checkedList", checkedList)
    // console.log("option", options)

    const handleCancel = () => {
        handleModalResponse();
    };

    const [fields, setFields] = useState<FieldData[]>([]);

    useEffect(() => {
        if (modalData.user) {
            setFields([
                { label: "Name", name: ["name"], value: modalData?.user?.name },
                { label: "Phone Number", name: ["phoneNumber"], value: modalData?.user?.phoneNumber },
                { label: "Email", name: ["email"], value: modalData?.user?.email },
                { label: "Alternate Phone Number", name: ["altPhoneNumber"], value: modalData?.user?.altPhoneNumber },
                { label: "Password", name: ["password"], value: modalData?.user?.password },
                { label: "Designation", name: ["designation"], value: modalData?.user?.designation },
                { label: "Active", name: ["active"], value: modalData?.user?.active },
            ])
        } else {
            setFields([
                { label: "Name", name: ["name"], value: "" },
                { label: "Phone Number", name: ["phoneNumber"], value: "" },
                { label: "Email", name: ["email"], value: "" },
                { label: "Alternate Phone Number", name: ["altPhoneNumber"], value: "" },
                { label: "Password", name: ["password"], value: "" },
                { label: "Designation", name: ["designation"], value: "" },
                { label: "Active", name: ["active"], value: true },
            ])
        }
    }, [modalData])

    const getPermissions = () => {
        const permissionsListCopy: any = { productId: userData.userProductsList[0].productId };
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
            "userPermissionsList": [getPermissions()],
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
            dispatch(showSuccessToast("User created successfuly."))
            handleModalResponse({ ...details, id: res?.data?.id || Math.random() })
            form.resetFields();
        })
            .catch((error: any) => {
                console.log(error)
                dispatch(showErrorToast(`User creation failed.error: ${error}`))
            })
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
                                        <Form.Item
                                            label={item.label}
                                            name={item.name}
                                            rules={[{ required: true, message: `Please enter your ${item.label}` }]}
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
                        <Meta title="User Permissions" />
                        <Checkbox.Group
                            value={checkedList}
                            options={options as CheckboxOptionType[]}
                            onChange={(value) => {
                                setCheckedList(value as string[]);
                            }}
                        />
                    </Space>
                </Card>
            </Space>
        </Modal>
    )
}

export default UserModal