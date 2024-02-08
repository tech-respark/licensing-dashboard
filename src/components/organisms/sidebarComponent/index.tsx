'use client'
import { ADMIN_ROLE, CEO_ROLE, LOGO_IMAGE } from '@/constants/common';
import NavigationMenus from '@/constants/navigation';
import { useAppSelector } from '@/hooks/useAppSelector';
import { getAuthUserState } from '@/redux/slices/auth';
import type { MenuProps } from 'antd';
import { Layout, Menu } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Styles from './sidebar.module.scss';
const { Sider } = Layout;

function SidebarComponent({ collapsed, setCollapsed }: any) {

    const router = useRouter()
    const pathname = usePathname()
    type MenuItem = Required<MenuProps>['items'][number];
    const [navigations, setNavigations] = useState<MenuItem[]>([]);
    const userData = useAppSelector(getAuthUserState);

    useEffect(() => {
        const NAV_COPY = [...NavigationMenus];
        NAV_COPY.map((nav: any) => {
            if ((nav.name == "Dashboard" || nav.name == "Role" || nav.name == "Modules" || nav.name == "Users") && !(userData.roleName == CEO_ROLE || userData.roleName == ADMIN_ROLE)) nav.active = false;
            else nav.active = true;
            if (nav.name == "Reports" && !Boolean(userData?.rolePermissions?.reportsDashboard)) nav.active = false;
        })
        setNavigations(NAV_COPY.filter((n: any) => n.active).map((navItem: any) => getItem(navItem.name, navItem.route, <navItem.icon />)));
    }, [])


    function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[],): MenuItem {
        return { key, icon, children, label, } as MenuItem;
    }

    const onSelectNavigation = (selected: any) => {
        router.push(selected)
    }

    return (
        <Sider
            style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0, top: 0, bottom: 0 }}
            className={Styles.sidebarWrap} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
            <div className={Styles.logoWrap} >
                <img src={LOGO_IMAGE} />
            </div>
            <Menu
                onSelect={(selectedNav: any) => onSelectNavigation(selectedNav.key)}
                style={{ padding: 10 }}
                theme="dark"
                defaultSelectedKeys={[pathname]}
                mode="inline"
                items={navigations} />
        </Sider>
    )
}

export default SidebarComponent