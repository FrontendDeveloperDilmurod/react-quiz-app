import React from 'react'

export default function Options({ answer, dispatch, question }) {
    const hasAnswer = answer !== null

    return (question.options.map((option, index) => {
        return <button
            className={`btn btn-option ${index===answer ? "answer" : ""}
                ${hasAnswer ? (index === question.correctOption ? "correct" : "wrong") : ""
                } `}
            onClick={() => dispatch({ type: "newAnswer", payload: index })}
            key={index}
            disabled={hasAnswer}>

            {option}

        </button>
    })

    )
}
