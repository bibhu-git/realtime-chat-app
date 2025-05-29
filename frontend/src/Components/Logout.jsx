import React from 'react'
import { CiLogout } from "react-icons/ci";
import Cookies from 'js-cookie';
import toast from 'react-hot-toast';
const Logout = () => {
    const  handleLogout = () => {
       try{
        localStorage.removeItem('chatApp');
        Cookies.remove("jwt");
        window.location.reload();
        toast.success("Logout Successfully..");
       }
       catch(err)
       {
        console.log("Error in logout : "+err);
       }

    }
    return (
        <div>
            <div className='h-12 w-[385px] z-50 bg-gray-700 py-2 px-4 fixed bottom-0 left-0'>
                <CiLogout onClick={handleLogout} className='text-3xl text-white' />
            </div>
        </div>
    )
}

export default Logout
