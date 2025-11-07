import { createContext, useReducer } from "react";
import API from "../services/api";

export const PaymentContext = createContext();

const initialState = {
  payments: [],
  filtered: [],
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PAYMENTS":
      return { ...state, payments: action.payload, filtered: action.payload };

    case "ADD_PAYMENT":
      return {
        ...state,
        payments: [...state.payments, action.payload],
        filtered: [...state.filtered, action.payload],
      };

    case "UPDATE_PAYMENT":
      return {
        ...state,
        payments: state.payments.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
        filtered: state.filtered.map((p) =>
          p.id === action.payload.id ? action.payload : p
        ),
      };

    case "DELETE_PAYMENT":
      return {
        ...state,
        payments: state.payments.filter((p) => p.id !== action.payload),
        filtered: state.filtered.filter((p) => p.id !== action.payload),
      };

    case "FILTER":
      return { ...state, filtered: action.payload };

    default:
      return state;
  }
}

export const PaymentProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // CRUD functions
  const addPayment = async (payment) => {
    const res = await API.post("/payments", payment);
    dispatch({ type: "ADD_PAYMENT", payload: res.data });
  };

  const updatePayment = async (payment) => {
    await API.put(`/payments/${payment.id}`, payment);
    dispatch({ type: "UPDATE_PAYMENT", payload: payment });
  };

  const deletePayment = async (id) => {
    await API.delete(`/payments/${id}`);
    dispatch({ type: "DELETE_PAYMENT", payload: id });
  };

  // Filter + Sort utilities
  const filterPayments = (keyword, sortType) => {
    let list = [...state.payments];
    if (keyword) {
      list = list.filter(
        (p) =>
          p.semester.toLowerCase().includes(keyword.toLowerCase()) ||
          p.courseName.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    switch (sortType) {
      case "az":
        list.sort((a, b) => a.courseName.localeCompare(b.courseName));
        break;
      case "za":
        list.sort((a, b) => b.courseName.localeCompare(a.courseName));
        break;
      case "dateAsc":
        list.sort((a, b) => new Date(a.date) - new Date(b.date));
        break;
      case "dateDesc":
        list.sort((a, b) => new Date(b.date) - new Date(a.date));
        break;
      case "amountAsc":
        list.sort((a, b) => a.amount - b.amount);
        break;
      case "amountDesc":
        list.sort((a, b) => b.amount - a.amount);
        break;
      default:
        break;
    }

    dispatch({ type: "FILTER", payload: list });
  };

  return (
    <PaymentContext.Provider
      value={{
        state,
        dispatch,
        addPayment,
        updatePayment,
        deletePayment,
        filterPayments,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
