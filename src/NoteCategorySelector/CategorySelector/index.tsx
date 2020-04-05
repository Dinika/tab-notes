import React from "react";
import './styles.css'
import { CategoryEnum } from "../../constants";

export function CategorySelector(
  { onCategorySelected }: { onCategorySelected: (category: CategoryEnum) => void }
) {
  return (
    <div className="category-selector">
      <div
        className="category-button" 
        role="button"
        id="known"
        onClick={(e) => { onCategorySelected(CategoryEnum.KNOWN) }}
      >
        Knew it /
      </div>
      <div
        role="button"
        id="unknown"
        className="category-button"
        onClick={(e) => { onCategorySelected(CategoryEnum.UNKNOWN) }}
      >
        That's new /
      </div>
      <div
        role="button"
        id="skip"
        className="category-button"
        onClick={(e) => { onCategorySelected(CategoryEnum.SKIPPED) }}
      >
        Skip
      </div>
    </div>
  );
}
