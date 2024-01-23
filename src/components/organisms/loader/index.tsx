'use client'
import { useAppSelector } from '@/hooks/useAppSelector';
import { getLoaderState } from '@/redux/slices/loader';
import { theme } from 'antd';
import { useEffect } from 'react';
import Style from './loader.module.scss';

function Loader() {
    const { token } = theme.useToken();
    const loading = useAppSelector(getLoaderState);

    useEffect(() => {
        console.log("loading", loading)
    }, [loading])

    return (
        <>
            {loading ? <div className={Style.loaderbody}>
                <div className={Style.spinner}>
                    <div className={Style.bounce1}></div>
                    <div className={Style.bounce2}></div>
                    <div className={Style.bounce3}></div>
                </div>
            </div> : null}
        </>
    )
}

export default Loader;
