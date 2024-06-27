'use client'

import React, { type FC, type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from '@material-tailwind/react'

const queryClient = new QueryClient()

type ProvidersProps = {
  children: ReactNode | ReactNode[]
}

export const Providers: FC<ProvidersProps> = ({ children }) => <>
  <ThemeProvider>
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  </ThemeProvider>
</>
