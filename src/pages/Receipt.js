// src/pages/Receipt.js
import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { db } from '../services/firebase';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs
} from 'firebase/firestore';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import './Receipt.css';

const Receipt = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const [receipt, setReceipt] = useState(state?.receipt || null);
  const [loading, setLoading] = useState(!receipt);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        navigate('/login');
        return;
      }

      const cached = localStorage.getItem('latestReceipt');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (parsed.uid === user.uid) {
          setReceipt(parsed);
          setLoading(false);
          return;
        } else {
          localStorage.removeItem('latestReceipt');
        }
      }

      try {
        const q = query(
          collection(db, 'users', user.uid, 'receipts'),
          orderBy('timestamp', 'desc'),
          limit(1)
        );
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const latest = snapshot.docs[0].data();
          const userReceipt = { ...latest, uid: user.uid };
          setReceipt(userReceipt);
          localStorage.setItem('latestReceipt', JSON.stringify(userReceipt));
        } else {
          setReceipt(null);
        }
      } catch (err) {
        console.error('Failed to fetch receipt:', err);
        if (err.code === 'permission-denied') {
          alert('⛔ You are not authorized to view this receipt.');
        }
        navigate('/');
      } finally {
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const downloadPDF = () => {
    const receiptElement = document.getElementById('receipt-box');
    if (!receiptElement) return;

    html2canvas(receiptElement).then((canvas) => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pageWidth = pdf.internal.pageSize.getWidth();
      const imgWidth = pageWidth - 40;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      pdf.addImage(imgData, 'PNG', 20, 20, imgWidth, imgHeight);
      pdf.save(`receipt_${receipt.razorpay_payment_id}.pdf`);
    });
  };

  if (loading) {
    return (
      <div className="receipt-container">
        <h2>Loading receipt...</h2>
      </div>
    );
  }

  if (!receipt) {
    return (
      <div className="receipt-container">
        <h2>❌ No receipt found.</h2>
        <button onClick={() => navigate('/')}>Go to Home</button>
      </div>
    );
  }

  return (
    <div className="receipt-container">
      <h2>🎟 Booking Receipt</h2>
      <div id="receipt-box" className="receipt-box">
        <p><strong>Movie:</strong> {receipt.movie}</p>
        <p><strong>Theatre:</strong> {receipt.theatre}</p>
        <p><strong>Showtime:</strong> {receipt.date} at {receipt.timeSlot}</p>
        <p><strong>Seats:</strong> {receipt.seats.join(', ')}</p>
        <p><strong>Total Amount:</strong> ₹{receipt.amount}</p>
        <p><strong>Payment ID:</strong> {receipt.razorpay_payment_id}</p>
        <p><strong>Time:</strong> {new Date(receipt.timestamp).toLocaleString()}</p>
      </div>

      <div className="receipt-actions">
        <button className="home-btn" onClick={() => navigate('/')}>
          Back to Home
        </button>
        <button className="download-btn" onClick={downloadPDF}>
          📄 Download PDF
        </button>
      </div>
    </div>
  );
};

export default Receipt;
