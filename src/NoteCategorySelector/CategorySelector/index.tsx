import React from "react";
import './styles.css'

export function CategorySelector() {
  return (
    <div className="category-selector">
      <div className="category-button" role="button" id="known">
        Knew it /
      </div>
      <div role="button" id="unknown" className="category-button">
        That's new /
      </div>
      <div role="button" id="skip" className="category-button">
        Skip
      </div>
    </div>
  );
}
