export type ProductBrand = {
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