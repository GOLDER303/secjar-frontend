export default interface FileSystemEntryInfoDTO {
    id: number
    uuid: string
    name: string
    contentType: string
    size: number
    deleteDate: string | null
    children: []
    isSharedByLink: boolean
    isFavorite: boolean
}
