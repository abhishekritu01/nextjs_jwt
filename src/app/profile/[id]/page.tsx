import Link from "next/link";

export default function UserProfile({ params }: any) {
    console.log(params, "params");
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-6 bg-zinc-900">
            <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
                <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile</h1>
                <hr className="mb-4" />
                <p className="text-xl text-gray-600 mb-4">Profile page
                    <span className="p-2 ml-2 rounded bg-orange-500 text-black text-lg">{params.id}</span>
                </p>
                <Link href="/profile">
                    <p className="text-white font-bold py-2 px-4 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-500 hover:from-purple-600 hover:via-pink-600 hover:to-yellow-600">
                        Go back to profile
                    </p>
                </Link>
            </div>
        </div>
    )
}
