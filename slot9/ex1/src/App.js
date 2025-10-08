// src/App.js
import "bootstrap/dist/css/bootstrap.min.css";
import HomeCarousel from "./components/HomeCarousel/HomeCarousel";
import FooterPage from "./pages/FooterPage";

function App() {
  return (
    <div>
      <HomeCarousel />
      <FooterPage />
    </div>
  );
}

export default App;
