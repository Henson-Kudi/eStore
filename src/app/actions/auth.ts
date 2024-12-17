'use server'
import { redirect } from 'next/navigation'
import { api } from '@/lib/api'
import envConf from '@/lib/env.conf'
import { NODE_ENV, ReturnValue, UserDeviceDetails } from '@/types'
import { cookies } from 'next/headers'
import { User } from '@/types/user'

export async function login(data: { [key: string]: string | unknown }, headers?: UserDeviceDetails & { [key: string]: string | string[] }) {

    try {
        const { data: result } = await api.post('/users-service/auth/login', data, {
            headers: {
                ...(headers ?? {})
            },
        })

        // const Cookies = cookies()


        // if (result.success && !result.redirect && result.data) {
        //     const user = result?.data as User;

        //     const maxAge = new Date(user?.refreshToken?.expireAt ?? Date.now()).getTime() - new Date().getTime()

        //     Cookies.set('refresh-token', user?.refreshToken!.token, {
        //         httpOnly: true,
        //         secure: envConf.NODE_ENV === NODE_ENV.PRODUCTION,
        //         maxAge: maxAge,
        //         path: '/',
        //         sameSite: 'none',
        //     })
        // }

        // Store login data in the session

        return result
    } catch (err: any) {
        console.log(err, 'next error')
        return { data: null, success: false, error: { message: `${err?.response?.data?.code} ${err?.response?.data?.message}` } }
    }
}

export async function register(data: { [key: string]: string }) {

    try {
        const Cookies = cookies()

        const { data: result } = await api.post('/users-service/auth/register', data)


        redirect('/auth/verify-otp')

    } catch (err: any) {
        return { success: false, error: `${err?.response?.data?.code} ${err?.response?.data?.message}` }
    }
}

export async function verifyOtp(params: {
    code: string,
    email?: string,
    phone?: string
    userId?: string,
    redirectType?: string
}, headers?: UserDeviceDetails & { [key: string]: string | string[] }) {

    try {

        // email_verification
        // phone_verification
        // 2FA
        // password_reset
        const endPoint = params?.redirectType === 'email_verification' ? 'verify-email' : params?.redirectType === 'phone_verification' ? 'verify-phone' : 'verify-otp'

        const { data: result } = await api.post<ReturnValue<User | null>>(`/users-service/auth/${endPoint}`, { ...params }, { headers })

        return result
    } catch (err: any) {
        return { success: false, error: `${err?.response?.data?.code} ${err?.response?.data?.message}`, data: null }
    }
}