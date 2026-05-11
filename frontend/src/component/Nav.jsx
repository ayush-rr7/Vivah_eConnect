import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const linkStyle = ({ isActive }) =>
    `block px-3 py-2 rounded-lg text-sm font-medium transition
    ${
      isActive
        ? "text-pink-600 bg-pink-50"
        : "text-gray-700 hover:text-pink-600 hover:bg-pink-50"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">

        {/* Logo */}
        <div
          className="text-xl sm:text-2xl font-bold text-pink-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Vivah<span className="text-gray-800">-eConnect</span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4">

          {!user ? (
            <>
              <NavLink to="/" className={linkStyle}>
                Home
              </NavLink>

              <NavLink to="/signup" className={linkStyle}>
                Signup
              </NavLink>

              <NavLink to="/login" className={linkStyle}>
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink to="/dashboard" className={linkStyle}>
                Dashboard
              </NavLink>

              <NavLink to="/profiles" className={linkStyle}>
                Profiles
              </NavLink>

              <NavLink to="/matches" className={linkStyle}>
                Matches
              </NavLink>

              <NavLink to="/connections" className={linkStyle}>
                Connections
              </NavLink>

              <NavLink to="/chat" className={linkStyle}>
                Chat
              </NavLink>

              <NavLink to="/account" className={linkStyle}>
                My Account
              </NavLink>

              <button
                onClick={handleLogout}
                className="ml-2 px-4 py-2 rounded-lg text-sm font-medium bg-pink-500 text-white hover:bg-pink-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden border-t bg-white shadow-lg px-4 py-4 space-y-2">

          {!user ? (
            <>
              <NavLink
                to="/"
                className={linkStyle}
                onClick={() => setMenuOpen(false)}
              >
                Home
              </NavLink>

              <NavLink
                to="/signup"
                className={linkStyle}
                onClick={() => setMenuOpen(false)}
              >
                Signup
              </NavLink>

              <NavLink
                to="/login"
                className={linkStyle}
                onClick={() => setMenuOpen(false)}
              >
                Login
              </NavLink>
            </>
          ) : (
            <>
              <NavLink
                to="/dashboard"
                className={linkStyle}
                onClick={() => setMenuOpen(false)}
              >
                Dashboard
              </NavLink>

              <NavLink
                to="/profiles"
                className={linkStyle}
                onClick={() => setMenuOpen(false)}
              >
                Profiles
              </NavLink>

              <NavLink
                to="/matches"
                className={linkStyle}
                onClick={() => setMenuOpen(false)}
              >
                Matches
              </NavLink>

              <NavLink
                to="/connections"
                className={linkStyle}
                onClick={() => setMenuOpen(false)}
              >
                Connections
              </NavLink>

              <NavLink
                to="/chat"
                className={linkStyle}
                onClick={() => setMenuOpen(false)}
              >
                Chat
              </NavLink>

              <NavLink
                to="/account"
                className={linkStyle}
                onClick={() => setMenuOpen(false)}
              >
                My Account
              </NavLink>

              <button
                onClick={handleLogout}
                className="w-full mt-2 px-4 py-2 rounded-lg text-sm font-medium bg-pink-500 text-white hover:bg-pink-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
}