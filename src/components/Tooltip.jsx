import React from 'react'

export default function Tooltip({ text }) {
    return (
        <div className="z-50 bg-base-300 p-2 rounded-md group-hover:flex hidden absolute top-1/2 -translate-y-1/2 -right-2 translate-x-full">
            <span className=" whitespace-nowrap">{text}</span>
            <div className="bg-inherit rotate-45 p-1 absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2"></div>
        </div>
    )
}


export const AnotherTooltip = ({ text }) => {
    return (
        <div className='group-hover:flex items-center justify-center capitalize rounded-md hidden bg-base-300 p-2 pl-3 absolute left-[115%] w-[280px] lg:w-[220px] top-[50%] -translate-y-[50%] transition'>
            {text}
            <div className="bg-inherit rotate-45 p-1 absolute top-1/2 -translate-y-1/2 left-0 -translate-x-1/2"></div>
        </div>
    )
} 
