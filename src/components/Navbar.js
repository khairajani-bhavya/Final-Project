import { Search, User, Menu } from "lucide-react";
import { useNavigate, Link } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../services/firebase";
import { signOut } from "firebase/auth";
import { useState, useRef, useEffect } from "react";
import { staticMovieData } from "../pages/MovieDetails";
import SidebarMenu from "./SidebarMenu";

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const dropdownRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [noResults, setNoResults] = useState(false);

  const handleUserClick = () => {
    if (!user) navigate("/login");
    else setShowDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    signOut(auth);
    setShowDropdown(false);
    setShowSidebar(false);
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchTerm.trim().length < 2) {
      setFilteredMovies([]);
      setNoResults(false);
      return;
    }

    const term = searchTerm.toLowerCase();
    const results = Object.values(staticMovieData).filter((movie) =>
      movie.title.toLowerCase().includes(term)
    );

    setFilteredMovies(results);
    setNoResults(results.length === 0);
  }, [searchTerm]);

  return (
    <>
      <nav className="navbar">
        <div className="logo" onClick={() => navigate("/")}>
          ▶ MyShowz
        </div>

        <ul className="menu">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/all-movies">Movies</Link></li>
          <a href="#about" className="nav-link">About</a>

          {user && (
            <li>
              <Link to="/my-bookings">📖 My Bookings</Link>
            </li>
          )}
        </ul>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search size={18} />

          {(filteredMovies.length > 0 || noResults) && (
            <div className="search-dropdown">
              {filteredMovies.map((movie, index) => (
                <div
                  key={index}
                  className="search-item"
                  onClick={() => {
                    navigate(`/movie/title/${encodeURIComponent(movie.title)}`);
                    setSearchTerm("");
                    setFilteredMovies([]);
                  }}
                >
                  <img
                    src={movie.poster || "/no-image.png"}
                    alt={movie.title}
                    style={{
                      width: "40px",
                      height: "60px",
                      objectFit: "cover",
                      marginRight: "10px",
                    }}
                  />
                  <span>{movie.title}</span>
                </div>
              ))}

              {noResults && (
                <div className="search-item no-result">
                  ❌ No movie found
                </div>
              )}
            </div>
          )}
        </div>

        <div className="icon-group">
          {/* 🧑 User Icon */}
          <div className="user-dropdown-wrapper" ref={dropdownRef}>
            <User size={20} onClick={handleUserClick} className="icon-button" />
            {showDropdown && user && (
              <div className="dropdown">
                <p className="user-email">{user.email}</p>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>

          {/* 🍔 Sidebar Hamburger Icon */}
          {user && (
            <Menu
              size={24}
              className="icon-button"
              onClick={() => setShowSidebar(true)}
              style={{ marginLeft: "10px" }}
            />
          )}
        </div>
      </nav>

      <SidebarMenu
        isOpen={showSidebar}
        onClose={() => setShowSidebar(false)}
        user={user}
        onLogout={handleLogout}
      />
    </>
  );
};

export default Navbar;
