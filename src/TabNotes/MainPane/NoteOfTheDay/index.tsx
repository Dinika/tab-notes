import React, { useEffect, useState } from "react";
import { TNote } from "../../constants";
import { Note } from "../NoteCategorySelector/Note";
import { extractWordOfTheDay } from "./utils";

interface NoteOfTheDayProps {
  onNoteAccepted: (newNote: TNote) => void;
  onNoteRejected: () => void;
}

export function NoteOfTheDay({
  onNoteAccepted,
  onNoteRejected,
}: NoteOfTheDayProps) {
  const [noteOfTheDay, setNoteOfTheDay] = useState<TNote | undefined>(
    undefined
  );

  useEffect(() => {
    // TODO: Maybe move the api call to another file
    fetch("https://cors-anywhere.herokuapp.com/https://www.urbandictionary.com")
      .then(rawData => {
        return rawData.text();
      })
      .then((rawDataPart2: string) => {
        const incomingNote = extractWordOfTheDay(rawDataPart2)
        const note = {
          question: incomingNote.word,
          answer: incomingNote.meaning,
        };
        setNoteOfTheDay(note);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="note-category-selector">
      {noteOfTheDay ? <Note note={noteOfTheDay} /> : <p>Loading</p>}
      {noteOfTheDay && (
        <div className="category-selector">
          <div
            className="category-button"
            role="button"
            id="reject"
            onClick={onNoteRejected}
          >
            Reject /
          </div>
          <div
            role="button"
            id="accept"
            className="category-button"
            onClick={() => onNoteAccepted(noteOfTheDay)}
          >
            Accept
          </div>
        </div>
      )}
    </div>
  );
}
