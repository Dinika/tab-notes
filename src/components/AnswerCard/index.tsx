import "./style.css";

interface AnswerProps {
    question: string;
    answer: string;
    onNextClick: () => void;
}

function AnswerCard({ question, answer, onNextClick }: AnswerProps) {
    return (
        <div>
            <h3>{question}</h3>
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
