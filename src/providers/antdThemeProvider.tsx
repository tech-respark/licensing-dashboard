'use client'

import AntdClient from "@/lib/antd/antdClient";

const AntdThemeProvider = (props: any) => {
    return (
        <AntdClient>
            {props.children}
        </AntdClient>
    )
}

export default AntdThemeProvider;