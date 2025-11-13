import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import API from "../services/api";

export const fetchExpenses = createAsyncThunk(
  "expenses/fetchExpenses",
  async (userId) => {
    const res = await API.get(`/expenses?userId=${userId}`);
    return res.data;
  }
);

export const addExpense = createAsyncThunk(
  "expenses/addExpense",
  async (expense) => {
    const res = await API.post("/expenses", expense);
    return res.data;
  }
);

export const updateExpense = createAsyncThunk(
  "expenses/updateExpense",
  async ({ id, data }) => {
    const res = await API.put(`/expenses/${id}`, data);
    return res.data;
  }
);

export const deleteExpense = createAsyncThunk(
  "expenses/deleteExpense",
  async (id) => {
    await API.delete(`/expenses/${id}`);
    return id;
  }
);

const expensesSlice = createSlice({
  name: "expenses",
  initialState: { list: [], status: "idle", error: null },
  reducers: {
    setFilter(state, action) {
      // handled in component local state, not used here
    },
    clearExpenses(state) {
      state.list = [];
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchExpenses.fulfilled, (state, action) => {
        state.list = action.payload;
        state.status = "succeeded";
      })
      .addCase(addExpense.fulfilled, (state, action) => {
        state.list.push(action.payload);
      })
      .addCase(updateExpense.fulfilled, (state, action) => {
        const idx = state.list.findIndex(e => e.id === action.payload.id);
        if (idx !== -1) state.list[idx] = action.payload;
      })
      .addCase(deleteExpense.fulfilled, (state, action) => {
        state.list = state.list.filter(e => e.id !== action.payload);
      });
  }
});

export const { clearExpenses } = expensesSlice.actions;
export default expensesSlice.reducer;
