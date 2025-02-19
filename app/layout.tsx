import './globals.css'
import { Sidebar } from '@/components/Sidebar'
import Header from '@/components/Header'
import { usePathname } from 'next/navigation'

export const metadata = {
  title: 'Pet Care Hub',
  description: 'Comprehensive pet health management and tracking',
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isPawsitiveCare = pathname.startsWith('/pawsitive')
  const isTailTracker = pathname.startsWith('/tail-tracker')

  return (
    <html lang="en" className="dark">
      <body>
        <div className="flex h-screen bg-zinc-100 dark:bg-zinc-900">
          {(isPawsitiveCare || isTailTracker) && <Sidebar />}
          <div className="flex-1 flex flex-col overflow-hidden">
            {(isPawsitiveCare || isTailTracker) && <Header />}
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-zinc-100 dark:bg-zinc-900">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}



import './globals.css'