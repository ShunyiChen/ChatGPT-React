import { useState } from "react"

interface Props {
    text: string
    icon: string
    isOperable: boolean
    question?: string
    accept: () => void
}

function SystemButton({text, icon, isOperable, question, accept}:Props) {

    const [confirm, setConfirm] = useState(false)

    const canceled = () => {
        setConfirm(!confirm)
    }

    const accepted = () => {
        setConfirm(!confirm)
        accept()
    }

    const clickHandle = () => {
        if(isOperable) {
            setConfirm(!confirm)
        }
        else {
            accept()
        }
    }

    function substrText(text?: string): string {
        if (!text) {
            return '';
        }
         const length = text.length;
        return length > 21 ? text.substring(0, 21) : text;
    }

    return (
        <a className="SystemButtonLink" role="link" onClick={clickHandle}>
            <div className="SystemButton">
                <div style={{WebkitMask: confirm?"linear-gradient(to left, rgb(42,43,50,0.1), rgb(42,43,50), 40%, rgb(42,43,50),rgb(42,43,50))":"", display:"flex", gap:"0.75rem", alignItems:"center"}}>
                    <i className={icon} aria-hidden="true"></i>{confirm?substrText(question):text}
                </div>
            </div>

            <div className="ChatButtonToolBar" style={{display:confirm?"inline":"none"}}>
                <i className="fa fa-check ChatButtonMouseOver" aria-hidden="true" style={{paddingRight: "0.74rem", display: confirm?"inline":"none"}} onClick={accepted}></i>
                <i className="fa fa-times ChatButtonMouseOver" style={{display: confirm?"inline":"none"}} aria-hidden="true" onClick={canceled}></i>
             </div>
        </a>
        
    )
}

export default SystemButton