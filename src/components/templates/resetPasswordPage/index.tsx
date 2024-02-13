/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"
import { LOGO_IMAGE } from '@/constants/common';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { sendForgotPasswordLink, updatePassword } from '@/lib/internalApi/user';
import { getAuthUserState } from '@/redux/slices/auth';
import { toggleLoader } from '@/redux/slices/loader';
import { showErrorToast, showSuccessToast } from '@/redux/slices/toast';
import { Button, Form, Input, Space, theme } from 'antd';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Styles from "./login.module.scss";

type FieldType = {
    password?: string;
    confirmPassword?: string;
    // remember?: string;
};

type SendLinkFieldType = {
    email?: string;
};

function ResetPasswordPage({ userDetails }: any) {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { token } = theme.useToken();
    const userData = useAppSelector(getAuthUserState)
    console.log("userData in dahsboard", userData)

    useEffect(() => {
        if (Boolean(userData)) {
            return router.push("/")
        } else {
        }
    }, [userData])

    const onForgotPassword = async (values: any) => {
        dispatch(toggleLoader(true))
        const body = {
            password: values.password,
            userId: userDetails.id
        }
        updatePassword(body)
            .then((response: any) => {
                dispatch(showSuccessToast("You're password reset successfully. Please login again with new password"))
                dispatch(toggleLoader(false))
                router.push("/login")
            })
            .catch((err) => {
                dispatch(toggleLoader(false))
                dispatch(showErrorToast(err))
            });
    }

    const onSubmitFP = (values: any) => {
        if (values.confirmPassword == values.password) {
            onForgotPassword(values)
        } else {
            dispatch(showErrorToast("Password not matched"))
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        dispatch(showErrorToast(errorInfo.errorFields[0].errors[0]))
    };

    const sendFPLink = (values: any) => {
        if (values.email) {
            sendForgotPasswordLink(values.email).then(() => {
                dispatch(showSuccessToast(`Reset link send to ${values.email}.`));
                router.push("/login");
            })
        }
    }

    return (
        <div className={Styles.loginPageWrap}>
            <div className={Styles.headerWrap} style={{ background: token.colorPrimaryBg }}>
                <div className={Styles.logo}>
                    <img src={LOGO_IMAGE} />
                </div>
            </div>
            {Boolean(userDetails?.email) ? <div className={Styles.pageContent}>
                <Form
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    name="basic"
                    style={{ maxWidth: "100%" }}
                    onFinish={onSubmitFP}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >
                    <Space size={0} className={Styles.heading} style={{ width: 500 }} direction='vertical'>
                        Reset your password for email:
                        <Space style={{ fontSize: 16, color: "blueviolet" }}>
                            {userDetails?.email}
                        </Space>
                    </Space>
                    <Form.Item<FieldType>
                        label="Password"
                        name="password"
                        rules={[{ required: true, message: 'Please enter your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Confirm Password"
                        name="confirmPassword"
                        rules={[{ required: true, message: 'Please confirm your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                        <Button type="link" onClick={() => router.push("/login")}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div> : <div className={Styles.pageContent}>
                <Form
                    name="basic"
                    onFinish={sendFPLink}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout='vertical'
                >
                    <h2 className={Styles.heading}>
                        Enter email to reset password
                    </h2>

                    <Form.Item<SendLinkFieldType>
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item >
                        <Button type="primary" htmlType="submit">
                            Get Forgot Password Link
                        </Button>
                        <Button type="link" onClick={() => router.push("/login")}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
            </div>}
        </div>
    )
}

export default ResetPasswordPage