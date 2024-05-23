import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ITutorial } from '../Utils/ITutorial';

export default function TutorialSidebar({ tutorials, rerender }: {
    tutorials: [number, ITutorial ][],
    rerender: (id: number) => void
}) {
    const navigate = useNavigate();
    if (tutorials.length != 0)
    return (
        <div className='w-max text-white flex flex-col'>
            {
                tutorials.map((v, i) => {
                    return <a
                        key={i}
                        className='p-2 bg-gray-200 hover:bg-gray-300 text-black
                        text-left'
                        onClick={() => {
                            navigate(`/tutorial/${v[0]}`);
                            rerender(v[0]);
                        } }
                        >
                        {'↪ ' +  v[1].title }
                    </a>
                })
            }
        </div>
    )
    else
    return (
        <>
        </>
    )
}
