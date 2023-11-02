export interface Chat {
    loadChatHistory?: () => void
    setLightMode: (light: boolean) => void
    // chatBtns: ChatButtonClass[]
    getChatButtons: () => ChatButtonClass[]
    // setChatButtons: (chatBtns: ChatButtonClass[]) => void
    sysBtns: SystemButtonClass[]
    deleteChat: (chatId: string) => void
    alert: (text: string) => void

    //选中chatbutton事件
    checkButton: (index: number, id: string, text: string) => void
    //判断chatbutton是否选中
    isButtonChecked: (index: number) => boolean
    //New Chat
    newChat: () => void
    //Clean up
    cleanUp?: () => void
    //是否没有任何chatbutton被选中
    checksIfNoneIsChecked: () => boolean
    //取chat列表
    fetchChatList: () => void
}

export type ChatButtonClass = {
    chat_id: string
    text: string
    isNew?: boolean
}

export type SystemButtonClass = {
    text: string
    icon: string
    isOperable: boolean
    question?: string
}