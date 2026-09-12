import { NextIntlClientProvider } from 'next-intl'
import { getMessages } from 'next-intl/server'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { Nav } from '@/components/Nav'
import { Footer } from '@/components/Footer'
import './globals.css'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export const metadata = {
  title: 'VAYALAND — The Real Wayanad',
  description: 'Premium real estate in Wayanad, Kerala. Discover land, plots, homes, and architectural properties in the heart of Kerala.',
  icons: {
    icon: '/assets/logo-icon.png',
    shortcut: '/assets/logo-icon.png',
    apple: '/assets/logo-icon.png',
  },
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  if (!(routing.locales as unknown as string[]).includes(locale)) notFound()

  const messages = await getMessages()

  // data-lang drives the Malayalam font swap defined in globals.css
  return (
    <html lang={locale} data-lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <Nav />
          {children}
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
