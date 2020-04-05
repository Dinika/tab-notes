import React, { useState } from "react";
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

function TabNotes() {
  const [notes, setNotes] = useState(INITIAL_NOTES);
  const [currentMnemonicIndex, setCurrentMnemonicIndex] = useState(0);

  const currentMnemonic = mnemonicSequence[currentMnemonicIndex];
  const currentNote = notes[currentMnemonic][0];

  function getNextMnemonicIndex({
    currentMnemonicIndex,
    mnemonicSequence,
    notes,
  }: {
    currentMnemonicIndex: number;
    mnemonicSequence: CategoryEnum[];
    notes: TNotes;
  }): number {
    const nextMnemonicIndex =
      (currentMnemonicIndex + 1) % mnemonicSequence.length;
    const nextMnemonicSequence = mnemonicSequence[nextMnemonicIndex];
    if (notes[nextMnemonicSequence].length > 0) {
      return nextMnemonicIndex;
    } else {
      return getNextMnemonicIndex({
        currentMnemonicIndex: nextMnemonicIndex,
        mnemonicSequence,
        notes,
      });
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
      const nextMnemonicIndex = getNextMnemonicIndex({
        currentMnemonicIndex,
        mnemonicSequence,
        notes: newNotes,
      });
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
      const nextMnemonicIndex = getNextMnemonicIndex({
        currentMnemonicIndex,
        mnemonicSequence,
        notes: newNotes,
      });
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
