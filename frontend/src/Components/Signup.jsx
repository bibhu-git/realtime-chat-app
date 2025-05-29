import React from 'react'
import { useForm } from "react-hook-form"
import axios from 'axios';
import { useAuth } from '../context/AuthProvider';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
const Signup = () => {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [authUser, setAuthUser] = useAuth();
    const password = watch('password');
    const onSubmit = (data) => {

        const userInfo = {
            fullName: data.fullName,
            email: data.email,
            password: data.password,
        }
        const Response = axios.post('/api/user/signup', userInfo).then(Response => {
            localStorage.setItem("chatApp", JSON.stringify(Response.data));
            setAuthUser(Response.data);
            toast.success("Signup Successfully..");
        }).catch(error => {
            console.log(error);
            toast.error("Signup failed. Please try again.");
        })
       



    };
    return (
        <div className='h-screen w-full flex justify-center items-center'>
            <form onSubmit={handleSubmit(onSubmit)} className='w-[400px] min-h-[450px] text-center rounded-md shadow-md'>
                <h2 className='text-3xl mt-7 font-semibold'>Text <span className='text-green-500'>App</span></h2>
                <div className='mt-10 space-y-3'>
                    <input type="text" {...register("fullName", { required: true })} placeholder="Fullname" className="input focus:outline-none input-bordered w-full max-w-xs" />
                    <br />
                    {errors.fullName && <span className='text-red-500'>This field is required</span>}
                    <input type="email" {...register("email", { required: true })} placeholder="Email" className="input focus:outline-none input-bordered w-full max-w-xs" />
                    <br />
                    {errors.email && <span className='text-red-500'>This field is required</span>}
                    <input type="password" {...register("password", { required: true })} placeholder="Password" className="input focus:outline-none input-bordered w-full max-w-xs" />
                    <br />
                    {errors.password && <span className='text-red-500'>This field is required</span>}
                    <input
                        type="password"
                        {...register("conformPassword",
                            { required: 'Conform password is required', validate: value => value === password || "password do not match" })}
                        placeholder="Conform Password"
                        className="input focus:outline-none input-bordered w-full max-w-xs" />
                    <br />
                    {errors.conformPassword && <span className='text-red-500'>{errors.conformPassword.message}</span>}
                </div>
                <div className='flex justify-center my-4 gap-7'>
                    <p className='text-lg'>Have an account ?<Link to={"/login"} className='text-blue-500 underline'>Login</Link></p>
                    <button className='bg-green-500 p-2 text-white rounded-md '>Signup</button>
                </div>
            </form>

        </div>
    )
}

export default Signup
