import React, {useEffect} from "react"
import SupportSubmissionList from "../../../components/SupportSubmissionManagement/SupportSubmissionList"
import SupportSubmissionDTO from "../../../ts/interfaces/SupportSubmissionDTO"
import SupportSubmissionAddNotePopup
    from "../../../components/SupportSubmissionManagement/SupportSubmissionAddNotePopup"
import {addNoteToSubmission, getPendingSubmissions} from "../../../services/SupportSubmissionManagmentService"

const SubmissionManagementTab: React.FC = () => {
    const [supportSubmission, setSupportSubmission] = React.useState<SupportSubmissionDTO[]>([])
    const [supportSubmissionTarget, setSupportSubmissionTarget] = React.useState<string | null>(null)
    const [isAddNotePopupVisible, setIsAddNotePopupVisible] = React.useState(false)
    const [isReadNotesSidePanelVisible, setIsReadNotesSidePanelVisible] = React.useState(false)

    useEffect(() => {
        refreshSupportSubmission()
    }, [])

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

    const handleAddNote = async (noteContent: string) => {
        if (supportSubmissionTarget) {
            await addNoteToSubmission(supportSubmissionTarget, noteContent)
            // TODO: handle errors
            refreshSupportSubmission()
        }
    }

    return (
        <div>
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
                        handleAddNote={handleAddNote}
                        closePopup={closeAddNotePopup}
                    />
                )}
            </div>
            {isReadNotesSidePanelVisible && (
                <div>
                    <h2>Panel z notatkami</h2>
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