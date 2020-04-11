import { TNotes, TNoteFetchedAt } from "../TabNotes/constants";

export function getNotes() {
  const strData = window.localStorage.getItem("tabNotes");
  const data = !strData ? null : JSON.parse(strData);
  console.log(data);
  return data;
}

export function setNotes(notes: TNotes) {
  window.localStorage.setItem("tabNotes", JSON.stringify(notes));
}

export function isInitialized() {
  const isInitialLoad = window.localStorage.getItem("initialLoad");
  return isInitialLoad ? JSON.parse(isInitialLoad) : false;
}

export function setInitialized(isInitialLoad: boolean) {
  window.localStorage.setItem("initialLoad", JSON.stringify(isInitialLoad));
}

export function setLastNoteOfTheDayFetchedAt(at: Date) {
  const noteFetchedAt = {
    day: at.getDate(),
    month: at.getMonth(),
    year: at.getFullYear(),
  };
  window.localStorage.setItem(
    "lastNoteOfTheDatFetchedAt",
    JSON.stringify(noteFetchedAt)
  );
}

export function getLastNoteOfTheDayFetchedAt(): TNoteFetchedAt {
  const lastNoteFetchedAtData = window.localStorage.getItem(
    "lastNoteOfTheDatFetchedAt"
  )
  if(!lastNoteFetchedAtData) {
    return {day:0, month: 0, year: 0}
  } else {
    return JSON.parse(lastNoteFetchedAtData)
  }
}
