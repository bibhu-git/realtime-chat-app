import React, { useState } from 'react'
import useConversation from '../Zustand/UseConversation'
import GetAllUser from '../../context/GetAllUser';
import toast from 'react-hot-toast';
const Search = () => {
    const {setSelectedConversation} = useConversation();
    const [search, setSearch] = useState('');
    const [allUser] = GetAllUser();
    const handleSubmit = (e) => {
        e.preventDefault();
        if(!search) return;
        const conversation = allUser.find((user) => {
          return user.fullName?.toLowerCase().includes(search.toLowerCase())
        });
        console.log(conversation);
        if(conversation)
        {
            setSelectedConversation(conversation);
            setSearch('');
        }
        else{
            toast.error("user not found!");
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <label className="input input-bordered flex items-center gap-2 bg-gray-800 border mx-1 my-3 rounded-xl">
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} className="grow text-white" placeholder="Search" />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70 text-white"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
            </label>
        </form>
    )
}

export default Search
