export default interface ApiFileResponseDTO {
    id: number,
    uuid: string,
    name: string,
    contentType: string,
    size: number,
    deleteDate: string | null,
    children: [],
    sharedByLink: boolean,
    favourite: boolean
}
