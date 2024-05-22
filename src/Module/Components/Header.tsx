import React from 'react';
import { useNavigate } from 'react-router-dom';
import pythonLogo from '../../Assets/python-logo.png';
import { useAtom } from 'jotai';
import { USER } from '../Utils/UserSession';

function bet() {
    window.open("https://1-xbet.ph/en", "_blank");
}

function getName() {
    const name = sessionStorage.getItem("firstname") + ' ' +
                 sessionStorage.getItem("lastname"); return name;
}

export default function Header() {
    const [user, _setUser] = useAtom(USER);
    const navigate = useNavigate();
    return (
        <div className='w-[100%] bg-accent text-white
            flex flex-row p-3'>

            <div className='bg-white rounded-full m-1 p-2' onClick={() => navigate("/") }>
                <img src={pythonLogo} alt="logo" className='w-auto h-auto'/>
            </div>
            <div className='bg-white rounded-full m-1 p-2' onClick={() => bet() }>
                <img src="/chac.jpeg" alt="logo" className='w-32 h-auto rounded-full'/>
            </div>
            <div className='my-auto ml-auto pr-4 text-lg font-bold'> <span>{ user.firstname + ' ' + user.lastname }</span> </div>
        </div>
    )
}
