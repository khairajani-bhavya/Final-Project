import { motion } from "framer-motion";
import "../App.css";
import { useNavigate } from "react-router-dom";

const MovieCard = ({
  title,
  poster,
  genre = "Action/Drama",
  rating = 4.5,
  votes = "10K Votes",
}) => {
  const navigate = useNavigate();

  const handleDetails = () => {
    navigate(`/movie/title/${encodeURIComponent(title)}`);
  };

  return (
    <div
      className="movie-card"
      onClick={handleDetails}
      style={{ cursor: "pointer" }}
    >
      <motion.div
        className="poster-container"
        whileHover={{ scale: 1.05 }}
        transition={{ type: "spring", stiffness: 200 }}
      >
        <img
          src={poster}
          alt={title}
          className="movie-poster"
          loading="lazy"
          onError={(e) => (e.target.src = "/no-image.png")}
        />
      </motion.div>

      <div className="movie-info">
        <h4 className="movie-title">{title}</h4>
        <p className="movie-genre">{genre}</p>
        <div className="movie-rating">
          <span>⭐ {rating}</span>
          <span className="votes">({votes})</span>
        </div>
      </div>

      {/* Removed the Book Now button */}
      {/* <div className="book-btn-wrapper">
        <button onClick={handleBookNow} className="book-now-btn">
          🎟️ Book Now
        </button>
      </div> */}
    </div>
  );
};

export default MovieCard;
