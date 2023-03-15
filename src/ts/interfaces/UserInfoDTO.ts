export default interface UserInfoDTO {
    uuid: string
    username: string
    name: string
    surname: string
    email: string
    isVerified: boolean
    mfaType: string
    fileDeletionDelay: number
    currentDiscSpace: number
    allowedDiscSpace: number
    fileSystemEntriesNumber: number
    roles: Array<string>
}
