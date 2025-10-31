import React, { useReducer } from "react";
import { Button, Card } from "react-bootstrap";

function reducer(state, action) {
  switch (action.type) {
    case "toggle":
      return { isOn: !state.isOn };
    default:
      return state;
  }
}

export default function ToggleComponent() {
  const [state, dispatch] = useReducer(reducer, { isOn: false });

  return (
    <Card className="text-center p-4" style={{ width: "350px", margin: "40px auto" }}>
      <h4>Exercise 2 - Toggle Component</h4>
      <div
        style={{
          width: "120px",
          height: "120px",
          margin: "20px auto",
          borderRadius: "50%",
          background: state.isOn ? "yellow" : "#555",
          boxShadow: state.isOn ? "0 0 30px yellow" : "none",
        }}
      />
      <Button onClick={() => dispatch({ type: "toggle" })}>
        {state.isOn ? "Turn Off" : "Turn On"}
      </Button>
    </Card>
  );
}
