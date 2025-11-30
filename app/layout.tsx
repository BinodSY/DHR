import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import { ConditionalLayout } from "@/components/conditional-layout"

export const metadata: Metadata = {
  title: "Health Dashboard",
  description: "Government Digital Health Portal",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="overflow-x-hidden">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable} overflow-x-hidden`}>
        <Suspense fallback={<div>Loading...</div>}>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Suspense>
        <Analytics />
      </body>
    </html>
  )
}
