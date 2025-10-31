import React, { useState } from "react";
import { useMovies } from "../contexts/MovieContext";
import MovieTable from "../components/MovieTable";
import MovieForm from "../components/MovieForm";
import EditMovieModal from "../components/EditMovieModal";

function MovieManager() {
  const { movies, addMovie, updateMovie, deleteMovie } = useMovies();
  const [editingMovie, setEditingMovie] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [genreFilter, setGenreFilter] = useState("");

  // --- Mở modal Edit ---
  const handleEdit = (movie) => {
    setEditingMovie(movie);
  };

  // --- Đóng modal Edit ---
  const closeEditModal = () => setEditingMovie(null);

  // --- Lọc phim ---
  const filteredMovies = movies.filter((movie) => {
    const matchSearch = movie.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchGenre =
      !genreFilter || movie.genreId === parseInt(genreFilter, 10);
    return matchSearch && matchGenre;
  });

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🎬 Movie Management</h2>

      {/* Bộ lọc */}
      <div className="d-flex justify-content-between mb-3">
        <input
          type="text"
          placeholder="Tìm phim theo tên..."
          className="form-control w-50"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <select
          className="form-select w-25"
          value={genreFilter}
          onChange={(e) => setGenreFilter(e.target.value)}
        >
          <option value="">Tất cả thể loại</option>
          <option value="1">Sci-Fi</option>
          <option value="2">Comedy</option>
          <option value="3">Drama</option>
          <option value="4">Horror</option>
          <option value="5">Romance</option>
          <option value="6">Action</option>
          <option value="7">Thriller</option>
        </select>
      </div>

      <MovieForm onAdd={addMovie} />
      <MovieTable
        movies={filteredMovies}
        onDelete={deleteMovie}
        onEdit={handleEdit}
      />

      {/* Modal edit */}
      {editingMovie && (
        <EditMovieModal
          movie={editingMovie}
          onClose={closeEditModal}
          onSave={updateMovie}
        />
      )}
    </div>
  );
}

export default MovieManager;
