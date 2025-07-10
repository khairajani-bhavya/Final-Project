import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import HeroSlider from "../components/HeroSlider";
import MovieCard from "../components/MovieCard";
import Footer from "../components/Footer";
import { getAuth } from "firebase/auth";

const staticMovies = [
  {
    title: "Housefull 5",
    poster: "https://m.media-amazon.com/images/M/MV5BZmIzMThjNTYtNjkwZi00NmM3LTliNGItZWIxYTUwMGU1YzM0XkEyXkFqcGc@._V1_.jpg",
    genre: "Comedy",
    rating: 4.2,
    votes: "12K Votes",
  },
  {
    title: "Bhool Chuk Maaf",
    poster: "https://m.media-amazon.com/images/M/MV5BYjlhZTI1YmEtZDMyYi00YTM5LWI4ZGEtMzYwMjYxZjUyNzQzXkEyXkFqcGc@._V1_.jpg",
    genre: "Action/Sci-Fi",
    rating: 4.8,
    votes: "250K Votes",
  },
  {
    title: "Sitaare Zameen Par",
    poster: "https://m.media-amazon.com/images/M/MV5BZjdjODdiMTQtYWIwZi00NTQyLWE0YWItMzk3MTBhOGUyNDY3XkEyXkFqcGc@._V1_.jpg",
    genre: "Family",
    rating: 4.3,
    votes: "90K Votes",
  },
  {
    title: "Raid 2",
    poster: "https://m.media-amazon.com/images/M/MV5BNjQyOTRiYTQtNzU0MS00ZGM2LWE4MTktODI5ZjZiN2NkYjYyXkEyXkFqcGc@._V1_.jpg",
    genre: "Fantasy",
    rating: 4.0,
    votes: "18K Votes",
  },
  
];

const Home = () => {
  const navigate = useNavigate();
  const [showReceiptBtn, setShowReceiptBtn] = useState(false);
  const [showToast, setShowToast] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const latestReceipt = localStorage.getItem("latestReceipt");
    const paymentSuccess = localStorage.getItem("paymentSuccess");

    if (user && latestReceipt) setShowReceiptBtn(true);

    if (paymentSuccess === "true") {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        localStorage.removeItem("paymentSuccess");
      }, 4000);
    }
  }, []);

  return (
    <>
      {showToast && (
        <div className="toast success-toast">
          ✅ Payment successful! You can now view your receipt.
        </div>
      )}

      <HeroSlider />

      <div className="popular-section">
        <h2>POPULAR MOVIES</h2>
        <div className="movie-list">
          {staticMovies.map((movie, idx) => (
            <MovieCard
              key={idx}
              title={movie.title}
              poster={movie.poster}
              genre={movie.genre}
              rating={movie.rating}
              votes={movie.votes}
            />
          ))}
        </div>

        <button className="show-all" onClick={() => navigate("/all-movies")}>
          Show All
        </button>
      </div>

      {showReceiptBtn && (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <button className="receipt-btn" onClick={() => navigate("/receipt")}>
            📄 View My Receipt
          </button>
        </div>
      )}

      <Footer />
    </>
  );
};

export default Home;
