'use client'
import { useAppDispatch } from '@/hooks/useAppDispatch';
import { useAppSelector } from '@/hooks/useAppSelector';
import { clearToast, getToastState } from '@/redux/slices/toast';
import { message } from 'antd';
import { useEffect } from 'react';

function Toast() {

    // message.config({
    //     top: 100,
    //     duration: 2,
    //     maxCount: 3,
    //     rtl: true,
    //     prefixCls: 'my-message',
    // });
    const toast = useAppSelector(getToastState);
    const dispatch = useAppDispatch();
    const [messageApi, contextHolder] = message.useMessage();

    useEffect(() => {
        if (toast?.type) {
            messageApi.open({
                type: toast.type,
                content: toast.message,
                duration: Number(((toast.time % 60000) / 1000).toFixed(0)),
            }).then(() => {
            });
            dispatch(clearToast());
        }
    }, [toast])

    return <>{contextHolder}</>
}

export default Toast;
