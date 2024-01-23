/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
"use client"
import { LOGO_IMAGE } from '@/constants/common';
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getUserByCredentials } from '@/lib/internalApi/user';
import { getAuthUserState, setAuthUser } from '@/redux/slices/auth';
import { toggleLoader } from '@/redux/slices/loader';
import { showErrorToast, showSuccessToast } from '@/redux/slices/toast';
import { Button, Form, Input, theme } from 'antd';
import { useRouter } from 'next/navigation';
import Styles from "./login.module.scss";

type FieldType = {
    username?: string;
    password?: string;
    // remember?: string;
};

function LoginPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { token } = theme.useToken()

    const userData = useAppSelector(getAuthUserState)
    console.log("userData in dahsboard", userData)
    if (Boolean(userData)) router.push("/")

    const signInWithCredentials = async (values: any) => {
        dispatch(toggleLoader(true))
        getUserByCredentials(values)
            .then((authUser: any) => {
                dispatch(setAuthUser(authUser))
                dispatch(showSuccessToast("Perfect! You're signed in successfuly."))
                router.push("/")
                dispatch(toggleLoader(false))
            })
            .catch((err) => {
                dispatch(toggleLoader(false))
                dispatch(showErrorToast(err.message))
            });
    }

    const onFinish = (values: any) => {
        console.log('Success:', values);
        if (values.username !== 'admin' || values.password !== "admin123") {
            dispatch(showErrorToast("Invalid Credentials"))
        } else {
            signInWithCredentials(values)
            dispatch(setAuthUser(values))
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        dispatch(showErrorToast(errorInfo.errorFields[0].errors[0]))
    };

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
                        label="Username"
                        name="username"
                        rules={[{ required: true, message: 'Please enter your username!' }]}
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
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </div>
    )
}

export default LoginPage