import React, { useReducer } from "react";
import { Button, Card } from "react-bootstrap";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };
    case "decrement":
      return { count: state.count - 1 };
    case "reset":
      return initialState;
    default:
      return state;
  }
}

export default function CounterComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Card className="text-center p-4" style={{ width: "350px", margin: "40px auto" }}>
      <h4>Exercise 1 - Counter</h4>
      <h2>{state.count}</h2>
      <div className="d-flex justify-content-center gap-2">
        <Button onClick={() => dispatch({ type: "increment" })}>+</Button>
        <Button onClick={() => dispatch({ type: "decrement" })}>-</Button>
        <Button variant="danger" onClick={() => dispatch({ type: "reset" })}>
          Reset
        </Button>
      </div>
    </Card>
  );
}
