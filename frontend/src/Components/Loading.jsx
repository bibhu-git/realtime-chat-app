import React from 'react'

const Loading = () => {
    return (
        <div className='h-screen w-full flex items-center justify-center bg-slate-600'>
            <div className="flex flex-col gap-4 w-52">
                <div className="skeleton h-32 w-full"></div>
                <div className="skeleton h-4 w-28"></div>
                <div className="skeleton h-4 w-full"></div>
                <div className="skeleton h-4 w-full"></div>
            </div>
        </div>
    )
}

export default Loading
