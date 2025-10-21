import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CounterComponent from "./components/Exercise1_CounterComponent";
import ToggleComponent from "./components/Exercise2_ToggleComponent";
import LoginForm from "./components/Exercise3_LoginForm";
import SignUpForm from "./components/Exercise4_SignUpForm";
import QuestionBank from "./components/Exercise5_QuestionBank";
import QuestionBankAdvanced from "./components/Exercise6_QuestionBank_Advanced";

function App() {
  const [active, setActive] = useState(1);
  const components = [
    { id: 1, name: "Exercise 1 - Counter" },
    { id: 2, name: "Exercise 2 - Toggle" },
    { id: 3, name: "Exercise 3 - Login Form" },
    { id: 4, name: "Exercise 4 - Sign Up" },
    { id: 5, name: "Exercise 5 - Question Bank" },
    { id: 6, name: "Exercise 6 - Question Bank Advanced" },
  ];

  const render = () => {
    switch (active) {
      case 1: return <CounterComponent />;
      case 2: return <ToggleComponent />;
      case 3: return <LoginForm />;
      case 4: return <SignUpForm />;
      case 5: return <QuestionBank />;
      case 6: return <QuestionBankAdvanced />;
      default: return null;
    }
  };

  return (
    <div style={{ textAlign: "center", background: "#f9fafb", minHeight: "100vh" }}>
      <h1 style={{ color: "#1976d2", padding: "25px" }}>useReducer Hook - QuocPH</h1>
      <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "10px" }}>
        
        {components.map((c) => (
          <button
            key={c.id}
            onClick={() => setActive(c.id)}
            style={{
              padding: "10px 15px",
              borderRadius: "6px",
              border: "none",
              background: active === c.id ? "#1976d2" : "#e3f2fd",
              color: active === c.id ? "#fff" : "#1976d2",
              fontWeight: "600",
            }}
          >
            {c.name}
          </button>
        ))}
      </div>
      {render()}
    </div>
  );
}

export default App;
