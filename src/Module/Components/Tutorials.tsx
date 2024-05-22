import { useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ITutorial } from "../Utils/ITutorial";
import { USER, UserInfo } from "../Utils/UserSession";
import { useAtom } from 'jotai';

interface TutorialInfo extends ITutorial {
    isRead: boolean
}

// async function readStatus(user: UserInfo,t: TutorialInfo) {
//     const ts = btoa(JSON.stringify(t).substring(0,20));
//     const status = await fetch(`/.netlify/functions/tutorial-status?tid=${ts}&uid=${user.id}`);
//     if (status.ok) {
//         const d = await status.json();
//         return (d.isRead)? d.isRead:false;
//     }
//     return false;
// }

export default function Tutorials() {
    // const [user] = useAtom(USER);
    const [tutorials, setTutorials] = useState<TutorialInfo[]>([]);
    const navigate = useNavigate();
    const fetchData = useCallback(async()=> {
        const r = await fetch("/tutorial.json")
        if (!r.ok) {
            return;
        }
        const j = (await r.json()) as TutorialInfo[];
        // j.forEach(async (v) => {
        //     v.isRead = await readStatus(user, v);
        // });
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
