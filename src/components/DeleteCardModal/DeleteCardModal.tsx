import { useEffect, useRef } from "react";
import "./DeleteCardModal.css";
import { Card, TCategory } from "../../types";
import { removeCardFromDeck } from "../../services/card-deck";

interface DeleteCardModalProps {
    open: boolean;
    question: string;
    answer: string;
    category: string;
    onCancel: () => void;
    onDelete: () => void;
}

function DeleteCardModal({
    open,
    question,
    answer,
    category,
    onCancel,
    onDelete,
}: DeleteCardModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        if (open && !dialog.open) {
            dialog.showModal();
        } else if (!open && dialog.open) {
            dialog.close();
        }
    }, [open]);

    // This useEffect helps to execute custom 'onCancel' logic even when dialog is closed by pressing escape key.
    useEffect(() => {
        const dialog = dialogRef.current;
        if (!dialog) return;

        const handleCancel = (e: Event) => {
            e.preventDefault();
            onCancel();
        };

        dialog.addEventListener("cancel", handleCancel);
        return () => dialog.removeEventListener("cancel", handleCancel);
    }, [onCancel]);

    return (
        <dialog ref={dialogRef} id="add-card-dialog" className="modal-backdrop">
            <h3>Are you sure you want to delete this card?</h3>
            <div className="card-details">
                <div className="row">
                    <span>Question:</span>
                    <div>{question}</div>
                </div>

                <div className="row">
                    <span>Answer:</span>
                    <div
                        className="answer"
                        dangerouslySetInnerHTML={{ __html: answer }}
                    />
                </div>

                <div className="row">
                    <span>Category:</span>
                    <div>{category}</div>
                </div>
            </div>
            <div className="modal-actions">
                <button className="cancel-button" onClick={onCancel}>
                    Cancel
                </button>
                <button className="delete-button" onClick={onDelete}>
                    Delete
                </button>
            </div>
        </dialog>
    );
}

export default DeleteCardModal;
