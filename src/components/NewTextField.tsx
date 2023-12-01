import { useState, useRef, useEffect  } from 'react'
import {getIcon} from '../utils/Common'

export enum TextFieldType {
    email = "email",
    password = "password"
}

type TextFieldProps = {
    initialValue?:string
    title: string
    borderColor: string
    type: TextFieldType
    withButton: boolean
    buttonText?: string
    isEditabled?: boolean
}

function NewTextField(props: TextFieldProps) {
    const focusField = useRef<HTMLInputElement>(null)
    const [reqiestFocus, setReqiestFocus] = useState(false)
    const [hidePwd, setHidePwd] = useState(false)
    const {initialValue='', title, borderColor, type, withButton, buttonText='Edit', isEditabled=true} = props
    const [typeState, setTypeState] = useState(type.toString())

    const showInput = () => {
        if(!isEditabled) {
            return <input ref={focusField} type={typeState} readOnly defaultValue={initialValue} className="form-control" id="floatingInput" placeholder="name@example.com" style={{width:"100%", height:"52px", fontSize:"15px"}}/>
        } else {
            return <input ref={focusField} type={typeState} defaultValue={initialValue} className="form-control" id="floatingInput" placeholder="name@example.com" style={{width:"100%", height:"52px", fontSize:"15px"}}
                                onFocus={() => setReqiestFocus(true)} onBlur={() => setReqiestFocus(false)}/>
        }
    }

    const showInputLabel = () => {
        if(isEditabled) {
           return <label className="floatingInput" style={{color:reqiestFocus?"#10A37F":"#6F7780"}}>{title}</label>
        }
    }

    const showButton = () => {
        if(type === TextFieldType.email && withButton){
            return <button type="button" className="btn btn-link text-decoration-none m-0 p-0 px-3" style={{width:"70px", color:"#10A37F"}}>{buttonText}</button>
        } else if (type === TextFieldType.password && withButton) {
            return <button type="button" className="btn btn-light m-0 p-0 px-2 ShowHidePwdButton" style={{width:"44px", height:"52px"}}
                onClick={() => {
                    setHidePwd(!hidePwd)
                    setTypeState(typeState === 'text'?"password":"text")
                    setReqiestFocus(true)
                }}>{buttonText}
                <img src={hidePwd?getIcon('ShowPassword.svg'): getIcon('HidePassword.svg')} alt="" />
            </button>
        }
    }

    useEffect(() => {
        focusField.current?.focus()
    },[])

    return (
        <div className="d-flex flex-row align-items-center" style={{border:reqiestFocus?"1px solid #10A37F":"1px solid #C2C8D0", borderRadius:"0.375rem", width:"100%"}}>
            <div className="form-floating flex-grow-1" style={{'--border-button-default-color': borderColor}}>
                {showInput()}
                {showInputLabel()}
            </div>
            {showButton()}
        </div>
    )
}

export default NewTextField