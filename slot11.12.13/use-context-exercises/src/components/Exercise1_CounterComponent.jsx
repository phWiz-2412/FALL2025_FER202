import React, { useReducer } from "react";
import { Button, Card } from "react-bootstrap";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return initialState;
    default:
      return state;
  }
}

function CounterComponent() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Card className="m-3 p-3 text-center shadow-sm">
      <h3>Counter: {state.count}</h3>
      <div className="d-flex justify-content-center gap-2 mt-3">
        <Button variant="success" onClick={() => dispatch({ type: "INCREMENT" })}>+</Button>
        <Button variant="danger" onClick={() => dispatch({ type: "DECREMENT" })}>-</Button>
        <Button variant="secondary" onClick={() => dispatch({ type: "RESET" })}>Reset</Button>
      </div>
    </Card>
  );
}

export default CounterComponent;
