import { useState, useRef, useEffect  } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
// import './App.css'
import { Offcanvas } from 'bootstrap'
import axios from 'axios'
import cookie from 'react-cookies'

//话题索引
let i = 0
//每行信息内容索引
let index = 1;
//信息数组索引
let p = 0;


function Getstarted() {
    const [hi, setHi] = useState(false)
    const [stop, setStop] = useState(false);
    const [typing, setTyping] = useState("")

    const msg = [   
        {topic:"Brainstorm names", info:["for an orange cat we're adopting from the shelter","for my fantasy football team"], wait: 10000},
        {topic:"Recommend a dish", info:["to impress a date who's a picky eater", "to bring to a potluck"], wait: 9000},
        {topic:"Draft an email", info: ["to request a quote from local plumbers", "requesting a deadline extension for my project"], wait: 10000},
        {topic:"Improve my post", info:["for hiring a store associate","for selling a used vacuum in good condition"], wait: 10000},
        {topic:"Help me debug", info: ["why the linked list appears empty after I've reversed it", "a Python script automating daily reports"], wait: 10000},
        {topic:"Plan a trip", info: ["to experience Seoul like a local","to see the northern lights in Norway"], wait: 9000},
        {topic:"Give me ideas", info: ["for what to do with my kids' art", "for a customer loyalty program in a small bookstore"], wait: 9000},
        {topic:"Write a thank-you note", info: ["to my interviewer", "to our babysitter for the last-minute help"], wait: 9000},
        {topic:"Help me pick", info:["a gift for my dad who loves fishing", "an outfit that will look good on camera"], wait: 10000},
        {topic:"Write a text", info:["that goes with a kitten gif for a friend having a rough day", "asking a friend to be my plus-one at a wedding"], wait: 10000},
        {topic:"Summarize this article", info:["as a table of pros and cons", "into three key points"], wait: 10000},
        {topic:"Suggest fun activities", info:["for a team-building day with remotee mployees", "for a family of 4 to do indoors on a rainy day"], wait: 10000}
    ]

    let n = 0;
    useEffect(() => {
        if(n === 0) {
            let t = hi?300:msg[i].wait
            setTimeout(() => {
                setHi(!hi);
                if(hi === true) {
                    index = 1
                    p = 0
                    setTyping("")
                    //滚动循环
                    i++
                    if(i >= msg.length) {
                        i = 0
                    }
                }
            }, t)
        }
    },[hi])

    useEffect(() => {
        if(n === 0) {
            let wait = 25;
            if(typing === '') {
                wait = 1000 //每行打字前停顿1秒
                //停止圆点动画
                setStop(false)
            }
            setTimeout(() => {
                setTyping(prevData => msg[i].info[p]?.substring(0, index))
                index++
                //当每行打字结束
                if(index === msg[i].info[p].length) {
                    //当第一行打完，设置p到下一行
                    if(p === 0) {
                        setTimeout(() => {
                            setTyping("")
                            index = 1;
                            p++;
                        }, 3000) //每行打字结束后停顿两秒
                    }
                    // console.log('打完并清除')
                    // 开始圆点动画
                    setTimeout(() => {
                        setStop(true)
                    }, 500) //每行打字结束后停顿两秒
                    
                }
            }, wait)
        }
     },[typing, stop])
 
    return (
        <div className="d-flex flex-row mb-0" style={{width:"100%"}}>
            <div id="getStartedLeft" className={["px-4","py-4","d-flex","flex-column", "getStartedLeftTheme"].join(' ')} style={{width:"60%"}}>
                <div className='d-flex flex-row' style={{fontSize: '21px',fontWeight:'700'}}>
                    ChatGPT 
                    <span className='font-circle'>●</span>
                </div>
                <div className={["d-flex","flex-column","justify-content-center",hi===true?"hidden":"visible"].join(' ')} style={{height: '100%', marginTop:"-57px"}}>
                    <p className='m-0' style={{fontSize:'38px', fontWeight:'700', lineHeight:'49px'}}>{msg[i].topic}</p>
                    <p className={stop?"m-0 stopTyping":"m-0 typing"} style={{fontSize:'38px', lineHeight:'49px', height:"47px", width:"90%"}}>{typing}</p>
                </div>
            </div>

            <div id="getStartedRight" className='d-flex flex-column getStartedRightTheme' style={{width:"40%",minWidth:"416px", marginTop:"-17px"}}>
                <div id="getStartedName" className='d-flex flex-row py-0 px-5 pt-4' style={{fontSize: '18px',fontWeight:'700'}}>
                    ChatGPT 
                    <span style={{fontSize:"34px", marginTop:"-14px"}}>●</span>
                </div>
                <div className="p-2 d-flex flex-column justify-content-center" style={{height:"100%"}}>
                    <div className='d-flex flex-row justify-content-center'>
                        <div id="getStartedText" className='h2 m-0' style={{fontWeight:700}}>Get started</div>
                    </div>
                    <div id="getStartedButtons" className="mt-3 d-flex flex-wrap justify-content-center" style={{gap:"0.73rem"}}>
                        <button type="button" className="btn getstartedButton">Log in</button>
                        <button type="button" className="btn getstartedButton">Sign up</button>
                    </div>
                </div>
                <div className='d-flex flex-column text-center' style={{height:'125px'}}>
                    <div className='mb-3 text-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1180 320" width="80" height="22" fill="lightgrey" className="h-[22px] w-auto"><path d="M367.44 153.84c0 52.32 33.6 88.8 80.16 88.8s80.16-36.48 80.16-88.8-33.6-88.8-80.16-88.8-80.16 36.48-80.16 88.8zm129.6 0c0 37.44-20.4 61.68-49.44 61.68s-49.44-24.24-49.44-61.68 20.4-61.68 49.44-61.68 49.44 24.24 49.44 61.68zM614.27 242.64c35.28 0 55.44-29.76 55.44-65.52s-20.16-65.52-55.44-65.52c-16.32 0-28.32 6.48-36.24 15.84V114h-28.8v169.2h28.8v-56.4c7.92 9.36 19.92 15.84 36.24 15.84zm-36.96-69.12c0-23.76 13.44-36.72 31.2-36.72 20.88 0 32.16 16.32 32.16 40.32s-11.28 40.32-32.16 40.32c-17.76 0-31.2-13.2-31.2-36.48zM747.65 242.64c25.2 0 45.12-13.2 54-35.28L776.93 198c-3.84 12.96-15.12 20.16-29.28 20.16-18.48 0-31.44-13.2-33.6-34.8h88.32v-9.6c0-34.56-19.44-62.16-55.92-62.16s-60 28.56-60 65.52c0 38.88 25.2 65.52 61.2 65.52zm-1.44-106.8c18.24 0 26.88 12 27.12 25.92h-57.84c4.32-17.04 15.84-25.92 30.72-25.92zM823.98 240h28.8v-73.92c0-18 13.2-27.6 26.16-27.6 15.84 0 22.08 11.28 22.08 26.88V240h28.8v-83.04c0-27.12-15.84-45.36-42.24-45.36-16.32 0-27.6 7.44-34.8 15.84V114h-28.8zM1014.17 67.68 948.89 240h30.48l14.64-39.36h74.4l14.88 39.36h30.96l-65.28-172.32zm16.8 34.08 27.36 72h-54.24zM1163.69 68.18h-30.72V240.5h30.72zM297.06 130.97a79.712 79.712 0 0 0-6.85-65.48c-17.46-30.4-52.56-46.04-86.84-38.68A79.747 79.747 0 0 0 143.24 0C108.2-.08 77.11 22.48 66.33 55.82a79.754 79.754 0 0 0-53.31 38.67c-17.59 30.32-13.58 68.54 9.92 94.54a79.712 79.712 0 0 0 6.85 65.48c17.46 30.4 52.56 46.04 86.84 38.68a79.687 79.687 0 0 0 60.13 26.8c35.06.09 66.16-22.49 76.94-55.86a79.754 79.754 0 0 0 53.31-38.67c17.57-30.32 13.55-68.51-9.94-94.51zM176.78 299.08a59.77 59.77 0 0 1-38.39-13.88c.49-.26 1.34-.73 1.89-1.07l63.72-36.8a10.36 10.36 0 0 0 5.24-9.07v-89.83l26.93 15.55c.29.14.48.42.52.74v74.39c-.04 33.08-26.83 59.9-59.91 59.97zM47.94 244.05a59.71 59.71 0 0 1-7.15-40.18c.47.28 1.3.79 1.89 1.13l63.72 36.8c3.23 1.89 7.23 1.89 10.47 0l77.79-44.92v31.1c.02.32-.13.63-.38.83L129.87 266c-28.69 16.52-65.33 6.7-81.92-21.95zM31.17 104.96c7-12.16 18.05-21.46 31.21-26.29 0 .55-.03 1.52-.03 2.2v73.61c-.02 3.74 1.98 7.21 5.23 9.06l77.79 44.91L118.44 224c-.27.18-.61.21-.91.08l-64.42-37.22c-28.63-16.58-38.45-53.21-21.95-81.89zm221.26 51.49-77.79-44.92 26.93-15.54c.27-.18.61-.21.91-.08l64.42 37.19c28.68 16.57 38.51 53.26 21.94 81.94a59.94 59.94 0 0 1-31.2 26.28v-75.81c.03-3.74-1.96-7.2-5.2-9.06zm26.8-40.34c-.47-.29-1.3-.79-1.89-1.13l-63.72-36.8a10.375 10.375 0 0 0-10.47 0l-77.79 44.92V92c-.02-.32.13-.63.38-.83l64.41-37.16c28.69-16.55 65.37-6.7 81.91 22a59.95 59.95 0 0 1 7.15 40.1zm-168.51 55.43-26.94-15.55a.943.943 0 0 1-.52-.74V80.86c.02-33.12 26.89-59.96 60.01-59.94 14.01 0 27.57 4.92 38.34 13.88-.49.26-1.33.73-1.89 1.07L116 72.67a10.344 10.344 0 0 0-5.24 9.06l-.04 89.79zM125.35 140 160 119.99l34.65 20V180L160 200l-34.65-20z"></path></svg>
                    </div>
                    <div id="getStartedLinks" className='text-center py-2' style={{fontSize: '11px'}}>
                        <a href="https://openai.com/policies/terms-of-use" target="_blank" className="link-secondary mx-3 text-decoration-none" rel="noreferrer">Terms of use</a>
                        <span className='link-secondary'>|</span>
                        <a href="https://openai.com/policies/privacy-policy" target="_blank" className="link-secondary mx-3 text-decoration-none" rel="noreferrer">Privacy policy</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Getstarted