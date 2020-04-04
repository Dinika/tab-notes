import React from 'react'
import { TNote } from '../../constants';

export function Note({note}: {note: TNote}) {
  return (
    <div id="note">
      <h1 id="question">{note.question}</h1>
      <div id="show" role="button">
        Show
      </div>
    </div>
  );
}
