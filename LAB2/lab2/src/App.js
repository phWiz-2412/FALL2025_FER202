import React from "react";
import NavigationBar from "./components/Navbar";
import Hero from "./components/Hero";
import Menu from "./components/Menu";
import Booking from "./components/Booking";
import Footer from "./components/Footer";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

function App() {
  return (
    <>
      <NavigationBar />
      <Hero />
      <Menu />
      <Booking />
      <Footer />
    </>
  );
}

export default App;
