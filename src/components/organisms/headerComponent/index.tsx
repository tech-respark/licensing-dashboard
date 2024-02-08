import NavigationMenus from "@/constants/navigation";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAuthUserState, setAuthUser } from "@/redux/slices/auth";
import { getDarkModeState, toggleDarkMode } from "@/redux/slices/clientThemeConfig";
import { showSuccessToast } from "@/redux/slices/toast";
import { Avatar, Button, Card, Layout, Popover, Space, Typography } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { LuCloudSunRain, LuLogOut, LuPen, LuUser } from 'react-icons/lu';
import Styles from "./headerComponent.module.scss";
const { Header } = Layout;
const { Text } = Typography;
const { Meta } = Card;

function HeaderComponent() {
    const pathname = usePathname()
    const dispatch = useAppDispatch()
    const isDarkMode = useAppSelector(getDarkModeState);
    const router = useRouter();
    const userData = useAppSelector(getAuthUserState)

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

        const onLogout = () => {
            // localStorage.removeItem("persist:relfor")
            dispatch(setAuthUser(null));
            dispatch(showSuccessToast("Logged out successfully"))
            router.push("/login")
        }

        return <Space>
            <Card
                style={{ width: 300 }}
                actions={[
                    <Text onClick={onLogout} key="Edit"> <LuPen /> Edit</Text>,
                    <Text onClick={onLogout} key="Logout"> <LuLogOut /> Logout</Text>,
                ]}
            >
                <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title={userData?.name}
                    description={`Logged in as ${userData.roleName}`}
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

                {/* <Popover content={renderNotificationContent()} title="Your Notifications" trigger="hover">
                    <Button shape='circle' size='large' icon={<LuBell />} />
                </Popover> */}


                {userData.roleName &&
                    <Popover content={renderProfileContent()} title="" trigger="hover">
                        <Space>
                            <Space direction="vertical" size={0} style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "flex-start"
                            }}>
                                <Text style={{ color: "white" }}>{userData.name}</Text>
                                <Text style={{ color: "white" }}>{userData.roleName}</Text>
                            </Space>
                            <Button shape='circle' size='large' icon={<LuUser />} />
                        </Space>
                    </Popover>
                }
                <Button onClick={() => dispatch(toggleDarkMode(!isDarkMode))} shape='circle' size='large' icon={<LuCloudSunRain />} />

            </Space>
        </Header>
    )
}

export default HeaderComponent