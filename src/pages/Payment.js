import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
} from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import './Payment.css';

const loadRazorpayScript = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

const Payment = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const user = auth.currentUser;

  const movie = state?.movie;
  const selectedSeats = state?.selectedSeats;
  const seatCount = selectedSeats?.length || 0;
  const theatre = state?.theatre || 'Not Provided';
  const timeSlot = state?.timeSlot || 'Not Provided';
  const date = state?.date || 'Not Provided';

  useEffect(() => {
    const initiatePayment = async () => {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        console.error('Razorpay SDK failed to load');
        return;
      }

      if (!movie || !selectedSeats?.length) {
        navigate('/seat-layout', { state: { seatCount: 1 } });
        return;
      }

      createBooking();
    };

    initiatePayment();
    // eslint-disable-next-line
  }, []);

  const createBooking = async () => {
    const seatPrices = {
      'RECLINER': 460,
      'PRIME PLUS': 230,
      'PRIME': 210,
      'CLASSIC': 190,
    };

    const getCategoryFromRow = (row) => {
      if (['M'].includes(row)) return 'RECLINER';
      if (['L', 'K'].includes(row)) return 'PRIME PLUS';
      if (['J', 'H', 'G'].includes(row)) return 'PRIME';
      return 'CLASSIC';
    };

    const totalAmount = selectedSeats.reduce((sum, seatId) => {
      const row = seatId.charAt(0);
      const category = getCategoryFromRow(row);
      return sum + (seatPrices[category] || 0);
    }, 0) * 100;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY,
      amount: totalAmount,
      currency: 'INR',
      name: 'Movie Ticket Booking',
      description: `Booking for ${movie}`,
      image: 'https://upload.wikimedia.org/wikipedia/commons/7/75/Razorpay_logo.svg',

      handler: async function (response) {
        const uid = user?.uid || 'guest';

        const receiptData = {
          userId: uid,
          userName: user?.displayName || 'Guest',
          email: user?.email || 'guest@example.com',
          movie,
          theatre,
          timeSlot,
          date,
          seats: selectedSeats,
          amount: totalAmount / 100,
          razorpay_payment_id: response.razorpay_payment_id,
          timestamp: new Date().toISOString(),
        };

        try {
          await addDoc(collection(db, 'users', uid, 'receipts'), receiptData);

          await setDoc(
            doc(db, 'bookings', uid),
            {
              [movie]: selectedSeats,
            },
            { merge: true }
          );

          const globalRef = doc(db, 'globalBookings', movie);
          const snap = await getDoc(globalRef);
          const current = snap.exists() ? snap.data().seats || [] : [];
          const updatedSeats = [...new Set([...current, ...selectedSeats])];
          await setDoc(globalRef, { seats: updatedSeats });

          await deleteDoc(doc(db, 'tempBookings', uid));

          localStorage.setItem('latestReceipt', JSON.stringify(receiptData));
          localStorage.setItem('paymentSuccess', 'true');

          navigate('/receipt');
        } catch (err) {
          console.error('Booking failed:', err);
        }
      },

      modal: {
        ondismiss: () => {
          navigate('/seat-layout', {
            state: { movie, seatCount, theatre, timeSlot, date }
          });

          setTimeout(() => {
            deleteDoc(doc(db, 'tempBookings', user?.uid || 'unknown')).catch((err) =>
              console.error('Error releasing seats:', err)
            );
          }, 0);
        },
      },

      prefill: {
        name: user?.displayName || 'Guest',
        email: user?.email || 'guest@example.com',
        contact: '9999999999',
      },
      theme: {
        color: '#F37254',
      },
    };

    const razorpay = new window.Razorpay(options);
    razorpay.open();
  };

  return (
    <div className="payment-page">
      <h2>Redirecting to Razorpay...</h2>
    </div>
  );
};

export default Payment;
