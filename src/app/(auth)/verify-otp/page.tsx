import VerifyOTP from '@/core/pages/auth/verify-otp'
import React, { Suspense } from 'react'

export default function VerifyOtpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
        <VerifyOTP />
    </Suspense>
  )
}
