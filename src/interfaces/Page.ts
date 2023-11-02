import { MessageData } from "./Message";

export interface Page {
    turnPage: (msg: MessageData) => void
}