import React from 'react'
import { Note } from './Note';
import { CategorySelector } from './CategorySelector';
import {TNote, CategoryEnum} from '../constants'
import './styles.css';

interface NoteCategorySelectorProps {
    currentNote: TNote,
    currentMnemonic: CategoryEnum
}

export function NoteCategorySelector({currentNote, currentMnemonic}: NoteCategorySelectorProps) {
  return (
    <div className="note-category-selector">
        <Note note={currentNote} />
        <CategorySelector />
    </div>
  );
}
