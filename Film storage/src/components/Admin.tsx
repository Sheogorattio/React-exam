import { useState, useEffect } from 'react';
import axios from 'axios';

interface Movie {
  id: number;
  title: string;
  description: string;
  year: number;
  image: string;
}

const Admin  = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/movies')
      .then(response => setMovies(response.data))
      .catch(error => console.error('Error fetching movies:', error));
  }, []);

  const addMovie = () => {
    const newMovie: Omit<Movie, 'id'> = { title, description, year: parseInt(year), image };
    axios.post('http://localhost:5000/movies', newMovie)
      .then(response => setMovies([...movies, response.data]))
      .catch(error => console.error('Error adding movie:', error));
  };

  return (
    <div>
      <h1>Admin Panel</h1>
      <h2>Add Movie</h2>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={e => setDescription(e.target.value)}
      />
      <input
        type="number"
        placeholder="Year"
        value={year}
        onChange={e => setYear(e.target.value)}
      />
      <input
        type="text"
        placeholder="Image URL"
        value={image}
        onChange={e => setImage(e.target.value)}
      />
      <button onClick={addMovie}>Add Movie</button>
      <h2>Movie List</h2>
      <ul>
        {movies.map(movie => (
          <li key={movie.id}>{movie.title} ({movie.year})</li>
        ))}
      </ul>
    </div>
  );
};

export default Admin;
