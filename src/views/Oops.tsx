import { useState, useRef, useEffect  } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import NewTextField, { TextFieldType } from '../components/NewTextField'
import { getLogoIcon } from '../utils/Common';

function Oops() {
    let navigate = useNavigate()

    const goBack = () => {
        navigate("/auth/login")
    }

    return (
        <div className="d-flex flex-column align-items-center justify-content-center" style={{width:"100%", backgroundColor:"rgba(247,247,248,1)", fontWeight:"500"}}>
            <div className='d-flex flex-column align-items-center justify-content-center h-100' style={{width:"24rem"}}>
                <div className='mb-3'>
                    <img src={getLogoIcon("OpenAI.svg")} alt="" />
                </div>
                <div className='mb-2 text-center' style={{fontSize:"1.125rem", lineHeight:"1.75rem"}}>Oops!</div>
                <div className='mb-3 text-center'>
                    We ran into an issue while signing you in, please take a break and try again soon.
                </div>
                <button className='btn btn-light' style={{"--bs-btn-bg":"white", "--bs-btn-hover-bg":"rgba(247,247,248,0.9)",
                 "--bs-btn-active-bg":"rgba(247,247,248,1)", "--bs-btn-border-color":"rgba(0,0,0,0.1)"}} onClick={goBack}>
                    <div className='d-flex w-100 align-items-center justify-content-center' style={{gap:".5rem", fontWeight:"500", fontSize:"0.875rem"}}>
                        Go back
                    </div>
                </button>
            </div>
            <div className='d-flex flex-row align-items-center justify-content-center'
                 style={{width:"100%", fontSize:".75rem", lineHeight:"1rem", paddingBottom:".75rem", paddingTop:".75rem", gap:".75rem", color: "rgba(142,142,160, 1)"}}>
                    <a rel="noreferrer" className="link-secondary" style={{width:"auto",fontWeight:"400"}} target="_blank" href="https://openai.com/policies/terms-of-use">Terms of use</a>
                    <span className="text-gray-600">|</span>
                    <a rel="noreferrer" className="link-secondary" style={{width:"auto", fontWeight:"400"}} target="_blank" href="https://openai.com/policies/privacy-policy">Privacy policy</a>
            </div>
        </div>
    )
}

export default Oops