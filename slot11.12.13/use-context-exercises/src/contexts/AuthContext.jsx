import React, { createContext, useReducer, useContext } from "react";

const AuthContext = createContext();

const initialState = {
  user: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

function authReducer(state, action) {
  switch (action.type) {
    case "LOGIN_START":
      return { ...state, loading: true, error: null };
    case "LOGIN_SUCCESS":
      return { ...state, user: action.payload, loading: false, isAuthenticated: true };
    case "LOGIN_FAILURE":
      return { ...state, user: null, loading: false, error: action.payload, isAuthenticated: false };
    case "LOGOUT":
      return initialState;
    case "CLEAR_ERROR":
      return { ...state, error: null };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  const mockAccounts = [
    { id: 1, username: "admin", email: "admin@example.com", password: "123456", role: "admin", status: "active" },
    { id: 2, username: "user1", email: "user1@example.com", password: "123456", role: "user", status: "active" },
    { id: 3, username: "user2", email: "user2@example.com", password: "123456", role: "user", status: "locked" },
  ];

  function login(identifier, password) {
    dispatch({ type: "LOGIN_START" });
    return new Promise((resolve) => {
      setTimeout(() => {
        const isEmail = identifier.includes("@");
        const account = mockAccounts.find((acc) =>
          isEmail ? acc.email === identifier && acc.password === password : acc.username === identifier && acc.password === password
        );

        if (!account) {
          dispatch({ type: "LOGIN_FAILURE", payload: "Invalid credentials." });
          return resolve({ ok: false });
        }
        if (account.status === "locked") {
          dispatch({ type: "LOGIN_FAILURE", payload: "Account is locked." });
          return resolve({ ok: false });
        }
        if (account.role !== "admin") {
          dispatch({ type: "LOGIN_FAILURE", payload: "Access denied. Admins only." });
          return resolve({ ok: false });
        }

        const userInfo = {
          id: account.id,
          username: account.username,
          email: account.email,
          role: account.role,
        };

        dispatch({ type: "LOGIN_SUCCESS", payload: userInfo });
        resolve({ ok: true });
      }, 800);
    });
  }

  function logout() {
    dispatch({ type: "LOGOUT" });
  }

  function clearError() {
    dispatch({ type: "CLEAR_ERROR" });
  }

  return (
    <AuthContext.Provider value={{ ...state, login, logout, clearError }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within an AuthProvider");
  return context;
}
