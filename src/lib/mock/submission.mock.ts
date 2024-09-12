import { Answer, Submission, StudentAssignmentSubmissions, TestCaseResult } from "@/lib/interface/submission.interface";
import { listStudents } from "./user.mock";
import { assignmentMock } from "./assignment.mock";

const generateRandomAnswers = (assignmentId: number): Answer[] => {
  const assignment = assignmentMock.find(a => a.id === assignmentId);
  if (!assignment) return [];

  return assignment.questions.map(question => {
    if (question.type === "multiple_choice") {
      const selectedAnswer = question.options[Math.floor(Math.random() * question.options.length)];
      const isCorrect = selectedAnswer === question.correctAnswer;
      return {
        questionId: question.id,
        type: "multiple_choice",
        selectedAnswer: selectedAnswer,
        score: isCorrect ? question.points : 0
      };
    } else if (question.type === "code") {
      const testCases: TestCaseResult[] = question.testCases?.map(tc => {
        const passed = Math.random() > 0.5;
        return {
          input: tc.input,
          expectedOutput: tc.expectedOutput,
          actualOutput: passed ? tc.expectedOutput : "Wrong output",
          isHidden: tc.isHidden || false
        };
      }) || [];
      
      const passedTestCases = testCases.filter(tc => tc.actualOutput === tc.expectedOutput).length;
      const totalTestCases = testCases.length;
      const score = (passedTestCases / totalTestCases) * question.points;
      
      return {
        questionId: question.id,
        type: "code",
        submittedCode: `# Sample code for question ${question.id}\ndef solution():\n    # TODO: Implement solution`,
        testCases: testCases,
        score: score
      };
    }
    throw new Error(`Unsupported question type: ${(question as any).type}`);
  });
};

const generateSubmissions = (studentId: number, assignmentId: number, count: number): Submission[] => {
  return Array.from({ length: count }, (_, index) => {
    const answers = generateRandomAnswers(assignmentId);
    const totalScore = answers.reduce((sum, answer) => sum + answer.score, 0);
    const duration = Math.floor(Math.random() * 60 * 60) + 600; // Random duration between 10 minutes and 70 minutes
    return {
      id: studentId * 1000 + assignmentId * 10 + index,
      assignmentId,
      studentId,
      answers: answers,
      submittedAt: new Date(Date.now() - Math.floor(Math.random() * 7 * 24 * 60 * 60 * 1000)),
      score: totalScore,
      duration: duration
    };
  });
};

export const studentAssignmentSubmissionsMock: StudentAssignmentSubmissions[] = 
  listStudents.flatMap(student =>
    assignmentMock.map(assignment => ({
      assignmentId: assignment.id,
      studentId: student.id,
      submissions: generateSubmissions(student.id, assignment.id, Math.random() > 0.2 ? Math.floor(Math.random() * 5) + 1 : 0)
    }))
  );

export const submissionMock: Submission[] = studentAssignmentSubmissionsMock.flatMap(
  sas => sas.submissions
);
