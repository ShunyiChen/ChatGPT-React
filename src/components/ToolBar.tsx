
import {getIcon} from "../App"

interface Props {
    text: string
    menuClickHandle: () => void
    plusClickHandle: () => void
}

function ToolBar({text, menuClickHandle, plusClickHandle}: Props) {
    return (
        <div className="hstack gap-3 ToolBar">
            <div className="p-2" style={{width: "10%", textAlign: "left"}}>
                <button className="btn toolBarButton" onClick={menuClickHandle}>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </button>
            </div>
            <div className="p-2" style={{width: "80%", textAlign:"center", color: "rgb(236, 236, 241)"}}>
                {text}
            </div>
            <div className="p-2" style={{width: "10%", textAlign: "right"}}>
                <button className="btn toolBarButton" onClick={plusClickHandle}>
                    <i className="fa fa-plus" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    )
}

export default ToolBar