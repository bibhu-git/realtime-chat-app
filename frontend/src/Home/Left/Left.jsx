import React from 'react'
import Users from './Users';
import Logout from '../../Components/Logout';
import Search from './Search';

const Left = () => {
    return (
        <div className='w-[25%] max-h-screen overflow-scroll bg-gray-900 relative no-scrollbar'>
            {/* Search */}
            <div className='w-[385px] fixed top-0 left-0 bg-gray-900 z-50 h-32'>
                <Search/>
                {/* Message */}
                <div className='text-lg  px-3 font-semibold text-white bg-slate-700 p-1 rounded-lg mx-1'>
                    Messages
                </div>
            </div>
            {/* chat Users */}
            <Users/>
            {/* logout */}
            <Logout/>
        </div>
    )
}

export default Left
