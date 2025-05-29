import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Cookies from "js-cookie";
const GetAllUser = () => {
    const [allUser, setAllUser] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        const allUsers = async () => {
            try {
                setLoading(true);
                const token = Cookies.get("jwt");
                const response = await axios.get("/api/user/allUsers", {
                    credentials: "include",
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setLoading(false);
                setAllUser(response.data);
                // localStorage.setItem("chatApp",JSON.stringify(response.data));
                
            }
            catch (err) {
                console.log("Error in GetAllUser : " + err);
            }
        }
        allUsers();
    }, [])

    return [allUser,loading];
}

export default GetAllUser
