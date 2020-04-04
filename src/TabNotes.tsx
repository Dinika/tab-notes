import React, { useState } from "react"
import { NoteCategorySelector } from "./NoteCategorySelector";
import { INITIAL_NOTES, mnemonicSequence } from "./constants";
import './styles.css';

function TabNotes() {
  const [notes, setNotes] = useState(INITIAL_NOTES)
  const [currentMnemonicIndex, setCurrentMnemonicIndex] = useState(0)
  
  const currentMnemonic = mnemonicSequence[currentMnemonicIndex]
  const currentNote = notes[currentMnemonic][0]
  return (
    <div className="TabNotes">
      <h2>/ Tab Notes /</h2>

      <NoteCategorySelector currentNote={currentNote} currentMnemonic={currentMnemonic} />

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
