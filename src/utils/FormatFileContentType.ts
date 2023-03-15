import Mime from 'mime-types-no-nodejs';

const formatFileContentType = (contentType: string) => {
    let formattedContentType: string

    switch (contentType) {
        case "directory":
            formattedContentType = "directory"
            break
        default:
            formattedContentType = Mime.extension(contentType) || contentType
    }

    const isDirectory = contentType === "directory"

    return {contentType: formattedContentType, isDirectory}
}

export default formatFileContentType