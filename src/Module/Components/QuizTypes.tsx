import React, { useState } from 'react';
import { Question } from '../Utils/IQuestionnaire';

export function Multi({ question, setAnswer, showAns }: { question: Question, setAnswer: any, showAns: boolean }) {
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
            <div className='flex flex-row gap-2 mt-10'>
            {
                    question.choices!.map((v) => {
                        let cl = 'p-2 border grow border-accent rounded-md';
                        if (showAns && v == question.answer) {
                            cl += ' bg-accent text-white';
                        }
                        else {
                            cl +=' hover:bg-accent hover:text-white';
                        }
                        return <button className={cl}
                            onClick={() => {
                                if (!showAns)
                                    setAnswer(v)
                            }}>
                                { v }
                            </button>
                    })
            }
            </div>
        </div>
    )
}

export function Fill({ question, setAnswer, showAns }: { question: Question, setAnswer: any, showAns: boolean }) {

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
            <div className='w-auto m-auto mt-12'>
                {
                    (showAns)? <input type="text"
                        className='rounded-md ring-1 ring-accent w-[100%] p-2'
                        onKeyDown={(e) => {
                            if (e.key == "Enter") {
                                const v = e.currentTarget.value;
                                e.currentTarget.value = "";
                                setAnswer(v);
                            }
                        }}
                        />:<input type="text"
                            disabled
                            className='rounded-md ring-1 ring-accent w-[100%] p-2'
                            value={question.answer}
                            />
                }
            </div>
        </div>
    )
}
