import { Card, TCategory } from '../types';

const LocalStorageKeys = {
    WordOfTheDayFetchedAt: 'word-of-the-day-fetched-at',
    DifficultCards: 'difficult-cards',
    MediumCards: 'difficult-cards',
    EasyCards: 'easy-cards'
} as const;

export function getLastWordOfTheDayFetchedAt(): Date | null {
    const fetchDate = localStorage.getItem(LocalStorageKeys.WordOfTheDayFetchedAt);
    if (null === fetchDate) { return null }
    return new Date(fetchDate);
}

export function setLastWordOfTheDayFetchedAt(fetchedAt: Date) {
    localStorage.setItem(LocalStorageKeys.WordOfTheDayFetchedAt, fetchedAt.toISOString());
}

export function getCategoryDeck(category: TCategory): Card[] | null {
    const deckKey = categoryToDeckName(category);
    const lsDeck = localStorage.getItem(deckKey);

    if (!lsDeck) {
        return null;
      }
    
    try {
        const parsedDeck: Card[] = JSON.parse(lsDeck);
    
        // Ensure it's a valid array of Cards
        if (!Array.isArray(parsedDeck) || parsedDeck.length === 0) {
          return null;
        }
    
        return parsedDeck;
      } catch (error) {
        console.error('Failed to parse cards from localStorage:', error);
        return null;
      }
    
}

export function saveDeckToCategory(category: TCategory, deck: Card[]) {
    const deckKey = categoryToDeckName(category);
    const lsDeck = JSON.stringify(deck);
    localStorage.setItem(deckKey, lsDeck);
}

function categoryToDeckName(category: TCategory) {
    return `${category}-cards`;
}