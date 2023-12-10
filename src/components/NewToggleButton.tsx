 import { useState, useRef, useEffect, ReactElement, forwardRef, useImperativeHandle, Ref } from 'react'
import {getIcon} from '../utils/Common'
import { useLocation, useNavigate } from 'react-router-dom'

type NewToggleButtonProps = {
    w: string
    h: string
    rightSvg: string
    title: string
    onPrimaryAction: () => void
    isSelected?: boolean
}

export type NewToggleButtonRef = {
    reset: () => void
}

function NewToggleButton(props: NewToggleButtonProps, ref: Ref<NewToggleButtonRef>) {
    const {w, h, rightSvg, title, isSelected=false, onPrimaryAction} = props
    const [selected, setSelected] = useState(isSelected)

    const reset = () => {
        setSelected(false)
    }

    useImperativeHandle(ref, () => ({
        reset,
    }))

    return (
        <div className='NewToggleButton' style={{position:"relative", cursor:"pointer", backgroundColor:"#202123",  borderRadius:".5rem"}} onClick={() => {
            onPrimaryAction()
            setSelected(!selected)
        }}>
            <a className="d-flex flex-row flex-nowrap align-items-center text-decoration-none"
                style={{padding:".5rem", borderRadius:".5rem", gap:".5rem"}}>
                <div className='flex-grow-1' style={{color:"#ECECF1",whiteSpace:"nowrap", overflow:"hidden", position:"relative", width:w, height:h, fontSize:"13px"}}>
                    {title}
                    <div className='NewToggleButtonGradient' style={{width:"2rem", top:"0", right:"0", bottom:"0", position:"absolute"}}></div>
                </div>
            </a>
            {selected?
                <div className="d-flex flex-row flex-nowrap align-items-center justify-content-center" style={{borderRadius:"0.5rem", width:"2.25rem", top:"0", right:"0", bottom:"0", position:"absolute", color:"#999"}}>
                    <div style={{borderRadius:".5rem", width:"3.5rem", top:"0", right:"0", bottom:"0", position:"absolute", pointerEvents:"none"}}></div>
                    {rightSvg?<img src={getIcon(rightSvg)} alt="" style={{width:"18px", height:"18px"}}/>:<></>}
                </div>:<></>
            }
        </div>
    )
}
export default forwardRef(NewToggleButton)