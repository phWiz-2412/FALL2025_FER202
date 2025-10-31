import React, { createContext, useState, useContext } from "react";
import api from "../api/movieApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

  const login = async (username, password) => {
    try {
      const res = await api.get("/accounts");
      const found = res.data.find(
        (acc) => acc.username === username && acc.password === password
      );
      if (found) {
        setUser(found);
        setError("");
        return true;
      } else {
        setError("❌ Sai tên đăng nhập hoặc mật khẩu!");
        return false;
      }
    } catch (err) {
      setError("⚠️ Lỗi kết nối server!");
      return false;
    }
  };

  const logout = () => setUser(null);

  return (
    <AuthContext.Provider value={{ user, error, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
