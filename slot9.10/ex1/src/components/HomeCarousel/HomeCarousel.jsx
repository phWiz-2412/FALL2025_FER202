import Carousel from "react-bootstrap/Carousel";
import Badge from "react-bootstrap/Badge";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import "./Carousel.css";

function HomeCarousel() {
  const slides = [
    {
      img: "https://images7.alphacoders.com/135/thumb-1920-1350736.jpeg",
      title: "Dune: Part Two",
      genre: "Sci-Fi",
      desc: "The saga continues as Paul Atreides unites with the Fremen to avenge his family and protect Arrakis."
    },
    {
      img: "https://images7.alphacoders.com/129/thumb-1920-1292803.jpg",
      title: "Avatar: The Way of Water",
      genre: "Fantasy",
      desc: "Jake Sully must protect his family as a familiar threat returns to Pandora."
    },
    {
      img: "https://w0.peakpx.com/wallpaper/739/144/HD-wallpaper-cillian-murphy-in-oppenheimer-movie.jpg",
      title: "Oppenheimer",
      genre: "Biography",
      desc: "The story of scientist J. Robert Oppenheimer and the creation of the atomic bomb."
    }
  ];

  return (
    <div className="home-carousel-wrapper no-dark">
      <Container fluid className="p-0 text-center">
        <Carousel fade interval={3000} pause="hover">
          {slides.map((s, idx) => (
            <Carousel.Item key={idx}>
              <img
                className="d-block w-100 carousel-img mx-auto"
                src={s.img}
                alt={s.title}
              />
              <Carousel.Caption>
                <h3>
                  {s.title} <Badge bg="secondary">{s.genre}</Badge>
                </h3>
                <p>{s.desc}</p>
                <Button variant="light">Chi tiết</Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </div>
  );
}

export default HomeCarousel;
