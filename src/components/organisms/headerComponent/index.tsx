import NavigationMenus from "@/constants/navigation";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getDarkModeState, toggleDarkMode } from "@/redux/slices/clientThemeConfig";
import { Avatar, Button, Card, Layout, Popover, Space, Typography, theme } from "antd";
import { usePathname } from "next/navigation";
import { useCallback } from "react";
import { LuBell, LuCloudSunRain, LuLogOut, LuPen, LuUser } from 'react-icons/lu';
import Styles from "./headerComponent.module.scss";
const { Header, Content, Sider } = Layout;
const { Text } = Typography;
const { Meta } = Card;

function HeaderComponent() {
    const pathname = usePathname()
    const dispatch = useAppDispatch()
    const isDarkMode = useAppSelector(getDarkModeState);
    const { token } = theme.useToken()

    const currentpage = useCallback(
        () => {
            if (pathname == "/") return "Dashboard Page";
            else return NavigationMenus.find((nav: any) => pathname == nav.route)?.label;
        },
        [pathname])

    const renderNotificationContent = () => {
        return <Space>
            No notifications for today
        </Space>
    }

    const renderProfileContent = () => {
        return <Space>
            <Card
                style={{ width: 300 }}
                actions={[
                    <Text> <LuPen /> Edit</Text>,
                    <Text> <LuLogOut /> Logout</Text>,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title="Deepak Nathani"
                    description="Logged in as CEO"
                />
            </Card>
        </Space>
    }

    return (
        <Header
            style={{
                position: 'sticky',
                top: 0,
                zIndex: 1,
                width: '100%',
                display: 'flex',
                alignItems: 'center',
            }}
            className={Styles.headerComponentWrap}
        >
            <Space style={{ width: "100%" }}>
                <Text style={{ color: 'white', fontSize: 16 }}>{currentpage()}</Text>
            </Space>
            <Space align="end" className={Styles.elements} size={15}>

                <Popover content={renderNotificationContent()} title="Your Notifications" trigger="hover">
                    <Button shape='circle' size='large' icon={<LuBell />} />
                </Popover>

                <Button onClick={() => dispatch(toggleDarkMode(!isDarkMode))} shape='circle' size='large' icon={<LuCloudSunRain />} />

                <Popover content={renderProfileContent()} title="" trigger="hover">
                    <Button shape='circle' size='large' icon={<LuUser />} />
                </Popover>
            </Space>
        </Header>
    )
}

export default HeaderComponent