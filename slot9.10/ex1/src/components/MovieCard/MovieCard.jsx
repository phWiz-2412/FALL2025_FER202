import React, { useState } from "react";
import { Card, Row, Col, Button, Badge, Modal, Toast, ToastContainer } from "react-bootstrap";
import { movies } from "../../data/movies";
import "./MovieCard.css";

export default function MovieCard() {
  const [showModal, setShowModal] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [showToast, setShowToast] = useState(false);

  const handleAddFavourite = (movie) => {
    let favourites = JSON.parse(localStorage.getItem("favourites")) || [];
    if (!favourites.find((m) => m.id === movie.id)) {
      favourites.push(movie);
      localStorage.setItem("favourites", JSON.stringify(favourites));
    }
    setShowToast(true);
  };

  const handleDetails = (movie) => {
    setSelectedMovie(movie);
    setShowModal(true);
  };

  return (
    <>
      <Row xs={1} sm={2} md={3} className="g-4 mt-3 px-3">
        {movies.map((m) => (
          <Col key={m.id}>
            <Card className="movie-card shadow-sm">
              <Card.Img variant="top" src={m.poster} alt={m.title} />
              <Card.Body>
                <Card.Title>{m.title} <Badge bg="info">{m.genre}</Badge></Card.Title>
                <Card.Text>{m.description.slice(0, 90)}...</Card.Text>
                <small className="text-muted">{m.year} • {m.country} • {m.duration} mins</small>
              </Card.Body>
              <Card.Footer className="d-flex justify-content-between">
                <Button variant="outline-success" size="sm" onClick={() => handleAddFavourite(m)}>❤️ Favourite</Button>
                <Button variant="outline-primary" size="sm" onClick={() => handleDetails(m)}>🔍 Details</Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast show={showToast} onClose={() => setShowToast(false)} bg="success" delay={2000} autohide>
          <Toast.Body className="text-white">✅ Added to favourites!</Toast.Body>
        </Toast>
      </ToastContainer>

      <Modal show={showModal} onHide={() => setShowModal(false)} centered>
        <Modal.Header closeButton><Modal.Title>{selectedMovie?.title}</Modal.Title></Modal.Header>
        <Modal.Body>
          {selectedMovie && (
            <>
              <img src={selectedMovie.poster} alt={selectedMovie.title} className="img-fluid rounded mb-3" />
              <p>{selectedMovie.description}</p>
              <p><strong>Genre:</strong> {selectedMovie.genre}</p>
              <p><strong>Year:</strong> {selectedMovie.year} | <strong>Country:</strong> {selectedMovie.country}</p>
              <p><strong>Duration:</strong> {selectedMovie.duration} mins</p>
            </>
          )}
        </Modal.Body>
      </Modal>
    </>
  );
}
