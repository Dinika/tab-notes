import { useEffect, useState } from "react";
import "./Home.css";
import { Card, Category, TCategory } from "../../types";
import {
    fetchWordOfTheDay,
    shouldFetchWordOfTheDay,
} from "../../services/word-of-the-day";
import { wordnikWordToCard } from "../../services/common";
import {
    addCardToDeck,
    getRandomCardFromDeck,
    removeCardFromDeck,
} from "../../services/card-deck";
import { setLastWordOfTheDayFetchedAt } from "../../services/local-storage";
import QuestionCard from "../../components/QuestionCard";
import AnswerCard from "../../components/AnswerCard";

function HomePage() {
    const [card, setCard] = useState<Card | null>(null);
    const [mode, setMode] = useState<"question" | "answer">("question");
    const [loadingText, setLoadingText] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (null !== card) {
            return;
        }

        async function getInitialCard() {
            setLoadingText("Loading...");

            if (await shouldFetchWordOfTheDay()) {
                setLoadingText("Fetching word of the day!");
                try {
                    const wordOfTheDay = await fetchWordOfTheDay();
                    setLastWordOfTheDayFetchedAt(new Date());
                    const wordOfTheDayCard = {
                        ...wordnikWordToCard(wordOfTheDay),
                    };
                    addCardToDeck(wordOfTheDayCard, Category.Difficult, true);

                    setCard(wordOfTheDayCard);
                    return;
                } catch (err) {
                    console.error(err);
                    setError("Error while fetching word of the day.");
                } finally {
                    setLoadingText(null);
                }
            }

            // If word of the day is already fetched or there was an error while fetching it.
            try {
                const initialCard = await getRandomCardFromDeck();
                if (null === initialCard) {
                    setError("There are no cards in the deck");
                    return;
                }
                setCard({
                    ...initialCard,
                });
            } catch (err) {
                console.error(err);
                setError(
                    "There was an error while loading a card from the deck",
                );
            } finally {
                setLoadingText(null);
            }
        }

        getInitialCard();
    }, []);

    const onCategorySelected = (card: Card, category: TCategory) => {
        removeCardFromDeck(card.id, card.category);
        addCardToDeck({ ...card, category }, category);

        setMode("answer");
    };

    const showNextCard = async () => {
        const newCard = await getRandomCardFromDeck();
        if (null === newCard) {
            setError("There are no cards in the deck");
            return;
        }
        setCard({
            ...newCard,
        });
        setMode("question");
    };

    const deleteCard = (card: Card) => {
        setCard(null);
        removeCardFromDeck(card.id, card.category);
        showNextCard();
    };

    return (
        <div className="card">
            {loadingText && <p>{loadingText}</p>}
            {error && <p>{error}</p>}
            {card && (
                <>
                    <button
                        className="discard-button"
                        title="Delete card"
                        onClick={() => deleteCard(card)}
                    >
                        🗑️
                    </button>
                    {mode === "question" ? (
                        <QuestionCard
                            currentCategory={card.category}
                            question={card.question}
                            onCategorySelected={(category) =>
                                onCategorySelected(card, category)
                            }
                        />
                    ) : (
                        <AnswerCard
                            answer={card.answer}
                            onNextClick={showNextCard}
                        />
                    )}
                </>
            )}
        </div>
    );
}

export default HomePage;
