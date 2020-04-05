import React from "react";
import "./styles.css";
import { Link } from "react-router-dom";

export function ActionsFooter() {
  return (
    <div className="actions-footer">
      <div role="button">
        View All Notes
      </div>
      <Link
        to="/"
      >
        Play!
      </Link>
      <Link
        to="/add_note"
      >
        Add New Note
      </Link>
      <a role="button" href="https://github.com/Dinika/tab-notes">
        Source Code
      </a>
    </div>
  );
}
