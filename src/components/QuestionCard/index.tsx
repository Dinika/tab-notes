import "./style.css";

interface QuestionCardProps {
    question: string;
}

function QuestionCard({ question }: QuestionCardProps) {
    return (
        <div>
            <div className="question">{question}</div>
        </div>
    );
}

export default QuestionCard;
