export interface Card {
    id: string;
    question: string;
    answer: string;
    category: TCategory;
    lastUpdatedAt: number;
    source: null | 'wordnik';
}

export const Category = {
    Easy: 'easy',
    Medium: 'medium',
    Difficult: 'difficult'
} as const;

export type TCategory = (typeof Category)[keyof typeof Category];

export interface WordnikWord {
    _id: string;
    word: string;
    definitions: {
        text: string;
        partOfSpeech: null | string;
        source: null | string;
        note: null | string;
    }[];
    examples: {
        text: string;
    }[];
}
