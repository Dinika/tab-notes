import "./style.css";

interface AnswerProps {
    answer: string;
    onNextClick: () => void;
}

function AnswerCard({ answer, onNextClick }: AnswerProps) {
    return (
        <div>
            <div
                dangerouslySetInnerHTML={{ __html: answer }}
                className="answer"
            />
            <button onClick={onNextClick} className="next-button">
                Next
            </button>
        </div>
    );
}

export default AnswerCard;
