export default interface UserPatchRequestDTO {
    uuid: string
    fileDeletionDelay?: number
    desiredSessionTime?: number
    allowedDiskSpace?: number
}
