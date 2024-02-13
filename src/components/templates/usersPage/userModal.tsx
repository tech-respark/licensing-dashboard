import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getRolesByProduct } from "@/lib/internalApi/roles";
import { createUser, updateUser } from "@/lib/internalApi/user";
import { getAuthUserState } from "@/redux/slices/auth";
import { showErrorToast, showSuccessToast } from "@/redux/slices/toast";
import { Card, Checkbox, Form, Input, Modal, Select, Space } from "antd";
import React, { useEffect, useState } from "react";
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
        if (userData?.productId) {
            getRolesByProduct(userData?.productId).then((res: any) => {
                if (res.data) setRolesList(res.data)
            }).catch(function (error: any) {
                console.log(`/getRolesByProduct `, error);
            });
        }
    }, [])

    interface FieldData {
        name: string | number | (string | number)[];
        value?: any;
        touched?: boolean;
        validating?: boolean;
        errors?: string[];
        label?: string;
    }

    const handleCancel = () => {
        handleModalResponse();
    };

    const [fields, setFields] = useState<FieldData[]>([]);

    useEffect(() => {
        if (modalData.user) {

            let currentRole = modalData.user.userProductsList.find((r: any) => r.productId == userData.productId)
            currentRole = currentRole?.roleId;
            console.log(modalData.user)
            setFields([
                { label: "Active", name: ["active"], value: modalData?.user?.active },
                { label: "Name", name: ["name"], value: modalData?.user?.name },
                { label: "Phone Number", name: ["phoneNumber"], value: modalData?.user?.phoneNumber },
                { label: "Email", name: ["email"], value: modalData?.user?.email },
                { label: "Password", name: ["password"], value: modalData?.user?.password },
                { label: "Role", name: ["roleId"], value: currentRole },
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

    const onCreate = (values: any) => {

        const details = {
            ...values,
            "userProductIds": "1",
            "gender": "MALE",
            // "userPermissionsList": [getPermissions()],
        }
        if (modalData?.user?.id) {
            details.id = modalData?.user?.id;
            details.modifiedBy = userData.name;
            details.modifiedByUserId = userData.id;
            let currentRoleIndex = modalData.user.userProductsList.findIndex((r: any) => r.productId == userData.productId)
            if (modalData.user.userProductsList[currentRoleIndex].roleId != details.roleId) {
                const roleDetails = rolesList.find((r: any) => details.roleId == r.id);
                details.userProductsList = modalData.user.userProductsList;
                details.userProductsList[currentRoleIndex].roleId = details.roleId;
                details.userProductsList[currentRoleIndex].roleName = roleDetails.roleName;
            }
        } else {
            details.createdBy = userData.name;
            details.createdByUserId = userData.id;
            const roleDetails = rolesList.find((r: any) => details.roleId == r.id);
            details.userProductsList = [{
                "productId": userData.productId,
                "roleId": details.roleId,
                "roleName": roleDetails.roleName,
                "active": true,
            }]
        }
        console.log("final details", details)
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
        return rolesList.filter((r: any) => r.roleName != "CEO" && r.active).map((r: any) => ({ value: r.id, label: r.roleName }))
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