import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

export const createPayment = createAsyncThunk(
  "payments/createPayment",
  async (data, { rejectWithValue }) => {
    try {
      const res = await api.post("/payments", data);
      return res.data;
    } catch (err) {
      if (err.response?.status === 402) {
        return rejectWithValue("Tài khoản không đủ tiền");
      }
      return rejectWithValue("Lỗi tạo thanh toán");
    }
  }
);
