export type BlogPost = {
    id: string
    title: string
    slug: string
    content: string
    delta?: string // JSON string for react quill
    createdBy: string
    lastModifiedBy?: string
    createdAt: string
    lastUpdatedAt?: string
    headerImage?: string
    metaTitle?: string
    metaDescription?: string
    metaTags?: string
    isActive: boolean
    isDeleted: boolean
    deletedAt?: string
}

export type TermsAndConditions = {
    id: string
    title: string
    content: string
    delta?: string
    metaTitle?: string | null
    metaDescription?: string | null
    metaTags?: string | null
    createdBy: string
    lastModifiedBy?: string | null
    createdAt: string
    lastUpdatedAt?: string
    isActive: boolean
    isDeleted?: boolean
    deletedAt?: string | null
}

export type PrivacyPolicy = {
    id: string
    title: string
    content: string
    delta?: string
    metaTitle?: string | null
    metaDescription?: string | null
    metaTags?: string | null
    createdBy: string
    lastModifiedBy?: string | null
    createdAt: string
    lastUpdatedAt?: string
    isActive: boolean
    isDeleted?: boolean
    deletedAt?: string | null
}

export type Faq = {
    id: string
    question: string
    answer: string
    createdBy: string
    lastModifiedBy?: string | null
    createdAt: string
    lastUpdatedAt?: string
    isActive: boolean
    isDeleted?: boolean
    deletedAt?: string | null
}