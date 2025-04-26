import React, { useEffect, useState } from "react";
import { Card } from "../../types";
import { getAllCards, removeCardFromDeck } from "../../services/card-deck";
import "./Deck.css";
import { formatDate, normalizeString } from "../../services/common";
import DeleteCardModal from "../../components/DeleteCardModal/DeleteCardModal";

const Deck: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [cardToDelete, setCardToDelete] = useState<null | Card>(null);

    useEffect(() => {
        refreshDeck();
    }, []);

    const refreshDeck = () => {
        const storedCards = getAllCards();
        setCards(storedCards);
    };

    const handleEdit = (id: string) => {
        console.log(`Edit card with id: ${id}`);
    };

    const matchesSearchTerm = (card: Card, searchTerm: string) => {
        const normalizedSearchTerm = normalizeString(searchTerm);
        return normalizeString(JSON.stringify(card)).includes(
            normalizedSearchTerm,
        );
    };

    const displayedCards = cards.filter((card) =>
        matchesSearchTerm(card, searchTerm),
    );

    return (
        <main className="deck-container">
            <div className="deck-header">
                <div className="search">
                    <label htmlFor="deck-search">Search:</label>
                    <input
                        type="text"
                        id="deck-search"
                        placeholder="Search cards..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                    />
                    <button onClick={() => setSearchTerm("")}>Reset</button>
                </div>
                <div>
                    <span className="deck-count">
                        {displayedCards.length} cards / {cards.length} total
                    </span>
                </div>
            </div>
            <table className="deck-table">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Question</th>
                        <th>Answer</th>
                        <th>Category</th>
                        <th>Last Updated At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {displayedCards.map((card, index) => (
                        <tr key={card.id + index}>
                            <td className="id-column">{card.id}</td>
                            <td>{card.question}</td>
                            <td
                                className="answer-column"
                                dangerouslySetInnerHTML={{
                                    __html: card.answer,
                                }}
                            ></td>
                            <td>{card.category}</td>
                            <td>{formatDate(card.lastUpdatedAt)}</td>
                            <td>
                                <button onClick={() => handleEdit(card.id)}>
                                    Edit
                                </button>
                                <button onClick={() => setCardToDelete(card)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <DeleteCardModal
                open={cardToDelete !== null}
                question={cardToDelete?.question || ""}
                answer={cardToDelete?.answer || ""}
                category={cardToDelete?.category || ""}
                onCancel={() => {
                    setCardToDelete(null);
                }}
                onDelete={() => {
                    if (cardToDelete) {
                        removeCardFromDeck(
                            cardToDelete.id,
                            cardToDelete.category,
                        );
                        setCardToDelete(null);
                        refreshDeck();
                    }
                }}
            />
        </main>
    );
};

export default Deck;
