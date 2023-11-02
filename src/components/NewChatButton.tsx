
interface Props {
    handleClick: () => void
}

function NewChatButton({handleClick} : Props) {

    return (
        <a className="NewChatButton border" role="link" onClick={handleClick}>
            <i className="fa fa-plus" aria-hidden="true"></i>New Chat
        </a>
    )
}

export default NewChatButton