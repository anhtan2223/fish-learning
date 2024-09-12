import { TestCase } from "./assignment.interface";

export interface BaseAnswer {
    questionId: number;
    score: number;
}

export interface MultipleChoiceAnswer extends BaseAnswer {
    type: "multiple_choice";
    selectedAnswer: string;
}

export interface TestCaseResult extends TestCase {
    actualOutput: string;
}

export interface CodeAnswer extends BaseAnswer {
    type: "code";
    submittedCode: string;
    testCases: TestCaseResult[];
}

export type Answer = MultipleChoiceAnswer | CodeAnswer;

export interface Submission {
    id: number;
    assignmentId: number;
    studentId: number;
    answers: Answer[];
    submittedAt: Date;
    score: number;
    duration: number;
}

export interface StudentAssignmentSubmissions {
    assignmentId: number;
    studentId: number;
    submissions: Submission[];
}