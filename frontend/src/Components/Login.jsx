import React from 'react'
import { useForm } from "react-hook-form";
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
const Login = () => {
    const [authUser,setAuthUser] = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = (data) => {
        try {
            const userInfo = {
                email: data.email,
                password: data.password,
            }
            axios.post('/api/user/login', userInfo).then(Response => {
                localStorage.setItem("chatApp", JSON.stringify(Response.data));
                window.location.reload();
                toast.success("Login Successfully..");
            }).catch(error => {
                console.log("Error in login "+error);
                toast.error("Invalid username or password");
            })

            setAuthUser(Response.data);
        }
        catch (err) {
            console.log(err);
        }
    };
    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-[400px] h-[300px] text-center rounded-md shadow-md'>
                <h2 className='text-3xl mt-7 font-semibold'>Text <span className='text-green-500'>App</span></h2>
                <div className='mt-10 space-y-3'>

                    <input type="email" {...register("email", { required: true })} placeholder="Email" className="input focus:outline-none input-bordered w-full max-w-xs" />
                    <br />
                    {errors.email && <span className='text-red-500'>This field is required</span>}
                    <input type="password" {...register("password", { required: true })} placeholder="Password" className="input focus:outline-none input-bordered w-full max-w-xs" />
                    <br />
                    {errors.password && <span className='text-red-500'>This field is required</span>}

                </div>
                <div className='flex justify-center my-4 gap-7'>
                    <p className='text-lg'>New user?<Link to={'/signup'} className='text-blue-500 underline'>Signup</Link></p>
                    <button className='bg-green-500 p-2 text-white rounded-md '>Login</button>
                </div>
            </form>

        </div>
    )
}

export default Login
