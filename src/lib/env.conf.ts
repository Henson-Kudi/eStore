import { NODE_ENV } from "@/types";

export default {
    apiBaseUrl: process?.env?.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:4000/api/v1',
    apiTimeout: 10000,
    NODE_ENV: process.env?.NODE_ENV || NODE_ENV.DEVELOPMENT,
    NEXTAUTH_SECRET: process.env?.NEXTAUTH_SECRET || '',
    GOOGLE_CLIENT_ID: process.env?.GOOGLE_CLIENT_ID || '',
    GOOGLE_CLIENT_SECRET: process.env?.GOOGLE_CLIENT_SECRET || '',
    GITHUB_CLIENT_ID: process.env?.GITHUB_CLIENT_ID || '',
    GITHUB_CLIENT_SECRET: process.env?.GITHUB_CLIENT_SECRET || '',
    NEXTAUTH_URL: process.env?.NEXTAUTH_URL || 'http://localhost:3000',
}