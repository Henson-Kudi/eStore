import { api, apiErrorHandler } from "@/lib/api";
import { ReturnValue, ReturnValueWithPagination } from "@/types";
import { Banner } from "@/types/banners";
import { AxiosRequestConfig } from "axios";

export async function getBanners(config?: AxiosRequestConfig) {
    try {
        const { data } = await api.get<ReturnValueWithPagination<Banner>>('/cms/banners', config)

        return data
    } catch (err) {
        return apiErrorHandler<ReturnValue<null>>(err)
    }
}