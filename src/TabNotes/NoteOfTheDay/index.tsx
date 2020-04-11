import React, { useEffect } from "react";
import { TNote, CategoryEnum } from "../constants";
import { Note } from "../NoteCategorySelector/Note";

interface NoteOfTheDayProps {
  onNoteAccepted: () => void;
  onNoteRejected: () => void;
}

export function NoteOfTheDay({
  onNoteAccepted,
  onNoteRejected,
}: NoteOfTheDayProps) {
  let newNote;
  console.log("Note of the day", newNote)
  useEffect(() => {
    newNote = {
      question: "Do I look fat in this dress",
      answer: "Not sure. David is hinting that I do",
    };
  }, []);
  return (
    <div className="note-category-selector">
      {newNote ? <Note note={newNote} /> : <p>Loading</p>}
    </div>
  );
}
