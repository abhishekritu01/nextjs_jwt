'use client';

import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";


const Page = () => {
    const router = useRouter();

    const [user, setUser] = useState({
        username: "",
        password: "",
        email: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);


    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/user/signup", user);
            if (response.status === 200) {
                toast.error("Sign up successful");
            }
            router.push("/login");

        } catch (error) {
            toast.error("An error occurred");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.username.length > 0 && user.password.length > 0 && user.email.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);

    return (
        <>

            <div className="container mx-auto flex flex-col gap-2 my-20">
                <h1 className="text-4xl bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-transparent bg-clip-text rounded-md p-2 w-1/2">
                    Sign Up
                </h1>

                <h2 className="text-slate-100">
                    {loading ? "Loading..." : "Sign up for an account"}
                </h2>
                <input
                    type="text"
                    id="username"
                    placeholder="Username"
                    className="p-2 border w-1/2 text-black border-gray-300 rounded-md"
                    value={user.username}
                    onChange={(e) => setUser({ ...user, username: e.target.value })}
                />


                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="p-2 border w-1/2 text-black border-gray-300 rounded-md"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />

                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="p-2 border w-1/2 text-black border-gray-300 rounded-md"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />

                <button
                    className="p-2 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white w-1/2 text-white rounded-md"
                    onClick={onSignUp}
                >
                    {buttonDisabled ? "Fill in all fields" : "Sign Up"}
                </button>

                <button
                    className="p-2 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white w-1/2 text-white rounded-md"
                    onClick={() => router.push("/login")}
                >
                    Login
                </button>

            </div>

        </>
    );
}
export default Page;







