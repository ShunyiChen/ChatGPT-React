 import { useState, useRef, useEffect, ReactElement } from 'react'
import {getIcon} from '../utils/Common'
import { useLocation, useNavigate } from 'react-router-dom'

type NewToggleButtonProps = {
    w: string
    h: string
    rightSvg?: string
    title: string
    tips?: string
    onPrimaryAction: () => void
}

function NewToggleButton(props: NewToggleButtonProps) {
    const {w, h, rightSvg, title} = props
    return (
        <ol className='d-flex flex-row flex-nowrap align-items-center NewToggleButton m-0 p-0' style={{width:w, height:h, listStyle:"none"}}>
            <li style={{position:"relative", opacity:"1", height:"auto", overflow:"hidden",transform:"none", transformOrigin:"50% 50% 0px"}}>
                <div style={{position:"relative"}}>
                    <a href="" className="d-flex flex-row flex-nowrap align-items-center" style={{padding:".5rem", borderRadius:".5rem", gap:".5rem"}}>
                        <div className='flex-grow-1' style={{color:"#ECECF1",whiteSpace:"nowrap", overflow:"hidden", position:"relative"}}>
                            {title}
                        </div>
                    </a>
                    <div>
                        {rightSvg?<img src={getIcon(rightSvg)} alt="" style={{width:"18px", height:"18px"}}/>:<></>}
                    </div>
                </div>
            </li>
        </ol>
    )
}

export default NewToggleButton