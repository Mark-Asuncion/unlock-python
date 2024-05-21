import React, { useEffect, useState } from 'react';
import { useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [token,setToken] = useState({});
    const navigate = useNavigate();

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
                const userInfo = await s.json();
                const spl = (userInfo.name as string).split(' ');
                const lname = spl[spl.length-1];
                let fname = "";
                spl.forEach((v, i) => {
                    if (i+1 == spl.length) {
                        return;
                    }
                    fname += v + ' ';
                });
                console.log('userInfo: ', userInfo);
                const firstname = (userInfo.given_name != undefined)? userInfo.given_name:fname;
                const lastname = (userInfo.family_name != undefined)? userInfo.family_name:lname;
                const reqBody = {
                    email: userInfo.email,
                    firstname,
                    lastname
                };
                const logRes = await fetch("/.netlify/functions/users", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(reqBody)
                });
                if (logRes.ok) {
                    console.log(userInfo);
                    sessionStorage.setItem("email", userInfo.email);
                    navigate("/");
                }
                else {
                    window.location.reload();
                }
            }
            setToken(tokenResponse);
        },
        prompt: "consent",
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
