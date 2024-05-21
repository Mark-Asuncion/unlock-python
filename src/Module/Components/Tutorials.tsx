import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ITutorial } from "../Utils/ITutorial";

export default function Tutorials() {
    const [tutorials, setTutorials] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        fetch("/tutorial.json")
            .then(async (r) => {
                if (r.ok) {
                    const j = await r.json();
                    setTutorials(j);
                }
            });
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
                                src="https://cdn.britannica.com/28/239528-050-D89C8118/reticulated-python-Malayopython-reticulatus.jpg" alt="snake" />
                            <h1 className="text-xl">{v.title}</h1>
                        </div>
                    )
                })
            }
        </>
    )
}
