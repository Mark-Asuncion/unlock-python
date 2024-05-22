import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Components/Header";
import { ITutorial } from "./Utils/ITutorial";
import { createTable } from "./Utils/Table";

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
                <div className="w-[65%] m-auto my-6">
                    <h1 className="text-4xl font-bold my-7">{ t.title }</h1>
                    {
                        t.contents.map((v) => {
                            let element;
                            if (v.type === "h1") {
                                element = <h1 className="text-3xl font-bold my-3">{ v.content }</h1>
                            }
                            else if(v.type === "code") {
                                element = 
                                    <div className="p-2 bg-black text-white rounded-md">
                                        <code><pre>{ v.content }</pre></code>
                                    </div>
                            }
                            else if (v.type === "table") {
                                element = createTable(v.content);
                            }
                            else {
                                element = <p className="my-2">{ v.content }</p>
                            }
                            return element;
                        })
                    }
                </div>
            </div>
        )
    }
    return (
        <>
            <Header />
            <h1 className="text-3xl">Loading...</h1>
        </>
    )
}
