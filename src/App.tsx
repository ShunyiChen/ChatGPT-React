import { useState, useRef, useEffect  } from 'react'
import { Route, Routes, useRoutes } from "react-router-dom";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import NavigationBar from './components/NavigationBar'
import ContentPanel from './components/ContentPanel'
import ToolBar from './components/ToolBar'
import { Offcanvas } from 'bootstrap'
import { Chat, ChatButtonClass, SystemButtonClass } from './interfaces/Chat'
import axios from 'axios'
import cookie from 'react-cookies'

import EnterYourPassword from './views/EnterYourPassword'
import Getstarted from './views/Getstarted'
import WelcomeBack from './views/WelcomeBack'
import ResetYourPassword from './views/ResetYourPassword'
import CreateYourAccount from './views/CreateYourAccount'
import VerifyYourEmail from './views/VerifyYourEmail';
import CreateYourAccountPwd from './views/CreateYourAccountPwd';
import ChatGPT from './views/ChatGPT';
import Oops from './views/Oops';

// let currentChatId = ""

// export function getCurrentChatId() {
//   return currentChatId;
// }

// function setCurrentChatId(chat_id:string) {
//   currentChatId = chat_id;
// }

// let lastMessageIds = new Map();

// export function setLastMessageId(chatId: string, lastMessageId: string) {
//   lastMessageIds.set(chatId, lastMessageId)
// }

// export function getLastMessageId(chatId: string) {
//   return lastMessageIds.get(chatId)??""
// }

