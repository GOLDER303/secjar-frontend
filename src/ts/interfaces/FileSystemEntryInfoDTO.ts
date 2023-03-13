export default interface FileSystemEntryInfoDTO {
    id: number
    uuid: string
    name: string
    contentType: string
    size: number
    deleteDate: string | null
    children: Array<FileSystemEntryInfoDTO>
    isSharedByLink: boolean
    isFavorite: boolean
}
