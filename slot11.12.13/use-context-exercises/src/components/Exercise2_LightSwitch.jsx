import React from "react";
import { Button, Card } from "react-bootstrap";
import { useTheme } from "../contexts/ThemeContext";

function LightSwitch() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Card className="m-3 p-3 text-center shadow-sm">
      <h4>Current Theme: {theme === "light" ? "🌞 Light" : "🌙 Dark"}</h4>
      <Button onClick={toggleTheme} variant={theme === "light" ? "dark" : "light"} className="mt-2">
        Toggle Theme
      </Button>
    </Card>
  );
}

export default LightSwitch;
