export default interface FileSystemEntryInfo {
    id: number
    uuid: string
    name: string
    contentType: string
    size: number
    deleteDate: string | null
    children: Array<FileSystemEntryInfo>
    isSharedByLink: boolean
    isFavorite: boolean
}
