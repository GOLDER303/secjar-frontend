export default interface SupportSubmissionDTO {
    id: number
    uuid: string
    name: string
    surname: string
    email: string
    message: string
    notes: Array<SupportSubmissionDTO>
    state: string
}