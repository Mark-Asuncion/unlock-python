import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ITutorial } from "../Utils/ITutorial";

export default function Tutorials() {
    const [tutorials, setTutorials] = useState([]);
    const navigate = useNavigate();
    const fetchData = useCallback(async()=> {
        const r = await fetch("/tutorial.json")
        if (!r.ok) {
            return;
        }
        const j = await r.json();
        setTutorials(j);
    }, []);

    useEffect(() => {
        if (tutorials.length === 0) {
            fetchData();
        }
    });

    function openTutorial(id: number) {
        navigate("/tutorial/"+id)
    }

    return (
        <>
            {
                tutorials.map((v: ITutorial, i) => {
                    return (
                        <div className="p-3 rounded-md shadow-sm shadow-gray-400" onClick={() => openTutorial(i)}>
                            <img className="w-[100%] h-32 bg-contain mb-6"
                                src={v.img} alt="snake" />
                            <h1 className="text-xl">{v.title}</h1>
                        </div>
                    )
                })
            }
        </>
    )
}
