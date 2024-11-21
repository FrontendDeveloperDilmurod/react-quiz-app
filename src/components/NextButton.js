import React from 'react'

export default function NextButton({answer, dispatch, numQuestions, index}) {
    if (answer === null) return null
    if (index === numQuestions - 1) {
        return <div>
            <button className="btn btn-ui" onClick={() => dispatch({ type: "finish" })}>Finish</button>
        </div>
    }

    return (
        <div>
            <button className="btn btn-ui"
                onClick={() => dispatch({ type: "nextQuestion" })}>
                Next
            </button>
        </div>
    )
}
