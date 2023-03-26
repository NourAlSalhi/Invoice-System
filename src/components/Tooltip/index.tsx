import React from 'react'

type Props = {
    message: string;
    children: JSX.Element
}

export function Tooltip({ message, children }: Props) {
    return (
        <div className="group relative  truncate">
            {children}
            <span className="absolute top-10 scale-0 transition-all rounded bg-gray-800 p-2 text-xs text-white group-hover:scale-100">{message}</span>
        </div>
    )
}

export default Tooltip
