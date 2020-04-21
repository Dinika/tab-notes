import { TNote } from "../../../constants";
import "./styles.css";
import { useState, useEffect } from "react";
import React from "react";

export function Note({ note }: { note: TNote }) {
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    setShowAnswer(false);
  }, [note]);

  const answer = showAnswer ? (
    <div className="answer">{note.answer}</div>
  ) : (
    <div
      className="show"
      role="button"
      onClick={(e) => {
        setShowAnswer(true);
      }}
    >
      Show
    </div>
  );

  return (
    <div className="note">
      <h1 className="question">{note.question}</h1>
      {answer}
    </div>
  );
}
