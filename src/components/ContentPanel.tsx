import MessageItem from './MessageItem'
import FootPanel from './FootPanel'
import { useRef, useEffect, useState, forwardRef, useImperativeHandle, useCallback } from 'react'
import { Chat, ChatButtonClass, SystemButtonClass } from '../interfaces/Chat'
import { Creative } from '../interfaces/Creative'
import { MessageData } from '../interfaces/Message'
import { QuickText } from '../interfaces/QuickText'
import { Send } from '../interfaces/Send'
import axios from 'axios'
import cookie from 'react-cookies'
import { v4 as uuidv4 } from 'uuid'
import { getCurrentChatId, getLastMessageId, setLastMessageId } from '../App'
import { Modal } from 'bootstrap'
import { Base64 } from 'js-base64';

let savingKeyModal: Modal
let aboutModal: Modal
const errMsg: string = 'An error occurred. Either the engine you requested does not exist or there was another issue processing your request. If this issue persists please contact us through our help center at help.openai.com.'
let sortedMessageData: MessageData[] = []



export default forwardRef<Chat, Creative>(function ContentPanel(props, ref) {

    // Create a ref for the switch button element
    const mySwitchRef = useRef<HTMLInputElement | null>(null);
    const [darkMode, setDarkMode] = useState(false)

    const rawData: MessageData[] = []
    const [data, setData] = useState<MessageData[]>(rawData)
    const [lightMode, setLightMode] = useState(true)
    const elementRef = useRef<QuickText & Send>(null)
    const [newChat, setNewChat] = useState(true)
    const scrollDivRef = useRef<HTMLDivElement>(null)
    const { createChat } = props as Creative
    const sysBtns = [] as SystemButtonClass[]
    const focusField = useRef<HTMLInputElement>(null)
    const [key, setKey] = useState("")
    const [showError, setShowError] = useState(false)
    const [submitDisabled, setSubmitDisabled] = useState(false)
    const [restoreDisabled, setRestoreDisabled] = useState(false)
    const [version, setVersion] = useState("")
    const [copyContact, setCopyContact] = useState(false)
    let linkedMessageData: MessageData[] = []
    // Get the theme CSS file element
    let themeLink = document.getElementById('themeLink') as HTMLLinkElement

    useEffect(() => {
        // Works!
        window.addEventListener('resize', scrollToBottom)
        return () => {
            window.removeEventListener('resize', scrollToBottom)
        }
    }, [])

    useEffect(() => {
        // Attach click event listener to the switch button
        mySwitchRef.current?.addEventListener("click", handleSwitchClick)

        // Cleanup the event listener on unmount
        return () => {
            mySwitchRef.current?.removeEventListener("click", handleSwitchClick)
        };

    }, [])

    useEffect(() => {
        changeTheme(localStorage.getItem('theme') || 'light')
    }, [])

    // Memoize the event handler function
    const handleSwitchClick = useCallback(() => {
        // Get the current state of the switch button
        const isChecked = mySwitchRef.current?.checked;

        // Perform action based on the current state
        if (isChecked) {
            // Do something when switch is on
            changeTheme('dark')
            localStorage.setItem("theme", 'dark')
        } else {
            // Do something when switch is off
            changeTheme('light')
            localStorage.setItem("theme", 'light')
        }
    }, [])

    function changeTheme(themeName: string) {
        if ("light" === themeName) {
            themeLink.href = "./bootstrap-light.css"
            setLightMode(true)
            setDarkMode(false);
        } else {
            themeLink.href = "./bootstrap-dark.css"
            setLightMode(false)
            setDarkMode(true);
        }
        // Add the CSS class for the transition effect
        themeLink.classList.add('theme-transition')

        // Wait for the transition to complete, then remove the CSS class
        setTimeout(function () {
            themeLink.classList.remove('theme-transition')
        }, 3300); // Adjust the duration of the transition to match the CSS transition duration
    }

    const scrollToBottom = () => {
        setTimeout(() => {
            //平滑滚动到最底下
            if (scrollDivRef.current) {
                scrollDivRef.current.scrollTop = scrollDivRef.current.scrollHeight
            }
        }, 1)
    }

    const fetchSettingsInfo = async () => {
        const param = {
        }
        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookie.load('csrftoken')
        }

        await axios.post('/mychat/get_settings/', param, { headers: headers }).then(response => {
            const { version } = response.data['Output']
            setVersion(version)
        }).catch(error => {
            console.error(error)
        })
    }

    // 切换页面
    const turnPage = (msg: MessageData) => {
        linkedMessageData.unshift(msg)
        upward(msg)
    }

    // 向上查找
    const upward = (msg: MessageData) => {
        sortedMessageData.forEach(e => {
            if(msg.pid === e.message_id) {
                linkedMessageData.unshift(e)
                upward(e)
            }
        })
    }

    const fetchUserInfo = async () => {
        const param = {
        }
        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookie.load('csrftoken')
        }
        await axios.post('/mychat/get_user_info/', param, { headers: headers }).then(response => {
            const { my_apikey } = response.data['Output']
            setKey(b64decode(my_apikey))
        }).catch(error => {
            console.error(error)
        })
    }

    const fetchCurrentChatHistory = async () => {
        const param = {
            "chatId": getCurrentChatId()
        }
        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookie.load('csrftoken')
        }
        await axios.post('/mychat/chat_history/', param, { headers: headers }).then(response => {
            
            // 清空数组
            linkedMessageData = []
            sortedMessageData = response.data['Output']
            sortedMessageData.forEach(item => {
                item.isChatGPT = item.role === 'assistant'
                item.isNew = false
                item.startTyping = false
            })
            
            if(sortedMessageData && sortedMessageData.length > 0) {
                //取数组最后一个元素
                const lastOne = sortedMessageData.at(-1) as MessageData
                turnPage(lastOne)
                console.log("=======\n", linkedMessageData)
            }

            // setData(sortedMessageData)
            setData(linkedMessageData)
            scrollToBottom()

            const obj = linkedMessageData.at(-1) as MessageData
            setLastMessageId(getCurrentChatId(), obj.message_id ?? "")
            console.log("newMessageId = ",obj.message_id)

        }).catch(error => {
            console.error(error)
        })
    }

    const post = async (message: string, pid: string) => {
        const param = {
            newChat: newChat,
            chatId: getCurrentChatId(),
            id: uuidv4(),  //User发的messageID
            pid: pid,
            // pid: getLastMessageId(getCurrentChatId()) ?? "",
            content: message //User发的message内容
        }
        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookie.load('csrftoken')
        }

        //等待AI返回占位
        setData(prevData => [...prevData, { isChatGPT: true, role: "assistant", content: "|", isNew: true, startTyping: true, page:1, page_total:1 }])
        scrollToBottom()

        await axios.post('/mychat/post/', param, { headers: headers }).then(response => {
            //删除AI占位行
            setData(current => current.filter(item => item.content !== "|"))
            setTimeout(() => {
                const obj: MessageData = response.data['Output']
                obj.isChatGPT = true
                obj.isNew = true
                obj.startTyping = true
                obj.page = 1
                obj.page_total = 1
                setData(prevData => [...prevData, obj])
                // setData(linkedMessageData)
                scrollToBottom()
                setLastMessageId(getCurrentChatId(), obj.message_id ?? "")
                console.log("newMessageId = ",obj.message_id)

            }, 100)

        }).catch(error => {
            console.error(error)
        })
    }

    const pushMessage = (message: string) => {
        if (newChat) {
            createChat(uuidv4(), message)
        }
        //添加用户自己发的消息
        setData(prevData => [...prevData, { isChatGPT: false, role: 'user', content: message, isNew: true, startTyping: false, page:1, page_total:1}]);
        post(message, getLastMessageId(getCurrentChatId()))
    }


    const resend = async(message: string, pid: string) => {
        console.log("resend=",message, "pid=",pid)
        const param = {
            newChat: newChat,
            chatId: getCurrentChatId(),
            id: uuidv4(), //User发的messageID
            pid: pid, 
            content: message //User发的message内容
        }
        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookie.load('csrftoken')
        }

        // //等待AI返回占位
        // setData(prevData => [...prevData, { isChatGPT: true, role: "assistant", content: "|", isNew: true, startTyping: true, page:1, page_total:1 }])
        // scrollToBottom()

        await axios.post('/mychat/post/', param, { headers: headers }).then(response => {

            //删除AI占位行
            setData(current => current.filter(item => item.content !== "|"))
            setTimeout(() => {
                const obj: MessageData = response.data['Output']
                obj.isChatGPT = true
                obj.isNew = true
                obj.startTyping = true
                obj.page = 1
                obj.page_total = 1
                // setData(prevData => [...prevData, obj])
                // // setData(linkedMessageData)
                // scrollToBottom()
                // setLastMessageId(getCurrentChatId(), obj.message_id ?? "")
                // console.log("newMessageId = ",obj.message_id)
                // fetchCurrentChatHistory()
            }, 100)

           
        }).catch(error => {
            console.error(error)
        })
    }


    const regenerateResponse = async () => {
        const param = {
            "chatId": getCurrentChatId()
        }
        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookie.load('csrftoken')
        }

        //等待AI返回占位
        setData(prevData => [...prevData, { isChatGPT: true, role: "assistant", content: "|", isNew: true, startTyping: true }])
        scrollToBottom()

        await axios.post('/mychat/regenerate_response/', param, { headers: headers }).then(response => {
            //删除AI占位行
            setData(current => current.filter(item => item.content !== "|"))

            setTimeout(() => {
                const obj: MessageData = response.data['Output']
                obj.isChatGPT = true
                obj.isNew = true
                obj.startTyping = true
                setData(prevData => [...prevData, obj])
                scrollToBottom()
                console.log("---done---")
            }, 100)


        }).catch(error => {
            console.error(error)
        })
    }

    const openAboutModal = () => {
        aboutModal = new Modal('#aboutModal', {
            keyboard: false
        })
        aboutModal.show()
        fetchSettingsInfo()
    }

    const requestFieldFocus = () => {
        setTimeout(() => {
            focusField.current?.focus()
        }, 200)
    }

    const openSavingKeyModal = () => {
        savingKeyModal = new Modal('#saveKeyModal', {
            keyboard: false
        })
        savingKeyModal.show()
        fetchUserInfo()
        requestFieldFocus()
    }

    const closeSavingKeyModal = () => {
        setShowError(false)
        savingKeyModal.hide()
    }

    const saveAPIKey = async (key: string) => {
        //测试
        const param = {
            "apiKey": key
        }
        const headers = {
            'Content-Type': 'application/json',
            'X-CSRFToken': cookie.load('csrftoken')
        }
        setShowError(false)
        await axios.post('/mychat/save_my_apikey/', param, { headers: headers }).then(response => {
            const status: number = response.data['Status']
            setSubmitDisabled(false)
            setRestoreDisabled(false)
            setKey("")
            if (status === 0) {
                closeSavingKeyModal()
            } else {
                setShowError(true)
            }
        }).catch(error => {
            console.error(error)
        })
    }

    const restoreFactoryKey = async () => {
        setRestoreDisabled(true)
        saveAPIKey("")
    }

    const submitMyKey = async () => {
        if (key.trim() === "") {
            setShowError(true)
        } else {
            setSubmitDisabled(true)
            saveAPIKey(b64encode(key))
        }
    }

    function b64encode(plaintext: string) {
        return Base64.encode(plaintext);
    }

    function b64decode(ciphertext: string) {
        return Base64.decode(ciphertext);
    }

    const copyContactInfo = () => {
        navigator.clipboard.writeText("🎃Shunyi Chen\n🍒526637060@qq.com 🍓+8615841124001")
        setCopyContact(true)
        setTimeout(() => {
            setCopyContact(false)
        }, 500)
    }

    useImperativeHandle(ref, function () {
        return {
            loadChatHistory() {
                setData([])
                setNewChat(false)
                fetchCurrentChatHistory()
                elementRef.current?.showRegenerateButton && elementRef.current?.showRegenerateButton()
            },
            setLightMode(light: boolean) {
                setLightMode(light)
            },
            newChat() {
                setData([])
                setNewChat(true)
                elementRef.current?.getQuickText("")
                console.log('newChat')
            },
            cleanUp() {
                setData([])
                setNewChat(false)
                console.log('cleanUp')
            },
            alert(text: string) {
            },
            setChatButtons(chatBtns: ChatButtonClass[]) {
            },
            sysBtns,
            checksIfNoneIsChecked(): boolean {
                return false
            },
            isButtonChecked(index: number): boolean {
                return false
            },
            checkButton(index: number, id: string, text: string): boolean {
                return false;
            },
            getChatId() {
            },
            fetchChatList() {
            },
            deleteChat(chatId: string) {
            },
            getChatButtons(): ChatButtonClass[] {
                return []
            }
        }
    }, [])

    return (
        <div ref={scrollDivRef} className='ContentPanel scrollbar2 scrollbar-primary'>
            {/* 聊天列表页面 */}
            <div role="group" aria-label="Vertical button group" style={{ width: "inherit", display: newChat ? "none" : "flex", flexDirection: "column" }}>
                {
                    data.map((msg, i) => (
                        <MessageItem
                            key={i}
                            page={msg.page}
                            page_total = {msg.page_total}
                            message_id= {msg.message_id}
                            pid = {msg.pid}
                            isChatGPT={msg.isChatGPT}
                            role={msg.role}
                            content={msg.content === "" ? errMsg : msg.content}
                            isNew={msg.isNew}
                            startTyping={msg.startTyping}
                            doneSent={() => elementRef.current?.doneSent?.()}
                            scrollToBottom={scrollToBottom}
                            turnPage={turnPage}
                            resend={resend}
                        />
                    ))
                }
                <div style={{ backgroundColor: lightMode ? "rgb(255,255,255)" : "rgb(53,54,65)", height: "12rem" }}></div>
            </div>

            {/* 欢迎页面 */}
            <div className="Content" style={{ display: newChat ? "flex" : "none", position: "relative" }}>
                <div style={{ width: "798px", height: "calc(100% - 12rem)", position: "absolute", top: "0", left: "0", right: "0", margin: "auto", paddingLeft: "1.5rem", paddingRight: "1.5rem" }}>
                    <div className='container text-center'>
                        <div className="row justify-content-md-center">
                            <h1 className='ContentPanelH1'>ChatGPT</h1>
                        </div>
                    </div>
                    <div className='container text-center'>

                        <div className='row align-items-start' >
                            {/* Examples */}
                            <div className="col" style={{ display: "grid", "gridRowGap": "0.875rem", padding: "0" }}>
                                <div className='ContentPanelH2'>
                                    <i className="fa fa-snowflake-o" aria-hidden="true"></i>
                                    Examples
                                </div>
                                <ul className="list-group" style={{ display: "grid", "gridRowGap": "0.875rem" }}>
                                    <button type="button" className="btn ContentButton" onClick={(e) => elementRef.current?.getQuickText('Explain quantum computing in simple terms')}>"Explain quantum computing in simple terms" →</button>
                                    <button type="button" className="btn ContentButton" onClick={(e) => elementRef.current?.getQuickText('Got any creative ideas for a 10 year old\'s birthday?')}>"Got any creative ideas for a 10 year old's birthday?" →</button>
                                    <button type="button" className="btn ContentButton" onClick={(e) => elementRef.current?.getQuickText('How do I make an HTTP request in Javascript?')}>"How do I make an HTTP request in Javascript?" →</button>
                                </ul>
                            </div>
                            {/* Capabilities */}
                            <div className="col" style={{ display: "grid", "gridRowGap": "0.875rem" }}>
                                <div className='ContentPanelH2' style={{ "gridRowGap": "0.70rem" }}>
                                    <i className="fa fa-bolt" aria-hidden="true" style={{ marginBottom: "-3px" }}></i>
                                    Capabilities
                                </div>
                                <ul className="list-group" style={{ display: "grid", "gridRowGap": "0.875rem" }}>
                                    <div className="ContentBox">Remembers what user said earlier in the conversation</div>
                                    <div className="ContentBox">Allows user to provide follow-up corrections</div>
                                    <div className="ContentBox">Trained to decline inappropriate requests</div>
                                </ul>
                            </div>
                            {/* Limitations */}
                            <div className="col" style={{ display: "grid", "gridRowGap": "0.875rem", padding: "0" }}>
                                <div className='ContentPanelH2'>
                                    <i className="fa fa-exclamation-triangle" aria-hidden="true"></i>
                                    Limitations
                                </div>
                                <ul className="list-group" style={{ display: "grid", "gridRowGap": "0.875rem" }}>
                                    <div className="ContentBox">May occasionally generate incorrect information</div>
                                    <div className="ContentBox">May occasionally produce harmful instructions or biased content</div>
                                    <div className="ContentBox">Limited knowledge of world and events after 2021</div>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div style={{ backgroundColor: "transparent", height: "12rem", position: "absolute", left: "0", right: "0", bottom: "0", margin: "auto" }}></div>
            </div>

            {/* 底部发送 */}
            <FootPanel ref={elementRef} send={pushMessage} openSavingKeyModal={openSavingKeyModal} openAboutModal={openAboutModal} regenerateResponse={regenerateResponse} />


            {/* Modal - 设置 */}
            <div className="modal " id="exampleModal" tabIndex={-1} aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog modal-dialog-centered modal-sm" >
                    <div className="modal-content SettingsModal SettingsModalFontColor">
                        <div className="modal-header" style={{ borderBottomWidth: "0px" }}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel">Settings</h1>
                            <button type="button" className={darkMode ? "btn btn-close btn-close-white btn-sm" : "btn btn-close btn-sm"} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body" style={{ display: "flex", flexDirection: "column", width: "100%", gap: "0.75rem", lineHeight: "1.25rem", padding: "0px 16px" }}>
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: "14px" }}>
                                <label className="form-check-label">Dark mode</label>
                                <div className="form-check form-switch">
                                    <input ref={mySwitchRef} className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"
                                        style={{
                                            backgroundColor: darkMode ? "rgb(16,163,127)" : "rgb(217,217,227)",
                                            border: "none", boxShadow: "none", width: "2.75rem", height: "1.5rem", transitionDuration: ".2s"
                                        }} checked={darkMode} onChange={() => { }} />
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer" style={{ display: "flex", marginRight: "auto", borderTopWidth: "0px" }}>
                            <div style={{ textDecorationLine: "underline", cursor: "pointer", fontSize: "0.875rem" }}>Export data</div>
                            <div style={{ borderLeft: "1px solid red", borderColor: "rgb(99,100,101)", borderLeftWidth: "1px", height: "20px" }}></div>
                            <div style={{ textDecorationLine: "underline", cursor: "pointer", fontSize: "0.875rem" }}>Delete account</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal - 保存api-key */}
            <div className="modal " id="saveKeyModal" tabIndex={-1} aria-labelledby="saveKeyModalLabel" aria-hidden="true" style={{ "--bs-modal-width": "600px" }}>
                <div className="modal-dialog modal-dialog-centered" >
                    <div className="modal-content SettingsModal SettingsModalFontColor">
                        <div className="modal-header" style={{ borderBottomWidth: "0px" }}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel">My API KEY</h1>
                            <button type="button" className={darkMode ? "btn btn-close btn-close-white btn-sm" : "btn btn-close btn-sm"} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body input-group has-validation" >
                            <div className={showError ? "is-invalid" : ""} style={{ width: "100%", display: "flex" }}>
                                <label style={{ width: "70px", marginTop: "6px" }} className="form-check-label">API KEY</label>
                                <input ref={focusField} value={key} onChange={(event) => setKey(event.target.value)}
                                    className={showError ? "form-control is-invalid saveAPIKeyField" : "form-control saveAPIKeyField"}
                                    style={{ width: "100%", border: showError ? "" : "none" }} type="text" required placeholder='Type your openai api key and click Submit' aria-label="default input example" maxLength={100} />
                                {/* <p><i className="fa fa-exclamation-circle fa-2x" aria-hidden="true"></i></p> */}
                            </div>
                            <div className="invalid-feedback">
                                Invalid key
                            </div>
                        </div>
                        <div className="modal-footer" style={{ display: "flex", width: "100%", marginTop: "20px", marginRight: "auto", borderTopWidth: "0px" }}>
                            <button type="button" className="btn btn-success btn-sm" onClick={submitMyKey} disabled={submitDisabled}>Submit</button>
                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">Cancel</button>
                            <button type="button" className="btn btn-success btn-sm" onClick={restoreFactoryKey}>Restore Factory Defaults</button>
                        </div>
                    </div>
                </div>
            </div>


            {/* Modal - 关于 */}
            <div className="modal " id="aboutModal" tabIndex={-1} aria-labelledby="aboutModalLabel" aria-hidden="true" style={{ "--bs-modal-width": "400px" }}>
                <div className="modal-dialog modal-dialog-centered" >
                    <div className="modal-content SettingsModal SettingsModalFontColor">
                        <div className="modal-header" style={{ borderBottomWidth: "0px" }}>
                            <h1 className="modal-title fs-5" id="exampleModalLabel">About</h1>
                            <button type="button" className={darkMode ? "btn btn-close btn-close-white btn-sm" : "btn btn-close btn-sm"} data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body  " style={{ fontSize: "14px" }} >
                            <div style={{ width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                                <div style={{ height: "100%", paddingRight: "20px" }}>
                                    <i className="fa fa-exclamation-circle fa-2x" aria-hidden="true"></i>
                                </div>
                                <div style={{ width: "100%", display: "flex", flexDirection: "column" }}>
                                    <label className="form-check-label">您已是最新版本了🛩🛩🛩老铁！</label>
                                    <label className="form-check-label" style={{ fontSize: "12px" }}>版本 {version} (测试版本) (64 位)</label>
                                    <label className="form-check-label" style={{ fontSize: "12px" }}>版权所有 2023 Shunyi Chen. 保留所有权利。</label>
                                </div>
                            </div>
                            <div>
                                <p></p>
                                <label className="form-check-label" style={{ marginLeft: "44px" }}>🎃Simeon Chen</label>
                                <br />
                                <label className="form-check-label" style={{ marginLeft: "44px" }}>🍒526637060@qq.com 🍓+8615841124001</label>

                                <i className="fa fa-clone" aria-hidden="true" style={{ marginLeft: "20px", cursor: "pointer", color: copyContact ? "rgb(25,135,84)" : "" }} onClick={copyContactInfo}></i>
                            </div>
                        </div>
                        <div className="modal-footer" style={{ borderTopWidth: "0px" }}>
                            <button type="button" className="btn btn-success btn-sm" data-bs-dismiss="modal">Ok</button>
                        </div>
                    </div>
                </div>
            </div>


        </div>


    )
})
