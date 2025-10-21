import React, { useReducer, useEffect } from "react";
import { Button, Container, Card, ProgressBar } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
// Danh sách câu hỏi
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

// ============================
// Lấy ngẫu nhiên n câu hỏi
// ============================
const getRandomQuestions = (n) => {
  const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};

// ============================
// State ban đầu
// ============================
const initialState = {
  questions: getRandomQuestions(3),
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  feedback: "",
  timeLeft: 10,
  highScore: localStorage.getItem("highScore")
    ? parseInt(localStorage.getItem("highScore"))
    : 0,
};

// ============================
// Reducer
// ============================
function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION": {
      const isCorrect =
        action.payload ===
        state.questions[state.currentQuestion].answer;
      return {
        ...state,
        selectedOption: action.payload,
        feedback: isCorrect
          ? "correct"
          : `incorrect-${state.questions[state.currentQuestion].answer}`,
        score: isCorrect ? state.score + 1 : state.score,
      };
    }

    case "NEXT_QUESTION":
      const nextIndex = state.currentQuestion + 1;
      if (nextIndex >= state.questions.length) {
        const newHighScore = Math.max(state.score, state.highScore);
        localStorage.setItem("highScore", newHighScore);
        return {
          ...state,
          showScore: true,
          highScore: newHighScore,
        };
      }
      return {
        ...state,
        currentQuestion: nextIndex,
        selectedOption: "",
        feedback: "",
        timeLeft: 10,
      };

    case "TICK":
      return { ...state, timeLeft: state.timeLeft - 1 };

    case "TIME_UP":
      return {
        ...state,
        feedback: `incorrect-${state.questions[state.currentQuestion].answer}`,
      };

    case "RESTART_QUIZ":
      return {
        ...initialState,
        questions: getRandomQuestions(3),
        highScore: state.highScore,
      };

    default:
      return state;
  }
}

// ============================
// Component chính
// ============================
export default function QuestionBankAdvanced() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const {
    questions,
    currentQuestion,
    selectedOption,
    score,
    showScore,
    feedback,
    timeLeft,
    highScore,
  } = state;

  // ⏰ Đồng hồ đếm ngược
  useEffect(() => {
    if (showScore || feedback.startsWith("incorrect")) return;
    if (timeLeft <= 0) {
      dispatch({ type: "TIME_UP" });
      return;
    }
    const timer = setTimeout(() => dispatch({ type: "TICK" }), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft, showScore, feedback]);

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
          maxWidth: "650px",
          borderRadius: "20px",
          border: "none",
        }}
      >
        <h3
          className="text-center mb-4"
          style={{ color: "#1976d2", fontWeight: 700 }}
        >
          Exercise 6 - Question Bank Advanced
        </h3>

        {showScore ? (
          <div className="text-center py-4">
            <h4 className="mb-3 text-success fw-bold">
              🎉 Your Score: {score} / {questions.length}
            </h4>
            <p style={{ fontSize: "1.1rem" }}>
              🏆 High Score:{" "}
              <span className="fw-bold text-primary">{highScore}</span>
            </p>
            <Button
              variant="primary"
              size="lg"
              style={{ borderRadius: "10px", fontWeight: "600" }}
              onClick={() => dispatch({ type: "RESTART_QUIZ" })}
            >
              🔁 Play Again
            </Button>
          </div>
        ) : (
          <>
            <div className="mb-3 text-center">
              <h5 style={{ fontWeight: "600", color: "#333" }}>
                Question {currentQuestion + 1}/{questions.length}
              </h5>
              <ProgressBar
                now={((currentQuestion + 1) / questions.length) * 100}
                className="mb-3"
                variant="info"
              />
              <p style={{ fontSize: "1.1rem" }}>
                {questions[currentQuestion].question}
              </p>
            </div>

            <div className="d-flex flex-wrap justify-content-center gap-3 mb-3">
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
                  disabled={feedback !== ""}
                  onClick={() =>
                    dispatch({ type: "SELECT_OPTION", payload: option })
                  }
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Phản hồi đúng/sai */}
            {feedback && (
              <div className="text-center mt-3">
                {feedback === "correct" ? (
                  <p className="text-success fw-bold">
                    <FaCheckCircle /> Correct! 🎉
                  </p>
                ) : (
                  <p className="text-danger fw-bold">
                    <FaTimesCircle /> Incorrect! The correct answer is{" "}
                    <span className="text-primary">
                      {feedback.split("-")[1]}
                    </span>
                  </p>
                )}
              </div>
            )}

            {/* Đồng hồ đếm ngược */}
            <div className="text-center mt-2 mb-4">
              <p
                style={{
                  fontWeight: "600",
                  color: timeLeft < 5 ? "red" : "#333",
                }}
              >
                ⏰ Time left: {timeLeft}s
              </p>
            </div>

            <div className="text-center">
              <Button
                variant="success"
                size="lg"
                disabled={!feedback}
                onClick={() => dispatch({ type: "NEXT_QUESTION" })}
                style={{
                  borderRadius: "10px",
                  minWidth: "160px",
                  fontWeight: "600",
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
