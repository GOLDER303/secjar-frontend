import { useEffect, useState } from "react"

interface DoubleClickEditTextProps {
    value: string
    onBlurCallback: (inputValue: string) => void
}

const DoubleClickEditText: React.FC<DoubleClickEditTextProps> = ({ value, onBlurCallback }) => {
    const [showInputElement, setShowInputElement] = useState(false)
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        setInputValue(value)
    }, [])

    const handleTextDoubleClick = () => {
        setShowInputElement(true)
    }

    const handleOnBlur = () => {
        setInputValue((inputValue) => inputValue.trim())
        onBlurCallback(inputValue.trim())
        setShowInputElement(false)
    }

    return (
        <span>
            {showInputElement ? (
                <input
                    type="text"
                    value={inputValue}
                    onBlur={handleOnBlur}
                    onChange={(event) => setInputValue(event.target.value)}
                    autoFocus
                />
            ) : (
                <span onDoubleClick={handleTextDoubleClick}>{inputValue}</span>
            )}
        </span>
    )
}

export default DoubleClickEditText
