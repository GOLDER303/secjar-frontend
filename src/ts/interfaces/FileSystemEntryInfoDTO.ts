export default interface FileSystemEntryInfoDTO {
    id: number
    uuid: string
    name: string
    contentType: string
    size: number
    deleteDate: string | null
    uploadDate: string
    parent: string
    children: Array<FileSystemEntryInfoDTO>
    sharedByLink: boolean
    favorite: boolean
}
