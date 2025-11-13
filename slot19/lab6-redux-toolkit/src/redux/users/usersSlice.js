import { createSlice } from "@reduxjs/toolkit";
import { fetchUsers } from "./usersThunks";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    list: [],
    isLoading: false,
    error: null,
  },

  reducers: {
    // Toggle Admin Status
    toggleAdmin(state, action) {
      const id = action.payload;
      const user = state.list.find((u) => u.id === id);
      if (user) {
        user.isAdmin = !user.isAdmin;
      }
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.list = action.payload;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { toggleAdmin } = usersSlice.actions;
export default usersSlice.reducer;
