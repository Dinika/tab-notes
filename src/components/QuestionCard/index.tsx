import { categories, TCategory } from "../../types";
import "./style.css";

interface QuestionCardProps {
    question: string;
    currentCategory: string;
    onCategorySelected: (category: TCategory) => void;
}

function QuestionCard({
    question,
    onCategorySelected,
    currentCategory,
}: QuestionCardProps) {
    return (
        <div className="container">
            <div className="question">{question}</div>
            <div className="categories">
                {categories.map((category) => (
                    <button
                        key={category}
                        className={`category ${category} ${currentCategory === category ? "selected" : ""}`}
                        onClick={() => onCategorySelected(category)}
                    >
                        {category}
                        <span
                            className="current-category-mark"
                            title="current category"
                        >
                            {currentCategory === category ? "🟡" : ""}
                        </span>
                    </button>
                ))}
            </div>
        </div>
    );
}

export default QuestionCard;
