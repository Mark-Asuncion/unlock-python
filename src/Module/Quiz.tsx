import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Components/Header';
import { Multi } from './Components/QuizTypes';
import { IQuestionnare, Question } from './Utils/IQuestionnaire';

function CreateQ(question: Question, setAnswer: any) {
    if (question.type == "mult") {
        return (
            <Multi question={question}
            setAnswer={setAnswer} />
        )
    }
    return ( <></> )
}

export default function Quiz() {
    const [questionnaire, setQuestionnaire] = useState<IQuestionnare | {}>({});
    const [answers, setAnswers] = useState<string[]>([]);
    const [qnum, setQNum] = useState(1);
    const title = useParams().title;

    const fetchQ = useCallback(async () => {
        const res = await fetch(`/questions/${title}.json`);
        if (res.ok) {
            const qs = await res.json() as IQuestionnare;
            setQuestionnaire(qs);
        }
    }, []);

    useEffect(() => {
        if (Object.keys(questionnaire).length === 0) {
            fetchQ()
        }
    });

    if (Object.keys(questionnaire).length !== 0) {
        const q = questionnaire as IQuestionnare;
        return (
            <div>
                <Header />
                { /* progress bar */ }
                <div className='w-[80%] m-auto'>
                    {
                        CreateQ(q.questions[qnum], (v: string) => {
                            setAnswers(prev => {
                                prev[qnum] = v
                                return prev;
                            });
                            setQNum(prev => prev + 1);
                        })
                    }
                </div>
            </div>
        )
    }
    return (<></>)
}
