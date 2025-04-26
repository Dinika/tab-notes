import { useEffect, useRef, useState } from "react";
import "./EditCardModal.css";
import { Card, categories, TCategory } from "../../types";
import { updateCardInDeck } from "../../services/card-deck";

interface EditCardModalProps {
    open: boolean;
    card: Card;
    onCancel: () => void;
    onSave: () => void;
}

function EditCardModal({ open, card, onCancel, onSave }: EditCardModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>();

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (open && !dialog.open) {
            dialog.showModal();
        } else if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const handleCancel = (e: Event) => {
            e.preventDefault(); // Prevent it from auto-closing
            onCancel();
        };

        dialog.addEventListener("cancel", handleCancel);
        return () => dialog.removeEventListener("cancel", handleCancel);
    }, [onCancel]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        const formData = new FormData(form);

        const question = formData.get("question")?.toString().trim();
        const answer = formData.get("answer")?.toString().trim();
        const category = formData.get("category")?.toString() as TCategory;

        if (!question || !answer || !category) {
            setErrorMessage("All fields are required.");
            return;
        }

        updateCardInDeck(card.category, {
            ...card,
            question,
            answer,
            category,
        });
        form.reset();
        setErrorMessage(null);
        onSave();
    };

    const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        form.reset();
    };

    if (card === null) {
        return null;
    }

    return (
        <dialog ref={dialogRef} id="add-card-dialog" className="modal-backdrop">
            <button autoFocus onClick={onCancel} className="close-button">
                &times;
            </button>
            <form
                method="dialog"
                onSubmit={handleSubmit}
                onReset={handleReset}
                className="form-grid"
            >
                <h2>Edit flashcard</h2>

                <div className="form-row">
                    <label htmlFor="question">Question:</label>
                    <input
                        id="question"
                        name="question"
                        defaultValue={card.question}
                        required
                    />
                </div>

                <div className="form-row">
                    <label htmlFor="answer">Answer:</label>
                    <textarea
                        id="answer"
                        name="answer"
                        defaultValue={card.answer}
                        required
                    />
                </div>

                <div className="form-row">
                    <label>Category:</label>
                    <div className="category-options">
                        {categories.map((category) => (
                            <label key={category}>
                                <input
                                    type="radio"
                                    name="category"
                                    value={category}
                                    required
                                    defaultChecked={category === card.category}
                                />
                                {category}
                            </label>
                        ))}
                    </div>
                </div>

                {errorMessage && <p className="error">{errorMessage}</p>}

                <div className="form-actions">
                    <button type="reset">Reset</button>
                    <button type="submit">Save</button>
                </div>
            </form>
        </dialog>
    );
}

export default EditCardModal;
