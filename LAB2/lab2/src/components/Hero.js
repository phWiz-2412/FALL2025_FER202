import React from "react";
import { Carousel } from "react-bootstrap";
import "../App.css";

function Hero() {
  return (
    <section className="hero-section">
      <Carousel fade interval={1000} controls indicators>
        <Carousel.Item>
          <img
            className="d-block w-100 hero-img"
            src="/images/pizza-hero.jpg"
            alt="Banner 1"
          />
          <div className="overlay"></div>
          <Carousel.Caption className="hero-text">
            <h1>Neapolitan Pizza</h1>
            <p>The authentic taste of Italy on your table</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 hero-img"
            src="/images/pizza-hero1.jpg"
            alt="Banner 2"
          />
          <div className="overlay"></div>
          <Carousel.Caption className="hero-text">
            <h1>Neapolitan Pizza</h1>
            <p>Made with hand-picked ingredients daily</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 hero-img"
            src="/images/pizza-hero2.jpg"
            alt="Banner 3"
          />
          <div className="overlay"></div>
          <Carousel.Caption className="hero-text">
            <h1>Neapolitan Pizza</h1>
            <p>Traditional recipes passed down for generations</p>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 hero-img"
            src="/images/pizza-hero3.jpg"
            alt="Banner 4"
          />
          <div className="overlay"></div>
          <Carousel.Caption className="hero-text">
            <h1>Neapolitan Pizza</h1>
            <p>Perfect pizza for every gathering</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </section>
  );
}

export default Hero;
