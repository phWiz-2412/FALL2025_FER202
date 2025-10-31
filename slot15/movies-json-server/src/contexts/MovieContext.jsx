import React, { createContext, useReducer, useContext, useEffect } from "react";
import api from "../api/movieApi";
import { movieReducer } from "../reducers/movieReducers";

const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [state, dispatch] = useReducer(movieReducer, { movies: [] });

  useEffect(() => {
    loadMovies();
  }, []);

  const loadMovies = async () => {
    try {
      const res = await api.get("/movies");
      dispatch({ type: "SET_MOVIES", payload: res.data });
    } catch (error) {
      console.error("❌ Lỗi tải phim:", error);
    }
  };

  const addMovie = async (movie) => {
    try {
      const resAll = await api.get("/movies");
      const usedIds = resAll.data.map((m) => m.id);
      let newId = 1;
      while (usedIds.includes(newId)) newId++;

      const newMovie = {
        ...movie,
        id: newId,
        poster: movie.poster?.trim() || "/images/no-image.jpg",
      };

      const res = await api.post("/movies", newMovie);
      dispatch({ type: "ADD_MOVIE", payload: res.data });
      alert("✅ Thêm phim thành công!");
    } catch (err) {
      console.error("❌ Lỗi thêm phim:", err);
      alert("❌ Không thể thêm phim!");
    }
  };

  const updateMovie = async (movie) => {
    try {
      const updated = {
        ...movie,
        poster: movie.poster?.trim() || "/images/no-image.jpg",
      };
      const res = await api.put(`/movies/${movie.id}`, updated);
      dispatch({ type: "UPDATE_MOVIE", payload: res.data });
      alert("✅ Cập nhật phim thành công!");
    } catch (err) {
      console.error("❌ Lỗi khi cập nhật phim:", err);
      alert("❌ Không thể cập nhật phim. Kiểm tra lại server hoặc db.json!");
    }
  };

  const deleteMovie = async (id) => {
    try {
      await api.delete(`/movies/${id}`);
      dispatch({ type: "DELETE_MOVIE", payload: id });
      alert("🗑️ Xóa thành công!");
    } catch (err) {
      console.error("❌ Lỗi khi xóa phim:", err);
      alert("❌ Không thể xóa phim!");
    }
  };

  return (
    <MovieContext.Provider
      value={{ movies: state.movies, addMovie, updateMovie, deleteMovie }}
    >
      {children}
    </MovieContext.Provider>
  );
}

export const useMovies = () => useContext(MovieContext);
