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

function TabNotes() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [currentMnemonicIndex, setCurrentMnemonicIndex] = useState(0);
  const currentMnemonic = mnemonicSequence[currentMnemonicIndex];
  const currentNote = notes[currentMnemonic][0];
  if (!currentNote) {
    setCurrentMnemonicIndex(
      getNextMnemonicIndex(currentMnemonicIndex, mnemonicSequence, notes)
    );
  }
  useEffect(() => {
    console.log("First useeffect");
    Storage.setInitialized(false);
    const data = Storage.getNotes();
    if (!data) {
      Storage.setNotes(INITIAL_NOTES);
    }
    setNotes(data ?? INITIAL_NOTES);
  }, []);

  useEffect(() => {

    if (Storage.isInitialized()) {
      Storage.setNotes(notes);
      console.log("Notes saved", notes);
    } else {
      Storage.setInitialized(true);
    }
  }, [notes]);

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
            <NoteCategorySelector
              currentNote={currentNote}
              currentMnemonic={currentMnemonic}
              onCategorySelected={onCategorySelected}
            />
          </Route>
        </Switch>
        <ActionsFooter />
      </Router>
    </div>
  );
}

export default TabNotes;
