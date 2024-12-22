import { Checkout } from '@/core/pages/checkout'
import React, { Suspense } from 'react'

export default function CheckoutPage() {
  return (
    <Suspense fallback='Loading...'>
        <Checkout />
    </Suspense>
  )
}
