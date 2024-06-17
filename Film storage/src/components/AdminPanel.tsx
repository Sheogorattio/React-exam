import { useState, useEffect } from 'react';
import axios from 'axios';
import { Movie } from '../types/Movie';
import MovieForm from './MovieForm';
import '../styles/AdminPanel.css';
import { useAuth } from './AuthContext';
import NotFound from './NotFound';

const AdminPanel= () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get<Movie[]>('http://localhost:5000/movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  const handleAddMovie = () => {
    setEditMode(true);
    setSelectedMovie(null);
  };

  const handleEditMovie = (movie: Movie) => {
    setEditMode(true);
    setSelectedMovie(movie);
  };

  const handleDeleteMovie = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/movies/${id}`);
      console.log("delete")
      fetchMovies(); // обновляем список фильмов после удаления
    } catch (error) {
      console.error('Error deleting movie:', error);
    }
  };

  const handleMovieFormClose = () => {
    setEditMode(false);
    setSelectedMovie(null);
    fetchMovies(); // обновляем список фильмов после добавления/изменения
  };

  const handleMovieSubmit = async (movieData: Movie) => {
    try {
      if (selectedMovie) {
        // редактирование существующего фильма
        await axios.put(`http://localhost:5000/movies/${selectedMovie.id}`, movieData);
      } else {
        // добавление нового фильма
        await axios.post('http://localhost:5000/movies', movieData);
      }
      handleMovieFormClose(); // закрываем форму после добавления/редактирования
    } catch (error) {
      console.error('Error saving movie:', error);
    }
  };

  return (
   <div>
        {user?.role === "admin" ?
        <div className="admin-panel">
          <h2>Admin Panel</h2>
          <div>
            <button onClick={handleAddMovie}>Add Movie</button>
          </div>
          <div className="movie-list">
            {movies.map((movie) => (
              <div key={movie.id} className="movie-card-admin">
                <img src={movie.image} alt={movie.title} className="movie-image" />
                <div className="movie-info">
                  <h2 className="movie-title">{movie.title}</h2>
                  <p className="movie-description">{movie.description}</p>
                  <p className="movie-year">Year: {movie.year}</p>
                  <div className="movie-actions">
                    <button onClick={() => handleEditMovie(movie)}>Edit</button>
                    <button onClick={() => handleDeleteMovie(movie.id)}>Delete</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {editMode && <MovieForm movie={selectedMovie} onSubmit={handleMovieSubmit} onClose={handleMovieFormClose} />}
        </div> : <NotFound></NotFound>}
   </div>
  );
};

export default AdminPanel;
