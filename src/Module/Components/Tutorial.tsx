import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function Tutorial() {
    const [tutorial, setTutorial] = useState({});
    console.log(useParams());

    const fetchData = useCallback(async()=> {
        const r = await fetch("/tutorial.json")
        if (!r.ok) {
            return;
        }
        const j = await r.json();
        setTutorial(j);
    }, []);

    useEffect(() => {
        if (Object.keys(tutorial).length === 0) {
            fetchData();
        }
    });

    return (
        <>
        </>
    )
}
