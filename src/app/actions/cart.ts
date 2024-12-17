import { api, apiErrorHandler } from "@/lib/api";
import { ReturnValue, ReturnValueWithPagination } from "@/types";
import { Cart } from "@/types/cart";
import { AxiosRequestConfig } from "axios";

export async function getCart(config?: AxiosRequestConfig) {
    try {
        console.log(config, 'confif')
        const { data } = await api.get<ReturnValueWithPagination<Cart>>('/cart-service/cart', config)

        return data
    } catch (err) {
        return apiErrorHandler<ReturnValue<null>>(err)
    }
}

export async function addToCart(cart: Partial<Omit<Cart, 'id'>>, config?: AxiosRequestConfig) {
    const { data } = await api.post<ReturnValue<Cart>>('/cart-service/cart', cart, config)

    return data
}

export async function updateCart(id: string, cart: Partial<Cart>, config?: AxiosRequestConfig) {
    try {
        const { data } = await api.put<ReturnValue<Cart>>(`/cart-service/cart/${id}`, cart, config)

        return data
    } catch (err) {
        return apiErrorHandler<ReturnValue<null>>(err)
    }
}

export async function deleteCart(id: string, config?: AxiosRequestConfig) {
    try {
        const { data } = await api.delete<ReturnValue<Cart>>(`/cart-service/cart/${id}`, config)

        return data
    } catch (err) {
        return apiErrorHandler<ReturnValue<null>>(err)
    }
}

export async function clearCart(config?: AxiosRequestConfig) {
    try {
        const { data } = await api.delete<ReturnValue<{ count: number }>>('/cart-service/cart', config)

        return data
    } catch (err) {
        return apiErrorHandler<ReturnValue<null>>(err)
    }
}