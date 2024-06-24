"use client";
import axios from "axios";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function ProfilePage() {
    const router = useRouter()
    const [data, setData] = useState("nothing")
    const [isClient, setIsClient] = useState(false)

    const logout = async () => {
        try {
            await axios.get('/api/user/logout')
            toast.success('Logout successful')
            router.push('/login')
        } catch (error: any) {
            console.log(error.message);
            toast.error(error.message)
        }
    }

    const getUserDetails = async () => {
        const res = await axios.post('/api/user/me')
        console.log(res.data.user._id, "response");
        setData(res.data.user._id)
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-zinc-900">
            <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile</h1>
                <hr className="mb-4" />
                <p className="text-gray-600 mb-4">Profile page</p>
                <h2 className={`p-2 rounded ${data === 'nothing' ? 'bg-red-500' : 'bg-green-500'} text-white text-center`}>
                    {data === 'nothing' ?
                        "Nothing" :
                        <Link href={`/profile/${data}`} className="font-bold">{data}</Link>
                    }
                </h2>
                <hr className="my-4" />
                <div className="flex justify-around w-full mt-4">
                    <button
                        onClick={logout}
                        className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Logout
                    </button>
                    <button
                        onClick={getUserDetails}
                        className="bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600 text-white font-bold py-2 px-4 rounded-full"
                    >
                        Get User Details
                    </button>
                </div>
            </div>
        </div>



    )
}