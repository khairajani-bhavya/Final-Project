import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './SeatLayout.css';
import { db } from '../services/firebase';
import { doc, setDoc, getDocs, collection } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const seatRows = {
  'RECLINER': ['M'],
  'PRIME PLUS': ['L', 'K'],
  'PRIME': ['J', 'H', 'G'],
  'CLASSIC': ['F', 'E', 'D', 'C'],
};

const SeatLayout = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const seatCount = parseInt(state?.seatCount || 1);
  const movie = state?.movie || 'defaultMovie';
  const theatre = state?.theatre || 'Unknown Theatre';
  const date = state?.date || 'Unknown Date';
  const timeSlot = state?.timeSlot || 'Unknown Time';

  const [selectedSeats, setSelectedSeats] = useState([]);
  const [bookedSeats, setBookedSeats] = useState([]);

  useEffect(() => {
    const fetchAllBookedSeats = async () => {
      let globalBooked = [];

      try {
        // ✅ Permanent bookings
        const bookingsSnapshot = await getDocs(collection(db, 'bookings'));
        bookingsSnapshot.forEach(docSnap => {
          const data = docSnap.data();
          if (data[movie]) {
            globalBooked = globalBooked.concat(data[movie]);
          }
        });

        // ✅ Temporary bookings
        const tempSnapshot = await getDocs(collection(db, 'tempBookings'));
        tempSnapshot.forEach(tempDoc => {
          const data = tempDoc.data();
          const isSameMovie = data.movie === movie;
          const isSameShow = data.theatre === theatre && data.timeSlot === timeSlot && data.date === date;
          const notExpired = new Date() - new Date(data.timestamp) < 5 * 60 * 1000;

          if (isSameMovie && isSameShow && notExpired) {
            globalBooked = globalBooked.concat(data.seats || []);
          }
        });

        setBookedSeats(globalBooked);
      } catch (err) {
        console.error('Error fetching seats:', err);
      }
    };

    fetchAllBookedSeats();
  }, [movie, theatre, date, timeSlot]);

 const toggleSeat = (row, number) => {
  if (!user) {
    toast.error("🚫 Please log in to select seats!", {
      position: "top-center",
      theme: "dark",
      autoClose: 2000, // show for 2 seconds
    });

    // ⏳ Wait before navigating to let the toast show
    setTimeout(() => {
      navigate('/login');
    }, 2000); // same time as toast

    return;
  }

    const seatId = `${row}${number}`;
    if (selectedSeats.includes(seatId)) {
      setSelectedSeats(prev => prev.filter(seat => seat !== seatId));
    } else if (selectedSeats.length < seatCount) {
      setSelectedSeats(prev => [...prev, seatId]);
    }
  };

  const renderSeats = (row) => (
    <div key={row} className="seat-row">
      <span className="row-label">{row}</span>
      {[...Array(15)].map((_, i) => {
        const seatId = `${row}${i + 1}`;
        const isSelected = selectedSeats.includes(seatId);
        const isBooked = bookedSeats.includes(seatId);
        return (
          <button
            key={seatId}
            className={`seat ${isBooked ? 'sold' : isSelected ? 'selected' : ''}`}
            disabled={isBooked || (!isSelected && selectedSeats.length >= seatCount)}
            onClick={() => toggleSeat(row, i + 1)}
          >
            {i + 1}
          </button>
        );
      })}
    </div>
  );

  const handleProceed = async () => {
    if (!user) {
      alert('🚫 Please log in to book tickets.');
      navigate('/login');
      return;
    }

    try {
      await setDoc(doc(db, 'tempBookings', user.uid), {
        movie,
        seats: selectedSeats,
        theatre,
        timeSlot,
        date,
        confirmed: false,
        timestamp: new Date().toISOString(),
      });

      navigate('/payment', {
        state: {
          movie,
          selectedSeats,
          theatre,
          date,
          timeSlot,
        },
      });
    } catch (error) {
      console.error('Failed to reserve seats:', error);
      alert('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="seat-layout-wrapper">
      <h2 className="movie-title">Seat Layout</h2>
      <p><strong>{movie}</strong> - {theatre}</p>
      <p>{date} at {timeSlot}</p>

      <div className="seat-category-info-strip">
        <div className="category-box"><span className="cat-name">RECLINER</span><span className="cat-price">Rs. 460</span></div>
        <div className="category-box"><span className="cat-name">PRIME PLUS</span><span className="cat-price">Rs. 230</span></div>
        <div className="category-box"><span className="cat-name">PRIME</span><span className="cat-price">Rs. 210</span></div>
        <div className="category-box"><span className="cat-name">CLASSIC</span><span className="cat-price">Rs. 190</span></div>
      </div>

      <div className="screen">SCREEN THIS WAY</div>

      {Object.entries(seatRows).map(([type, rows]) => (
        <div key={type} className="seat-category">
          <div className="category-label">
            Rs. {
              type === 'RECLINER' ? 460 :
              type === 'PRIME PLUS' ? 230 :
              type === 'PRIME' ? 210 : 190
            } - {type}
          </div>
          {rows.map(row => renderSeats(row))}
        </div>
      ))}

      <div className="legend">
        <div><span className="box available" /> Available</div>
        <div><span className="box selected" /> Selected</div>
        <div><span className="box sold" /> Booked</div>
      </div>

      <div className="selection-summary">
        <p>{selectedSeats.length} / {seatCount} seats selected</p>
        <button
          className="proceed-btn"
          onClick={handleProceed}
          disabled={selectedSeats.length !== seatCount}
        >
          🎟 Book {seatCount} Ticket{seatCount > 1 ? 's' : ''}
        </button>
        <ToastContainer />
      </div>
    </div>
  );
};

export default SeatLayout;
