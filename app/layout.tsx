import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navbar from "@/components/navbar"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Nerdvana",
  icons: { icon: "/nerd.png" },
  description:
    "The ultimate resource hub for geeks and nerds, featuring LaTeX editing, project ideas, productivity tools, and more.",
  keywords: ["geek", "nerd", "LaTeX", "productivity", "software", "tech", "project ideas"],
  authors: [{ name: "Nerdvana Team" }],
  creator: "Nerdvana Team",
  publisher: "Nerdvana",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://nerdvana.yassinolouati.me",
    siteName: "Nerdvana",
    images: [
      {
        url: "/nerd.png",
        width: 1200,
        height: 630,
        alt: "Nerdvana - A Geek's Paradise",
      },
    ], }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-gray-950 text-gray-100 min-h-screen`}>
        <Navbar />
        <main className="container mx-auto px-4 py-8">{children}</main>
      </body>
    </html>
  )
}



import './globals.css'