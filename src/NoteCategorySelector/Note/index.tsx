import React, { useState } from 'react'
import { TNote } from '../../constants';

export function Note({note}: {note: TNote}) {
  const [showAnswer, setShowAnswer] = useState(false)

  const answer = showAnswer? (
    <div id="answer">
      {note.answer}
    </div>
    ): (
      <div id="show" role="button" onClick={(e) => {setShowAnswer(true)}}>
        Show
      </div>
  )

  return (
    <div id="note">
      <h1 id="question">{note.question}</h1>
      {answer}
    </div>
  );
}
