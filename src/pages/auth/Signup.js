// src/pages/auth/Signup.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import "../../App.css";

const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleSignup = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/"); // redirect to home after Google login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Sign up</h2>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          
        <div className="google-signin">
          <p>or</p>
          <button className="btn-google" onClick={handleGoogleSignup}>
            <img
              src="https://static.dezeen.com/uploads/2025/05/sq-google-g-logo-update_dezeen_2364_col_0-852x852.jpg"
              alt="Google icon"
              style={{ width: "20px", marginRight: "8px" }}
            />
            Sign up with Google
          </button>
        </div>
          {error && <p className="error">{error}</p>}
          <button className="auth-button btn-login" type="submit">SIGN UP</button>
        </form>

      </div>

      <div className="login-right">
        <h2>Welcome Back!</h2>
        <p>Already have an account?</p>
        <Link to="/login">
          <button className="btn-signup">SIGN IN</button>
        </Link>
      </div>
    </div>
  );
};

export default Signup;
