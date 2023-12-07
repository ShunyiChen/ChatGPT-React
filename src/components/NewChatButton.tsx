 import { useState, useRef, useEffect, ReactElement } from 'react'
import {getIcon} from '../utils/Common'
import { useLocation, useNavigate } from 'react-router-dom'

type NewChatButtonProps = {
    w: string
    h: string
    leftSvg?: string
    rightSvg?: string
    title: string
    content?: string
    isToggleButton: boolean
    isAnimated?: boolean
    tips?: string
    onPrimaryAction: () => void
    onSecondaryAction: () => void
}

function NewChatButton(props: NewChatButtonProps) {
    const {w, h, leftSvg} = props

    // const showLeftSvg = () => {
    //     if(leftSvg) {
    //         return (
    //             <img src={getIcon(leftSvg)} alt="" />
    //         )
    //     } else {
    //         return (
    //             <></>
    //         )
    //     }
    // }

    return (
        // <a className="NewChatButton border" role="link" onClick={handleClick}>
        //     <i className="fa fa-plus" aria-hidden="true"></i>New Chat
        // </a>
        <a className='d-flex flex-row flex-nowrap justify-content-center align-items-start px-2' style={{width:w, height:h}}>
            <div className='flex-shrink-0'>
                <div className='d-flex flex-row flex-nowrap justify-content-center' style={{color:"rgba(0,0,0,1", backgroundColor:"rgba(255,255,255,1))"}}>
                    {leftSvg?<img src={getIcon(leftSvg)} alt="" />:<></>}
                </div>
            </div>
            <div></div>
        </a>
    )
}

export default NewChatButton