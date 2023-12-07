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
    labelColor?: string
    type: TextFieldType
    withButton: boolean
    buttonText?: string
    buttonAction?: () => void
    isEditabled?: boolean
    handleChange?: (text: string) => void
}

function NewTextField(props: TextFieldProps) {
    const focusField = useRef<HTMLInputElement>(null)
    const [requestFocus, setRequestFocus] = useState(false)
    const [hidePwd, setHidePwd] = useState(false)
    const {initialValue='', title, borderColor, labelColor='#6F7780', type, withButton, buttonText='Edit', buttonAction, isEditabled=true, handleChange} = props
    const [typeState, setTypeState] = useState(type.toString())
    const border = "1px solid "+borderColor
    const focusRequestBorder = "1px solid "+(borderColor === '#D00E17'?'#D00E17':'#10A37F')
    const focusRequestLabelColor = borderColor === '#D00E17'?'#D00E17':'#10A37F'

    const handleInput = (e:any) => {
        if(handleChange) {
            handleChange(e.target.value)
        }
    }

    const showInput = () => {
        if(!isEditabled) {
            return <input ref={focusField} type={typeState} readOnly defaultValue={initialValue} className="form-control" id="floatingInput1" placeholder="name@example.com" style={{width:"100%", height:"52px", fontSize:"15px"}}/>
        } else {
            return <input ref={focusField} type={typeState} defaultValue={initialValue} className="form-control" id="floatingInput2" placeholder="name@example.com" style={{width:"100%", height:"52px", fontSize:"15px"}}
                                onFocus={() => setRequestFocus(true)} onBlur={() => setRequestFocus(false)} onChange={handleInput} required/>
        }
    }

    const showInputLabel = () => {
        if(isEditabled) {
           return <label className="floatingInput" style={{color:requestFocus?focusRequestLabelColor:labelColor}}>{title}</label>
        }
    }

    const showButton = () => {
        if(type === TextFieldType.email && withButton){
            return <button type="button" className="btn btn-link text-decoration-none m-0 p-0 px-3" style={{width:"70px", color:"#10A37F"}} onClick={buttonAction}>{buttonText}</button>
        } else if (type === TextFieldType.password && withButton) {
            return <button type="button" className="btn btn-light m-0 p-0 px-2 ShowHidePwdButton" style={{width:"44px", height:"52px"}}
                onClick={() => {
                    setHidePwd(!hidePwd)
                    setTypeState(typeState === 'text'?"password":"text")
                    setRequestFocus(true)
                }}>{buttonText}
                <img src={hidePwd?getIcon('ShowPassword.svg'): getIcon('HidePassword.svg')} alt="" />
            </button>
        }
    }

    useEffect(() => {
        focusField.current?.focus()
    },[])

    return (
        <div className="d-flex flex-row align-items-center" style={{border:requestFocus?focusRequestBorder: border, borderRadius:"0.375rem", width:"100%"}}>
            <div className="form-floating flex-grow-1">
                {showInput()}
                {showInputLabel()}
            </div>
            {showButton()}
        </div>
    )
}

export default NewTextField