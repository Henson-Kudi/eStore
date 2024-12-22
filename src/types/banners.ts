import { FileType } from "."

export type Banner = {
    id: string
    imageUrl: string
    fileType: FileType.VIDEO | FileType.IMAGE
    webLink: string
    appLink: string | null
    query: Record<string, unknown>
    createdBy: string
    lastModifiedBy: string | null
    createdAt: string
    lastUpdatedAt: string
    isActive: boolean
    isDeleted: boolean
    deletedAt: string | null

}