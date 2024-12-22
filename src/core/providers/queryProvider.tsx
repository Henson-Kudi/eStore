'use client'

import * as React from 'react'
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// Create a client
const qc = new QueryClient()

export default function QueryProvider({children}:{children: React.ReactNode}){
    return <QueryClientProvider client={qc}>
      { children }
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
}