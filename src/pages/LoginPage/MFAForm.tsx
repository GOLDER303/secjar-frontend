import React from "react"

interface MFAFormProps {
    handleMFASubmit: (mfaToken: string) => void
}

const MFAForm: React.FC<MFAFormProps> = ({ handleMFASubmit }) => {
    const mfaTokenInputRef = React.useRef<HTMLInputElement>(null)

    const handleSubmit = () => {
        if (!mfaTokenInputRef.current) {
            return
        }
        handleMFASubmit(mfaTokenInputRef.current.value)
    }

    return (
        <form
            onSubmit={(event) => {
                event.preventDefault()
                handleSubmit()
            }}
        >
            <div className="inputBox">
                <input placeholder=" "  ref={mfaTokenInputRef} type="string" name="mfa" id="mfa" />
                <label htmlFor="password">Token MFA: </label>
            </div>
            <div className="buttons">
                <input type="submit" value="Zaloguj się" />
            </div>
        </form>
    )
}

export default MFAForm
