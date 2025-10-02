import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import Banner from './components/Banner';
import Navar from './components/Navar'; // hoặc Navbar nếu bạn đã sửa tên
import Grid from './components/Grid';
import Footer from './components/Footer';

function App() {
  return (
    <div>
      <Banner />
      <Navar />
      <Grid />
      <Footer />
    </div>
  );
}

export default App;
