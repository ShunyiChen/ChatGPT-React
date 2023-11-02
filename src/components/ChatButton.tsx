import { useState, useEffect, useRef } from "react"
import { getTextWidth } from "../interfaces/Canvas"
import axios from 'axios'
import cookie from 'react-cookies'

interface Props {
    id: string
    text: string
    isChecked: boolean
    isNew: boolean
    clickToCheck: () => void
    clickToDelete: () => void
}

function ChatButton({id, text, isChecked, isNew, clickToCheck, clickToDelete} : Props) {
    const [editOrDelete, setEditOrDelete] = useState("Edit")
    const [startEdit, setStartEdit] = useState(false)
    const [startDelete, setStartDelete] = useState(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const [newButton, setNewButton] = useState(isNew)
    const [btnText, setBtnText] = useState(text)

    useEffect(() => {
        if(!isChecked && startDelete) {
            setStartDelete(false)
        }
    },[isChecked])

    function start_edit() {
        setEditOrDelete("Edit")
        setStartEdit(true)
    }

    function start_delete() {
        setEditOrDelete("Delete")
        setStartDelete(true)
    }

    const ok = () => {
        if(editOrDelete === 'Edit') {
            // console.log('new text:', inputRef.current?.value)
            const newName: string | undefined = inputRef.current?.value
            if(newName && newName.trim().length > 0) {
                renameChat(id, newName)
            }
        } else {
            setStartDelete(false)
            clickToDelete()
        }
    }

    const cancel = () => {
        if(editOrDelete === 'Edit') {
            setStartEdit(false)
        } else {
            setStartDelete(false)
        }
        console.log('Canceled')
    }

    function displayText():string {
        let str = ""
        if (isChecked) {
            if (startDelete) {
                // str = ("Delete \"" + text + "\"?").substring(0, 21)
                str = ("Delete \"" + clipping(btnText, 90) + "\"?")
            } else {
                str = clipping(btnText, 150)//text.substring(0, 21)
            }
        } else {
            if (startDelete) {
                // str = ("Delete \"" + text + "\"?").substring(0, 27)
                str = ("Delete \"" + clipping(btnText, 125) + "\"?")
            } else {
                str = clipping(btnText, 185)//text.substring(0, 27)
            }
        }
        return str
    }

    function clipping(text: string, len: number) {
        let str: string = ""
        for(let i = 0; i < text.length; i++) {
            str += text.charAt(i)
            const fontWidth:number = getTextWidth(str, "14px Segoe UI")
            if(fontWidth > len) {
                return str;
            }
        }
        return str
    }

    const renameChat = async (chatId: string, newName:string) => {
        const data = {
            "chatId": chatId,
            "newName": newName
        }
        const headers = {
          'Content-Type': 'application/json',
          'X-CSRFToken': cookie.load('csrftoken')
        }
        await axios.post('/mychat/rename_chat/', data, {headers:headers}).then(response => {
            const {Status} = response.data
            if(Status === 0) {
                setBtnText(newName)
            }
        }).catch(error => {
            console.error(error)
        })
      }


    return (
        <a className="ChatButtonLink" role="link" >
             <div className={isChecked?"ChatButtonActive":"ChatButton"} onClick={clickToCheck}>
                <i className="fa fa-comment-o" aria-hidden="true"></i>
                <div className={newButton?"text-container":""} style={{WebkitMask: startEdit?"":(getTextWidth(btnText, "14px Segoe UI") >= 150 && isChecked) || (getTextWidth(btnText, "14px Segoe UI") >= 185)?"linear-gradient(to left, rgb(42,43,50,0.1), rgb(42,43,50), 40%, rgb(42,43,50),rgb(42,43,50))":""}}>
                    {startEdit?<input autoFocus ref={inputRef} className="ChatButtonEditing" type="text" defaultValue={btnText} aria-label="default input example" onBlur={()=>setStartEdit(false)} />:displayText()}
                </div>
             </div>
             <div className="ChatButtonToolBar" style={{display:isChecked?"inline":"none"}}>
                <i className="fa fa-pencil-square-o ChatButtonMouseOver" aria-hidden="true" style={{paddingRight: "0.75rem", display: startEdit||startDelete?"none":"inline"}} onClick={start_edit}></i>
                <i className="fa fa-trash-o ChatButtonMouseOver" style={{display: startEdit||startDelete?"none":"inline"}} aria-hidden="true" onClick={start_delete}></i>

                <i className="fa fa-check ChatButtonMouseOver" aria-hidden="true" style={{paddingRight: "0.74rem", display: startEdit||startDelete?"inline":"none"}} onMouseDown={ok}></i>
                <i className="fa fa-times ChatButtonMouseOver" style={{display: startEdit||startDelete?"inline":"none"}} aria-hidden="true" onMouseDown={cancel}></i>
             </div>
        </a>

    )
}

export default ChatButton