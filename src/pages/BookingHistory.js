import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { db } from '../services/firebase';
import {
  collection,
  getDocs,
  query,
  orderBy,
  deleteDoc,
  doc,
} from 'firebase/firestore';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import './BookingHistory.css';

const BookingHistory = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const auth = getAuth();

    // 🛡️ Check auth state
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        setIsAuthenticated(false);
        navigate('/'); // redirect to home or login
        return;
      }

      setIsAuthenticated(true);

      try {
        const q = query(
          collection(db, 'users', user.uid, 'receipts'),
          orderBy('timestamp', 'desc')
        );
        const snapshot = await getDocs(q);
        const results = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHistory(results);
      } catch (err) {
        console.error('Error fetching history:', err);
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const downloadReceipt = async (entry, index) => {
    const element = document.getElementById(`receipt-${index}`);
    if (!element) return;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = pdf.internal.pageSize.getWidth() - 40;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
    pdf.save(`receipt_${entry.razorpay_payment_id}.pdf`);
  };

  const deleteReceipt = async (receiptId) => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (!user) return;

    try {
      await deleteDoc(doc(db, 'users', user.uid, 'receipts', receiptId));
      setHistory((prev) => prev.filter((r) => r.id !== receiptId));
    } catch (err) {
      console.error('Error deleting receipt:', err);
    }
  };

  if (!isAuthenticated || loading) return <h2>Loading booking history...</h2>;

  return (
    <div className="booking-history-container">
      <h2>🎬 My Booking History</h2>
      {history.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        history.map((entry, idx) => (
          <div key={entry.id} id={`receipt-${idx}`} className="booking-card">
            <span
              className="delete-receipt"
              title="Delete Receipt"
              onClick={() => deleteReceipt(entry.id)}
            >
              ❌
            </span>

            <p><strong>Movie:</strong> {entry.movie}</p>
            <p><strong>Theatre:</strong> {entry.theatre}</p>
            <p><strong>Date & Time:</strong> {entry.date}, {entry.timeSlot}</p>
            <p><strong>Seats:</strong> {entry.seats.join(', ')}</p>
            <p><strong>Amount:</strong> ₹{entry.amount}</p>
            <p><strong>Payment ID:</strong> {entry.razorpay_payment_id}</p>
            <p><strong>Booked At:</strong> {new Date(entry.timestamp).toLocaleString()}</p>

            <button
              className="download-btn"
              onClick={() => downloadReceipt(entry, idx)}
            >
              📄 Download Receipt
            </button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default BookingHistory;
