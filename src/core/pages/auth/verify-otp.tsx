"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { verifyOtp } from "@/app/actions/auth"
import { useRouter, useSearchParams } from "next/navigation"
import { useToast } from "@/hooks/use-toast"
import { getClientDeviceInfo } from "@/lib/utils"
import { signIn } from "next-auth/react"

export default function VerifyOTP() {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const {toast} = useToast()
  const params = useSearchParams()

  const callbackUrl = params.get('callback_url') || '/'

  let searchParams:Record<string, string | string[]> = {}

  if (params.get('token')) {
    try {
      searchParams = JSON.parse(params.get('token')??'')
    } catch (error) {
      console.log('json parse error')
    }
  }
 

  const handleChange = (element: HTMLInputElement, index: number) => {
    if (isNaN(Number(element.value))) return false

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))])

    if (element.nextSibling && element.value !== "") {
      (element.nextSibling as HTMLInputElement).focus()
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    const otpValue = otp.join("")
    if (otpValue.length !== 6) {
        toast({
          title: "Invalid OTP",
          description: "Please enter a valid 6-digit OTP",
          className: 'text-red-500'
        })
      setSuccess(false)
    //   setError("Please enter a valid 6-digit OTP")
      return
    }

    try {

      const res = await signIn('credentials', {
        callbackUrl: window.origin + callbackUrl,
        redirect: false,
        code: otpValue,
        loginType: 'verifyOtp',
        ...searchParams,
        ...getClientDeviceInfo(),
      })

      if (res && !res?.error) {
        router.replace(res?.url??callbackUrl)
      }else{
        toast({
          title: "Invalid OTP",
          description: res?.error ?? "The OTP you entered is invalid. Please try again.",
          className: 'text-red-500'
        })
        setSuccess(false)
      }
    } catch (err:any) {
        toast({
          title: "Invalid OTP",
          description: err?.message ?? "An error occurred. Please try again.",
          className: 'text-red-500'
        })
    }
  }

  return (
      <div className="flex items-center justify-center min-h-screen w-full">
        <div className="w-max p-8 space-y-6  rounded-xl shadow-md">
          <h1 className="text-2xl font-bold text-center">Verify OTP</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <Label htmlFor="otp-input" className="sr-only">
                Enter your OTP
              </Label>
              <div className="flex justify-between mt-2">
                {otp.map((data, index) => (
                  <Input
                    key={index}
                    type="text"
                    inputMode="numeric"
                    autoComplete="one-time-code"
                    pattern="\d{1}"
                    maxLength={1}
                    className="w-12 h-12 text-center text-xl font-semibold m-1"
                    value={data}
                    onChange={e => handleChange(e.target, index)}
                    onFocus={e => e.target.select()}
                  />
                ))}
              </div>
            </div>
            <Button type="submit" className="w-full">
              Verify OTP
            </Button>
          </form>
          {error && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          {success && (
            <Alert variant="default" className="bg-green-50 text-green-700 border-green-200">
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>Success</AlertTitle>
              <AlertDescription>OTP verified successfully!</AlertDescription>
            </Alert>
          )}
        </div>
      </div>
  )
}