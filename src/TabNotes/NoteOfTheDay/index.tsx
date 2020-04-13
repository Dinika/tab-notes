import React, { useEffect, useState } from "react";
import { TNote, CategoryEnum } from "../constants";
import { Note } from "../NoteCategorySelector/Note";

interface NoteOfTheDayProps {
  onNoteAccepted: () => void;
  onNoteRejected: () => void;
}

interface IncomingNote {
  word: string;
  meaning: string;
}

export function NoteOfTheDay({
  onNoteAccepted,
  onNoteRejected,
}: NoteOfTheDayProps) {
  const [noteOfTheDay, setNoteOfTheDay] = useState<TNote | undefined>(undefined)

  useEffect(() => {
    // TODO: Maybe move the api call to another file
    fetch('https://cors-anywhere.herokuapp.com/http://urban-word-of-the-day.herokuapp.com')
      .then(noteData => {
        return noteData.json()
      })
      .then((incomingNote: IncomingNote) => {
        const note = {question: incomingNote.word, answer: incomingNote.meaning}
        setNoteOfTheDay(note)  
      })
      .catch(err => {
        console.log(err)
      })
  }, []);

  return (
    <div className="note-category-selector">
      {noteOfTheDay ? <Note note={noteOfTheDay}/> : <p>Loading</p>}
    </div>
  );
}
