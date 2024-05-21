import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Components/Header";
import { ITutorial } from "./Utils/ITutorial";

export default function Tutorial() {
    const [tutorial, setTutorial] = useState<ITutorial | {}>({});
    const id = Number(useParams().id);

    const fetchData = useCallback(async()=> {
        const r = await fetch("/tutorial.json")
        if (!r.ok) {
            return;
        }
        const j: ITutorial[] = await r.json();
        setTutorial(j[id]);
    }, []);

    useEffect(() => {
        if (Object.keys(tutorial).length === 0) {
            fetchData();
        }
    });

    if (Object.keys(tutorial).length !== 0) {
        const t = tutorial as ITutorial;
        return (
            <div>
                <Header />
                <div className="w-[65%] m-auto mt-6">
                    <h1 className="text-2xl font-bold">{ t.title }</h1>
                </div>
            </div>
        )
    }
    return (
        <>
            <Header />
        </>
    )
}
