import React from 'react'
import User from './User';
import GetAllUser from '../../context/GetAllUser';
const Users = () => {
    const [allUser, loading] = GetAllUser();
    return (
        <div className='flex flex-col mx-4 pb-14 gap-7 mt-36'>
            {allUser.map((user, index) => (
                <User key={index} user={user} />
            ))}
            
        </div>
    )
}

export default Users
