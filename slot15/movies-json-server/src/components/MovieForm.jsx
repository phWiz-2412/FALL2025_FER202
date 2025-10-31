import React, { useState, useEffect } from "react";
import { Button, Form } from "react-bootstrap";
import api from "../api/movieApi";

function MovieForm({ onAdd }) {
  const [genres, setGenres] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    poster: "",
    genreId: "",
    year: "",
    country: "",
    duration: "",
  });

  // 🔹 Lấy danh sách thể loại khi khởi tạo
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const res = await api.get("/genres");
        setGenres(res.data || []);
      } catch (error) {
        console.error("❌ Lỗi tải thể loại:", error);
        setGenres([]); // tránh null
      }
    };
    fetchGenres();
  }, []);

  // 🔹 Cập nhật dữ liệu form
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🔹 Xử lý thêm phim
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate dữ liệu nhập
    if (!formData.title || !formData.genreId || !formData.year) {
      alert("⚠️ Vui lòng nhập đầy đủ thông tin phim!");
      return;
    }

    if (parseInt(formData.year, 10) > 2025) {
      alert("❌ Năm phim không hợp lệ (phải nhỏ hơn 2025).");
      return;
    }

    // Nếu không nhập poster thì dùng ảnh mặc định
    const movieData = {
      ...formData,
      poster: formData.poster.trim() || "/images/no-image.jpg",
    };

    // Gọi callback onAdd (được truyền từ MovieManager)
    onAdd(movieData);

    // Reset form
    setFormData({
      title: "",
      description: "",
      poster: "",
      genreId: "",
      year: "",
      country: "",
      duration: "",
    });
  };

  return (
    <div className="card p-3 shadow-sm mt-3">
      <h5 className="mb-3">🎬 Thêm phim mới</h5>
      <Form onSubmit={handleSubmit}>
        {/* Tên phim */}
        <Form.Group className="mb-2">
          <Form.Label>Tên phim</Form.Label>
          <Form.Control
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Nhập tên phim"
            required
          />
        </Form.Group>

        {/* Thể loại */}
        <Form.Group className="mb-2">
          <Form.Label>Thể loại</Form.Label>
          <Form.Select
            name="genreId"
            value={formData.genreId}
            onChange={handleChange}
            required
          >
            <option value="">-- Chọn thể loại --</option>
            {Array.isArray(genres) && genres.length > 0 ? (
              genres.map((g) => (
                <option key={g.id} value={g.id}>
                  {g.name}
                </option>
              ))
            ) : (
              <option disabled>Đang tải...</option>
            )}
          </Form.Select>
        </Form.Group>

        {/* Năm */}
        <Form.Group className="mb-2">
          <Form.Label>Năm</Form.Label>
          <Form.Control
            type="number"
            name="year"
            value={formData.year}
            onChange={handleChange}
            placeholder="Ví dụ: 2024"
            required
          />
        </Form.Group>

        {/* Quốc gia */}
        <Form.Group className="mb-2">
          <Form.Label>Quốc gia</Form.Label>
          <Form.Control
            type="text"
            name="country"
            value={formData.country}
            onChange={handleChange}
            placeholder="Ví dụ: USA"
          />
        </Form.Group>

        {/* Thời lượng */}
        <Form.Group className="mb-2">
          <Form.Label>Thời lượng (phút)</Form.Label>
          <Form.Control
            type="number"
            name="duration"
            value={formData.duration}
            onChange={handleChange}
            placeholder="Ví dụ: 120"
          />
        </Form.Group>

        {/* Ảnh Poster */}
        <Form.Group className="mb-2">
          <Form.Label>Ảnh Poster (URL)</Form.Label>
          <Form.Control
            type="text"
            name="poster"
            value={formData.poster}
            onChange={handleChange}
            placeholder="/images/movie1.jpg"
          />
        </Form.Group>

        {/* Mô tả */}
        <Form.Group className="mb-3">
          <Form.Label>Mô tả</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Tóm tắt nội dung phim..."
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          ➕ Thêm phim
        </Button>
      </Form>
    </div>
  );
}

export default MovieForm;
