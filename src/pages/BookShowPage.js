import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import './BookShowPage.css';

const theaters = [
  {
    name: "PVR: Mall of Jaipur",
    times: ["07:35 PM", "09:00 PM", "09:30 PM", "10:00 PM", "11:00 PM"],
    cancellable: true,
  },
  {
    name: "Cinepolis: Jewel of India",
    times: ["08:00 PM", "09:30 PM", "10:45 PM", "11:20 PM"],
    cancellable: false,
  },
  {
    name: "Cinepolis: World Trade Park Mall",
    times: ["08:00 PM", "09:00 PM", "10:30 PM"],
    cancellable: true,
  },
  {
    name: "INOX: GT Central Mall",
    times: ["07:00 PM", "08:45 PM", "10:15 PM"],
    cancellable: false,
  },
  {
    name: "Raj Mandir Cinema",
    times: ["06:30 PM", "09:00 PM"],
    cancellable: true,
  },
  {
    name: "Carnival Cinema: Vaibhav Tower",
    times: ["07:15 PM", "08:50 PM", "10:40 PM"],
    cancellable: true,
  },
  {
    name: "Miraj Cinemas: Pink Square Mall",
    times: ["06:45 PM", "08:30 PM", "10:00 PM"],
    cancellable: false,
  },
  {
    name: "Gem Cinema: M.I. Road",
    times: ["07:20 PM", "09:10 PM"],
    cancellable: true,
  }
];

const BookShowPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const movieName = decodeURIComponent(searchParams.get('movie')) || "Selected Movie";

  const [selectedDate, setSelectedDate] = useState(null);
  const [showDateWarning, setShowDateWarning] = useState(false);

  useEffect(() => {
    if (showDateWarning) {
      const timer = setTimeout(() => setShowDateWarning(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showDateWarning]);

  const dates = Array.from({ length: 10 }, (_, i) => {
    const dayObj = new Date();
    dayObj.setDate(dayObj.getDate() + i);
    return {
      day: dayObj.toLocaleDateString('en-US', { weekday: 'short' }).toUpperCase(),
      date: dayObj.getDate().toString().padStart(2, '0'),
      month: dayObj.toLocaleDateString('en-US', { month: 'short' }).toUpperCase(),
    };
  });

 const handleTimeSelect = (selectedTime, theatreName) => {
  if (selectedDate === null) {
    setShowDateWarning(true);
    return;
  }

  const selectedDateObj = dates[selectedDate];

  navigate('/select-seats', {
    state: {
      movie: movieName,
      theatre: theatreName,
      timeSlot: selectedTime,
      date: `${selectedDateObj.day}, ${selectedDateObj.date} ${selectedDateObj.month}`,
    },
  });
};


  return (
    <div className="book-show-container">
      <h2>{movieName} - (Hindi)</h2>

      {showDateWarning && (
        <div className="select-date-message">⚠️ Please select a date first</div>
      )}

      <div className="date-strip">
        {dates.map((d, idx) => (
          <div
            key={idx}
            className={`date-box ${selectedDate === idx ? 'selected' : ''}`}
            onClick={() => {
              setSelectedDate(idx);
              setShowDateWarning(false);
            }}
          >
            <div className="day">{d.day}</div>
            <div className="date">{d.date}</div>
            <div className="month">{d.month}</div>
          </div>
        ))}
      </div>

      {theaters.map((theatre, idx) => (
        <div key={idx} className="theatre-block">
          <h3 className="theatre-name">{theatre.name}</h3>
          <div className="time-buttons">
            {theatre.times.map((time, i) => (
              <button
                key={i}
                onClick={() => handleTimeSelect(time, theatre.name)}
                className="time-btn"
              >
                {time}
              </button>
            ))}
          </div>
          <p className={theatre.cancellable ? 'cancellable' : 'non-cancellable'}>
            {theatre.cancellable ? 'Cancellation available' : 'Non-cancellable'}
          </p>
        </div>
      ))}
    </div>
  );
};

export default BookShowPage;
