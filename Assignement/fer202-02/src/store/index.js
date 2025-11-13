import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import expensesReducer from "./expensesSlice";

export default configureStore({
  reducer: {
    auth: authReducer,
    expenses: expensesReducer
  }
});
