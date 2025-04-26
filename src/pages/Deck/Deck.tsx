import React, { useEffect, useState } from "react";
import { Card } from "../../types";
import { getAllCards } from "../../services/card-deck";
import "./Deck.css";
import { formatDate } from "../../services/common";

const Deck: React.FC = () => {
    const [cards, setCards] = useState<Card[]>([]);

    useEffect(() => {
        const storedCards = getAllCards();
        console.log("Stored cards:", storedCards);
        setCards([...storedCards, ...storedCards]);
    }, []);

    const handleEdit = (id: string) => {
        console.log(`Edit card with id: ${id}`);
    };

    const handleDelete = (id: string) => {
        console.log(`Delete card with id: ${id}`);
    };

    return (
        <main className="deck-container">
            <h1>Deck</h1>
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
                    {cards.map((card, index) => (
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
                                <button onClick={() => handleDelete(card.id)}>
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </main>
    );
};

export default Deck;
