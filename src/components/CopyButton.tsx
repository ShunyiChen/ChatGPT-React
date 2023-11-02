import { ReactElement, ReactNode, useEffect, useState } from "react"

interface Props {
    children: ReactNode[]
}

export default function CopyButton({children}:Props) {
    const [copied, setCopied] = useState("Copy")

    const handleClick = (sourcecode: string) => {
        navigator.clipboard.writeText(sourcecode);
        setCopied("✔ Copied");
        setTimeout(() => {
            setCopied("Copy");
        }, 2500);
    }

    return (
        <>
            <button className="btn btn-light copyButton"
                onClick={() => handleClick((children[0] as ReactElement)?.props?.children?.[0])}>
                {copied}
            </button>
        </>
    )
}