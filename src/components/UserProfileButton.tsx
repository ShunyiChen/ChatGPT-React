 import { useState, useRef, useEffect, ReactElement } from 'react'
import {getIcon} from '../utils/Common'
import { useLocation, useNavigate } from 'react-router-dom'

type UserProfileButtonProps = {
    w: string
    h: string
    leftSvg: string
    title: string
    content: string
    onPrimaryAction: () => void
}

function UserProfileButton(props: UserProfileButtonProps) {
    const {w, h, leftSvg, title, content, onPrimaryAction} = props
    return (
        <a className='d-flex flex-row flex-nowrap align-items-center justify-content-center m-0 text-decoration-none UpgradePlanButton'
            style={{width:w, height:h, padding:"0px 8px", gap:"0.75rem", color:"rgba(255,255,255,1)", fontSize:".875rem", lineHeight:"1.25rem", paddingBottom:".25rem", paddingTop:".25rem", 
            paddingLeft:".5rem", paddingRight:".5rem", borderRadius:".5rem", minHeight:"44px", cursor:"pointer"}} 
            onClick={onPrimaryAction}>
            
            <span className='d-flex flex-row flex-wrap-reverse w-100' style={{justifyContent:"space-between"}}>
                <div className='d-flex flex-row align-items-center' style={{gap:"0.5rem"}}>
                    
                    <span className='d-flex flex-row align-items-center justify-content-center' style={{backgroundColor:"rgba(0,0,0,1)", borderColor:"rgba()217,217,227,.1", borderWidth:'1px', borderRadius:"9999px", width:"1.75rem", height:"1.75rem"}}>
                        <img className='flex-shrink-0' src={getIcon(leftSvg)} alt="" style={{strokeWidth:"2", height:"1rem", width:"1rem", fontSize:".875rem", lineHeight:"1.25rem", cursor:"pointer"}}/>
                    </span>

                    <div className='d-flex flex-column' style={{border:"0 solid #D9D9E3", boxSizing:"border-box", color:"rgba(255,255,255,1)", fontSize:".875rem", lineHeight:"1.25rem", cursor:"pointer"}}>
                        <span style={{fontWeight:"600", border:"0 solid #D9D9E3", boxSizing:"border-box", color:"rgba(255,255,255,1)", fontSize:".875rem", lineHeight:"1.25rem", cursor:"pointer"}}>{title}</span>
                        <span className="" style={{color:"rgb(197, 197, 210)", fontSize:".75rem", lineHeight:"1rem", overflow:"hidden", display:"-webkit-box"}}>{content}</span>
                    </div>
                </div>
            </span>
        </a>
    )
}

export default UserProfileButton