export default interface UserInfoDTO {
    username: string
    email: string
    isVerified: boolean
    mfaType: string
    fileDeletionDelay: number
    currentDiscSpace: number
    allowedDiscSpace: number
    fileSystemEntriesNumber: number
    roles: Array<string>
}
