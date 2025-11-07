import { createContext, useReducer } from "react";
import API from "../services/api";

export const UserContext = createContext();

const initialState = { users: [] };

function reducer(state, action) {
  switch (action.type) {
    case "SET_USERS":
      return { ...state, users: action.payload };
    case "UPDATE_USER":
      return {
        ...state,
        users: state.users.map((u) =>
          u.id === action.payload.id ? action.payload : u
        ),
      };
    default:
      return state;
  }
}

export const UserProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const fetchUsers = async () => {
    const res = await API.get("/users");
    dispatch({ type: "SET_USERS", payload: res.data });
  };

  const updateUser = async (user) => {
    await API.put(`/users/${user.id}`, user);
    dispatch({ type: "UPDATE_USER", payload: user });
  };

  return (
    <UserContext.Provider value={{ state, dispatch, fetchUsers, updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
