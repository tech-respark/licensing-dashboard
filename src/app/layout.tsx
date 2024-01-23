import AntdLayoutWrapper from '@/components/antdComponent/layoutWrapper'
import Loader from '@/components/organisms/loader'
import Toast from '@/components/organisms/toast'
import ErrorBoundaryProvider from '@/providers/errorBoundaryProvider'
import { ReduxStoreProvider } from '@/providers/reduxProvider'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
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
