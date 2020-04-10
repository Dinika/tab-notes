import { TNotes } from "../TabNotes/constants";

export function getNotes() {
  //@ts-ignore
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
  return isInitialLoad ? JSON.parse(isInitialLoad) : false
}

export function setInitialized(isInitialLoad: boolean) {
  window.localStorage.setItem("initialLoad", JSON.stringify(isInitialLoad));
}