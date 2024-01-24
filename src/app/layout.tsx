import AntdLayoutWrapper from '@/components/antdComponent/layoutWrapper'
import Loader from '@/components/organisms/loader'
import Toast from '@/components/organisms/toast'
import ErrorBoundaryProvider from '@/providers/errorBoundaryProvider'
import { ReduxStoreProvider } from '@/providers/reduxProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Head from "next/head"
import "../../public/styles/app.scss"
import './globals.css'

const INTER_FONT = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Relfor Licensing Dashboard',
  description: 'Relfor Licensing Dashboard',
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <Head>
        <link rel="shortcut icon" type="image/png" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" />
      </Head>
      <body className={`${INTER_FONT.variable} font-sans`}>
        <ErrorBoundaryProvider>
          <ReduxStoreProvider>
            <AntdLayoutWrapper>
              <Loader />
              <Toast />
              {children}
            </AntdLayoutWrapper>
          </ReduxStoreProvider>
        </ErrorBoundaryProvider>
      </body>
    </html>
  )
}
