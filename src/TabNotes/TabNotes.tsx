import React, { useState, useEffect } from "react";
import { NoteCategorySelector } from "./NoteCategorySelector";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  INITIAL_NOTES,
  mnemonicSequence,
  CategoryEnum,
  TNotes,
} from "./constants";
import "./styles.css";
import { ActionsFooter } from "./ActionsFooter";
import { NewNote } from "./NewNote";
import * as Storage from "../Storage/storage";
import { isShorthandPropertyAssignment } from "typescript";
import { ConsoleWriter } from "istanbul-lib-report";
import { NoteOfTheDay } from "./NoteOfTheDay";

function TabNotes() {
  const [dummy, setDummy] = useState(0)
  const [notes, setNotes] = useState(() => {
    const data = Storage.getNotes();
    if (!data) {
      Storage.setNotes(INITIAL_NOTES);
    }
    return data ?? INITIAL_NOTES;
  });
  const [currentMnemonicIndex, setCurrentMnemonicIndex] = useState(0);
  const currentMnemonic = mnemonicSequence[currentMnemonicIndex];
  const currentNote = notes[currentMnemonic][0];
  const [lastNoteOfTheDayFetchedAt, setLastNoteOfTheDayFetchedAt] = useState(
    Storage.getLastNoteOfTheDayFetchedAt()
  );
  if (!currentNote) {
    setCurrentMnemonicIndex(
      getNextMnemonicIndex(currentMnemonicIndex, mnemonicSequence, notes)
    );
  }

  useEffect(() => {
    console.log("Second useeffect");
    Storage.setNotes(notes);
  }, [notes]);

  useEffect(() => {
    Storage.setLastNoteOfTheDayFetchedAt(new Date());
  }, [lastNoteOfTheDayFetchedAt]);

  function getNextMnemonicIndex(
    currentMnemonicIndex: number,
    mnemonicSequence: CategoryEnum[],
    notes: TNotes
  ): number {
    const nextMnemonicIndex =
      (currentMnemonicIndex + 1) % mnemonicSequence.length;
    const nextMnemonicSequence = mnemonicSequence[nextMnemonicIndex];
    if (notes[nextMnemonicSequence].length > 0) {
      return nextMnemonicIndex;
    } else {
      return getNextMnemonicIndex(nextMnemonicIndex, mnemonicSequence, notes);
    }
  }

  function shouldFetchNoteOfTheDay() {
    console.log("Should fetch?")
    const { day, month, year } = lastNoteOfTheDayFetchedAt;
    const lastNoteSavedDate = new Date(year, month, day);
    const now = new Date();
    const normalizedNow = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate()
    );
    console.log("normalizedNow ", normalizedNow, "lastNoteSavedDate ", lastNoteSavedDate, "Should it then", normalizedNow > lastNoteSavedDate)
    return normalizedNow >= lastNoteSavedDate;
  }

  function onCategorySelected(category: CategoryEnum) {
    if (currentMnemonic === category) {
      const mnemonicNotes = notes[currentMnemonic];
      const otherMnemonicNotes = mnemonicNotes.slice(1);
      const newNotes = {
        ...notes,
        [currentMnemonic]: [...otherMnemonicNotes, currentNote],
      };
      setNotes(newNotes);
      const nextMnemonicIndex = getNextMnemonicIndex(
        currentMnemonicIndex,
        mnemonicSequence,
        newNotes
      );
      setCurrentMnemonicIndex(nextMnemonicIndex);
      console.log("New notes", newNotes);
    } else {
      const currentMnemonicNotes = notes[currentMnemonic];
      const skippedMnemonicNotes = notes[category];
      const newNotes: TNotes = {
        ...notes,
        [currentMnemonic]: [...currentMnemonicNotes.slice(1)],
        [category]: [...skippedMnemonicNotes, currentNote],
      };
      setNotes(newNotes);
      const nextMnemonicIndex = getNextMnemonicIndex(
        currentMnemonicIndex,
        mnemonicSequence,
        newNotes
      );
      setCurrentMnemonicIndex(nextMnemonicIndex);
      console.log("New notes", newNotes);
    }
  }

  return (
    <div className="TabNotes">
      <div className="upper-title">/ Tab Notes /</div>

      <Router>
        <Switch>
          <Route path="/add_note">
            <NewNote notes={notes} setNotes={setNotes} />
          </Route>
          <Route path="/">
            {shouldFetchNoteOfTheDay() ? (
              <NoteOfTheDay onNoteAccepted = {() => {}} onNoteRejected={() => {}}/>
            ) : (
              <NoteCategorySelector
                currentNote={currentNote}
                currentMnemonic={currentMnemonic}
                onCategorySelected={onCategorySelected}
              />
            )}
          </Route>
        </Switch>
        <ActionsFooter />
      </Router>
    </div>
  );
}

export default TabNotes;
