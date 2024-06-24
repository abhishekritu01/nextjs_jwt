'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";

const Page = () => {
    const router = useRouter();

    const [user, setUser] = useState({
        password: "",
        email: "",
    });

    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);

    const onLogin = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/user/login", user);

            console.log(response, "response");
            if (response.status === 200) {
                toast.success("Login successful");
                router.push("/profile");
            }
        } catch (error) {
            toast.error("An error occurred");
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        setButtonDisabled(!(user.email.length > 0 && user.password.length > 0));
    }, [user]);

    return (
        <>
            <div className="container mx-auto flex flex-col gap-4 my-20 items-center">
                <h1 className="text-4xl bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-transparent bg-clip-text rounded-md p-2">
                    Login
                </h1>

                <h2 className="text-gray-600">
                    {loading ? "Processing..." : "Login"}
                </h2>

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
                    className={`p-2 ${buttonDisabled || loading ? 'bg-gray-400' : 'bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500'} text-white w-1/2 rounded-md`}
                    onClick={onLogin}
                    disabled={buttonDisabled || loading}
                >
                    {loading ? "Processing..." : "Login"}
                </button>
                <Link href="/sign-up" className="p-2 bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-white w-1/2 rounded-md text-center">

                    Register

                </Link>



            </div>
        </>
    );
}
export default Page;


