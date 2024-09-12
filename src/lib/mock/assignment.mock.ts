import { Assignment, Question } from "@/lib/interface";

export const questionMock: Question[] = [
    {
      id: 1,
      type: "multiple_choice",
      content: "Thuật toán KNN là viết tắt của?",
      options: [
        "K-Nearest Neighbors",
        "K-Nearest Networks",
        "K-Nearest Nodes",
        "K-Nearest Numerals",
      ],
      correctAnswer: "K-Nearest Neighbors",
      points: 1,
    } ,
    {
      id: 2,
      type: "code",
      content:
        "Viết một hàm Python để tính khoảng cách Euclidean giữa hai điểm.",
      points: 2,
      hint: "Hãy sử dụng công thức khoảng cách Euclidean và hàm math.sqrt().",
      codeAnswer:
        "import math\n\ndef euclidean_distance(point1, point2):\n    return math.sqrt(sum((p1 - p2) ** 2 for p1, p2 in zip(point1, point2)))",
      testCases: [
        { input: "([0, 0], [3, 4])", expectedOutput: "5.0", isHidden: false },
        { input: "([1, 1], [4, 5])", expectedOutput: "5.0", isHidden: true },
      ],
    },
    {
      id: 3,
      type: "multiple_choice",
      content: "Trong thuật toán KNN, K đại diện cho gì?",
      options: [
        "Số lượng hàng xóm gần nhất",
        "Khoảng cách giữa các điểm",
        "Số lượng thuộc tính",
        "Số lượng lớp",
      ],
      correctAnswer: "Số lượng hàng xóm gần nhất",
      points: 1,
    },
    {
      id: 4,
      type: "code",
      content:
        "Viết một hàm Python để chuẩn hóa một mảng số thực sử dụng min-max scaling.",
      points: 3,
      hint: "Công thức: (x - min(x)) / (max(x) - min(x))",
      codeAnswer:
        "def normalize(arr):\n    min_val = min(arr)\n    max_val = max(arr)\n    return [(x - min_val) / (max_val - min_val) for x in arr]",
      testCases: [
        { input: "[1, 2, 3, 4, 5]", expectedOutput: "[0.0, 0.25, 0.5, 0.75, 1.0]", isHidden: false },
        { input: "[10, 20, 30, 40, 50]", expectedOutput: "[0.0, 0.25, 0.5, 0.75, 1.0]", isHidden: true },
      ],
    },
    {
      id: 5,
      type: "multiple_choice",
      content: "Thuật toán KNN được sử dụng chủ yếu cho bài toán nào?",
      options: [
        "Phân loại và hồi quy",
        "Phân cụm",
        "Giảm chiều dữ liệu",
        "Tối ưu hóa",
      ],
      correctAnswer: "Phân loại và hồi quy",
      points: 1,
    },
];

export const assignmentMock: Assignment[] = [
  {
    id: 1,
    title: "Bài tập về thuật toán KNN",
    description: "Trong bài tập này, bạn sẽ làm quen với thuật toán K-Nearest Neighbors (KNN) và các khái niệm liên quan.",
    startDate: "2023-06-01T00:00:00Z",
    dueDate: "2023-06-15T23:59:59Z",
    totalPoints: 8,
    status: "active",
    questions: questionMock,
  },
  {
    id: 2,
    title: "Ôn tập cuối kỳ: Machine Learning Cơ bản",
    description: "Bài tập này sẽ giúp bạn ôn tập các kiến thức cơ bản về Machine Learning đã học trong học kỳ.",
    startDate: "2023-06-20T00:00:00Z",
    dueDate: "2023-07-05T23:59:59Z",
    totalPoints: 10,
    status: "upcoming",
    questions: [],
  },
];