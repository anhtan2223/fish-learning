export interface Assignment {
    id: number;
    title: string;
    description: string;
    startDate: string;
    dueDate: string;
    totalPoints: number;
    status: string;
    questions: Question[];
}

export interface BaseQuestion {
    id: number;
    type: string;
    content: string;
    points: number;
    image?: string;
}

export interface MultipleChoiceQuestion extends BaseQuestion {
    type: "multiple_choice";
    options: string[];
    correctAnswer: string;
}

export interface CodeQuestion extends BaseQuestion {
    type: "code";
    hint?: string;
    codeAnswer?: string;
    testCases?: TestCase[];
}


export interface TestCase {
    input: string;
    expectedOutput: string;
    isHidden: boolean;
}

export type Question = MultipleChoiceQuestion | CodeQuestion;





