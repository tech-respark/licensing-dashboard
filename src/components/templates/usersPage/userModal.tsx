import { PRODUCTS_LIST } from "@/constants/common";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { createUser, getUserByEmail, updateUser } from "@/lib/internalApi/user";
import { getAuthUserState } from "@/redux/slices/auth";
import { showErrorToast, showSuccessToast } from "@/redux/slices/toast";
import { removeObjRef } from "@/utils/common";
import { Button, Card, Checkbox, Form, Input, Modal, Select, Space } from "antd";
import React, { Fragment, useEffect, useState } from "react";
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

function UserModal({ modalData, handleModalResponse, rolesList }: any) {
    const [form] = Form.useForm();
    const dispatch = useAppDispatch();
    const userData = useAppSelector(getAuthUserState);
    const [inActiveRoleDetails, setinActiveRoleDetails] = useState<any>(null)
    const [showDuplicateUserModal, setShowDuplicateUserModal] = useState<any>({ active: false, user: null });
    const [productWiseUser, setProductWiseUser] = useState<any>(removeObjRef(PRODUCTS_LIST));
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
            const roleDetails = rolesList.find((r: any) => r.id == currentRole?.roleId)
            if (!(roleDetails?.active)) {
                currentRole = null;
                setinActiveRoleDetails(roleDetails)
            } else {
                currentRole = currentRole?.roleId;
            }
            console.log(modalData.user)
            const productWiseUserCopy = [...productWiseUser];
            productWiseUserCopy.map((p: any) => {
                let currentRole = modalData.user.userProductsList.find((r: any) => r.productId == p.productId);
                const roleDetails = rolesList.find((r: any) => r.id == currentRole?.roleId)
                if (currentRole && Boolean(roleDetails)) {
                    p.roleId = roleDetails.id;
                    p.roleName = roleDetails.roleName;
                    p.active = currentRole.active;
                }
            })
            setProductWiseUser(productWiseUserCopy);
            setFields([
                { label: "Active", name: ["active"], value: modalData?.user?.active },
                { label: "Name", name: ["name"], value: modalData?.user?.name },
                { label: "Phone Number", name: ["phoneNumber"], value: modalData?.user?.phoneNumber },
                { label: "Email", name: ["email"], value: modalData?.user?.email },
                // { label: "Password", name: ["password"], value: modalData?.user?.password },
                // { label: "Role", name: ["roleId"], value: currentRole },
                { label: "Alternate Number", name: ["altPhoneNumber"], value: modalData?.user?.altPhoneNumber },
                { label: "Designation", name: ["designation"], value: modalData?.user?.designation },
            ])
        } else {
            setProductWiseUser(removeObjRef(PRODUCTS_LIST))
            setFields([
                { label: "Active", name: ["active"], value: true },
                { label: "Name", name: ["name"], value: "" },
                { label: "Phone Number", name: ["phoneNumber"], value: "" },
                { label: "Email", name: ["email"], value: "" },
                { label: "Password", name: ["password"], value: "" },
                // { label: "Role", name: ["roleId"], value: "" },
                { label: "Alternate Number", name: ["altPhoneNumber"], value: "" },
                { label: "Designation", name: ["designation"], value: "" },
            ])
        }
    }, [modalData])

    const onCreate = (values: any) => {

        const details = {
            ...values,
            "gender": "MALE",
            // "userPermissionsList": [getPermissions()],
        }
        if (modalData?.user?.id) {
            details.id = modalData?.user?.id;
            details.modifiedBy = userData.name;
            details.modifiedByUserId = userData.id;

            // let currentRoleIndex = modalData.user.userProductsList.findIndex((r: any) => r.productId == userData.productId)
            // if (modalData.user.userProductsList[currentRoleIndex].roleId != details.roleId) {
            //     const roleDetails = rolesList.find((r: any) => details.roleId == r.id);
            //     details.userProductsList = modalData.user.userProductsList;
            //     details.userProductsList[currentRoleIndex].roleId = details.roleId;
            //     details.userProductsList[currentRoleIndex].roleName = roleDetails.roleName;
            // }
        } else {
            details.createdBy = userData.name;
            details.createdByUserId = userData.id;
            const roleDetails = rolesList.find((r: any) => details.roleId == r.id);
            // details.userProductsList = [{
            //     "productId": userData.productId,
            //     "roleId": details.roleId,
            //     "roleName": roleDetails.roleName,
            //     "active": true,
            // }]
        }
        details.userProductsList = [];
        productWiseUser.map((product: any) => {
            if (product.roleId) {
                details.userProductsList.push({
                    "productId": product.productId,
                    "roleId": product.roleId,
                    "roleName": product.roleName,
                    "active": product.active,
                })
            }
        })
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
        const options: any = rolesList.filter((r: any) => r.active).map((r: any) => ({ value: r.id, label: r.roleName }));
        return options
    }

    const onChangeValue = (from: any, value: any) => {
        if (from == "Email" && value.includes("@") && value.includes(".com")) {
            getUserByEmail(form.getFieldValue('email')).then((res: any) => {
                if (res?.data) {
                    setShowDuplicateUserModal({ active: true, user: res.data });
                }
            })
        }
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
                                        item.label == "Role" ? <>
                                            <Space direction="vertical">
                                                {Boolean(inActiveRoleDetails?.roleName) && <Button type="text" size="small" danger>
                                                    Previously assigned role is {inActiveRoleDetails.roleName} and it is currently inactive
                                                </Button>}
                                                <Form.Item
                                                    label="Role"
                                                    name="roleId"
                                                    rules={[{ required: true, message: `Please select role` }]}
                                                >
                                                    <Select
                                                        showSearch
                                                        style={{ width: 200 }}
                                                        placeholder="Search to Select"
                                                        optionFilterProp="children"
                                                        filterOption={(input: any, option: any) => (option?.label ?? '').includes(input)}
                                                        filterSort={(optionA, optionB) =>
                                                            (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                        }
                                                        options={getRolesOptions()}
                                                    />
                                                </Form.Item>
                                            </Space>
                                        </> : <Form.Item
                                            label={item.label}
                                            name={item.name}
                                            rules={item.label == "Alternate Number" || item.label == "Designation" ? [] : [{ required: true, message: `Please enter your ${item.label}` }]}
                                        >
                                            <Input onChange={(e) => onChangeValue(item.label, e.target.value)} />
                                        </Form.Item>
                                    }
                                </React.Fragment>
                            })}
                        </Form>
                        <Space direction="vertical">
                            {productWiseUser.map((product: any, i: number) => {
                                return <Fragment key={i}>
                                    <Space>
                                        <Space>{product.productName} :</Space>
                                        <Space>
                                            <Select
                                                showSearch
                                                style={{ width: 200 }}
                                                placeholder="Search to Select"
                                                optionFilterProp="children"
                                                filterOption={(input: any, option: any) => (option?.label ?? '').includes(input)}
                                                filterSort={(optionA, optionB) =>
                                                    (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                                                }
                                                defaultValue={product.roleId}
                                                value={product.roleId}
                                                onChange={(value: any) => {
                                                    const productWiseUserCopy = [...productWiseUser];
                                                    productWiseUserCopy[i].roleName = rolesList.find((r: any) => r.id == value).roleName;
                                                    productWiseUserCopy[i].roleId = value;
                                                    setProductWiseUser(productWiseUserCopy);
                                                }}
                                                options={getRolesOptions()}
                                            />
                                        </Space>
                                        <Space>
                                            <Checkbox defaultChecked={Boolean(product.active)} checked={Boolean(product.active)} onChange={() => {
                                                const productWiseUserCopy = [...productWiseUser];
                                                productWiseUserCopy[i].active = !productWiseUserCopy[i].active;
                                                setProductWiseUser(productWiseUserCopy);
                                            }}>
                                                Active
                                            </Checkbox>
                                        </Space>
                                    </Space>
                                </Fragment>
                            })}
                        </Space>
                    </Card>
                </Space>
                <Modal title="Basic Modal"
                    closable={false}
                    cancelButtonProps={{ style: { display: "none" } }}
                    open={showDuplicateUserModal.active} onOk={() => {
                        form.setFieldValue("email", '');
                        setShowDuplicateUserModal({ active: false, user: null })
                    }}
                    cancelText=""
                    onCancel={() => { }}
                >
                    <Space wrap>
                        User {showDuplicateUserModal.user?.name} already registered with email {showDuplicateUserModal.user?.email}
                    </Space>
                </Modal>
            </Space>
        </Modal>
    )
}

export default UserModal