import { View } from './view.js';


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

let tabNotes = null;
document.addEventListener('DOMContentLoaded', function () {

  tabNotes = new TabNotes
  tabNotes.maybeFetchNoteOfTheDay();
  tabNotes.getANote();

  document.getElementById('show').onclick = tabNotes.showAnswer;
  document.getElementById('skip').onclick = tabNotes.nextQuestion;
}, false);

const TabNotes = function () {
  const storage = chrome.storage.sync;
  const view = new View();

  async function fetchWordOfTheDay() {
    console.log("fetchWordOfTheDay")
    const res = await fetch('https://cors-anywhere.herokuapp.com/http://urban-word-of-the-day.herokuapp.com')
    const resJson = await res.json()
    storage.get('unknown', notes => {
      const now = new Date();
      const newNote = { question: resJson.word, answer: resJson.meaning, id: now.getTime() };
      const unknownNotes = notes.unknown;
      const updatedUnknownNotes = [newNote, ...unknownNotes];
      storage.set(
        { unknown: updatedUnknownNotes, lastNoteOfTheDayFetchedAt: now.toDateString },
        () => {
          chrome.storage.sync.get(
            null,
            function (data) {
              console.log("sotrage data", data)
            }
          )
        }
      );
    })
  }

  this.maybeFetchNoteOfTheDay = function () {
    console.log("maybeFetch")
    storage.get('lastNoteOfTheDayFetchedAt', function (e) {
      const oneDay = 24 * 60 * 60 * 1000;
      const now = new Date();
      const lastNoteFetchedAt = new Date(e.lastNoteOfTheDayFetchedAt);
      if (now.getTime() - lastNoteFetchedAt.getTime() >= oneDay) {
        fetchWordOfTheDay()
      } else {
        return;
      }
    })
  }

  this.getANote = function () {
    storage.get('mnemonicSequence', function (mnemonicSequenceData) {
      storage.get('curMnemonicSequence', function (curMnemonicSequenceData) {
        const curMnemonicSequence = curMnemonicSequenceData.curMnemonicSequence;
        const nextSequence = (curMnemonicSequence + 1) % mnemonicSequenceData.mnemonicSequence.length;
        const levelToShow = mnemonicSequenceData.mnemonicSequence[nextSequence];
        storage.get(levelToShow, function (levelToShowData) {
          const nextNote = randomIntFromInterval(0, levelToShowData[levelToShow].length - 1);
          view.showNoteQuestion(levelToShowData[levelToShow][nextNote].question);
          storage.get('curNote', function (curNoteData) {
            const updatedCurNote = {
              ...curNoteData.curNote,
              [levelToShow]: nextNote,
            }
            storage.set({ 'curNote': updatedCurNote });
          });
        });
        storage.set({ 'curMnemonicSequence': nextSequence });
      });
    })
  }

  this.showAnswer = function () {
    storage.get('mnemonicSequence', function ({ mnemonicSequence }) {
      storage.get('curMnemonicSequence', function ({ curMnemonicSequence }) {
        const levelToShow = mnemonicSequence[curMnemonicSequence];
        storage.get('curNote', function ({ curNote }) {
          storage.get(levelToShow, function (levelToShowData) {
            const notes = levelToShowData[levelToShow];
            const curNoteIndex = curNote[levelToShow];
            view.showNoteAnswer(notes[curNoteIndex].answer);
          })
        })
      })
    })
  }

  this.nextQuestion = function () {
    storage.get('mnemonicSequence', function ({ mnemonicSequence }) {
      storage.get('curMnemonicSequence', function ({ curMnemonicSequence }) {
        const nextSequence = (curMnemonicSequence + 1) % mnemonicSequence.length;
        const levelToShow = mnemonicSequence[nextSequence];
        storage.get(levelToShow, function (levelData) {
          const notes = levelData[levelToShow];
          storage.get('curNote', function ({ curNote }) {
            const nextNote = (curNote[levelToShow] + 1) % notes.length;
            view.showNoteQuestion(notes[nextNote].question);
            view.hideNoteAnswer();
            const updatedCurNote = {
              ...curNote,
              [levelToShow]: nextNote,
            }
            storage.set({ 'curNote': updatedCurNote });
          });
        });
        storage.set({ 'curMnemonicSequence': nextSequence });
      })
    })
  }

}

