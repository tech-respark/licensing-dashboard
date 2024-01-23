import AntdThemeProvider from "@/providers/antdThemeProvider"
import NoSSRProvider from "@/providers/noSSRProvider"
import { ReduxStoreProvider } from "@/providers/reduxProvider"

function WithoutLayout({ children }: any) {
    console.log("Inside without layout")
    return <NoSSRProvider>
        <AntdThemeProvider>
            <ReduxStoreProvider>
                {children}
            </ReduxStoreProvider>
        </AntdThemeProvider>
    </NoSSRProvider>
}

export default WithoutLayout