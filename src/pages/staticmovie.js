// src/pages/StaticMovieDetails.jsx
import React from "react";
import { Link, useParams, useLocation } from "react-router-dom";
import "./MovieDetails.css";

const movieData = {
  "Housefull 5": {
    title: "Housefull 5",
    image: "/images/housefull5.jpg", // place in public/images/
    genres: "Comedy, Drama",
    release: "2025-08-15",
    runtime: "140 min",
    description:
      "A new crazy twist in the Housefull series. Follow a fresh bunch of misadventures!",
  },
  "Bhool Chuk Maaf": {
    title: "Bhool Chuk Maaf",
    image: "/images/bhool.jpg",
    genres: "Drama, Thriller",
    release: "2024-10-02",
    runtime: "120 min",
    description:
      "A suspense drama exploring guilt, forgiveness, and unexpected turns.",
  },
  Frozen: {
    title: "Frozen",
    image: "/images/frozen.jpg",
    genres: "Animation, Family",
    release: "2013-11-27",
    runtime: "102 min",
    description:
      "Fearless optimist Anna teams up with mountain man Kristoff in a race to find her sister Elsa.",
  },
  Aladdin: {
    title: "Aladdin",
    image: "/images/aladdin.jpg",
    genres: "Adventure, Fantasy",
    release: "2019-05-24",
    runtime: "128 min",
    description:
      "Aladdin and the magic lamp return in this live-action adventure full of wonder and wish-granting.",
  },
};

const StaticMovieDetails = ({ title }) => {
  const movie = movieData[title];

  if (!movie) return <div className="movie-details-page">❌ Movie not found</div>;

  return (
    <div className="movie-details-page">
      <div className="movie-hero" style={{ backgroundImage: `url(${movie.image})` }}>
        <div className="overlay">
          <h1>{movie.title}</h1>
          <p><strong>Release:</strong> {movie.release}</p>
          <p><strong>Genres:</strong> {movie.genres}</p>
          <p><strong>Runtime:</strong> {movie.runtime}</p>
        </div>
      </div>

      <div className="about-section">
        <h2>About the Movie</h2>
        <p>{movie.description}</p>
      </div>

      <div className="action-buttons">
        <Link to={`/select-seats/${title}`} className="book-btn">🎟 Book Now</Link>
      </div>

      <Link to="/" className="back-home-btn">🏠 Back to Home</Link>
    </div>
  );
};

export default StaticMovieDetails;
