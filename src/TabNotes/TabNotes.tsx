import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {
  INITIAL_NOTES,
} from "./constants";
import "./styles.css";
import { ActionsFooter } from "./ActionsFooter";
import { NewNote } from "./NewNote";
import * as Storage from "../Storage/storage";
import { MainPane } from "./MainPane";

function TabNotes() {
  const [notes, setNotes] = useState(() => {
    const data = Storage.getNotes();
    if (!data) {
      Storage.setNotes(INITIAL_NOTES);
    }
    return data ?? INITIAL_NOTES;
  });

  useEffect(() => {
    Storage.setNotes(notes);
  }, [notes]);

  return (
    <div className="TabNotes">
      <div className="upper-title">/ Tab Notes /</div>
      <Router>
        <Switch>
          <Route path="/add_note">
            <NewNote notes={notes} setNotes={setNotes} />
          </Route>
          <Route path="/">
            <MainPane notes={notes} setNotes={setNotes} />
          </Route>
        </Switch>
        <ActionsFooter />
      </Router>
    </div>
  );
}

export default TabNotes;
