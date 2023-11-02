export interface Send {
    send?: (text:string, onCallback: () => void) => void
    doneSent?: () => void
    openSavingKeyModal?: () => void
    openAboutModal?: () => void
    showRegenerateButton?: () => void
    regenerateResponse?: () => void
    resend?: (message: string, pid: string) => void
}