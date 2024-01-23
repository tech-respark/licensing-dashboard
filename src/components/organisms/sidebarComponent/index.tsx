'use client'
import { LOGO_IMAGE } from '@/constants/common';
import NavigationMenus from '@/constants/navigation';
import type { MenuProps } from 'antd';
import { Layout, Menu, theme } from 'antd';
import { usePathname, useRouter } from 'next/navigation';
import React from 'react';
import Styles from './sidebar.module.scss';
const { Sider } = Layout;

function SidebarComponent({ collapsed, setCollapsed }: any) {

    const router = useRouter()
    const pathname = usePathname()
    const { token } = theme.useToken()
    type MenuItem = Required<MenuProps>['items'][number];

    function getItem(label: React.ReactNode, key: React.Key, icon?: React.ReactNode, children?: MenuItem[],): MenuItem {
        return { key, icon, children, label, } as MenuItem;
    }

    const items: MenuItem[] = NavigationMenus.map((navItem: any) => getItem(navItem.name, navItem.route, <navItem.icon />))

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
            <Menu onSelect={(selectedNav: any) => onSelectNavigation(selectedNav.key)} style={{ padding: 10 }} theme="dark" defaultSelectedKeys={[pathname]} mode="inline" items={items} />
        </Sider>
    )
}

export default SidebarComponent