import React from 'react'

function FinishScreen({ point, maxPossibablePoints, highScore, dispatch }) {
    const percentage = Math.ceil(point * 100 / maxPossibablePoints)
    let emoji
    if (percentage === 100) emoji = "😎"
    else if (percentage >= 80) emoji = "😍"
    else if (percentage >= 50) emoji = "😒"
    else if (percentage > 0) emoji = "😂"
    else if (percentage === 0) emoji = "🤦‍♂️"


    return (
        <>

            <p className='result'>
                <span>{emoji}</span>
                Your score <strong>{point}</strong> out of {maxPossibablePoints} {percentage}%
            </p>
            <p className='highscore'>
                <strong>Your Highscore: {highScore}%</strong>
            </p>
            <p>
                <button className='btn btn-ui' onClick={() => dispatch({ type: "restart" })}>Restart</button>
            </p>
        </>
    )
}

export default FinishScreen