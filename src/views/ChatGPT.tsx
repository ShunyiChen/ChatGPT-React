import { useState, useRef, useEffect  } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import NewTextField, { TextFieldType } from '../components/NewTextField'
import NewChatButton from '../components/NewChatButton';

type Timeline = {
    name: string;
    children: TimelineItem[];
}

type TimelineItem = {
    name: string;
    children: any[]; // 按需更改这里的类型
}

const TimelineNames = {
    Today: 'Today',
    Yesterday: 'Yesterday',
    Previous30Days: 'Previous 30 Days',
    December:'December',
    November:'November',
    October: 'October',
    September:'September',
    August:'August',
    July:'July',
    June:'June',
    May:'May',
    April:'April',
    March:'March',
    February:'February',
    January:'January',
}

function ChatGPT() {

    const groupByTimeline: Timeline[] = Object.values(TimelineNames).map(name => ({ name, children: [] }));
    console.log('groupByTimeline=',groupByTimeline);

    Object.values(TimelineNames.April).push({name:"1"})
    console.log('April=',groupByTimeline);

    return (
        <div className="container-fluid d-flex flex-row flex-nowrap align-items-center p-0" style={{backgroundColor:"white"}}>
            {/* 左侧面板 */}
            <div className='flex-shrink-1 h-100' style={{width:"260px", visibility:"visible", overflowX:"hidden", backgroundColor:"rgba(0,0,0,1)"}}>
                <div style={{width:"260px", height:"100%"}}>
                    <div className='d-flex flex-column flex-nowrap h-100' style={{minHeight:"0"}}>
                        <div className='d-flex flex-column flex-nowrap h-100' style={{minHeight:"0", opacity:"1"}}>
                            <div className='flex-grow-1 flex-shrink-1 w-100 h-100' style={{borderColor: "hsla(0,0%,100%,.2)", position:"relative", flexBasis:"0%"}}>
                                <nav className='d-flex flex-column flex-nowrap w-100 h-100' style={{paddingBottom:"0.875rem", paddingLeft:"0.75rem", paddingRight:"0.75rem"}}>
                                    
                                    <div className='flex-grow-1 flex-shrink-1 w-100 h-100' style={{paddingRight:"0.5rem", overflowY:"auto", flexBasis:"0%", marginRight:"-0.5rem"}}>
                                        {/* New chat按钮 */}
                                        <div style={{paddingTop:".875rem"}}>
                                            <div style={{paddingBottom:"0"}}>
                                                <NewChatButton w={'228px'} h={'2.5rem'} title={'New chat'} leftSvg={"NewChat.svg"} rightSvg={"NewEdit.svg"} isToggleButton={false} onPrimaryAction={() => {}} onSecondaryAction={() => {}}></NewChatButton>
                                            </div>
                                        </div>
                                        <div className='d-flex flex-column flex-nowrap' style={{color:"rgba(236,236,241,1)", fontSize:".875rem", lineHeight:"1.25rem", paddingBottom:".5rem", gap:".5rem"}}>
                                            <div>
                                                <span>

                                                </span>
                                                <span>

                                                </span>
                                                <span>

                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </nav>

                            </div>
                        </div>
                    </div>
                </div>
               

                
            </div>

            {/* 右侧面板 */}
            <div className='d-flex flex-column flex-nowrap flex-shrink-1 flex-grow-1' style={{overflow:"hidden", flexBasis:"0%", backgroundColor:"grey", height:"100%"}}>
                
            </div>

        </div>
    )

}

export default ChatGPT