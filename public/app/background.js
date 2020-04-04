chrome.runtime.onInstalled.addListener(fetchAndStoreNotes);

async function fetchAndStoreNotes() {
  const installedOn = new Date();
  chrome.storage.sync.set(
    {
      ...INITIAL_CARDS,
      mnemonicSequence: mnemonicSequence,
      lastNoteOfTheDayFetchedAt: installedOn.toDateString(),
      curNote: {
        unknown: 0,
        known: 0,
        skipped: 0,
      },
      curMnemonicSequence: 0
    },
    function () {
      //TODO: Remove this function
      chrome.storage.sync.get(null, function (data) {
        console.log("storage data", data);
      });
    }
  );
}

const INITIAL_CARDS = {
  unknown: [
    {
      id: "1",
      question: "Red Flag: Temporal decomposition",
      answer: "Check if at least one element in an array satisfy the predicate"
    },
    {
      id: "2",
      question: "Red Flag: Sepecial general mixture",
      answer: "Check if array contains an element: arr<T>.includes(ele: T)"
    },
    {
      id: "3",
      question: "Exceptions thrown by a class are part of its interface",
      answer: "Classes with lots of exceptions have complex interfaces, and they are shallower than classes with fewer exceptions."
    },
    {
      id: "4",
      question: "When is it NOT a good idea to bring together functions, even though anyone using one function is likely to use the other as well?",
      answer: "When the relationship is not bidirectional. Eg. Disk block cache will almost always use hashtables, but vice versa is not true."
    },
    {
      id: "5",
      question: "Red flag: Cojoined methods",
      answer: "Zeus pangea uranus mars athena apollo"
    },
  ],
  known: [
    {
      id: "6",
      question: "The Answer to the Ultimate Question of Life, the Universe, and Everything",
      answer: "42"
    },
  ],
  skipped: [
    {
      id: "7",
      question: "How many thumbs does a panda have?",
      answer: "Six, two on each hand, and one on each foot."
    },
  ],
};

const LevelEnum = {
  KNOWN: "known",
  UNKNOWN: "unknown",
  SKIPPED: "skipped"
};

const mnemonicSequence = [
  LevelEnum.UNKNOWN,
  LevelEnum.UNKNOWN,
  LevelEnum.SKIPPED,
  LevelEnum.KNOWN,
  LevelEnum.UNKNOWN
];
