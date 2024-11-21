import React from 'react'
import Options from './Options'

export default function Questions({ questions, index, answer, dispatch, question }) {
  return (
    <div className='options'>
       <h3>{question.question}</h3> {/*2chi question bu db digi question */}
      <Options
        index={index}
        answer={answer}
        dispatch={dispatch}
        question={question} />
    </div>
  )
}
