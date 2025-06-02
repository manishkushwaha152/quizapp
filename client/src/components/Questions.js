import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

/** Custom Hooks */
import { useFetchQuestion } from '../hooks/FetchQuestion';
import { updateResult } from '../hooks/setResult';

export default function Questions({ onChecked }) {
    const dispatch = useDispatch();
    const { trace, queue } = useSelector(state => state.questions);
    const result = useSelector(state => state.result.result);
    const [{ isLoading, serverError }] = useFetchQuestion();

    const questions = queue[trace]; //  Get current question
    const [checked, setChecked] = useState(result[trace] ?? undefined); // Load selected answer for current question

    /** Reset checked state when question changes */
    useEffect(() => {
        setChecked(result[trace] ?? undefined); //  Ensure correct selection per question
    }, [trace, result]);

    function onSelect(i) {
        setChecked(i); //  Update local state
        onChecked(i);
        dispatch(updateResult({ trace, checked: i })); //  Save selection in Redux
    }

    if (isLoading) return <h3 className='text-light'>Loading...</h3>;
    if (serverError) return <h3 className='text-light'>{serverError || "Unknown Error"}</h3>;

    return (
        <div className='questions' key={questions?.id}>
            <h2 className='text-light'>{questions?.question}</h2>

            <ul>
                {questions?.options.map((q, i) => (
                    <li key={i}>
                        <input
                            type="radio"
                            value={i}
                            name="options"
                            id={`q${i}-option`}
                            checked={checked === i} //  Maintain selection
                            onChange={() => onSelect(i)}
                        />
                        <label className='text-primary' htmlFor={`q${i}-option`}>{q}</label>
                        <div className={`check ${checked === i ? 'checked' : ''}`}></div>
                    </li>
                ))}
            </ul>
        </div>
    );
}
