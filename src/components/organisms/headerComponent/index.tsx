import { PRODUCTS_LIST } from "@/constants/common";
import NavigationMenus from "@/constants/navigation";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { getAuthUserState, setAuthUser } from "@/redux/slices/auth";
import { getDarkModeState, toggleDarkMode } from "@/redux/slices/clientThemeConfig";
import { showSuccessToast } from "@/redux/slices/toast";
import { removeObjRef } from "@/utils/common";
import { Avatar, Button, Card, Layout, Popover, Space, Typography } from "antd";
import { usePathname, useRouter } from "next/navigation";
import { useCallback } from "react";
import { LuCloudSunRain, LuLogOut, LuUser } from 'react-icons/lu';
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

    const onChangeProduct = (product: any) => {
        const user = removeObjRef(userData);
        user.productId = product;
        //fetch user permissions by using product id and set it into main user
        dispatch(setAuthUser(user))
        window.location.reload();
    }

    const renderProfileContent = () => {

        const onLogout = () => {
            // localStorage.removeItem("persist:relfor")
            dispatch(setAuthUser(null));
            dispatch(showSuccessToast("Logged out successfully"))
            router.push("/login")
        }

        return <Space>
            <Card style={{ width: 300 }}
                actions={[<Text onClick={onLogout} key="Logout"> <LuLogOut /> Logout</Text>]}>
                <Meta
                    avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
                    title={userData?.name}
                    description={`Logged in as ${userData?.roleName}`}
                />
            </Card>
        </Space>
    }

    const getProductOptions = () => {
        return PRODUCTS_LIST.map((p: any) => ({ value: p.productId, label: p.productName }))
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
            {/* <Space style={{ width: "100%" }} size={20}>
                <Text style={{ color: 'white', fontSize: 16 }}>{currentpage()}</Text>
                {(userData?.roleName == ADMIN_ROLE || userData?.roleName == CEO_ROLE) && <Select
                    style={{ width: "auto" }}
                    placeholder="Select Product"
                    value={userData?.productId}
                    onChange={onChangeProduct}
                    options={getProductOptions()}
                />}
            </Space> */}
            <Space align="end" className={Styles.elements} size={15}>

                {/* <Popover content={renderNotificationContent()} title="Your Notifications" trigger="hover">
                    <Button shape='circle' size='large' icon={<LuBell />} />
                </Popover> */}

                {userData?.roleName &&
                    <Popover content={renderProfileContent()} title="" trigger="hover">
                        <Space>
                            <Space direction="vertical" size={0} style={{
                                display: "flex",
                                justifyContent: "flex-start",
                                alignItems: "flex-start"
                            }}>
                                <Text style={{ color: "white" }}>{userData.name}</Text>
                                <Text style={{ color: "white" }}>{userData?.roleName}</Text>
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