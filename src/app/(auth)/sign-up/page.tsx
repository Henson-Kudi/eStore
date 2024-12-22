import {SignUp} from "@/core/pages/auth/sign-up"
import { Suspense } from "react"

function SignUpPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SignUp />
    </Suspense>
  )
}

export default SignUpPage
