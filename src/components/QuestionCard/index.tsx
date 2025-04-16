import { Category, TCategory } from "../../types";
import "./style.css";

interface QuestionCardProps {
    question: string;
    onCategorySelected: (category: TCategory) => void;
}

const categories = [
    { name: Category.Easy, color: "#3FC37D" },
    { name: Category.Medium, color: "#FFD154" },
    { name: Category.Difficult, color: "#FC724C" },
];

function QuestionCard({ question, onCategorySelected }: QuestionCardProps) {
    return (
        <div className="container">
            <div className="question">{question}</div>
            <div className="categories">
                {categories.map((category) => (
                    <button
                        key={category.name}
                        className={`category ${category.name}`}
                        onClick={() => onCategorySelected(category.name)}
                    >
                        {category.name}
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QuestionCard;
