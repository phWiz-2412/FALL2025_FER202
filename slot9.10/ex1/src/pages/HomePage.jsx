
import HomeCarousel from "../components/HomeCarousel/HomeCarousel";
import MovieCard from "../components/MovieCard/MovieCard";


export default function HomePage() {


  return (
    <div style={{ paddingBottom: "100px" }}>

      <HomeCarousel />
      <div className="mt-4 px-3">
        <h4>Featured Movies Collections</h4>
        <p className="text-secondary">Các bộ phim nổi bật được lựa chọn trong tuần này.</p>
      </div>
      <MovieCard />
    </div>
  );
}
