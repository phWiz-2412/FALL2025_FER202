import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import api from "../api/movieApi";

function EditMovieModal({ show, movie, onSave, onClose }) {
  const [formData, setFormData] = useState(movie || {});
  const [genres, setGenres] = useState([]);

  useEffect(() => {
    setFormData(movie);
  }, [movie]);

  useEffect(() => {
    const loadGenres = async () => {
      try {
        const res = await api.get("/genres");
        setGenres(res.data);
      } catch (error) {
        console.error("❌ Lỗi tải thể loại:", error);
      }
    };
    loadGenres();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.genreId || !formData.year) {
      alert("Vui lòng nhập đủ thông tin!");
      return;
    }

    if (parseInt(formData.year, 10) > 2025) {
      alert("❌ Năm không được lớn hơn 2025!");
      return;
    }

    onSave(formData); // Gửi dữ liệu về MovieTable
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>✏️ Chỉnh sửa phim</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Label>Tên phim</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={formData.title || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Thể loại</Form.Label>
            <Form.Select
              name="genreId"
              value={formData.genreId || ""}
              onChange={handleChange}
              required
            >
              <option value="">-- Chọn thể loại --</option>
              {genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))}
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Năm</Form.Label>
            <Form.Control
              type="number"
              name="year"
              value={formData.year || ""}
              onChange={handleChange}
              required
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Quốc gia</Form.Label>
            <Form.Control
              type="text"
              name="country"
              value={formData.country || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Thời lượng (phút)</Form.Label>
            <Form.Control
              type="number"
              name="duration"
              value={formData.duration || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-2">
            <Form.Label>Ảnh Poster</Form.Label>
            <Form.Control
              type="text"
              name="poster"
              value={formData.poster || ""}
              onChange={handleChange}
              placeholder="/images/movie1.jpg"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Mô tả</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              value={formData.description || ""}
              onChange={handleChange}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="w-100">
            Lưu thay đổi
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default EditMovieModal;
