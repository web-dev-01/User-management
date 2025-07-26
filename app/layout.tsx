// app/layout.tsx
import './globals.css'
import { ReactNode } from 'react'
import ThemeClientWrapper from './ThemeClientWrapper'

export const metadata = {
  title: 'Your App Title',
  description: 'App Description',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <ThemeClientWrapper>
          {children}
        </ThemeClientWrapper>
      </body>
    </html>
  )
}
