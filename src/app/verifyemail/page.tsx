'use client';


import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import axios from 'axios';
import Link from 'next/link';


const Page = () => {

    // const router = useRouter();

    const [token, setToken] = React.useState('');
    const [verify, setVerify] = React.useState(false);
    const [error, setError] = React.useState('');


    const verifyEmail = async () => {
        try {
            const response = await axios.post('/api/user/verifyemail', { token });
            console.log(response.data);
            setVerify(true);
        } catch (error: any) {
            setError(error.response.data.message);
            console.log(error.response.data);
        }
    }

    //get token from url
    useEffect(() => {
        const urlToken: any = new URLSearchParams(window.location.search.split('=')[1]);
        // const token = urlToken.get('token');
        setToken(urlToken || '');

        // console.log(urlToken);
        // const { query } = router;
        // const urlToken1 = query.token;

    }, []);

    useEffect(() => {
        if (token) {
            verifyEmail();
        }
    }, [token]);


    return (
        <>
            <div className='text-center mt-40 flex flex-col'>
                <h1 className="text-7xl bg-gradient-to-r from-pink-500 via-purple-500 to-orange-500 text-transparent bg-clip-text rounded-md p-2 w-1/2">
                    Verify Email
                </h1>
                <h2 className="text-slate-100">
                    {token ? `${token}` : 'No token found'}
                </h2>
                <h2 className="text-slate-100">
                    {
                        verify && (
                            <div>
                                <h2>verified</h2>
                                <Link href="/login">Login</Link>
                            </div>
                        )
                    }

                    {
                        error && (
                            <h2 className='text-4xl'>{error}</h2>
                        )
                    }
                </h2>

            </div>
        </>
    );
}
export default Page;



