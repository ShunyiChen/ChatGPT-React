import NewChatButton from './NewChatButton'
import ChatButton from './ChatButton'
import SystemButton from './SystemButton'
import { useEffect, useRef, useCallback, useState } from "react"
import { Chat} from '../interfaces/Chat'
import { Modal } from 'bootstrap'
import axios from 'axios'
import cookie from 'react-cookies'

function NavigationBar({fetchChatList, getChatButtons, sysBtns, deleteChat, alert, checkButton, isButtonChecked, newChat, checksIfNoneIsChecked}:Chat) {

    let i = 0
    useEffect(() => {
        if(i === 0) {
            //If none chatbutton is checked
            if(checksIfNoneIsChecked()) {
                newChat()
            }
            i++
        }
    },[])

    const handleSystemButtonClick = (text: string) => {
        if(text === "Clear conversations") {
            clearConversations()

        } else if(text === "Upgrade to Plus") {
            // alert("The function has not been enabled yet. ฅʕ•̫͡•ʔฅ")

        } else if(text === "Settings") {
            const myModal = new Modal('#exampleModal', {
                keyboard: false
            })
            myModal.show()

        } else if(text === "Get help") {
            const page = window.open('about:blank') as WindowProxy;
            page.location.href = 'https://help.openai.com/en/collections/3742473-chatgpt'

        } else {
            // alert("No Need To Logout. ( ͡• ͜ʖ ͡• )")
        }
    }

    const clearConversations = async () => {
        const param = {
        }
        const headers = {
          'Content-Type': 'application/json',
          'X-CSRFToken': cookie.load('csrftoken')
        }

        await axios.post('/mychat/del_all_chats/', param, {headers:headers}).then(response => {
            const {Status} = response.data
            if(Status === 0) {
                fetchChatList()
                newChat()
            }
        }).catch(error => {
            console.error(error)
        })
    }

    return (
        <div className='NavigationBarBase'>
            <div className='container text-center' style={{padding:"0"}}>
                <NewChatButton handleClick={newChat}/>
            </div>
            
            <div className='container text-center scrollbar scrollbar-primary-dark' 
                style={{flex:"1", padding:"0", marginTop: "4px", marginRight:"8px", display:"flex", flexDirection:"column", gap:"0.4rem", width:"252px"}}>
                {
                    getChatButtons().map((btn, i) => (
                        <ChatButton 
                            key={btn.chat_id}
                            id={btn.chat_id}
                            text={btn.text}
                            isChecked={isButtonChecked(i)}
                            isNew={btn.isNew??false}
                            clickToCheck={() => checkButton(i, btn.chat_id, btn.text)}
                            clickToDelete={() => deleteChat(btn.chat_id)} />
                    ))
                }
            </div>
            <div className='container text-center' style={{height: "241px", display:"flex", flexDirection:"column", padding:"0", borderTop: "1px solid rgb(77,77,79)"}}>
                {
                    sysBtns.map((btn, i) => (
                        <SystemButton key={i} text={btn.text} icon={btn.icon} isOperable={btn.isOperable} question={btn.question} accept={() => handleSystemButtonClick(btn.text)}/>
                    ))
                }
            </div>

           
            

        </div>
    )
}

export default NavigationBar