import React from 'react'

export default function Tooltip({ text }) {
    return (
        <div class="z-50 bg-base-300 p-2 rounded-md group-hover:flex hidden absolute top-1/2 -translate-y-1/2 -right-2 translate-x-full">
            <span className=" whitespace-nowrap">{text}</span>
            <div className="bg-inherit rotate-45 p-1 absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2"></div>
        </div>
    )
}
