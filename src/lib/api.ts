import axios from 'axios'
import platform from 'platform'
import envConf from './env.conf'

export const api = axios.create({
    baseURL: envConf.apiBaseUrl,
    withCredentials: true,
    timeout: envConf.apiTimeout,
    headers: {
        'Content-Type': 'application/json',
        'device-type': platform.product || 'Unknown',
        os: platform.os ? platform.os.toString() : 'Unknown',
        browser: platform.name || 'Unknown',
        version: platform.version || 'Unknown',
    },
})

export function apiErrorHandler<T>(err: any): T {
    if (axios.isAxiosError(err)) {
        const { response } = err

        if (response?.data) {
            return {
                ...response?.data,
                error: {
                    ...(response?.data?.error ?? {}),
                    status: response?.status ?? 500,
                    message: response?.data?.message ?? response?.data?.error?.message ?? 'Something went wrong',
                }
            } as T
        }

        return {
            success: false,
            message: err?.message ?? 'Something went wrong',
            data: null,
            error: {
                status: response?.status ?? 500,
                message: err?.message ?? 'Something went wrong',
            }
        } as T
    }

    return {
        success: false,
        message: err?.message ?? 'Something went wrong',
        data: null,
        error: {
            status: err?.response?.status ?? 500,
            message: err?.message ?? 'Something went wrong',
        }
    } as T
}