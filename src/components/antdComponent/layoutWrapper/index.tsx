'use client'
import HeaderComponent from '@/components/organisms/headerComponent';
import SidebarComponent from '@/components/organisms/sidebarComponent';
import { useAppSelector } from '@/hooks/useAppSelector';
import AntdThemeProvider from '@/providers/antdThemeProvider';
import NoSSRProvider from '@/providers/noSSRProvider';
import { getAuthUserState } from '@/redux/slices/auth';
import { getDarkModeState } from '@/redux/slices/clientThemeConfig';
import { StyleProvider, createCache } from '@ant-design/cssinjs';
import type Entity from '@ant-design/cssinjs/es/Cache';
import { Layout, theme } from 'antd';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react';
import Styles from './layoutWrapper.module.scss';
const { Content } = Layout;

export default function AntdLayoutWrapper(props: any) {
    const cache = React.useMemo<Entity>(() => createCache(), []);
    const isDarkMode = useAppSelector(getDarkModeState);
    const router = useRouter();
    const [collapsed, setCollapsed] = useState(false);

    const { token } = theme.useToken();
    console.log("inside AntdLayoutWrapper")

    const userData = useAppSelector(getAuthUserState)
    console.log("userData in dahsboard", userData)
    // if (!userData) return router.push("login")

    useEffect(() => {
        if (!userData) {
            return router.push("login")
        }
    }, [userData])



    return (
        <NoSSRProvider>
            <AntdThemeProvider>
                <StyleProvider cache={cache}>
                    {Boolean(userData) ? <Fragment>
                        <Layout style={{ minHeight: '100vh' }} className={Styles.layoutWrapper} hasSider>
                            <SidebarComponent collapsed={collapsed} setCollapsed={setCollapsed} />
                            <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
                                <HeaderComponent />
                                <Content className={Styles.mainContentWraper} style={{ background: isDarkMode ? token.colorFillContent : token.colorBgLayout }}>
                                    {props.children}
                                </Content>
                            </Layout>
                        </Layout>
                    </Fragment> : <Fragment>
                        <div>
                            {props.children}
                        </div>
                    </Fragment>}
                </StyleProvider>
            </AntdThemeProvider>
        </NoSSRProvider>
    )
}
