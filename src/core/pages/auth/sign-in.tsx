"use client"
import React, { Suspense, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { loginSchema } from '@/schemas/form-schema';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';
import { getClientDeviceInfo } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle } from 'lucide-react';

export function SignIn() {
  const  {toast} = useToast()
  const {status} = useSession()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callback_url') || '/'

  const router = useRouter()

  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: ""
    },
  })

  useEffect(()=>{
    if(status === 'authenticated'){
      // we want to set access token to new access token
      router.replace(callbackUrl ?? '/')
    }
  }, [status])

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    setIsLoading(true)

    try {
      const res = await signIn('credentials', {
        callbackUrl: window.origin + callbackUrl,
        email: values.email,
        password: values.password,
        redirect: false,
        ...getClientDeviceInfo(),
      })

      if (res && !res?.error) {
        router.replace(res.url?.includes('verify-otp') ? `${res.url}&callback_url=${callbackUrl}` : res.url??'/')
      }else{
        toast({
          title: "Error",
          description: res?.error ?? "Invalid email or password.",
          variant: "destructive",
        })
        setIsLoading(false)
      }

    } catch (err:any) {
      console.log(err)
      toast({
        title: "Error",
        description: err?.message ?? "Invalid email or password.",
        variant: "destructive",
      })
      setIsLoading(false)
    }finally{
      // setIsLoading(false)
    }
  }

  const handleGoogleLogin = async()=>{
    try {
      setIsLoading(true)
      const res = await signIn('google', {
        ...getClientDeviceInfo(),
        param1: 'some string',
        param2: 'another string'
      })
    } catch (error) {
      console.log(error)
    }finally{
      setIsLoading(false)
    }
  }

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8 lg:h-screen justify-center py-10 lg:py-0">
          <div className='flex flex-col gap-4 items-center'>
            <div className='lg:w-[45%] md:w-[95%]   flex flex-col gap-8 px-2 lg:px-0'>
              <div className=' flex flex-col items-center gap-2'>
                <h2 className='font-bold lg:text-4xl text-2xl'>SIGN IN</h2>
                <p className=' text-gray-700 lg:text-2xl font-sans text-lg'>Please fill in the information below:</p>
              </div>
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Email" type="email" {...field} autoComplete='email webauthn' className='bg-white px-3  py-3 lg:py-4' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Password" type="password" {...field} autoComplete='email webauthn' className='bg-white px-3  py-3 lg:py-4' />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className='flex flex-col items-center gap-1  justify-center'>
            <Button type="submit"   className='lg:w-[45%] w-[93%] lg:py-6 py-3  text-sm lg:text-2xl px-2 lg:px-0 disabled:cursor-not-allowed' disabled={isLoading}>{isLoading && <LoaderCircle className='mr-2 w-5 h-5 animate-spin' />} Login</Button>
            <p className='text-gray-700 lg:text-2xl font-sans text-lg'>OR</p>
            <Button type='button' variant="outline" onClick={handleGoogleLogin}>
                 <svg className="mr-2 h-4 w-4" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="google" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 488 512"><path fill="currentColor" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"></path></svg>
                Google
              </Button>
            <p className='text-gray-700  pt-2 lg:pt-6 lg:text-2xl font-sans text-lg'>Don't have an account? <u><Link href={"/sign-up"}>Register</Link></u></p>
          </div>
        </form>
      </Form>
    </Suspense>
  )
}