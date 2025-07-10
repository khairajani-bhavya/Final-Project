// src/pages/auth/Login.jsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../services/firebase";
import "../../App.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      navigate("/");
    } catch (err) {
      setError("Google sign-in failed");
    }
  };

  return (
    <div className="login-container">
      <div className="login-left">
        <h2>Sign in</h2>
        <form onSubmit={handleLogin}>
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
          <button className="btn-google" onClick={handleGoogleLogin}>
            <img
              src="https://static.dezeen.com/uploads/2025/05/sq-google-g-logo-update_dezeen_2364_col_0-852x852.jpg"
              alt="Google icon"
              style={{ width: "20px", marginRight: "8px" }}
            />
            Sign in with Google
          </button>
        </div>
          {error && <p className="error">{error}</p>}
          <button className="auth-button btn-login" type="submit">SIGN IN</button>
        </form>

       
      </div>

      <div className="login-right">
        <h2>Hello, Friend!</h2>
        <p>Register and book your tickets now!!!</p>
        <Link to="/signup">
          <button className="btn-signup">SIGN UP</button>
        </Link>
      </div>
    </div>
  );
};

export default Login;
