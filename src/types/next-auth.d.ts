import "next-auth"
import type { DefaultSession, DefaultUser, Session } from "next-auth"
import "next-auth/jwt"
import type { User as UserType } from "./user"

declare module "next-auth" {
    interface User extends DefaultUser, UserType {
        requiresOtp?: boolean
        accessToken?: { token?: string, expireAt: string }
        refreshToken?: { token?: string, expireAt: string }
    }

    interface Session extends DefaultSession {
        user?: User
        requiresOtp?: boolean
        accessToken?: { token?: string, expireAt: string }
        refreshToken?: { token?: string, expireAt: string }
        syncedToBackend?: boolean
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        accessToken?: { token?: string, expireAt: string }
        refreshToken?: { token?: string, expireAt: string }
        requiresOtp?: boolean
    }
}