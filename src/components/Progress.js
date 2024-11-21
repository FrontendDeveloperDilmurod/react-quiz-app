import React from 'react'

export default function Progress({ numQuestions, index, point, maxPossibablePoints }) {
    return (
        <header className='progress'>
            <progress value={index} max={numQuestions} />
            <p>
                {index + 1} / {numQuestions}
            </p>
            <p>
                {point} / {maxPossibablePoints}
            </p>
        </header>
    )
}
