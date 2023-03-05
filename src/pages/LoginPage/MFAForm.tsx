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
            <div>
                <label htmlFor="password">Token MFA: </label>
                <input ref={mfaTokenInputRef} type="string" name="mfa" id="mfa" />
            </div>
            <button type="submit">Zaloguj się</button>
        </form>
    )
}

export default MFAForm
