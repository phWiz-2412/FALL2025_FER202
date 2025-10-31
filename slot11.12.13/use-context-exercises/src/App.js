// src/App.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

// Import Providers
import { ThemeProvider } from "./contexts/ThemeContext";
import { AuthProvider } from "./contexts/AuthContext";

// Import các component
import CounterComponent from "./components/Exercise1_CounterComponent";
import LightSwitch from "./components/Exercise2_LightSwitch";
import LoginForm from "./components/Exercise3_LoginForm";

function App() {
  const [active, setActive] = useState(1);

  // Danh sách bài tập
  const components = [
    { id: 1, name: "Exercise 1 - Counter" },
    { id: 2, name: "Exercise 2 - Light Switch" },
    { id: 3, name: "Exercise 3 - Login Form" },
  ];

  // Hàm render bài tập theo id
  const renderComponent = () => {
    switch (active) {
      case 1:
        return <CounterComponent />;
      case 2:
        return <LightSwitch />;
      case 3:
        return (
          <AuthProvider>
            <LoginForm />
          </AuthProvider>
        );
      default:
        return null;
    }
  };

  return (
    <ThemeProvider>
      <div
        style={{
          textAlign: "center",
          background: "#f9fafb",
          minHeight: "100vh",
          paddingBottom: "50px",
        }}
      >
        <h1 style={{ color: "#1976d2", padding: "25px" }}>
          useContext Hook Exercises - QuocPH
        </h1>

        {/* Menu chọn bài */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: "10px",
            marginBottom: "30px",
          }}
        >
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
                cursor: "pointer",
                transition: "all 0.2s ease",
              }}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Hiển thị bài được chọn */}
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>{renderComponent()}</div>
      </div>
    </ThemeProvider>
  );
}

export default App;
