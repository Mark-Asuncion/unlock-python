import React, { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from './Components/Header';
import { Fill, Multi } from './Components/QuizTypes';
import { IQuestionnare, Question } from './Utils/IQuestionnaire';

function ShowAns({question, answer }:{ question: Question, answer: string }) {
    if (question.answer == answer) {
        return (
            <span className='text-xl text-accent text-center'>Answer is Correct</span>
        )
    }
    return (
        <span className='text-xl text-rose-600 text-center'>Answer is { question.answer }</span>
    )
}

function CreateQ(showAns: boolean, question: Question, setAnswer: any) {
    if (question.type == "mult") {
        return (
            <Multi question={question}
                setAnswer={setAnswer}
                showAns={showAns}
            />
        )
    }
    else if (question.type == "fill") {
        return (
            <Fill question={question}
                setAnswer={setAnswer}
                showAns={showAns}
            />
        )
    }
    return ( <></> )
}

function getPoints(answers: string[], questionnaire: IQuestionnare | {}) {
    if ( Object.keys(questionnaire).length === 0 ) {
        return 0;
    }
    const q = questionnaire as IQuestionnare;
    let score = 0;
    q.questions.forEach((v, i) => {
        if (v.answer === answers[i]) {
            score++;
        }
    });
    return score;
}

export default function Quiz() {
    const [questionnaire, setQuestionnaire] = useState<IQuestionnare | {}>({});
    const [answers, setAnswers] = useState<string[]>([]);
    const [qnum, setQNum] = useState(0);
    const [showAns, setShowAns] = useState(false);
    const title = useParams().title;

    function countAnswers() {
        let c = 0;
        answers.forEach((v) => {
            if (typeof(v) == "string") {
                c++;
            }
        })
        return c;
    }

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
                <div className='my-6 mx-auto w-max font-bold text-2xl'>
                    <span className='text-accent'>{countAnswers()}</span>
                    <span> of {q.questions.length}</span>
                </div>

                <div className='m-auto w-max'>
                    <span className='text-xl text-accent text-center'>Score: { getPoints(answers, questionnaire) }</span>
                </div>
                
                <div className='m-auto w-max'>
                    {
                        ( showAns )? <ShowAns question={q.questions[qnum]} answer={answers[qnum]} />:<> </>
                    }
                </div>

                <div className='w-[80%] m-auto flex flex-col'>
                    {
                        CreateQ(showAns, q.questions[qnum], (v: string) => {
                            setAnswers(prev => {
                                prev[qnum] = v
                                return prev;
                            });
                            setShowAns(true);
                            // setQNum(prev => prev + 1);
                        })
                    }
                    <button className='m-auto font-bold text-accent ring-accent ring-1 rounded-md
                        hover:bg-accent hover:text-white p-3'
                        onClick={() => {
                            if (answers[qnum] != undefined) {
                                setQNum(prev => prev + 1);
                                setShowAns(false);
                            }
                        }}>
                        NEXT
                    </button>
                </div>
            </div>
        )
    }
    return (<></>)
}
