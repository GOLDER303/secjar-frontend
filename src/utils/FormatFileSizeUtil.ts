export const formatFileSize = (fileSize: number) => {
    const sizeUnits = ["B", "KiB", "MiB", "GiB", "TiB", "PiB", "EiB"]

    let sizeValue = 0
    let sizeUnit = ""

    if (fileSize != 0) {
        const getBaseLog = (val: number, base: number) => {
            return Math.log(val) / Math.log(base)
        }

        const sizeScale = Math.min(Math.floor(getBaseLog(fileSize, 1024)), 6)
        sizeValue = Math.floor((100 * fileSize) / Math.pow(1024, sizeScale)) / 100
        sizeUnit = sizeUnits[sizeScale]
    }

    return { sizeValue, sizeUnit }
}
