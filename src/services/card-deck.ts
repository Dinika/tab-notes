import { Card, Category, TCategory } from "../types";
import { getCategoryDeck, saveDeckToCategory } from "./local-storage";

const WeightedCardCategories = [
    Category.Difficult,
    Category.Difficult,
    Category.Difficult,
    Category.Difficult,
    Category.Difficult,
    Category.Medium,
    Category.Medium,
    Category.Medium,
    Category.Easy,
    Category.Easy,
];

export function getRandomCardFromDeck(): Card | null {
    const categories = [Category.Difficult, Category.Medium, Category.Easy];
    const category =
        WeightedCardCategories[
            Math.floor(Math.random() * WeightedCardCategories.length)
        ];
    let deck = getCategoryDeck(category);

    // If there are no cards in this deck find a card in any other deck
    if (null === deck) {
        deck =
            categories
                .filter((c) => c !== category)
                .map((c) => getCategoryDeck(c))
                .find((d) => null !== d) ?? null;
    }
    // If we still don't find a card, return null
    if (null === deck) {
        return null;
    }

    // Deck is a queue. Pulling the first item from the deck will give us the oldest card for the given category
    return deck[0];
}

export function addCardToDeck(
    card: Card,
    category: TCategory,
    ignoreIfQuestionExists?: boolean,
) {
    let deck = getCategoryDeck(category);
    if (null === deck) {
        deck = [];
    }

    if (
        ignoreIfQuestionExists &&
        deck.find((c) => c.question === card.question)
    ) {
        return;
    }

    // Deck is a queue. Since this is a new card it should be added at the end of the deck so that it is last one to be picked.
    deck.push(card);
    saveDeckToCategory(category, deck);
}

export function removeCardFromDeck(id: string, category: TCategory) {
    let deck = getCategoryDeck(category);
    if (null === deck) {
        return;
    }

    deck = deck.filter((d) => d.id !== id);
    saveDeckToCategory(category, deck);
}
