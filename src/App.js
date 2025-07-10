
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

import MovieDetails from "./pages/MovieDetails";
import Home from "./pages/Home";
import AllMovies from "./pages/AllMovies";
import Login from "./pages/auth/Login";
// import MovieDetails from "./MovieDetails"; // Uncomment when ready
import Signup from "./pages/auth/Signup";
import "./App.css";
import BookShowPage from "./pages/BookShowPage";
import SeatCount from "./pages/SeatCount";
import SeatLayout from "./pages/SeatLayout";
import Payment from "./pages/Payment";
import Receipt from './pages/Receipt';
import BookingHistory from "./pages/BookingHistory";
import Footer from "./components/Footer";
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/movie/:id" element={<MovieDetails />} /> */}
           <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
              <Route path="/all-movies" element={<AllMovies />} />
<Route path="/movie/title/:title" element={<MovieDetails />} />


               <Route path="/book" element={<BookShowPage />} />
        <Route path="/select-seats" element={<SeatCount />} />
        <Route path="/seat-layout" element={<SeatLayout />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/receipt" element={<Receipt />} />
        <Route path="/my-bookings" element={<BookingHistory />} />
           <Route path="/" element={<Footer />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
