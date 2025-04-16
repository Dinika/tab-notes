import { WordnikWord } from "../types";
import { getLastWordOfTheDayFetchedAt } from "./local-storage";

/**
 * Determines if new word of the day should be fetched from the wordnik API.
 * A new word if fetched iff:
 *
 * - No word was fetched from the api before (ie the 'lastWordOfTheDayFetchedAt' is null in LS)
 * - The word was fetched before today midnight.
 */
export async function shouldFetchWordOfTheDay(): Promise<boolean> {
  const lastWordOfTheDayFetchedAt = getLastWordOfTheDayFetchedAt();

  if (null === lastWordOfTheDayFetchedAt) {
    return true;
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  return lastWordOfTheDayFetchedAt < today;
}

export async function fetchWordOfTheDay(): Promise<WordnikWord> {
  const apiKey = import.meta.env.VITE_WORDNIK_API_KEY;

  return fetch(
    `https://api.wordnik.com/v4/words.json/wordOfTheDay?api_key=${apiKey}`,
    {
      headers: {
        Accept: "application/json",
      },
    },
  ).then((response) => response.json());
}
