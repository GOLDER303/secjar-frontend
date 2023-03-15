import React, {useEffect} from "react"
import SupportSubmissionList from "../../../components/SupportSubmissionManagement/SupportSubmissionList"
import SupportSubmissionDTO from "../../../ts/interfaces/SupportSubmissionDTO"
import SupportSubmissionAddNotePopup
    from "../../../components/SupportSubmissionManagement/SupportSubmissionAddNotePopup"
import {
    addNoteToSubmission, deleteSubmissionNote, editSubmissionNote,
    getPendingSubmissions,
    getSubmissionNotes
} from "../../../services/SupportSubmissionManagmentService"
import SupportSubmissionNoteDTO from "../../../ts/interfaces/SupportSubmissionNoteDTO";
import SupportNoteList from "../../../components/SupportSubmissionManagement/SupportNoteList";

const SubmissionManagementTab: React.FC = () => {
    const [supportSubmission, setSupportSubmission] = React.useState<SupportSubmissionDTO[]>([])
    const [supportSubmissionNote, setSupportSubmissionNote] = React.useState<SupportSubmissionNoteDTO[]>([])
    const [supportSubmissionTarget, setSupportSubmissionTarget] = React.useState<string | null>(null)
    const [isAddNotePopupVisible, setIsAddNotePopupVisible] = React.useState(false)
    const [isReadNotesSidePanelVisible, setIsReadNotesSidePanelVisible] = React.useState(false)

    useEffect(() => {
        refreshSupportSubmission()
    }, [])

    useEffect(() => {
        refreshSupportSubmissionNote()
    }, [supportSubmissionTarget])

    const closeAddNotePopup = () => {
        setIsAddNotePopupVisible(false)
    }

    const openAddNotePopup = () => {
        setIsAddNotePopupVisible(true)
    }

    const closeReadNotesSidePanel = () => {
        setIsReadNotesSidePanelVisible(false)
    }

    const openReadNotesSidePanel = () => {
        setIsReadNotesSidePanelVisible(true)
    }

    const refreshSupportSubmission = async () => {
        const response = await getPendingSubmissions()
        if (response.data) {
            setSupportSubmission(response.data)
        } else {
            //TODO: handle error
        }
    }

    const refreshSupportSubmissionNote = async () => {
        if (supportSubmissionTarget){
            const response = await getSubmissionNotes(supportSubmissionTarget)
            if (response.data) {
                setSupportSubmissionNote(response.data)
            } else {
                //TODO: handle error
            }
        }
    }

    const handleNoteAdd = async (noteContent: string) => {
        if (supportSubmissionTarget) {
            await addNoteToSubmission(supportSubmissionTarget, noteContent)
            // TODO: handle errors
            await refreshSupportSubmissionNote()
        }
    }

    const handleNoteEdit = async (uuid: string, noteContent: string) => {
        if (supportSubmissionTarget) {
            await editSubmissionNote(uuid, noteContent)
            // TODO: handle errors
            await refreshSupportSubmissionNote()
        }
    }

    const handleNoteDelete = async (uuid: string) => {
        if (supportSubmissionTarget) {
            await deleteSubmissionNote(uuid)
            // TODO: handle errors
            await refreshSupportSubmissionNote()
        }
    }

    return (
        <div className="container">
            <div>
                <h2>Zgłoszenia</h2>
                <SupportSubmissionList
                    supportSubmissionDTO={supportSubmission}
                    openAddNotePopup={openAddNotePopup}
                    openReadNotesSidePanel={openReadNotesSidePanel}
                    setSupportSubmissionTarget={setSupportSubmissionTarget}
                />
                <button
                    onClick={() => {
                        refreshSupportSubmission()
                    }}
                >
                    Odśwież
                </button>
                {isAddNotePopupVisible && (
                    <SupportSubmissionAddNotePopup
                        handleNoteAdd={handleNoteAdd}
                        closePopup={closeAddNotePopup}
                    />
                )}
            </div>
            {isReadNotesSidePanelVisible && (
                <div>
                    <h2>Panel boczny z notatkami</h2>
                    <SupportNoteList
                        supportSubmissionNoteDTO={supportSubmissionNote}
                        handleNoteEdit={handleNoteEdit}
                        handleNoteDelete={handleNoteDelete}
                    />
                    <button
                        onClick={() => {
                            closeReadNotesSidePanel()
                        }}
                    >
                        Zamknij panel
                    </button>
                </div>
            )}
        </div>
    )
}

export default SubmissionManagementTab