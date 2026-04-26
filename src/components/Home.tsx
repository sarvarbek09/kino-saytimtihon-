import React from 'react';
import { Link } from 'react-router-dom';

interface Movie {
  id: string | number;
  title: string;
  year: string;
  img: string;
}

interface HomeProps {
  movies: Movie[];
}

const Home: React.FC<HomeProps> = ({ movies }) => {
  return (
    <div style={{ padding: '40px', backgroundColor: '#0f172a', minHeight: '100vh' }}>
      <h2 style={{ color: '#fff', textAlign: 'center', marginBottom: '40px', fontSize: '2.5rem', fontWeight: 'bold' }}>
        Tavsiya etilgan Kinolar
      </h2>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
        gap: '30px',
        maxWidth: '1200px',
        margin: '0 auto'
      }}>
        {movies.map(movie => (
          <Link to={`/movie/${movie.id}`} key={movie.id} style={{ textDecoration: 'none' }}>
            <div className="movie-card" style={{
              backgroundColor: '#1e293b',
              borderRadius: '16px',
              overflow: 'hidden',
              transition: 'transform 0.3s ease',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}>
              <div style={{ overflow: 'hidden', height: '350px' }}>
                <img src={movie.img} alt={movie.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ padding: '15px' }}>
                <h3 style={{ color: '#f8fafc', margin: '0 0 5px 0', fontSize: '1.2rem' }}>{movie.title}</h3>
                <span style={{ color: '#38bdf8', fontSize: '0.9rem', fontWeight: '500' }}>{movie.year} - Yil</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;