import React from "react";
import { Note } from "./Note";
import { CategorySelector } from "./CategorySelector";
import { TNote, CategoryEnum } from "../../constants";
import "./styles.css";

interface NoteCategorySelectorProps {
  currentNote: TNote;
  onCategorySelected: (category: CategoryEnum) => void;
}

export function NoteCategorySelector({
  currentNote,
  onCategorySelected,
}: NoteCategorySelectorProps) {
  return (
    <div className="note-category-selector">
      <Note note={currentNote} />
      <CategorySelector onCategorySelected={onCategorySelected} />
    </div>
  );
}
