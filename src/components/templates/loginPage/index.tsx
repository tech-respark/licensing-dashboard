/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"
import { ADMIN_ROLE, CEO_ROLE, LOGO_IMAGE } from '@/constants/common';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getUserByCredentials } from '@/lib/internalApi/user';
import { getAuthUserState, setAuthUser } from '@/redux/slices/auth';
import { toggleLoader } from '@/redux/slices/loader';
import { showErrorToast, showSuccessToast } from '@/redux/slices/toast';
import { Button, Form, Input, Modal, Space, theme } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Styles from "./login.module.scss";


const adminUser = {
    "id": 1,
    "name": "Admin User",
    "gender": "MALE",
    "email": "admin@relfor.com",
    "phoneNumber": "adminuser",
    "altPhoneNumber": "",
    "designation": "Relfor Admin",
    "roleName": "ADMIN",
    "createdOn": "2024-01-30T09:04:57.507875800Z",
    "createdBy": "admin",
    "createdByUserId": 1,
    "modifiedOn": "2024-01-30T09:04:57.460528700Z",
    "modifiedBy": null,
    "modifiedByUserId": null,
    "active": true,
    "userProductIds": null,
    "userProductsList": [
        {
            "id": 1,
            "userId": 2,
            "productId": 1,
            "productName": "RESPARK",
            "active": true
        }
    ],
    "userPermissionsList": null
}
type FieldType = {
    email?: string;
    password?: string;
    // remember?: string;
};

function LoginPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { token } = theme.useToken();
    const [productSelectionModal, setProductSelectionModal] = useState<any>({ active: false, userData: null })
    const userData = useAppSelector(getAuthUserState)

    console.log("userData in dahsboard", userData)
    // if (Boolean(userData)) return router.push("/")

    useEffect(() => {
        if (Boolean(userData)) {
            return router.push("/")
        }
    }, [userData])

    const signInWithCredentials = async (values: any) => {
        dispatch(toggleLoader(true))
        getUserByCredentials(values)
            .then((response: any) => {
                // setProductSelectionModal({ active: true, userData: response.data })
                dispatch(toggleLoader(false))
                if (response.data?.userProductsList) {
                    // if (response.data?.userProductsList.length > 1) {
                    //     setProductSelectionModal({ active: true, userData: response.data })
                    // } else {
                    response.data.productId = response.data.userProductsList[0].productId;
                    response.data.roleName = response.data.userProductsList[0].roleName || response.data.roleName;
                    response.data.rolePermissions = response.data.userProductsList[0].rolePermissions || response.data.rolePermissions;
                    dispatch(setAuthUser(response.data))
                    dispatch(showSuccessToast("Perfect! You're signed in successfully."))
                    if (response.data.roleName == CEO_ROLE || response.data.roleName == ADMIN_ROLE) {
                        router.push("/")
                    } else {
                        router.push("/sales")
                    }
                    dispatch(toggleLoader(false))
                    // }
                } else {
                    dispatch(showErrorToast("Product not assigned to this user"))
                }

            })
            .catch((err) => {
                dispatch(toggleLoader(false))
                dispatch(showErrorToast(err))
            });
    }

    const onFinish = (values: any) => {
        if (values.email == 'admin') {
            values.email = "admin@relfor.com"
            // dispatch(setAuthUser(adminUser))
        }
        signInWithCredentials(values)
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        dispatch(showErrorToast(errorInfo.errorFields[0].errors[0]))
    };

    const onSelectProduct = () => {
        const selectedProduct = productSelectionModal.userData.userProductsList.find((p: any) => p.selected)
        if (Boolean(selectedProduct)) {
            const userCopy = { ...productSelectionModal.userData };
            userCopy.productId = selectedProduct.productId;
            userCopy.roleName = selectedProduct.roleName || productSelectionModal.userData?.roleName || ADMIN_ROLE;
            userCopy.rolePermissions = selectedProduct.rolePermissions || productSelectionModal.userData?.rolePermissions;
            dispatch(setAuthUser(userCopy))
            dispatch(showSuccessToast("Perfect! You're signed in successfully."))
            if (userCopy.roleName == CEO_ROLE || userCopy.roleName == ADMIN_ROLE) {
                router.push("/")
            } else {
                router.push("/sales")
            }
            dispatch(toggleLoader(false))
        } else {
            dispatch(showErrorToast("Please select product"))
        }
    }

    return (
        <div className={Styles.loginPageWrap}>
            <div className={Styles.headerWrap} style={{ background: token.colorPrimaryBg }}>
                <div className={Styles.logo}>
                    <img src={LOGO_IMAGE} />
                </div>
            </div>
            <div className={Styles.pageContent}>
                <Form
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <h2 className={Styles.heading}>
                        Welcome to Relfor Licensing Dashboard
                    </h2>
                    <Form.Item<FieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Login
                        </Button>
                        <Button type="link" onClick={() => router.push("/resetPassword")}>
                            Forgot Password
                        </Button>
                    </Form.Item>
                </Form>
            </div>
            <Modal title="Select Product" open={productSelectionModal.active}
                onOk={onSelectProduct}
                onCancel={() => setProductSelectionModal({ active: false, userData: null })}>
                <Space direction='vertical'>
                    {productSelectionModal?.userData?.userProductsList.map((product: any, i: any) => {
                        return <Button
                            key={product.productId}
                            type={product.selected ? "primary" : "default"}
                            onClick={() => {
                                const userCopy = { ...productSelectionModal.userData };
                                userCopy.userProductsList?.map((p: any) => p.selected = false);
                                userCopy.userProductsList[i].selected = true;
                                setProductSelectionModal({ ...productSelectionModal, userData: userCopy })
                            }}
                        >
                            {product.productName}
                        </Button>
                    })}
                </Space>
            </Modal>
        </div>
    )
}

export default LoginPage