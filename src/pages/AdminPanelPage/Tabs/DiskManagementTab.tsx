import React, {useEffect} from "react"
import DiskInfo from "../../../components/ DiskManagement/DiskInfo"
import DiskInfoDTO from "../../../ts/interfaces/DiskInfoDTO"
import {editDiskInfo, getDiskInfo} from "../../../services/DiskManagementService"

const DiskManagementTab: React.FC = () => {
    const [diskInfo, setDiskInfo] = React.useState<DiskInfoDTO | null>(null)

    useEffect(() => {
        refreshDiskInfo()
    }, [])


    const refreshDiskInfo = async () => {
        const response = await getDiskInfo()
        if (response.data) {
            setDiskInfo(response.data)
        } else {
            //TODO: handle error
        }
    }

    const handleMaxUserSessionTimeEdit = async (value: number) => {
        if (diskInfo){
            const updatedDiskInfo = {
                maxUserSessionTime: value,
                disallowedMimeTypes: diskInfo.disallowedMimeTypes,
            } as DiskInfoDTO
            await editDiskInfo(updatedDiskInfo)
            // TODO: handle errors
            refreshDiskInfo()
        }
    }

    const handleMimeTypeAdd = async (typeName: string) => {
        if (diskInfo){
            if (diskInfo.disallowedMimeTypes.findIndex((value) => value == typeName) == -1){
                const updatedMimeTypes = diskInfo.disallowedMimeTypes.concat(typeName)
                const updatedDiskInfo = {
                    maxUserSessionTime: diskInfo.maxUserSessionTime,
                    disallowedMimeTypes: updatedMimeTypes,
                } as DiskInfoDTO
                await editDiskInfo(updatedDiskInfo)
                // TODO: handle errors
                refreshDiskInfo()
            }
        }
    }

    const handleMimeTypeDelete = async (typeName: string) => {
        if (diskInfo){
            const updatedMimeTypes = diskInfo.disallowedMimeTypes.filter((value) => {
                return value != typeName
            })
            const updatedDiskInfo = {
                maxUserSessionTime: diskInfo.maxUserSessionTime,
                disallowedMimeTypes: updatedMimeTypes,
            } as DiskInfoDTO
            await editDiskInfo(updatedDiskInfo)
            // TODO: handle errors
            refreshDiskInfo()
        }
    }

    return (
        <div>
            <h2>Dysk</h2>
            <DiskInfo
                diskInfoDTO={diskInfo}
                handleMimeTypeAdd={handleMimeTypeAdd}
                handleMaxUserSessionTimeEdit={handleMaxUserSessionTimeEdit}
                handleMimeTypeDelete={handleMimeTypeDelete}
            />
        </div>
    )
}

export default DiskManagementTab