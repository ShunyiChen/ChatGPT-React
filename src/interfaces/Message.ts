export interface Message {
    show: () => void
    hasButtonsShown: () => boolean
}

export interface MessageData {
    message_id?: string
    pid?: string
    page?: number
    page_total?: number
    isChatGPT: boolean
    role: string
    content: string
    isNew?: boolean
    startTyping: boolean
    isWrong?: boolean
}