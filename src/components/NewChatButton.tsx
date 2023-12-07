 import { useState, useRef, useEffect, ReactElement } from 'react'
import {getIcon} from '../utils/Common'
import { useLocation, useNavigate } from 'react-router-dom'

type NewChatButtonProps = {
    w: string
    h: string
    leftSvg?: string
    rightSvg?: string
    title: string
    tips?: string
    onPrimaryAction: () => void
}

function NewChatButton(props: NewChatButtonProps) {
    const {w, h, leftSvg, rightSvg, title} = props
    return (
        <a className='d-flex flex-row flex-nowrap align-items-center NewChatButton m-0' style={{width:w, height:h, padding:"0px 8px", gap:"0.5rem"}}>
            <div className='flex-shrink-0' style={{width:"1.75rem", height:"1.75rem"}}>
                <div className='d-flex flex-row flex-nowrap justify-content-center align-items-center'
                     style={{color:"rgba(0,0,0,1)", backgroundColor:"rgba(255,255,255,1)", position:"relative", borderRadius:"9999px", height:"100%"}}>
                    {leftSvg?<img src={getIcon(leftSvg)} alt="" style={{width:"66.6%", height:"66.6%"}}/>:<></>}
                </div>
            </div>
            <div className='flex-grow-1' style={{color:"#ECECF1", fontSize:".875rem", lineHeight:"1.25rem", whiteSpace:"nowrap", textOverflow:"ellipsis", overflow:"hidden"}}>
                {title}
            </div>
            <div className='d-flex flex-row flex-nowrap' style={{gap:".75rem"}}>
                <span className='d-flex flex-row flex-nowrap align-items-center'>
                    <div className='text-center'>
                        {rightSvg?<img src={getIcon(rightSvg)} alt="" style={{width:"18px", height:"18px"}}/>:<></>}
                    </div>
                </span>
            </div>
        </a>
    )
}

export default NewChatButton