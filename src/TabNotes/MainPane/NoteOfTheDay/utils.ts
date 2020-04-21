
interface IncomingNote {
  word: string;
  meaning: string;
}

export function extractWordOfTheDay(rawHtml: string): IncomingNote {
  const span = document.createElement("span");
  span.innerHTML = rawHtml;
  const words = span.getElementsByClassName("word")
  const firstWord = words[0]?.textContent ?? ""
  const meanings = span.getElementsByClassName("meaning")
  const firstMeaning = meanings[0]?.textContent ?? ""
  return {word: firstWord, meaning: firstMeaning}
}
