import { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/Home.css';

interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  image: string;
}

const Home  = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h1>Movie Search</h1>
      <input
        type="text"
        placeholder="Search movies..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />
      <div className="movie-list">
        {filteredMovies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img src={movie.image} alt={movie.title} />
            <h2>{movie.title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
