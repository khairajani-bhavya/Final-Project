import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './SeatCount.css';

const SeatCount = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const { movie, theatre, timeSlot, date } = state || {};

  const [selectedCount, setSelectedCount] = useState(null);

  const handleSeatCountSelect = (count) => {
    setSelectedCount(count);
  };

  const handleProceed = () => {
    if (selectedCount !== null) {
      navigate('/seat-layout', {
        state: {
          seatCount: selectedCount,
          movie,
          theatre,
          timeSlot,
          date,
        },
      });
    }
  };

  return (
    <div className="seat-count-container">
      <h2>How Many Seats?</h2>

      <img
        src="https://www.shutterstock.com/image-illustration/blue-cartoon-retro-moped-scooter-600nw-1880877049.jpg"
        alt="scooter"
        className="scooter-img"
      />

      <div className="seat-numbers">
        {[...Array(10)].map((_, i) => (
          <button
            key={i}
            onClick={() => handleSeatCountSelect(i + 1)}
            className={`seat-btn ${selectedCount === i + 1 ? 'selected' : ''}`}
          >
            {i + 1}
          </button>
        ))}
      </div>

      <div className="price-tiers">
        <p><strong>RECLINER</strong> Rs. 460 <span className="available">Available</span></p>
        <p><strong>PRIME PLUS</strong> Rs. 230 <span className="available">Available</span></p>
        <p><strong>PRIME</strong> Rs. 210 <span className="available">Available</span></p>
        <p><strong>CLASSIC</strong> Rs. 190 <span className="available">Available</span></p>
      </div>

      <button
        className="proceed-btn"
        onClick={handleProceed}
        disabled={selectedCount === null}
      >
        Select Seats
      </button>
    </div>
  );
};

export default SeatCount;
