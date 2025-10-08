// src/components/HomeCarousel/HomeCarousel.jsx
import Carousel from "react-bootstrap/Carousel";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import "./Carousel.css";

function HomeCarousel() {
  const slides = [
    {
      img: "https://picsum.photos/1200/400?random=1",
      title: "The Great Adventure",
      genre: "Action",
      desc: "A thrilling journey across unknown lands."
    },
    {
      img: "https://picsum.photos/1200/400?random=2",
      title: "Love & Time",
      genre: "Romance",
      desc: "A touching story about love and fate."
    },
    {
      img: "https://picsum.photos/1200/400?random=3",
      title: "Mindbender",
      genre: "Sci-Fi",
      desc: "A mind-bending science fiction thriller."
    }
  ];

  return (
    <Carousel fade interval={3000} pause="hover">
      {slides.map((s, idx) => (
        <Carousel.Item key={idx}>
          <img className="d-block w-100" src={s.img} alt={`${s.title} slide`} />
          <Carousel.Caption>
            <h3>
              {s.title} <Badge bg="secondary" pill>{s.genre}</Badge>
            </h3>
            <p>{s.desc}</p>
            <Button variant="primary">Chi tiết</Button>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}

export default HomeCarousel;
