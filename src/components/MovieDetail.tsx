import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

interface Movie {
  title: string;
  year: string;
  img: string;
  desc: string;
}

const MovieDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [movie, setMovie] = useState<Movie | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`http://localhost:8000/movies/${id}`)
      .then(res => res.json())
      .then(data => setMovie(data));
  }, [id]);

  if (!movie) return <div style={{ color: '#fff', textAlign: 'center', marginTop: '100px' }}>Yuklanmoqda...</div>;

  return (
    <div style={{ backgroundColor: '#0f172a', minHeight: '100vh', padding: '40px', color: '#fff' }}>
      <button onClick={() => navigate(-1)} style={{ 
        background: 'none', border: '1px solid #38bdf8', color: '#38bdf8', 
        padding: '8px 20px', borderRadius: '20px', cursor: 'pointer', marginBottom: '30px'
      }}> ← Orqaga qaytish </button>

      <div style={{ display: 'flex', gap: '50px', flexWrap: 'wrap', alignItems: 'start' }}>
        <img src={movie.img} alt={movie.title} style={{ 
          width: '400px', borderRadius: '20px', boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)' 
        }} />
        <div style={{ flex: 1, maxWidth: '600px' }}>
          <h1 style={{ fontSize: '3rem', margin: '0 0 10px 0', color: '#38bdf8' }}>{movie.title}</h1>
          <p style={{ fontSize: '1.5rem', color: '#94a3b8', marginBottom: '20px' }}>Chiqarilgan yil: {movie.year}</p>
          <div style={{ height: '2px', background: 'linear-gradient(90deg, #38bdf8, transparent)', marginBottom: '20px' }}></div>
          <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: '#cbd5e1' }}>{movie.desc}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;