import React from 'react'

export default function StartScreen({ numQuestions, dispatch }) {
    return (
        <div className='start'>
            <h2>Welcome to test your React Quiz!</h2>
            <h3> {numQuestions} Questions to test your React MAstery</h3>
            <button onClick={() => dispatch({ type: "start" })} className='btn'>Let's Start</button>
        </div>
    )
}
