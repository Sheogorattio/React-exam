import React, { useState, useEffect } from 'react';
import { Movie } from '../types/Movie';

interface Props {
  movie: Movie | null;
  onSubmit: (movie: Movie) => void;
  onClose: () => void;
}

const MovieForm: React.FC<Props> = ({ movie, onSubmit, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [year, setYear] = useState<number | undefined>(undefined);
  const [image, setImage] = useState('');

  useEffect(() => {
    if (movie) {
      setTitle(movie.title);
      setDescription(movie.description);
      setYear(movie.year);
      setImage(movie.image);
    }
  }, [movie]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const movieData: Movie = {
      id: (movie ? movie.id : Math.floor(Math.random() * 1000)).toString(), // временно генерируем id
      title,
      description,
      year: year || 0,
      image,
    };

    onSubmit(movieData);
  };

  return (
    <div className="movie-form">
      <h3>{movie ? 'Edit Movie' : 'Add Movie'}</h3>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required />
        </div>
        <div>
          <label>Year</label>
          <input type="number" value={year || ''} onChange={(e) => setYear(parseInt(e.target.value))} />
        </div>
        <div>
          <label>Image URL</label>
          <input type="text" value={image} onChange={(e) => setImage(e.target.value)} required />
        </div>
        <button type="submit">{movie ? 'Update' : 'Add'}</button>
        <button type="button" onClick={onClose}>Cancel</button>
      </form>
    </div>
  );
};

export default MovieForm;
