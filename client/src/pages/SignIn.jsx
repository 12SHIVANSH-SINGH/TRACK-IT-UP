/* eslint-disable no-unused-vars */
import React from 'react'
import { useNavigate } from 'react-router-dom'

function SignIn() {
    const handleSubmit = (e) => {
        e.preventDefault()
    }

    const navigate = useNavigate();

    return (
        <div className="flex flex-col justify-center items-center mt-20">
            <div className="flex flex-col justify-center items-center border border-gray-300 p-6 rounded-2xl shadow-2xl bg-white w-full max-w-96
                            transition-all duration-300 hover:shadow-3xl hover:border-gray-500">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3 w-full">

                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-gray-700">Username</label>
                        <input type="text" placeholder="Username"
                            className="border border-gray-300 p-2 rounded-md transition-all duration-200 outline-none 
                                          focus:ring-2 focus:ring-gray-500 hover:bg-gray-100" />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label className="font-semibold text-gray-700">Password</label>
                        <input type="password" placeholder="Password"
                            className="border border-gray-300 p-2 rounded-md transition-all duration-200 outline-none 
                                          focus:ring-2 focus:ring-gray-500 hover:bg-gray-100" />
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <button type="submit"
                            className="bg-gray-800 mt-2 text-white p-2 w-[40%] rounded-md transition-all duration-300 
                                           hover:bg-gray-900 hover:scale-105 hover:opacity-90 cursor-pointer">
                            Sign In
                        </button>
                    </div>
                    <div className="text-center mt-1 text-gray-600">
                        Don&apos;t have an account? 
                        <button 
                            onClick={() => navigate('/signup')} 
                            className="text-gray-700 font-semibold ml-1 cursor-pointer hover:underline">
                            Sign Up
                        </button>
                    </div>
                </form>
            </div>

            {/* Delete & Sign Out Buttons Below the Form */}
            <div className="flex justify-between w-full max-w-96 mt-3">
                <button className="text-gray-700 font-semibold hover:underline cursor-pointer">
                    Delete
                </button>

                <button className="text-gray-700 font-semibold hover:underline cursor-pointer">
                    Sign Out
                </button>
            </div>
        </div>
    )
}

export default SignIn
