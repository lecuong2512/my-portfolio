import type { Metadata } from "next"
import "./globals.css"
import AnimatedShapes from "@/components/animated-shapes"
import SiteLoader from "@/components/site-loader"

export const metadata: Metadata = {
  title: "Portfolio",
  description: "Personal Portfolio Website",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <AnimatedShapes />
        <SiteLoader />
        <div className="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  )
}
