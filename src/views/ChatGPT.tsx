import { useState, useRef, useEffect, createRef, ForwardedRef  } from 'react'
import { getIcon } from '../utils/Common';
import { Modal } from 'bootstrap';
import NewNavBar from '../components/NewNavBar';

function ChatGPT() {
    let [deg, setDeg] = useState(0)
    let [opacity, setOpacity] = useState(0.25)
    const [sidebarStyle, setSidebarStyle] = useState("")
    let i = 0;
    
    const openTipsForGettingStarted = () => {
        let model = new Modal('#TipsForGettingStartedModel', {
            keyboard: false
        })
        model.show()
    }
    
    useEffect(() => {
        if(i === 0) {
            // openTipsForGettingStarted()
        }
        i++
    }, []);

    const handleMouseEnter = () => {
        setDeg(0)
        setOpacity(1.0)
        const r = setInterval(function() {
            setDeg(deg++)
            if (deg >= 16) {
                clearInterval(r)
            }
        }, 10)
    }

    const handleMouseLeave = () => {
        setDeg(16)
        const r = setInterval(function() {
            setDeg(deg--)
            if (deg <= 0) {
                clearInterval(r)
                setOpacity(0.25)
            }
        }, 10)
    }

    const closeOrOpenSideBar = () => {
        if(sidebarStyle === 'sidebar') {
            setSidebarStyle('sidebarHidden')
        } else if(sidebarStyle === 'sidebarHidden'){
            setSidebarStyle('sidebar')
        } else {
            setSidebarStyle('sidebarHidden')
        }
    }

    return (
        <div className="container-fluid d-flex flex-row flex-nowrap align-items-center p-0" style={{backgroundColor:"white"}}>

            <div className="offcanvas offcanvas-start d-flex flex-row " tabIndex={-1} id="offcanvasExample"
                aria-labelledby="offcanvasExampleLabel" style={{backgroundColor:"transparent"}}>
                
                <div className="" style={{backgroundColor:"red"}}>
                    <NewNavBar/>
                </div>
                <div style={{backgroundColor:"red", paddingTop:".875.rem", marginRight:"-3rem",
                    top:0, right:0, position:"absolute"}}>
                     <button data-bs-dismiss="offcanvas" aria-label="Close">
                        <span className="sr-only">Close sidebar</span>
                        <img src={getIcon('Close.svg')} alt="" />
                    </button>
                </div>
            </div>
            
            {/* 左侧面板 */}
            <div className={`flex-shrink-1 h-100 d-none d-sm-block ${sidebarStyle}`}
                    style={{visibility:"visible", overflowX:"hidden", backgroundColor:"rgba(0,0,0,1)"}}>
                <NewNavBar />
            </div>

            {/* 右侧面板 */}
            <div className='d-flex flex-column flex-nowrap flex-shrink-1 flex-grow-1' style={{overflow:"hidden", flexBasis:"0%", backgroundColor:"white", height:"100%"}}>
                
                {/* 隐藏标题栏 */}
                <div className='d-flex justify-content-between d-block d-sm-none'
                    style={{border:"0px solid rgba(0,0,0,.15)", borderBottomWidth:"1px", minHeight:"40px", paddingLeft:".25rem", backgroundColor:"white"}}>
                    
                    <div>
                        <button className='btn' data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                            <img src={getIcon('Opensidebar.svg')} alt="" style={{width:"18px", height:"18px"}}/>
                        </button>
                    </div>
                    <div className='d-flex flex-row flex-nowrap align-items-center justify-content-center'
                         style={{gap:".25rem", cursor:"pointer", fontWeight: 500, fontSize:"1.125rem", lineHeight:"1.75rem",
                             backgroundColor:"rgba(247,247,248,var(1))", padding:".5rem .75rem"}}>
                        <div>
                            ChatGPT
                            <span style={{marginLeft:"4px",color:"#666", gap:".25rem"}}>
                                3.5
                            </span>
                        </div>
                        <img src={getIcon('Down.svg')} alt="" />
                    </div>
                    <div>
                        <button className='btn'>
                            <img src={getIcon('NewChat2.svg')} alt="" style={{width:"18px", height:"18px"}}/>
                        </button>   
                    </div>
                </div>
                <div className="d-flex flex-row align-items-center justify-content-center w-100"></div>

                <main className='w-100 h-100 d-flex flex-row align-items-center justify-content-start' style={{overflow:"auto", position:"relative"}}>
                    <div>
                        {/* 隐藏sidebar三角按钮 */}
                        <button className='btn p-0 m-0' style={{textTransform:"none", "--bs-btn-active-border-color":"transparent"}}>
                            <span>
                                <div className='d-flex flex-row align-items-center justify-content-center'
                                    style={{opacity: `${opacity}`, width:"2rem", height:"72px"}}
                                    onMouseEnter={handleMouseEnter}
                                    onMouseLeave={handleMouseLeave}
                                    onClick={closeOrOpenSideBar}>

                                    <div className='d-flex flex-column align-items-center' style={{width:"1.5rem", height:"1.5rem"}}>
                                        <div style={{backgroundColor:"#0F0F0F", width:".25rem", height:".75rem", borderRadius:"9999px",
                                            transform: `translateY(0.15rem) rotate(${deg}deg) translateZ(0px)`}}></div>
                                        <div style={{backgroundColor:"#0F0F0F", width:".25rem", height:".75rem", borderRadius:"9999px",
                                            transform: `translateY(-0.15rem) rotate(${0-deg}deg) translateZ(0px)`}}></div>
                                    </div>
                                </div>
                                <span>

                                </span>
                            </span>
                        </button>
                    </div>
                </main>
            </div>

            {/* <!-- TipsForGettingStartedModel --> */}
            <div className="modal" tabIndex={-1} id="TipsForGettingStartedModel" style={{"--bs-modal-width":"768px"}}>
                <div className="modal-dialog modal-dialog-centered" >
                    <div className="modal-content">
                        <div className="modal-header" style={{padding:"24px"}}>
                            <div className='d-flex flex-column align-items-start' style={{gap:".25rem"}}>
                                <h2 className="modal-title" id="staticBackdropLabel" style={{color:"rgba(32,33,35,1)", lineHeight:"1.5rem", fontWeight:"500", fontSize:"18px"}}>ChatGPT</h2>
                                <p id="radix-:r1j:" className="m-0" style={{color:"rgba(142,142,160,1)", fontSize:".875rem", lineHeight:"1.25rem"}}>Tips for getting started</p>
                            </div>
                        </div>
                        <div className="modal-body p-0">
                            <div className='d-flex flex-column' style={{gap:"0.75rem", padding:"24px"}}>
                                <div className='d-flex flex-row' style={{gap:"2rem"}}>
                                    {/* 左 */}
                                    <div className='d-flex flex-column' style={{gap:"0.5rem"}}>
                                        <div className='d-flex flex-row align-items-center' style={{gap:"0.5rem"}}>
                                            <div>
                                                <img src={getIcon('Askaway.svg')} alt="" />
                                            </div>
                                            <div className="" style={{color:"#0f0f0f", fontWeight:"550", fontSize:"0.875rem"}}>Ask away</div>
                                        </div>
                                        <div className="" style={{color:"#666", fontSize:"0.82rem", lineHeight:"1.25rem"}}>ChatGPT can answer questions, help you learn, write code, brainstorm together, and much more.</div>
                                    </div>
                                    {/* 中 */}
                                    <div className='d-flex flex-column' style={{gap:"0.5rem"}}>
                                        <div className='d-flex flex-row align-items-center ' style={{gap:"0.5rem"}}>
                                            <div style={{height:"28px"}}>
                                                <img src={getIcon('Sensitive.svg')} alt="" />
                                            </div>
                                            <div className="" style={{color:"#0f0f0f", fontWeight:"550", fontSize:"0.875rem"}}>Don’t share sensitive info</div>
                                        </div>
                                        <div className="" style={{color:"#666", fontSize:"0.8rem", lineHeight:"1.25rem"}}>
                                                Chat history may be reviewed or used to improve our services.Learn more about your choices in our
                                                <p className='m-0 p-0'>
                                                    <a href="https://help.openai.com/en/articles/7039943-data-usage-for-consumer-services-faq" style={{fontSize:"0.8rem",textDecorationLine:"underline", color:"#666"}}>Help Center.</a>
                                                </p>
                                        </div>
                                    </div>
                                    {/* 右 */}
                                    <div className='d-flex flex-column' style={{gap:"0.5rem"}}>
                                        <div className='d-flex flex-row align-items-center' style={{gap:"0.5rem"}}>
                                            <div style={{height:"28px"}}>
                                                <img src={getIcon('Facts.svg')} alt="" />
                                            </div>
                                            <div className="" style={{color:"#0f0f0f", fontWeight:"550", fontSize:"0.875rem"}}>Check your facts</div>
                                        </div>
                                        <div className="" style={{color:"#666", fontSize:"0.8rem", lineHeight:"1.25rem"}}>While we have safeguards, ChatGPT may give you inaccurate information. It’s not intended to give advice.</div>
                                    </div>
                                </div>
                                <div className="d-flex flex-row align-items-center justify-content-end" style={{width:"100%"}}>
                                    <button className="btn relative" style={{"--bs-btn-bg":"#10A37F", "--bs-btn-hover-bg":"rgb(26,127,100)", "--bs-btn-active-bg":"rgb(26,127,100)"}} data-bs-dismiss="modal">
                                        <div className="d-flex gap-2 align-items-center justify-content-center" style={{fontSize:"0.8rem", color:"white"}}>Okay, let’s go</div>
                                    </button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatGPT