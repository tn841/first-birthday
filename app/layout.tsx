import type React from "react"
import "./globals.css"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "김세아 첫 돌 기념",
  description: "김세아의 첫 번째 생일을 축하합니다",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        />
        <meta property="og:title" content="세아 첫 돌 기념" />
        <meta property="og:description" content="세아의 첫 번째 생일을 축하합니다" />
        <meta property="og:image" content="/02.jpg" />
      </head>
      <body className="font-noto">{children}</body>
    </html>
  )
}

