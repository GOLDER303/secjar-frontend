import React, {useEffect} from "react"
import SupportSubmissionList from "../../../components/SupportSubmissionManagement/SupportSubmissionList"
import SupportSubmissionDTO from "../../../ts/interfaces/SupportSubmissionDTO"
import SupportSubmissionAddNotePopup
    from "../../../components/SupportSubmissionManagement/SupportSubmissionAddNotePopup"
import {
    addNoteToSubmission, closeSubmission, deleteSubmissionNote, editSubmissionNote,
    getPendingSubmissions,
    getSubmissionNotes
} from "../../../services/SupportSubmissionManagmentService"
import SupportSubmissionNoteDTO from "../../../ts/interfaces/SupportSubmissionNoteDTO"
import SupportNoteList from "../../../components/SupportSubmissionManagement/SupportNoteList"
import "../../../css/SupportSubmission.css"

const SubmissionManagementTab: React.FC = () => {
    const [supportSubmission, setSupportSubmission] = React.useState<SupportSubmissionDTO[]>([])
    const [supportSubmissionNote, setSupportSubmissionNote] = React.useState<SupportSubmissionNoteDTO[]>([])
    const [supportSubmissionTarget, setSupportSubmissionTarget] = React.useState<string | null>(null)
    const [isAddNotePopupVisible, setIsAddNotePopupVisible] = React.useState(false)
    const [isReadNotesSidePanelVisible, setIsReadNotesSidePanelVisible] = React.useState(false)
    const [statusMessage, setStatusMessage] = React.useState("")

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
            setStatusMessage("Wystąpił nieoczekiwany błąd")
        }
    }

    const refreshSupportSubmissionNote = async () => {
        if (supportSubmissionTarget){
            const response = await getSubmissionNotes(supportSubmissionTarget)
            if (response.data) {
                setSupportSubmissionNote(response.data)
            } else {
                setStatusMessage("Wystąpił nieoczekiwany błąd")
            }
        }
    }

    const handleSubmissionClose = async () => {
        if (supportSubmissionTarget) {
            const respond = await closeSubmission(supportSubmissionTarget)
            setStatusMessage("")
            if (respond.error){
                setStatusMessage("Wystąpił nieoczekiwany błąd")
            }
            await refreshSupportSubmission()
        }
    }

    const handleNoteAdd = async (noteContent: string) => {
        if (supportSubmissionTarget) {
            if (noteContent == ""){
                setStatusMessage("Pole nie może być puste")
                return
            }
            const respond = await addNoteToSubmission(supportSubmissionTarget, noteContent)
            setStatusMessage("")
            if (respond.error){
                setStatusMessage("Wystąpił nieoczekiwany błąd")
            }
            await refreshSupportSubmissionNote()
        }
    }

    const handleNoteEdit = async (uuid: string, noteContent: string) => {
        if (supportSubmissionTarget) {
            if (noteContent == ""){
                await handleNoteDelete(uuid);
            }else {
                const respond = await editSubmissionNote(uuid, noteContent)
                if (respond.error) {
                    setStatusMessage("Wystąpił nieoczekiwany błąd")
                }
            }
            await refreshSupportSubmissionNote()
        }
    }

    const handleNoteDelete = async (uuid: string) => {
        if (supportSubmissionTarget) {
            const respond = await deleteSubmissionNote(uuid)
            setStatusMessage("")
            if (respond.error) {
                setStatusMessage("Wystąpił nieoczekiwany błąd")
            }
            await refreshSupportSubmissionNote()
        }
    }

    return (
        <div className="aside">
            <div>
                <h2>Zgłoszenia</h2>
                <SupportSubmissionList
                    supportSubmissionDTO={supportSubmission}
                    openAddNotePopup={openAddNotePopup}
                    openReadNotesSidePanel={openReadNotesSidePanel}
                    setSupportSubmissionTarget={setSupportSubmissionTarget}
                    handleSubmissionClose={handleSubmissionClose}
                />
                {supportSubmission.length == 0 &&
                    <div>
                        Brak zgłoszeń.
                    </div>
                }
                <button
                    onClick={() => {
                        refreshSupportSubmission()
                    }}
                >
                    Odśwież
                </button>
                <div className="error">{statusMessage}</div>
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