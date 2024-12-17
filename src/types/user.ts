export type Role = {
    id: string
    name: string
    slug: string
    description?: string | null
    createdAt: string // valid date string
    updatedAt: string // valid date string
    createdById: string
    isActive: boolean
    isDeleted: boolean
    deletedAt?: string | null // valid date string | null
    deletedById?: string | null
    lastModifiedById?: string | null
}

export type Group = {
    id: string
    name: string
    slug: string
    description?: string | null
    createdAt: string // date string
    updatedAt: string // date string
    createdById: string
    isActive: boolean
    isDeleted: boolean
    deletedAt?: string // date string | null
    deletedById?: string | null
    lastModifiedById?: string | null
}

export type User = {
    id: string
    email: string
    emailVerified: boolean
    name: string
    phone: string
    phoneVerified: boolean
    createdAt: string // valid date string
    updatedAt: string // valid date string
    isActive: boolean
    isDeleted: boolean
    deletedAt?: string // valid date string
    deletedById?: string
    lastModifiedById?: string
    invitedById?: string
    lastLoginAt?: string // valid date string
    lastLoginIp?: string
    lastLoginDevice?: string
    lastLoginLocation?: string
    googleId?: string
    appleId?: string
    photo?: string
    deletedBy?: User
    lastModifiedBy?: User
    invitedBy?: User
    roles?: Role[]
    groups?: Group[]
    accessToken?: {
        expireAt: string
        token: string
    }
    refreshToken?: {
        expireAt: string
        token: string
    }
}

export type UserDeviceDetails = {
    'user-agent': string
    'device-type': string
    os: string
    browser: string
    version: string
}