import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import CounterComponent from "./components/Exercise1_CounterComponent";
import LightSwitch from "./components/Exercise2_LightSwitch";
import LoginForm from "./components/Exercise3_LoginForm";
import RegistrationForm from "./components/Exercise4_LoginForm2";
import ProfileForm from "./components/Exercise5_ProfileForm";
import SearchAccount from "./components/Exercise6_SearchAccount";
import FinalRegistrationForm from "./components/Exercise7_FinalRegistrationForm";

function App() {
  const [active, setActive] = useState(1);

  const exercises = [
    { id: 1, name: "Exercise 1 - Counter" },
    { id: 2, name: "Exercise 2 - Light Switch" },
    { id: 3, name: "Exercise 3 - Login Form1" },
    { id: 4, name: "Exercise 4 - Login Form2" },
    { id: 5, name: "Exercise 5 - Search Item" },
    { id: 6, name: "Exercise 6 - Search Account" },
    { id: 7, name: "Exercise 7 - Final Registration" },
  ];

  const renderComponent = () => {
    switch (active) {
      case 1:
        return <CounterComponent />;
      case 2:
        return <LightSwitch />;
      case 3:
        return <LoginForm />;
      case 4:
        return <RegistrationForm />;
      case 5:
        return <ProfileForm />;
      case 6:
        return <SearchAccount />;
      case 7:
        return <FinalRegistrationForm />;
      default:
        return null;
    }
  };

  return (
    <div style={{ textAlign: "center", background: "#f7f9fc", minHeight: "100vh" }}>
      <h1 style={{ padding: "25px", color: "#1976d2" }}>useState Hooks - QuocPH</h1>

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {exercises.map((ex) => (
          <button
            key={ex.id}
            onClick={() => setActive(ex.id)}
            style={{
              padding: "10px 15px",
              borderRadius: "6px",
              border: "none",
              background: active === ex.id ? "#1976d2" : "#e3f2fd",
              color: active === ex.id ? "#fff" : "#1976d2",
              fontWeight: "600",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            {ex.name}
          </button>
        ))}
      </div>

      <div>{renderComponent()}</div>
    </div>
  );
}

export default App;
