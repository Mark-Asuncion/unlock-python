import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Components/Header";
import TutorialSidebar from "./Components/TutorialSidebar";
import { ITutorial } from "./Utils/ITutorial";
import { createTable } from "./Utils/Table";

export default function Tutorial() {
    const [tutorial, setTutorial] = useState<ITutorial | {}>({});
    const navigate = useNavigate();
    const id = Number(useParams().id);
    const [ othersT, setOthersT ] = useState<[number, ITutorial][]>([]);

    const fetchData = async ()=> {
        const r = await fetch("/tutorial.json")
        if (!r.ok) {
            return;
        }
        const j: ITutorial[] = await r.json();
        setTutorial(j[id]);
        let o: [number, ITutorial][] = [];
        j.forEach((v, i) => {
            if (i == id) {
                return;
            }
            o.push([i, v]);
        });
        setOthersT(o);
    };

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
                <div className="grid grid-cols-[10%_1fr]">
                    <div>
                        <TutorialSidebar tutorials={othersT} rerender={() => {
                            setTutorial({});
                            setOthersT([]);
                        }}/>
                    </div>
                    <div className="m-auto my-6 w-[80%]">
                        <h1 className="text-4xl font-bold my-7">{ t.title }</h1>
                        <div className='w-[100%] h-1 bg-accent rounded-full'/>
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
