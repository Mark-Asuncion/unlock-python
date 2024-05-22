import React, { useState } from 'react';
import { Question } from '../Utils/IQuestionnaire';

export function Multi({ question, setAnswer }: { question: Question, setAnswer: any }) {
    return (
        <div className='w-max m-auto rounded-md bg-white p-6 my-12'>
            {
                question.q.map((v) => {
                    if (v.type == "p") {
                        return <p className="my-2">{ v.content }</p>
                    }
                    else if(v.type == "code") {
                        return <div className="p-2 bg-black text-white rounded-md">
                                <code><pre>{ v.content }</pre></code>
                            </div>
                    }
                })
            }
            <div className='flex flex-row gap-2 justify-evenly mt-10'>
            {
                    question.choices!.map((v) => {
                        return <button className='p-2 border border-accent hover:bg-accent hover:text-white rounded-md'
                                    onClick={() => setAnswer(v)}>
                                { v }
                            </button>
                    })
            }
            </div>
        </div>
    )
}
