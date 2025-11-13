import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// GET /users
export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("/users");
      return res.data;
    } catch (err) {
      return rejectWithValue("Không thể tải danh sách người dùng");
    }
  }
);
