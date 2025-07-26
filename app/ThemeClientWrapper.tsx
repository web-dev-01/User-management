'use client'

import { CssBaseline } from '@mui/material'
import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles'
import { getDynamicTheme } from '@/theme/theme'
import { useEffect, useState } from 'react'
import { PortalProvider } from '@/contexts/PortalContext'

export default function ThemeClientWrapper({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(getDynamicTheme('#1976d2', '#9c27b0', '#000000'))

  useEffect(() => {
    const fetchPortal = async () => {
      try {
        const res = await fetch('/api/portal')
        const data = await res.json()

        const primary = data?.primaryColor || '#1976d2'
        const secondary = data?.secondaryColor || '#9c27b0'
        const text = data?.textColor || '#000000'

        setTheme(getDynamicTheme(primary, secondary, text))
      } catch (error) {
        console.warn('Theme API fetch failed. Using default theme.')
      }
    }

    fetchPortal()
  }, [])

  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <PortalProvider>
        {children}
      </PortalProvider>
    </MuiThemeProvider>
  )
}
