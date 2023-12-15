 import { useState, useRef, useEffect, ReactElement } from 'react'
import {getIcon} from '../utils/Common'
import { useLocation, useNavigate } from 'react-router-dom'

type UserProfileButtonProps = {
    w: string
    h: string
    name: string
}

function UserProfileButton(props: UserProfileButtonProps) {
    const {w, h, name} = props
    return (
        <button className='btn btn-secondary d-flex flex-row flow-nowrap align-items-center justify-content-start'
            style={{fontSize:"0.875rem", lineHeight:"1.25rem", padding:"0.5rem", paddingLeft:"0.45rem" ,gap:"0.5rem", borderRadius:"0.5rem", width:w, height:h,
                 "--bs-btn-bg":"transparent", "--bs-btn-hover-border-color":"transparent", "--bs-btn-hover-bg":"#202123", "--bs-btn-border-color":"transparent",
                  "--bs-btn-active-bg":"#202123", "--bs-btn-active-border-color":"transparent"}}>
            
            <div className='flex-shrink-0'>
                <div className="d-flex flex-row align-items-center justify-content-center">
                    <div className="relative flex">
                        <img alt="User" loading="lazy" width="32" height="32" decoding="async" data-nimg="1"  src="https://s.gravatar.com/avatar/93e37a381d6a363da4929301ca1a57cb?s=480&amp;r=pg&amp;d=https%3A%2F%2Fcdn.auth0.com%2Favatars%2Fzo.png"
                             style={{color: "transparent", borderRadius:"9999px", verticalAlign:"middle"}} />
                    </div>
                </div>
            </div>
            <div className="overflow-hidden text-start">
                <div className="font-semibold" style={{fontWeight:"550", fontSize:"0.8rem"}}>{name}</div>
            </div>
        </button>
    )
}

export default UserProfileButton