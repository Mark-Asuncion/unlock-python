import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [token,setToken] = useState({});

    const login = useGoogleLogin({
        onSuccess: async tokenResponse => {
            const s = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
                method: "GET",
                headers: {
                    "Authorization": `${tokenResponse.token_type} ${tokenResponse.access_token}`,
                    "Accept": "application/json"
                }
            });
            if (s.ok) {
                const userInfo = s.json();
                console.log(userInfo);
            }
            setToken(tokenResponse);
        },
        prompt: "consent",
    });

    const navigate = useNavigate();
    useEffect(() => {
        if (Object.keys(token).length === 0) {
            return;
        }
        navigate("/");
    });

    return ( <>
            <div className='mx-auto w-1/3 rounded-md
                shadow-lg bg-white
                p-10 my-24'>
                <h1 className='text-6xl mb-1'>Sign In</h1>
                <p className='mb-5'>Use your google account</p>
                <button
                    className='p-10 mx-auto w-[100%] rounded-lg
                    shadow-md bg-white hover:bg-blue-100
                    text-2xl text-white flex justify-center
                    border-2 border-blue-200'
                    onClick={() => login() }>
                    <img src="https://cdn4.iconfinder.com/data/icons/logos-brands-7/512/google_logo-google_icongoogle-512.png" alt="Google"
                        className='w-16 aspect-square' />
                </button>
        </div>
        <code> { JSON.stringify(token) } </code>
    </>
    )
}
