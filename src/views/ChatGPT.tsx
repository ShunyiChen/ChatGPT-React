import { useState, useRef, useEffect  } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import NewTextField, { TextFieldType } from '../components/NewTextField'
import NewChatButton from '../components/NewChatButton';

function ChatGPT() {

    return (
        <div className="container-fluid d-flex flex-row flex-nowrap align-items-center p-0" style={{backgroundColor:"white"}}>
            <div className='flex-shrink-1' style={{width:"260px", visibility:"visible", overflowX:"hidden", backgroundColor:"green", height:"100%"}}>
                <NewChatButton w={'228px'} h={'40px'} title={'New chat'} isToggleButton={false} onPrimaryAction={() => {}} onSecondaryAction={() => {}} leftSvg={"NewChat.svg"}></NewChatButton>
            </div>
            <div className='d-flex flex-column flex-nowrap flex-shrink-1 flex-grow-1' style={{overflow:"hidden", flexBasis:"0%", backgroundColor:"grey", height:"100%"}}>

            </div>

        </div>
    )

}

export default ChatGPT