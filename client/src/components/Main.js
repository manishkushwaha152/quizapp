import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Main.css';

export default function Main() {
    const navigate = useNavigate();

    function startQuiz() {
        navigate('/quiz');
    }

    function handleLogout() {
        localStorage.removeItem('user');
        navigate('/');
    }

    return (
        <div className='container'>
            <div className="logout-container">
                <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
            
            <h1 className='title text-light'>Quiz Instructions</h1>

            <ol>
                <li>You will be asked 10 questions one after another.</li>
                <li>10 points are awarded for the correct answer.</li>
                <li>Each question has three options. You can choose only one option.</li>
                <li>You can review and change answers before the quiz finishes.</li>
                <li>The result will be declared at the end of the quiz.</li>
            </ol>

            <div className='start'>
                <button className='btn' onClick={startQuiz}>Start Quiz</button>
            </div>
        </div>
    );
}