import { useEffect, useState } from 'react';
import { NavigateFunction, useNavigate } from "react-router-dom";
import Header from './Components/Header';
import Tutorials from './Components/Tutorials';

// @ts-ignore
async function checkSession(navigate: NavigateFunction, setOk) {
    const email = sessionStorage.getItem("email");
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
        console.log(jresp);
        sessionStorage.setItem("firstname", jresp.firstname);
        sessionStorage.setItem("lastname" ,  jresp.lastname);
        setOk(true);
    }
    else {
        navigate("/login");
    }
}

function Root() {
    const [isSessionOk, setSessionOk] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        checkSession(navigate, setSessionOk);
    }, [navigate]);

    if (isSessionOk)
    return (
        <div className='w-[100%]'>
            <Header />
            <div className='p-2 w-[85%] m-auto mt-8'>
                <h1 className='text-2xl font-bold'>Tutorials</h1>
                <div className='flex flex-row flex-wrap gap-4
                    justify-between my-4'>
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
