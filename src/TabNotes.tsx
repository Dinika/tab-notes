import React, { useState } from "react"
import { NoteCategorySelector } from "./NoteCategorySelector";
import { INITIAL_NOTES, mnemonicSequence, CategoryEnum, TNotes } from "./constants";
import './styles.css';

function TabNotes() {
  const [notes, setNotes] = useState(INITIAL_NOTES)
  const [currentMnemonicIndex, setCurrentMnemonicIndex] = useState(0)

  const currentMnemonic = mnemonicSequence[currentMnemonicIndex]
  const currentNote = notes[currentMnemonic][0]

  function getNextMnemonicIndex(
    { currentMnemonicIndex, mnemonicSequence, notes }: { currentMnemonicIndex: number; mnemonicSequence: CategoryEnum[]; notes: TNotes; }
  ): number {
    const nextMnemonicIndex = (currentMnemonicIndex + 1) % mnemonicSequence.length
    const nextMnemonicSequence = mnemonicSequence[nextMnemonicIndex]
    if (notes[nextMnemonicSequence].length > 0) {
      return nextMnemonicIndex
    } else {
      return getNextMnemonicIndex({ currentMnemonicIndex: nextMnemonicIndex, mnemonicSequence, notes })
    }
  }

  function onCategorySelected(category: CategoryEnum) {
    console.log("Selected category ", category)
    console.log("Current note", currentNote)
    console.log("current mnemonic", currentMnemonic)
    if (currentMnemonic === category) {
      const mnemonicNotes = notes[currentMnemonic]
      const otherMnemonicNotes = mnemonicNotes.slice(1)
      const newNotes = {
        ...notes,
        [currentMnemonic]: [...otherMnemonicNotes, currentNote]
      }
      setNotes(newNotes)
      const nextMnemonicIndex = getNextMnemonicIndex({ currentMnemonicIndex, mnemonicSequence, notes: newNotes })
      setCurrentMnemonicIndex(nextMnemonicIndex)
      console.log("Got new notes", newNotes)
      console.log("Got new mnemonic index", nextMnemonicIndex)
      console.log("mnemonicSequence", mnemonicSequence)
      console.log("Got new mnemonic", mnemonicSequence[nextMnemonicIndex])

    } else {
      const currentMnemonicNotes = notes[currentMnemonic]
      const skippedMnemonicNotes = notes[category]
      const newNotes: TNotes = {
        ...notes,
        [currentMnemonic]: [...currentMnemonicNotes.slice(1)],
        [category]: [...skippedMnemonicNotes, currentNote]
      }
      setNotes(newNotes)
      const nextMnemonicIndex = getNextMnemonicIndex({ currentMnemonicIndex, mnemonicSequence, notes: newNotes })
      setCurrentMnemonicIndex(nextMnemonicIndex)
      console.log("Got new notes", newNotes)
      console.log("Got new mnemonic index", nextMnemonicIndex)
      console.log("mnemonicSequence", mnemonicSequence)
      console.log("Got new mnemonic", mnemonicSequence[nextMnemonicIndex])
    }

  }

  return (
    <div className="TabNotes">
      <h2>/ Tab Notes /</h2>

      <NoteCategorySelector
        currentNote={currentNote}
        currentMnemonic={currentMnemonic}
        onCategorySelected={onCategorySelected}
      />

      <footer>
        <div className="left-section">
          <div>View Board</div>
          <div id="add-new-card" role="button">
            Add New Card
          </div>
        </div>
        <div className="right-section">Source Code</div>
      </footer>
      <script src="static/js/utils.js" type="module"></script>
    </div>
  );
}

export default TabNotes;
