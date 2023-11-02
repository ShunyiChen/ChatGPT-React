import { useCallback, useRef, useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { QuickText } from "../interfaces/QuickText";
import { Send } from "../interfaces/Send";
import { Modal } from "bootstrap";
import { getTextWidth } from "../interfaces/Canvas";
import pubsub from 'pubsub-js'

export default forwardRef<QuickText,Send>(function FootPanel(props, ref) {
    const textareaRows: number = 1;
    const focusField = useRef<HTMLTextAreaElement>(null)
    const [textAreaValue, setTextAreaValue] = useState("");
    const [textAreaHeight, setTextAreaHeight] = useState("24px")
    const [done, setDone] = useState(true)
    const {send, openSavingKeyModal, openAboutModal, regenerateResponse} = props as Send
    const [showRegenerateButton, setShowRegenerateButton] = useState(false)

    useEffect(() => {
        focusField.current?.focus()
    },[])

    useImperativeHandle(ref, function() {
        return {
          getQuickText(text:string) {
            resetTextArea()
            setTextAreaValue(text)
            setShowRegenerateButton(false)
            focusField.current?.focus()
          },
          doneSent() {
            setDone(true)
            setShowRegenerateButton(true)
          },
          showRegenerateButton() {
            setShowRegenerateButton(true)
          }
        }
    }, [])

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setTextAreaValue(e.target.value)
        const totalWidth:number = getTextWidth(e.target.value, "16px Segoe UI")
        let lines:number = Math.ceil(totalWidth / e.target.clientWidth)
        if(lines === 0) {
            lines = 1
        }
        setTextAreaHeight((lines * 24)+"px")
        // setTextAreaHeight((e.target.scrollHeight)+"px")
    }

    function resetTextArea() {
        setTextAreaValue("");
        setTextAreaHeight("auto")
    }

    const onCallback = () => {
        setDone(true)
    }

    const sendMessage = () => {
        if(textAreaValue.trim().length > 0) {
            setDone(false)
            send?.(textAreaValue, onCallback)
            resetTextArea()
        }
    }

    const handleKeyPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if(done) {
                sendMessage()
            }
        }
    }

    const handleClick = () => {
        setShowRegenerateButton(false)
        regenerateResponse && regenerateResponse()
    }

    return (
        <div className="FootPanel vstack gap-2">

            <div className="container text-center">
                 <div className='vstack gap-2' style={{justifyContent: "center", alignItems: "center"}}>
                    
                    <button type="button" className="btn RegenerateResButton" style={{display:showRegenerateButton?"inline":"none"}} onClick={(e) => handleClick()}>
                        &nbsp;<i className="fa fa-refresh"></i>&nbsp;&nbsp;Regenerate response
                    </button>

                    <div className="row align-items-end SendMessageBox">
                        <textarea ref={focusField} value={textAreaValue} maxLength={1000} className="sendTextArea" rows={textareaRows} placeholder="Send a message..." onChange={handleInput} onKeyDown={handleKeyPress}
                            style={{whiteSpace: "pre-wrap", padding:"0", margin:"0",borderWidth:"0",resize:"none",width:"calc(100% - 40px)", height:textAreaHeight, maxHeight: "200px",overflowY:"hidden"}}></textarea>
                        
                        <button type="button" className={textAreaValue?"btn sendButtonHighlight":"btn sendButton"} style={{display:done?"flex":"none"}} onClick={sendMessage}>
                            <i className="fa fa-paper-plane-o" aria-hidden="true"></i>
                        </button>
                        {/* 滚动等待 */}
                        <div style={{display:done?"none":"flex", width:"26px", padding:"0px"}} >
                            <span className="dot-content"></span>
                        </div>

                    </div>
                </div>
            </div>
            <div className="col align-items-start container text-center" style={{ paddingBottom:"1rem"}}>
                <span style={{color: "rgb(154,155,160)", fontSize: ".75rem", padding: "0"}}>
                    <a href="https://help.openai.com/en/articles/6825453-chatgpt-release-notes" target="_blank" style={{textDecoration:"underline", color: "rgb(154,155,160)"}}>ChatGPT Mar 23 Version</a>. Free Research Preview. ChatGPT may produce inaccurate information about people, places, or facts
                </span>
                <span style={{color: "rgb(154,155,160)", fontSize: ".75rem", padding: "0"}}>
                    <button type="button" className="btn btn-link btn-link-light link-secondary BottomButton" onClick={openSavingKeyModal}>
                        🚀 我有OPENAI_API_KEY,我想独享ChatGPT服务
                    </button>
                    <button type="button" className="btn btn-link btn-link-light link-secondary BottomButton" onClick={openAboutModal}>
                        🚀 关于
                    </button>
                </span>
            </div>
           
        </div>
    )   
})