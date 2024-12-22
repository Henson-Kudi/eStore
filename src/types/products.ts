import { FileType } from "."
import { ProductBrand } from "./brands"

export type Product = {
    id: string,
    serialNumber: number,
    name: string,
    description?: string,
    price: number,
    currency: string,
    brandId: string,
    tags?: string[],
    SKU: string,
    UPC?: string,
    EAN?: string,
    media: ProductMedia[],
    createdAt: string,
    updatedAt: string,
    createdById: string,
    createdBy?: Record<string, any>,
    lastModifiedBy?: Record<string, any>,
    lastModifiedById?: string,
    status: number,
    stockStatus: number,
    slug: string,
    metaTitle?: string,
    metaDescription?: string,
    metaKeywords?: string[],
    qtyInStock: number,
    originalPrice: number,
    discountedPrice?: number,
    discountStartDate?: string,
    discountEndDate?: string,
    averageRating?: number,
    reviewCount?: number,
    unit?: string,
    size?: string,
    color?: string,
    weight?: string,
    dimensions?: string,
    attributes?: Record<string, string>,
    brand: ProductBrand,
    categories: ProductCategory[],
    taxes?: Tax[]
    discounts?: ProductDiscount[]
}

export type ProductMedia = {
    url: string,
    type: FileType.VIDEO | FileType.IMAGE,
    altText: string
}



export type ProductCategory = {
    id: string,
    name: string,
    slug: string,
    image?: string | null,
    createdById: string,
    createdBy?: Record<string, any>
    lastModifiedBy?: Record<string, any>,
    lastModifiedById?: string,
    createdAt: string,
    updatedAt: string,
    description?: string
}

export type Tax = {
    id: string,
    name: string,
    slug: string,
    rate: number,
    createdById: string,
    createdBy?: Record<string, any>
    lastModifiedBy?: Record<string, any>,
    lastModifiedById?: string,
    createdAt: string,
    updatedAt: string,
    description?: string
}

















// Payments for orders


export type ProductDiscount = {
    id: string
    productId: string
    discountName: string
    discountType: string
    discountValue: string
    isActive: boolean
    startDate: string
    endDate: string
    autoApply: boolean
    createdAt: string
    updatedAt: string
}