function App() {

  let routers = useRoutes([
    {
      index: true,
      path: "/auth/login",
      element: <Getstarted/>
    },
    {
      path: "/u/login/identifier",
      element: <WelcomeBack/>
    },
    {
      path: "/u/login/password",
      element: <EnterYourPassword/>
    },
    {
      path: "/u/reset-password/request/Username-Password-Authentication",
      element: <ResetYourPassword/>
    },
    {
      path: "/u/signup/identifier",
      element: <CreateYourAccount withPwdInput={false} withSSOButtons={true}/>
    },
    {
      path: "/u/signup/password",
      element: <CreateYourAccountPwd withPwdInput={true} withSSOButtons={false}/>
    },
    {
      path: "/onboarding",
      element: <VerifyYourEmail />
    },
    {
      path: "/",
      element: <ChatGPT />
    },
    {
      path: "/auth/error",
      element: <Oops />
    },
    {
      path: "*",
      element: <>NotFound</>
    }
  ])


  // const systemBtnData: SystemButtonClass[] = [
  //   {text: "Clear conversations",icon: "fa fa-trash-o", isOperable: true, question: "Confirm clear conversations"},
  //   {text: "Upgrade to Plus",icon: "fa fa-user-o", isOperable: false},
  //   {text: "Settings",icon: "fa fa-cog", isOperable: false},
  //   {text: "Get help",icon: "fa fa-external-link", isOperable: false},
  //   {text: "Log out",icon: "fa fa-sign-out", isOperable: false}
  // ]

  // const elementRef = useRef<Chat>(null)
  // const [toolbarTitle, setToolbarTitle] = useState("")
  // const [selectIndex, setSelectIndex] = useState(-1)
  // const [chatButtons, setChatButtons] = useState<ChatButtonClass[]>([]);
  // const [sysBtns, setSysButtons] = useState<SystemButtonClass[]>(systemBtnData)
  // const [alertVisible, setAlertVisible] = useState(false)
  // const [alertContent, setAlertContent] = useState("No message")
  

  // Called once only
  // let i = 0
  // useEffect(() => {
  //   if(i === 0) {
  //     // getCookie()
  //     // fetchChats();
  //     i++
  //   }
  // }, []);
  
  // const getCookie = async () => {
  //   const headers = {}
  //   await axios.get('/mychat/get_cookie/', {headers:headers}).then((response: { data: any }) => {
  //     console.log('getCookie', response.data);
  //     fetchChats()
  //   }).catch((error: any) => {
  //     console.error(error)
  //   })
  // }

  // const fetchChats = async () => {
  //   const data = {}
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'X-CSRFToken': cookie.load('csrftoken'),
  //     'Authorization': '52a69d820901b12789fb3738a7ae59107c4aa9c5'
  //   }
  //   await axios.post('/txyz/conversations/', data, {headers:headers}).then((response: { data: { [x: string]: ChatButtonClass[] } }) => {
  //     const chats: ChatButtonClass[] = response.data['Output']
  //     setChatButtons(chats)
  //   }).catch((error: any) => {
  //     console.error(error)
  //   })
  // }

  // const deleteChat = async (chatId : string) => {
  //   const data = {
  //       "chatId": chatId
  //   }
  //   const headers = {
  //     'Content-Type': 'application/json',
  //     'X-CSRFToken': cookie.load('csrftoken')
  //   }
  //   await axios.post('/mychat/del_chat/', data, {headers:headers}).then((response: { data: { Status: any } }) => {
  //       const {Status} = response.data
  //       if(Status === 0) {
  //         setChatButtons(chatButtons.filter(btn => chatId !== btn.chat_id))
  //         elementRef.current?.newChat()
  //       }
  //   }).catch((error: any) => {
  //       console.error(error)
  //   })
  // }

  // const getChatButtons = () => {
  //   return chatButtons
  // }

  // const checksIfNoneIsChecked = ():boolean => {
  //   return selectIndex === chatButtons.length;
  // }

  // const newChat = () => {
  //   setSelectIndex(-1)
  //   elementRef.current?.newChat()
  // }

  // const createChat = (chat_id:string, text: string) => {
  //   //左侧新增一个按钮
  //   setChatButtons(prevData => [...prevData, 
  //     {chat_id: chat_id, text: text, isNew: true},
  //   ]);
  //   const index = chatButtons.length
  //   //选中chatbutton
  //   checkButton(index, chat_id, text, true)
  // }

  // const checkButton = (index: number, chat_id:string, text:string, isNew?:boolean) => {
  //   setSelectIndex(index)
  //   setToolbarTitle(text);
  //   setCurrentChatId(chat_id)
  //   if(isNew) {
  //     elementRef.current?.cleanUp?.()
  //   } else {
  //     elementRef.current?.loadChatHistory?.()
  //   }
  // }

  // const isButtonChecked = (index: number) => {
  //   return selectIndex === index;
  // }

  // const menuClick = () => {
  //   const offcanvasElement = document.getElementById('offcanvasExample');
  //   if (offcanvasElement) {
  //     const offcanvas = new Offcanvas(offcanvasElement as Element);
  //     offcanvas.show()
  //   }
  // }

  // const alert = (content:string) => {
  //   setAlertContent(content)
  //   setAlertVisible(true)
  //   setTimeout(()=>{
  //     setAlertVisible(false)
  //   }, 5000)
  // }

  return (
      <div className='container-fluid p-0 d-flex flex-row mb-0'>
        {/* <Routes>
          <Route path="/auth/login" element={<Getstarted/>} />
          <Route path="/u/login/identifier" element={<WelcomeBack/>} />
          <Route path="*" element={<>NotFound</>} />
        </Routes> */}


        {routers}

        {/* <Getstarted></Getstarted> */}
        {/* <WelcomeBack></WelcomeBack> */}
        {/* <EnterYourPassword></EnterYourPassword> */}
        {/* <ResetYourPassword></ResetYourPassword> */}
        {/* <CreateYourAccount withPwdInput={true} ></CreateYourAccount> */}
      </div>
    

     
 
    // <div className='container-fluid' style={{display: "flex", padding: "0"}}>
    //     <ToolBar text={toolbarTitle} menuClickHandle={menuClick} plusClickHandle={() => elementRef.current?.newChat()}/> 
    //     <div id="NavigationBar">
    //       <NavigationBar 
    //         setLightMode={(light:boolean) => {elementRef.current?.setLightMode(light)}}
    //         getChatButtons={getChatButtons}
    //         // setChatButtons={setChatButtons}
    //         sysBtns={sysBtns}
    //         deleteChat={deleteChat}
    //         alert={alert}
    //         checkButton={checkButton}
    //         isButtonChecked={isButtonChecked}
    //         newChat={newChat}
    //         checksIfNoneIsChecked={checksIfNoneIsChecked}
    //         fetchChatList={fetchChats}
    //         />
    //     </div>
    //     <div id="ContentPanel" style={{backgroundColor:"rgba(0,0,0,0.5)", flex:"1"}}>
    //       <ContentPanel ref={elementRef} createChat={createChat} />
    //     </div>

    //     {/* offcanvas */}
    //     <div className="offcanvas offcanvas-start" style={{width:"300px", backgroundColor: "transparent", border: "none"}} tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel" >
    //         <div className="offcanvas-body " style={{padding: "0", display:"flex"}}>
    //           <NavigationBar 
    //             setLightMode={(light:boolean) => {elementRef.current?.setLightMode(light)}}
    //             getChatButtons={getChatButtons}
    //             // setChatButtons={setChatButtons}
    //             sysBtns={sysBtns}
    //             alert={alert}
    //             deleteChat={deleteChat}
    //             checkButton={checkButton}
    //             isButtonChecked={isButtonChecked}
    //             newChat={newChat}
    //             checksIfNoneIsChecked={checksIfNoneIsChecked}
    //             fetchChatList={fetchChats}
    //           />
    //           <button type="button" className="btn-close btn-close-white" style={{flex: "1", height: "40px", boxShadow:"none"}} data-bs-dismiss="offcanvas" aria-label="Close"></button>
    //         </div>
    //     </div> 

    //      {/* alert */}
    //       <div className={alertVisible?"alert alert-success fade show":"alert alert-success fade hide "} role="alert" style={{position:"absolute", top:"10px", left:"50%", marginLeft:"-240px", width:"480px", zIndex:10000, display:alertVisible?"flex":"none"}}>
    //         {alertContent}
    //         <button type="button" className="btn-close" style={{marginLeft:"auto"}} aria-label="Close" onClick={() => setAlertVisible(false)}></button>
    //       </div>

    // </div>
  )
}

export default App