import { useEffect, useState } from 'react';
import { NavigateFunction, redirect, useNavigate } from "react-router-dom";
import Header from './Components/Header';
import Tutorials from './Components/Tutorials';
import { useAtom } from 'jotai';
import { USER, UserInfo } from './Utils/UserSession';

// @ts-ignore
async function checkSession(userInfo: UserInfo, setUserInfo: SetAtom<[SetStateAction<UserInfo>], void>,navigate: NavigateFunction, setOk) {
    const email = userInfo.email;
    if (email == null) {
        navigate("/login");
    }
    const resp = await fetch("/.netlify/functions/users?me=true&email="+email, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    });
    if (resp.ok) {
        const jresp = await resp.json();
        // console.log("jresp", jresp);
        setUserInfo(jresp);
        setOk(true);
    }
    else {
        navigate("/login");
    }
}

function Root() {
    const [user, setUser] = useAtom(USER);
    console.log("user", user);
    const [isSessionOk, setSessionOk] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        checkSession(user, setUser, navigate, setSessionOk);
    }, [navigate]);

    if (isSessionOk)
    return (
        <div className='w-[100%]'>
            <Header />
            <div className='p-2 w-[85%] m-auto mt-8'>
                <h1 className='text-6xl font-bold'>Learn</h1>
                <div className='flex flex-row flex-wrap gap-4 my-4'>
                    <div className='w-[100%] h-1 bg-accent rounded-full'/>
                    <Tutorials />
                </div>
            </div>
        </div>
    );
    else
    return (
        <p>Loading</p>
    )
}

export default Root;
