"use client";

import { useAppSelector } from '@/hooks/useAppSelector';
import { getDarkColorState, getDarkModeState, getLightColorState } from '@/redux/slices/clientThemeConfig';
import { ConfigProvider, theme } from "antd";
import en_US from 'antd/locale/en_US';
import { Inter } from "next/font/google";

export const INTER_FONT = Inter({
    subsets: ['latin'],
    variable: '--font-inter',
})

const AntdClient = ({ children }: any) => {
    const isDarkMode = useAppSelector(getDarkModeState)
    const lightThemeColor = useAppSelector(getLightColorState)
    const darkThemeColor = useAppSelector(getDarkColorState)
    const { token } = theme.useToken();

    return (
        <>
            <ConfigProvider
                // direction="rtl"
                locale={en_US}
                theme={{
                    algorithm: isDarkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
                    token: {
                        // colorPrimary: '#3bceac',
                        colorPrimary: isDarkMode ? darkThemeColor : lightThemeColor,
                        borderRadius: 5,
                        wireframe: false,
                        fontSize: 13
                    },
                    components: {
                        "Menu": {
                            itemSelectedBg: token.colorPrimaryBg,
                            iconSize: 18,
                            collapsedIconSize: 20,
                            fontSize: 15,
                            itemHeight: 50
                            // "groupTitleFontSize": 19,
                            // "lineHeight": 2,
                            // "margin": 20,
                            // controlHeight: 50
                        },
                        Tooltip: {
                            paddingXS: 14
                        },
                        Segmented: {
                            fontSize: 12,
                            fontSizeLG: 13,
                            controlHeightSM: 28,
                            borderRadiusXS: 4,
                            controlPaddingHorizontalSM: 10
                        },
                        Button: {
                            contentFontSize: 14,
                            contentLineHeight: 0
                        },
                        Drawer: {
                            padding: 10,
                            paddingLG: 15
                        },
                        Collapse: {
                            // headerBg: token.colorBgLayout
                        },
                        Typography: {
                            fontFamilyCode: INTER_FONT.style.fontFamily
                        },
                        Dropdown: {
                            fontSize: 14
                        }
                    },
                }}
            >
                <ConfigProvider
                    theme={{
                        token: {
                            borderRadius: 4,
                        }
                    }}
                >
                    {children}
                </ConfigProvider>
            </ConfigProvider>
        </>
    )
}

export default AntdClient;