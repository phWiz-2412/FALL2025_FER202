import React, { useReducer } from "react";
import { Button, Container, Card } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

// 🧩 Tạo danh sách nhiều câu hỏi
const allQuestions = [
  {
    id: 1,
    question: "What is the capital of Australia?",
    options: ["Sydney", "Canberra", "Melbourne", "Perth"],
    answer: "Canberra",
  },
  {
    id: 2,
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    id: 3,
    question: "What is the largest ocean on Earth?",
    options: ["Atlantic", "Indian", "Pacific", "Arctic"],
    answer: "Pacific",
  },
  {
    id: 4,
    question: "Who wrote 'Romeo and Juliet'?",
    options: [
      "William Shakespeare",
      "Charles Dickens",
      "Mark Twain",
      "Jane Austen",
    ],
    answer: "William Shakespeare",
  },
  {
    id: 5,
    question: "Which country has the Great Wall?",
    options: ["Japan", "India", "China", "Vietnam"],
    answer: "China",
  },
  {
    id: 6,
    question: "What gas do plants absorb from the atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Helium"],
    answer: "Carbon Dioxide",
  },
  {
    id: 7,
    question: "Which planet is closest to the Sun?",
    options: ["Venus", "Earth", "Mercury", "Mars"],
    answer: "Mercury",
  },
  {
    id: 8,
    question: "What is H2O commonly known as?",
    options: ["Salt", "Oxygen", "Water", "Hydrogen"],
    answer: "Water",
  },
  {
    id: 9,
    question: "Which instrument measures temperature?",
    options: ["Thermometer", "Barometer", "Altimeter", "Speedometer"],
    answer: "Thermometer",
  },
  {
    id: 10,
    question: "What is the chemical symbol for gold?",
    options: ["Au", "Ag", "Fe", "Go"],
    answer: "Au",
  },
];

// 🎲 Hàm lấy ngẫu nhiên n câu hỏi khác nhau
const getRandomQuestions = (n) => {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

// 🧠 State ban đầu
const initialState = {
  questions: getRandomQuestions(3),
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
};

// ⚙️ Reducer quản lý hành động
function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "NEXT_QUESTION":
      const isCorrect =
        state.selectedOption === state.questions[state.currentQuestion].answer;
      const nextIndex = state.currentQuestion + 1;
      const finished = nextIndex === state.questions.length;
      return {
        ...state,
        score: isCorrect ? state.score + 1 : state.score,
        currentQuestion: nextIndex,
        selectedOption: "",
        showScore: finished,
      };

    case "RESTART_QUIZ":
      return {
        ...initialState,
        questions: getRandomQuestions(3), // random 3 câu mới
      };

    default:
      return state;
  }
}

// 🧩 Component chính
export default function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { questions, currentQuestion, selectedOption, score, showScore } =
    state;

  const handleOptionSelect = (option) =>
    dispatch({ type: "SELECT_OPTION", payload: option });

  const handleNextQuestion = () => dispatch({ type: "NEXT_QUESTION" });

  const handleRestartQuiz = () => dispatch({ type: "RESTART_QUIZ" });

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #f0f4ff 60%, #e3f2fd 100%)",
      }}
    >
      <Card
        className="p-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "600px",
          borderRadius: "20px",
          border: "none",
        }}
      >
        <h3
          className="text-center mb-4"
          style={{ color: "#1976d2", fontWeight: 700 }}
        >
          Exercise 5 - Question Bank
        </h3>

        {showScore ? (
          <div className="text-center py-4">
            <h4 className="mb-3 text-success fw-bold">
              🎉 Your Score: {score} / {questions.length}
            </h4>
            <Button
              variant="primary"
              size="lg"
              style={{ borderRadius: "10px", fontWeight: "600" }}
              onClick={handleRestartQuiz}
            >
              🔁 Play Again
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-4 text-center">
              <h5 style={{ fontWeight: "600", color: "#333" }}>
                Question {currentQuestion + 1} of {questions.length}
              </h5>
              <p style={{ fontSize: "1.1rem" }}>
                {questions[currentQuestion].question}
              </p>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-3 mb-4">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedOption === option ? "primary" : "outline-primary"
                  }
                  className="px-4 py-2"
                  style={{
                    borderRadius: "10px",
                    minWidth: "200px",
                    fontWeight: "500",
                  }}
                  onClick={() => handleOptionSelect(option)}
                >
                  {option}
                </Button>
              ))}
            </div>

            <div className="text-center">
              <Button
                variant="success"
                size="lg"
                disabled={!selectedOption}
                onClick={handleNextQuestion}
                style={{
                  borderRadius: "10px",
                  minWidth: "160px",
                  fontWeight: "600",
                  letterSpacing: "0.3px",
                }}
              >
                {currentQuestion === questions.length - 1
                  ? "Finish Quiz"
                  : "Next"}
              </Button>
            </div>
          </>
        )}
      </Card>
    </Container>
  );
}
