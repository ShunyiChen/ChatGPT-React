import { useState, useRef, useEffect  } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import NewTextField, { TextFieldType } from '../components/NewTextField'
import { getLogoIcon } from '../utils/Common';

function AtCapacityRightNow() {

    return (
        <div className='w-100 h-100' style={{overflow:"auto"}}>
            <div className="d-flex flex-row flex-nowrap align-items-center justify-content-center w-100 h-100" style={{overflow:"hidden", position:"relative"}}>
                <div className='flex-shrink-0 d-flex flex-column flex-nowrap align-items-center justify-content-center w-100 h-100' 
                    style={{paddingTop:"8rem", paddingLeft:"3.5rem", paddingRight:"3.5rem", width:"60%", overflow:"auto", gap:"1.5rem", marginLeft:"auto", marginRight:"auto"}}>

                        <div style={{fontWeight:"500", fontSize:"1.875rem", lineHeight:"2.25rem"}}>
                            ChatGPT is at capacity right now
                        </div>
                        <a href="https://share.hsforms.com/13gyIEVN5SrScw-iVvCgIew4sk30" target="_blank" rel="noreferrer" className="underline">Get notified when we're back</a>

                        <div className="flex">
                            <div className="font-bold">Write two truths and a lie about the status of ChatGPT.</div>
                        </div>
                        <div className="max-w-lg pb-8">
                            <span className="whitespace-pre-wrap light">
                                <span>
                                    1. ChatGPT is experiencing high traffic at the moment.
                                    2. The developers are working hard to accommodate all users.
                                    3. ChatGPT can predict the future with 100% accuracy.
                                </span>
                            </span>
                        </div>
                </div> 
            </div>
        </div>
        
    )
}

export default AtCapacityRightNow