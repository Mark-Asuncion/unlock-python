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
                        <div className="rounded-md shadow-sm shadow-gray-400
                            w-[max-content] h-[min-content]" onClick={() => openTutorial(i)}>
                            <img className="w-64 h-44 bg-contain rounded-tl-md rounded-tr-md"
                                src={v.img} alt="snake" />
                            <div className="p-3">
                                <h1 className="text-xl mb-0">{v.title}</h1>
                                {/* <p className="text-sm mt-0">Not Read</p> */}
                            </div>
                        </div>
                    )
                })
            }
        </>
    )
}
