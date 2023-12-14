import { useState, useRef, useEffect, createRef  } from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import NewTextField, { TextFieldType } from '../components/NewTextField'
import NewChatButton from '../components/NewChatButton';
import { isDateBeforeThisYear, isDateInCurrentYearMonth, isToday, isWithinLast30Days, isWithinLast7Days, isYesterday } from '../utils/Common';
import {dummay_conversations} from '../data/DummyData'
import NewToggleButton, { NewToggleButtonRef } from '../components/NewToggleButton';
import UpgradePlanButton from '../components/UpgradePlanButton';

type Conversation = {
    text: string,
    date_created: string, 
    chat_id: string
}

const conversations = dummay_conversations()

const monthsInReverseOrder: string[] = [
    'Today','Yesterday','Previous 7 Days','Previous 30 Days',
    'December', 'November', 'October', 'September',
    'August', 'July', 'June', 'May', 'April',
    'March', 'February', 'January', 'Prior To This Year'
];

const monthMap: Map<string, Conversation[]> = new Map();

function init(data: Conversation[]) {
    console.log('-------------------------------------------')
    monthsInReverseOrder.forEach((month) => {
      monthMap.set(month, []);
    });

    const dateCheckFunctions = [
        isToday,
        isYesterday,
        isWithinLast7Days,
        isWithinLast30Days,
        ...Array.from({ length: 12 }, (_, i) => (date:Date) => isDateInCurrentYearMonth(date, 12 - i)),
        isDateBeforeThisYear
      ];

    data.forEach(e => {
        const date = new Date(e.date_created)
        for (let i = 0; i < dateCheckFunctions.length; i++) {
            if (dateCheckFunctions[i](date)) {
              const monthKey = monthsInReverseOrder[i];
              monthMap.get(monthKey)?.push(e);
              break;
            }
        }
    })
}

function ChatGPT() {
    let i = 0
    const [dataElements, setDataElements] = useState<JSX.Element[]>()
    const inputRef = useRef<NewToggleButtonRef[]>([]);

    const cleanUp = () => {
        inputRef.current.forEach(e => e.reset())
    }
    
    const newChat = () => {
        const newConversation = {
            text: "abcd",
            date_created: new Date().toDateString(),
            chat_id: "dac83f10-5b15-47c5-bfe2-20cb60508801"
        };
        conversations.push(newConversation)
        updateDataElements()

        // console.log('new chat added')
    }

    const updateDataElements = () => {
        init(conversations)
        const newDataElements = [
            showTimeframe(monthsInReverseOrder.slice(0, 4)), 
            showTimeframe(monthsInReverseOrder.slice(4, 15)),
            showTimeframe(monthsInReverseOrder.slice(15))
        ]
        setDataElements(newDataElements)
    }

    const showTimeframe = (monthsToIterate: string[]) => {
        return (
          <span key={i++}>
            {monthsToIterate.map((month, idx) => {
              const values = monthMap.get(month);
              if(values && values.length > 0) {
                return(
                    <div key={idx} style={{opacity:1, height:"auto", position:"relative", marginTop:"1.25rem"}}>
                        <div style={{opacity:1}}>
                            <div className='h3 m-0' style={{backgroundColor:"rgba(0,0,0,1)", color:"rgba(102,102,102,1)", fontWeight:"500", fontSize:"0.75rem",
                                padding:"12px 8px 8px", wordBreak:"break-all", textOverflow:"ellipsis", 
                                overflow:"hidden", height:"2.25rem"}}>
                                {month}
                            </div>
                        </div>
                        <ol style={{listStyle:"none", margin:"0", padding:"0"}}>
                            {
                                values.map((e, index) => { 
                                    return (
                                        <li key={index} style={{opacity: 1, height:"auto", overflow:"hidden"}}>
                                            <NewToggleButton ref={el => {el && inputRef.current.push(el)}}  w={'212px'} h={'20px'} rightSvg={'more.svg'} title={e.text} onPrimaryAction={cleanUp} isSelected={false}></NewToggleButton>
                                        </li>
                                    )
                                })
                            }
                        </ol>
                    </div>
                  )
              }
            })}
          </span>
        );
    };

    useEffect(() => {
        updateDataElements()
    }, []);

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
                                                <NewChatButton w={'228px'} h={'2.5rem'} title={'New chat'} leftSvg={"NewChat.svg"} rightSvg={"NewEdit.svg"} onPrimaryAction={newChat}></NewChatButton>
                                            </div>
                                        </div>
                                        <div className='d-flex flex-column flex-nowrap' style={{color:"rgba(236,236,241,1)", fontSize:".875rem", lineHeight:"1.25rem", paddingBottom:".5rem", gap:".5rem"}}>
                                            <div>
                                                {dataElements}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='d-flex flex-column' style={{borderColor:"hsla(0,0%,100%,.2)", paddingTop:".5rem"}}>
                                        <UpgradePlanButton w={'236px'} h={'36px'} title={'Upgrade plan'} content={'Get GPT-4, DALL·E, and more'} leftSvg='Star.svg' onPrimaryAction={() => {}}></UpgradePlanButton>
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