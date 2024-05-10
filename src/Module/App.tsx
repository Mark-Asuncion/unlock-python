import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";

function Root() {
    const navigate = useNavigate();
    useEffect(() => {
        navigate("/login");
    });

    return (
        <p className='text-lg'>Root</p>
    );
}

export default Root;
