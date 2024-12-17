'use client'

import * as React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'

// Create a client
const qc = new QueryClient()

export default function QueryProvider({children}:{children: React.ReactNode}){
    return <QueryClientProvider client={qc}>
      { children }
    </QueryClientProvider>
}