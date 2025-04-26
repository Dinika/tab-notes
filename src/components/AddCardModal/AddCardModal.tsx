import { useEffect, useRef, useState } from "react";
import "./style.css";
import { Card, categories, Category, TCategory } from "../../types";
import { addCardToDeck } from "../../services/card-deck";
import { generateUniqueId } from "../../services/common";

interface AddCardModalProps {
    open: boolean;
    onCloseModal: () => void;
}

function AddCardModal({ open, onCloseModal }: AddCardModalProps) {
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
            onCloseModal();
        };

        dialog.addEventListener("cancel", handleCancel);
        return () => dialog.removeEventListener("cancel", handleCancel);
    }, [onCloseModal]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        const formData = new FormData(form);

        const question = formData.get("question")?.toString().trim();
        const answer = formData.get("answer")?.toString().trim();
        const category = formData.get("category")?.toString() as TCategory;
        console.log("Cat", category);
        console.log("Question", question);
        console.log("ANswer", answer);

        if (!question || !answer || !category) {
            setErrorMessage("All fields are required.");
            return;
        }

        const card: Card = {
            id: generateUniqueId(),
            question,
            answer,
            category,
            lastUpdatedAt: Date.now(),
            source: null,
        };
        addCardToDeck(card, category);

        form.reset();
        setErrorMessage(null);
        onCloseModal();
    };

    const handleReset = (e: React.FormEvent<HTMLFormElement>) => {
        const form = e.currentTarget;
        form.reset();
    };

    return (
        <dialog ref={dialogRef} id="add-card-dialog" className="modal-backdrop">
            <button autoFocus onClick={onCloseModal} className="close-button">
                &times;
            </button>
            <form
                method="dialog"
                onSubmit={handleSubmit}
                onReset={handleReset}
                className="form-grid"
            >
                <h2>Add a new flashcard</h2>

                <div className="form-row">
                    <label htmlFor="question">Question:</label>
                    <input id="question" name="question" required />
                </div>

                <div className="form-row">
                    <label htmlFor="answer">Answer:</label>
                    <textarea id="answer" name="answer" required />
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
                                    defaultChecked={
                                        category === Category.Difficult
                                    }
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

export default AddCardModal;
