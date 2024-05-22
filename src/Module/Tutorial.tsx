import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "./Components/Header";
import TutorialSidebar from "./Components/TutorialSidebar";
import { ITutorial } from "./Utils/ITutorial";
import { createTable } from "./Utils/Table";
import Oval from 'react-loading-icons/dist/esm/components/oval';

function QuizButton({ available, title }: { available: string[], title: string }) {
    const navigate = useNavigate();
    // assumes title always starts with 'Python'
    const t = title.substring(6).toLowerCase().trim();
    console.log(available, t);
    let id = -1
    available.forEach((v, i) => {
        if (v === t) {
            id = i
        }
    });

    if (id !== -1) {
        const qdata = available[id].split(' ').join('');
        return (
            <div className="w-[100%] p-3 hover:bg-accent
                text-accent hover:text-white shadow-sm shadow-gray-200
                text-3xl font-bold"
                onClick={() => navigate(`/quiz/${qdata}`)}>
                <h1>QUIZ</h1>
            </div>
        )
    }
    return (
        <>
        </>
    )
}

export default function Tutorial() {
    const [tutorial, setTutorial] = useState<ITutorial | {}>({});
    const [availableQ, setAvailableQ] = useState<string[]>([]);
    const id = Number(useParams().id);
    const [ othersT, setOthersT ] = useState<[number, ITutorial][]>([]);

    const fetchData = useCallback(async ()=> {
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
    }, []);

    const fetchAvailQ = useCallback(async () => {
        const r = await fetch("/questions/available.txt");
        if (!r.ok) {
            return;
        }
        const j = await r.text();
        setAvailableQ(j.split("\n"));
    }, []);

    useEffect(() => {
        if (Object.keys(tutorial).length === 0) {
            fetchData();
            fetchAvailQ();
        }
    });

    if (Object.keys(tutorial).length !== 0) {
        const t = tutorial as ITutorial;
        return (
            <div>
                <Header />
                <div className="flex flex-row gap-10">
                    <div className="h-[1fr] bg-gray-200">
                        <TutorialSidebar tutorials={othersT} rerender={() => {
                            setTutorial({});
                            setOthersT([]);
                        }}/>
                        <QuizButton available={availableQ} title={t.title} />
                    </div>
                    <div className="m-auto my-6 w-[60%]">
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
            <Oval stroke='black' width={256} height={256} className='m-auto mt-[15%]'/>
        </>
    )
}
