import { Card, Category, WordnikWord } from "../types";

export const wordnikWordToCard = (word: WordnikWord): Card => {
    return {
        id: generateUniqueId(),
        question: word.word,
        answer: formatAnswerForWordOfTheDay(word),
        category: Category.Difficult,
        lastUpdatedAt: Date.now(),
        source: "wordnik",
    };
};

export const generateUniqueId = (): string => {
    const timestamp = Date.now(); // current time in ms since Jan 1, 1970
    const randomTwoDigit = Math.floor(Math.random() * 90) + 10; // random number between 10 and 99
    return `${timestamp}${randomTwoDigit}`;
};

export const formatDate = (timestamp: number): string => {
    const date = new Date(timestamp);
    const options: Intl.DateTimeFormatOptions = {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
    };
    return date.toLocaleDateString(undefined, options);
};

const formatAnswerForWordOfTheDay = (word: WordnikWord): string => {
    // Get first two definitions
    const definitions = word.definitions.slice(0, 2).map((def, index) => {
        const partOfSpeech = def.partOfSpeech || "—";
        return `${index + 1}. <strong>${partOfSpeech}</strong> - ${def.text}`;
    });

    // Find the shortest example by text length
    const shortestExample = word.examples.reduce((shortest, current) => {
        return current.text.length < shortest.text.length ? current : shortest;
    });

    // Format the final answer
    const answer = `
    <div class="word-of-the-day">
      ${definitions.map((def) => `<p>${def}</p>`).join("")}
      <p><strong>Example</strong> - ${shortestExample.text}</p>
    </div>
  `.trim();

    return answer;
};
