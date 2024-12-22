import { SignIn } from '@/core/pages/auth/sign-in'
import React, { Suspense } from 'react'

function SignInPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignIn />
    </Suspense>
  )
}

export default SignInPage
