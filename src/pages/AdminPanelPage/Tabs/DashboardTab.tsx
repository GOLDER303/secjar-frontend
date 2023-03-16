import React, {useEffect} from "react"
import {getAllUserInfo} from "../../../services/UserManagementService"
import {formatFileSize} from "../../../utils/FormatFileSizeUtil"

const DashboardTab: React.FC = () => {
    const [userNumber, setUserNumber] = React.useState<number | null>(null)
    const [userAllocatedDiskSpace, setAllocatedDiskSpace] = React.useState<number | null>(null)
    const [userFileNumber, setFileNumber] = React.useState<number | null>(null)
    const { sizeValue: allocatedDickSpaceValue, sizeUnit: allocatedDickSpaceUnit } = formatFileSize(userAllocatedDiskSpace || 0)
    const { sizeValue: meanAllocatedDickSpaceValue, sizeUnit: meanAllocatedDickSpaceUnit } = formatFileSize(userAllocatedDiskSpace && userNumber && userAllocatedDiskSpace/userNumber || 0)

    useEffect(() => {
        getUserNumber()
        getAllocatedDiskSpace()
        getFileNumber()
    }, [])

    const getUserNumber = async () => {
        const response = await getAllUserInfo()
        if (response.data){
            setUserNumber(response.data.length)
        }
    }

    const getAllocatedDiskSpace = async () => {
        const response = await getAllUserInfo()
        if (response.data){
            setAllocatedDiskSpace(
                response.data.reduce((accumulator, value) => {
                    return accumulator + value.currentDiscSpace
                }, 0)
            )
        }
    }

    const getFileNumber = async () => {
        const response = await getAllUserInfo()
        if (response.data){
            setFileNumber(
                response.data.reduce((accumulator, value) => {
                    return accumulator + value.fileSystemEntriesNumber
                }, 0)
            )
        }
    }

    return (
        <div>
            Statystyki:
            <ul>
                <li>Ilość użytkowników: {userNumber}</li>
                <li>Łączna ilość zajętego miejsca: {allocatedDickSpaceValue} {allocatedDickSpaceUnit}</li>
                <li>Średnia ilość zajętego miejsca na użytkownika: {meanAllocatedDickSpaceValue} {meanAllocatedDickSpaceUnit}</li>
                <li>Łączna ilość przechowywanych plików: {userFileNumber}</li>
                <li>Średnia ilość przechowywanych plików na użytkownika: {userFileNumber && userNumber && userFileNumber/userNumber}</li>
            </ul>
        </div>
    )
}

export default DashboardTab