import { useEffect, useRef, useState, Ref, forwardRef, useImperativeHandle } from "react";
import NewChatButton from "./NewChatButton";
import UpgradePlanButton from "./UpgradePlanButton";
import UserProfileButton from "./UserProfileButton";
import NewToggleButton, { NewToggleButtonRef } from "./NewToggleButton";
import { isDateBeforeThisYear, isDateInCurrentYearMonth, isToday, isWithinLast30Days, isWithinLast7Days, isYesterday } from "../utils/Common";
import { dummay_conversations } from "../data/DummyData";

type Conversation = {
    text: string,
    date_created: string,
    chat_id: string
}

const conversations = dummay_conversations()

const monthsInReverseOrder: string[] = [
    'Today', 'Yesterday', 'Previous 7 Days', 'Previous 30 Days',
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
        ...Array.from({ length: 12 }, (_, i) => (date: Date) => isDateInCurrentYearMonth(date, 12 - i)),
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

export type NewNavBarProps = {
}

export type NewNavBarRef = {
    fadeIn: () => void
    fadeOut: () => void
}

const NewNavBar = (props:NewNavBarProps, ref:Ref<NewNavBarRef>) => {
    let i = 0
    const inputRef = useRef<NewToggleButtonRef[]>([]);
    const [dataElements, setDataElements] = useState<JSX.Element[]>()
    const [loading, setLoading] = useState(true)
    const [loadSuccess, setLoadSuccess] = useState(false)
    let [opacity, setOpacity] = useState(1.0)

    // 淡入
    const fadeIn = () => {
        setOpacity(1.0)
        const r = setInterval(function() {
            setOpacity(opacity-=0.05)
            if(opacity <= 0.5) {
                clearInterval(r)
            }
        }, 10)

    }

    // 淡出
    const fadeOut = () => {
        setOpacity(0.5)
        const r = setInterval(function() {
            setOpacity(opacity+=0.05)
            if(opacity >= 1.0) {
                clearInterval(r)
            }
        }, 10)
    }

    const cleanUp = () => {
        inputRef.current.forEach(e => e.reset())
    }

    const newChat = () => {
        const newConversation = {
            text: "User Assistance: Hi",
            date_created: new Date().toDateString(),
            chat_id: "dac83f10-5b15-47c5-bfe2-20cb60508801"
        };
        conversations.push(newConversation)
        updateDataElements()
        // console.log('new chat added')
    }

    const retry = () => {
        setLoading(true)
        setTimeout(() => {
            updateDataElements()
        }, 1000);
    }

    const showTimeframe = (monthsToIterate: string[]) => {
        return (
            <span key={i++}>
                {monthsToIterate.map((month, idx) => {
                    const values = monthMap.get(month);
                    if (values && values.length > 0) {
                        return (
                            <div key={idx} style={{ opacity: 1, height: "auto", position: "relative", marginTop: "1.25rem" }}>
                                <div style={{ opacity: 1 }}>
                                    <div className='h3 m-0' style={{
                                        backgroundColor: "rgba(0,0,0,1)", color: "rgba(102,102,102,1)", fontWeight: "500", fontSize: "0.75rem",
                                        padding: "12px 8px 8px", wordBreak: "break-all", textOverflow: "ellipsis",
                                        overflow: "hidden", height: "2.25rem"
                                    }}>
                                        {month}
                                    </div>
                                </div>
                                <ol style={{ listStyle: "none", margin: "0", padding: "0" }}>
                                    {
                                        values.map((e, index) => {
                                            return (
                                                <li key={index} style={{ opacity: 1, height: "auto", overflow: "hidden" }}>
                                                    <NewToggleButton ref={el => { el && inputRef.current.push(el) }} w={'203px'} h={'20px'} rightSvg={'more.svg'} title={e.text} onPrimaryAction={cleanUp} isSelected={false}></NewToggleButton>
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

    const updateDataElements = () => {
        init(conversations)
        const newDataElements = [
            showTimeframe(monthsInReverseOrder.slice(0, 4)),
            showTimeframe(monthsInReverseOrder.slice(4, 15)),
            showTimeframe(monthsInReverseOrder.slice(15))
        ]
        setDataElements(newDataElements)

        setLoading(false)
        setLoadSuccess(true)
    }

    useEffect(() => {
        setTimeout(() => {
            updateDataElements()
        }, 1000);
    }, []);

    useImperativeHandle(ref, () => ({
        fadeIn,
        fadeOut
    }))

    return (
        <div style={{ width: "260px", height: "100%", opacity:`${opacity}`}}>
            <div className='d-flex flex-column flex-nowrap h-100' style={{ minHeight: "0" }}>
                <div className='d-flex flex-column flex-nowrap h-100' style={{ minHeight: "0", opacity: "1" }}>
                    <div className='flex-grow-1 flex-shrink-1 w-100 h-100' style={{ borderColor: "hsla(0,0%,100%,.2)", position: "relative", flexBasis: "0%" }}>
                        <nav className='d-flex flex-column flex-nowrap w-100 h-100' style={{ paddingBottom: "0.875rem", paddingLeft: "0.75rem", paddingRight: "0.75rem" }}>
                            
                            <div className="" style={{overflowY:"auto", paddingRight:".5rem", marginRight:"-.5rem",
                                flexDirection:"column", flexGrow:1, flexShrink:1, flexBasis:"0%", display:"flex"}}>
                                {/* New chat按钮 */}
                                <div style={{ paddingTop: ".875rem", backgroundColor:"rgba(0,0,0,1)", zIndex:20, top:0, right:0, left:0, position:"sticky"}}>
                                    <div style={{ paddingBottom: "0" }}>
                                        <NewChatButton w={'auto'} h={'2.5rem'} title={'New chat'} leftSvg={"NewChat.svg"} rightSvg={"NewEdit.svg"} onPrimaryAction={newChat}></NewChatButton>
                                    </div>
                                </div>

                                {/* Conversations */}
                                {(loading) ?
                                    <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: "100%" }}>
                                        <div className="spinner-border spinner-border-sm text-secondary" role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div> :
                                    (!loadSuccess) ?
                                    <div className='d-flex flex-column align-items-center justify-content-center' style={{ height: "100%" }}>
                                        <div className='m-0 p-0 text-center' style={{ color: "rgba(142,142,160,1)", fontStyle: "italic", fontSize: "14px",
                                            padding: ".75rem", height: "45.6px" }}>Unable to load history
                                            <div style={{ marginTop: ".25rem" }}>
                                                <button className='btn btn-light' style={{
                                                    borderRadius: ".5rem", fontWeight: "500", fontSize: ".875rem", marginTop: ".5rem",
                                                    "--bs-btn-bg": "rgba(64,65,79,1)", position: "relative", padding: ".25rem .5rem"
                                                    , "--bs-btn-color": "white", "--bs-btn-border-color": "rgba(86,88,105,1)",
                                                    "--bs-btn-active-bg": "rgba(52,53,65,1)", "--bs-btn-hover-bg": "rgba(52,53,65,1)",
                                                    "--bs-btn-active-border-color": "rgba(86,88,105,1)", "--bs-btn-hover-border-color": "rgba(86,88,105,1)",
                                                    "--bs-btn-hover-color": "white", "--bs-btn-active-color": "white"
                                                }} onClick={retry}>Retry</button>
                                            </div>
                                        </div>
                                    </div> :
                                    <div className='d-flex flex-column flex-nowrap' style={{
                                        color: "rgba(236,236,241,1)", fontSize: ".875rem",
                                        lineHeight: "1.25rem", paddingBottom: ".5rem", gap: ".5rem", height: "100%"
                                    }}>
                                        <div>
                                            {dataElements}
                                        </div>
                                    </div>
                                }
                            </div>
                            
                            {/* 底部按钮 */}
                            <div className='d-flex flex-column' style={{ borderColor: "hsla(0,0%,100%,.2)", paddingTop: ".5rem" }}>
                                <UpgradePlanButton w={'236px'} h={'36px'} title={'Upgrade plan'} content={'Get GPT-4, DALL·E, and more'} leftSvg='Star.svg' onPrimaryAction={() => { }}></UpgradePlanButton>
                            </div>
                            <div className="d-flex flex-row flex-nowrap align-items-center">
                                <div className='flex-grow-1'>
                                    <div style={{ position: "relative" }}>
                                        <UserProfileButton w={'236px'} h={'48px'} name={'Simeon Chen'}></UserProfileButton>
                                    </div>
                                </div>
                            </div>

                        </nav>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default forwardRef(NewNavBar)