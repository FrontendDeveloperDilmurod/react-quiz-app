import React, { useEffect } from 'react'

function Timer({ dispatch, seconds }) {
    let minut = Math.floor(seconds / 60)
    let second = seconds % 60

    useEffect(() => {
        const interval = setInterval(() => {
            dispatch({ type: "tick" })
        }, 1000)

        return () => {
            clearInterval(interval)
        }
    }, [dispatch])

    return (
        <div className='timer'>
            {minut < 10 ? "0" + minut : minut}:
            {second < 10 ? "0" + second : second}
        </div>
    )
}

export default Timer

// `addd`