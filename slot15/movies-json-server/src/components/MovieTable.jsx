import React, { useState, useEffect } from "react";
import { Table, Button, Form, Row, Col, Image } from "react-bootstrap";
import { useMovies } from "../contexts/MovieContext";
import api from "../api/movieApi";
import EditMovieModal from "./EditMovieModal";

function MovieTable() {
  const { movies, deleteMovie, updateMovie } = useMovies();
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genres, setGenres] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [sortAsc, setSortAsc] = useState(true); // 🔹 trạng thái sắp xếp

  // 🔹 Load danh sách thể loại
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await api.get("/genres");
        setGenres(res.data);
      } catch (err) {
        console.error("❌ Lỗi tải thể loại:", err);
      }
    };
    fetchGenres();
  }, []);

  // 🔹 Tự động lọc theo tìm kiếm + thể loại + sắp xếp
  useEffect(() => {
    let filtered = movies;

    if (searchTerm.trim()) {
      filtered = filtered.filter((m) =>
        m.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (selectedGenre) {
      filtered = filtered.filter(
        (m) => String(m.genreId) === String(selectedGenre)
      );
    }

    // 🔹 Sắp xếp theo tên phim
    filtered = [...filtered].sort((a, b) =>
      sortAsc
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );

    setFilteredMovies(filtered);
  }, [movies, searchTerm, selectedGenre, sortAsc]);

  const handleEdit = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  const handleSave = (movie) => {
    updateMovie(movie);
    setShowModal(false);
  };

  const getGenreName = (id) => {
    const genre = genres.find((g) => g.id === id);
    return genre ? genre.name : "Unknown";
  };

  return (
    <div className="mt-4">
      <h5 className="mb-3">🎬 Danh sách phim</h5>

      {/* Bộ lọc tìm kiếm + thể loại + sắp xếp */}
      <Row className="mb-3">
        <Col md={4}>
          <Form.Control
            type="text"
            placeholder="🔍 Tìm kiếm theo tên phim..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </Col>
        <Col md={4}>
          <Form.Select
            value={selectedGenre}
            onChange={(e) => setSelectedGenre(e.target.value)}
          >
            <option value="">-- Tất cả thể loại --</option>
            {genres.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </Form.Select>
        </Col>
        <Col md={4} className="d-flex gap-2">
          <Button
            variant="info"
            className="flex-fill"
            onClick={() => setSortAsc(!sortAsc)}
          >
            {sortAsc ? "🔼 Sắp xếp A → Z" : "🔽 Sắp xếp Z → A"}
          </Button>
          <Button
            variant="secondary"
            className="flex-fill"
            onClick={() => {
              setSearchTerm("");
              setSelectedGenre("");
              setSortAsc(true);
            }}
          >
            🔄 Làm mới
          </Button>
        </Col>
      </Row>

      {/* Bảng danh sách phim */}
      <Table striped bordered hover responsive className="align-middle text-center shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>#</th>
            <th>Poster</th>
            <th>Tên phim</th>
            <th>Thể loại</th>
            <th>Năm</th>
            <th>Quốc gia</th>
            <th>Thời lượng</th>
            <th>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {filteredMovies.length > 0 ? (
            filteredMovies.map((m, i) => (
              <tr key={m.id}>
                <td>{i + 1}</td>
                <td>
                  <Image
                    src={m.poster || "/images/no-image.jpg"}
                    alt={m.title}
                    style={{ width: 60, height: 90, objectFit: "cover" }}
                    onError={(e) => (e.target.src = "/images/no-image.jpg")}
                  />
                </td>
                <td>{m.title}</td>
                <td>{getGenreName(m.genreId)}</td>
                <td>{m.year}</td>
                <td>{m.country || "N/A"}</td>
                <td>{m.duration ? `${m.duration} phút` : "?"}</td>
                <td>
                  <Button
                    variant="warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(m)}
                  >
                    ✏️
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => deleteMovie(m.id)}
                  >
                    🗑️
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="8">Không tìm thấy phim nào</td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Modal chỉnh sửa phim */}
      {showModal && selectedMovie && (
        <EditMovieModal
          show={showModal}
          movie={selectedMovie}
          onSave={handleSave}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default MovieTable;
