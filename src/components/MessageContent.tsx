import { useRef, forwardRef, useImperativeHandle, useEffect, useState, ReactNode, ReactElement } from 'react'
import { Message, MessageData } from '../interfaces/Message'
import { Send } from '../interfaces/Send';
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark} from 'react-syntax-highlighter/dist/esm/styles/prism';
import { ScrollBar } from '../interfaces/ScrollBar';
import CopyButton from './CopyButton';
let divHeight = 0

export default forwardRef<Message>(function MessageContent(props, ref) {
    const {pid, content, startTyping, doneSent, scrollToBottom, isWrong, resend} = props as MessageData & Send & ScrollBar
    const [subContent, setSubContent] = useState("")
    const [showButtons, setShowButtons] = useState(false)
    const [typing, setTyping] = useState(false)
    const divRef = useRef(null)
    
    let timeoutFunction: NodeJS.Timer
    let index = 1;
    let i = 0;

    useEffect(() => {
        if(i === 0) {
            if(startTyping) {
                setTyping(true)
                if(content.trim() === "|") {
                    setSubContent(content)
                } else {
                    if(!content.startsWith('An error occurred.')) {
                        handleTyping(content)
                    }
                    else {
                        setTyping(false)
                        setSubContent(content)
                    }
                }
            } else {
                setTyping(false)
                setSubContent(content)
            }
            i++
        }
    },[])

    
    useEffect(() => {
        //监听窗口高度并将滚动条置底
        const resizeObserver = new ResizeObserver((entries) => {
          entries.forEach((entry) => {
            if(divHeight !== entry.contentRect.height) {
                scrollToBottom()
            }
            divHeight = entry.contentRect.height
          })
        })
    
        if(divRef.current)
            resizeObserver.observe(divRef.current)
        
        return () => {
            if(divRef.current)
                resizeObserver.unobserve(divRef.current)
        }
    },[])

    // Save or Submit
    const saveOrSubmit = () => {
        resend && resend(content, pid??"")
        setShowButtons(false)
    }

    const handleTyping = (content:string) => {
        timeoutFunction = setInterval(()=> {
            setSubContent(prevData => content.substring(0, index))
            if(index > content.length - 1) {
                clearInterval(timeoutFunction)
                doneSent?.()
                setTyping(false)
            } else {
                index++
            }
        }, 25) //控制打字速度
    }

    useImperativeHandle(ref, // forwarded ref
        function () {
            return {
                show() {
                    setShowButtons(true)
                },
                hasButtonsShown() {
                    return showButtons
                },
            } // the forwarded ref value
        }, [showButtons])

    // Add the CodeCopyBtn component to our PRE element
    const Pre = ({children}:{children: ReactNode[]}) => 
        <pre className="codePre scrollbar-primary">
            <CopyButton children={children}></CopyButton>
            {children}
        </pre>

    return (
        <div ref={divRef} className="btn-group MessageContent" style={{display:"flex",flexDirection:"column", gap:"0.75rem", width:"100%"}}>
            <div className={isWrong?"btn-group-vertical WrongMessage":"btn-group-vertical"} role="group" aria-label="Vertical button group" >
                <ReactMarkdown className={typing?"markdown-cursor ReactMarkdown":"ReactMarkdown"} children={subContent} components={{
                    pre:Pre,
                    code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || '')
                        return !inline && match ? (
                            <SyntaxHighlighter
                                {...props}
                                children={String(children).replace(/\n$/, '')}
                                style={a11yDark}
                                language={match[1]}
                                PreTag="div"
                            />
                        ) : (
                            <SyntaxHighlighter
                                {...props}
                                children={String(children).replace(/\n$/, '')}
                                style={a11yDark}
                                language={"java"}
                                PreTag="div"
                            />
                        )
                    }
                    
                }}/>
            </div>
            <div style={{width:"100%",marginTop:"0.5rem", textAlign:"center", justifyContent:"center", display:showButtons?"flex":"none"}}>
                <button type="button" className="btn btn-success GreenButton" style={{marginRight:"8px"}} onClick={saveOrSubmit}>Save & Submit</button>
                <button type="button" className="btn btn-outline-secondary" onClick={() => {setShowButtons(false)}}>Cancel</button>
            </div>
        </div>
    )
})

 