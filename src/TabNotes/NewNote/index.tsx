import React, { useState } from "react";
import { TNotes, CategoryEnum, TNote } from "../constants";

export function NewNote({
  notes,
  setNotes,
}: {
  notes: TNotes;
  setNotes: (notes: TNotes) => void;
}) {
  const [questionValue, setQuestionValue] = useState("");
  const [answerValue, setAnswerValue] = useState("");

  function onQuestionChange(event: any): void {
    setQuestionValue(event.target.value);
  }

  function onKeyPressed(event: any): void {
    if (event.which === 13) {
      onSubmit(event);
    }
  }

  function onAnswerChange(event: any): void {
    setAnswerValue(event.target.value);
  }

  function onSubmit(event: any): void {
    const newNote: TNote = {
      question: questionValue,
      answer: answerValue,
    };
    const newNotes = {
      ...notes,
      [CategoryEnum.UNKNOWN]: [...notes[CategoryEnum.UNKNOWN], newNote],
    };
    console.log("New notes", newNotes);
    setNotes(newNotes);
    setAnswerValue("");
    setQuestionValue("");
  }
  return (
    <div>
      <div>New note</div>
      <label>
        Question:{" "}
        <input
          className="question-input"
          type="text"
          onChange={onQuestionChange}
          onKeyPress={onKeyPressed}
          value={questionValue}
        />
      </label>
      Answer:{" "}
      <input
        className="answer-input"
        type="text"
        onChange={onAnswerChange}
        onKeyPress={onKeyPressed}
        value={answerValue}
      />
      <div role="button" onClick={onSubmit}>
        Save
      </div>
    </div>
  );
}
