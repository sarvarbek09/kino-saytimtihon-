import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import AdminPanel from './components/Admin';
import Login from './components/Login';
import MovieDetail from './components/MovieDetail';

interface Movie {
  id: number;
  title: string;
  year: number;
  img: string;
  desc: string;
}

function App() {
  const [movies, setMovies] = useState<Movie[]>([]);

  // Ma'lumotlarni backenddan o'qib olish
  const fetchMovies = () => {
    fetch('http://localhost:8000/movies')
      .then(res => res.json())
      .then(data => setMovies(data));
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home movies={movies} />} />
        <Route path="/movie/:id" element={<MovieDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminPanel onRefresh={fetchMovies} />} />
      </Routes>
    </Router>
  );
}

export default App;