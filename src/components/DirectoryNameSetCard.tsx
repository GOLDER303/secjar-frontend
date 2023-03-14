import React, { useState } from "react"
import { createDirectory } from "../services/CreateDirectoryService"

interface DirectoryNameSetCardProps {
    setDirectoryCreateCardVisible: (param: boolean) => void
    fileRefreshFunction: () => void
}

const DirectoryNameSetCard: React.FC<DirectoryNameSetCardProps> = (props) => {
    const [directoryName, setDirectoryName] = useState<string>("")

    const submitDirectoryName = async () => {
        const response = await createDirectory(directoryName)
        //TODO: handle error
        props.fileRefreshFunction()
    }

    return (
        <div>
            <input type="text" onChange={(e) => setDirectoryName(e.target.value)} />
            <button onClick={() => props.setDirectoryCreateCardVisible(false)}>Cancel</button>
            <button onClick={() => submitDirectoryName()}>Apply</button>
        </div>
    )
}

export default DirectoryNameSetCard
