import { useAuth } from "../context/AuthContext";
import { useNavigate, NavLink } from "react-router-dom";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  const linkStyle = ({ isActive }) =>
    `relative px-2 py-1 text-sm font-medium transition-all duration-200
     ${
       isActive
         ? "text-pink-600"
         : "text-gray-700 hover:text-pink-600"
     }
     after:content-[''] after:absolute after:left-0 after:-bottom-1
     after:h-[2px] after:w-0 after:bg-pink-500
     hover:after:w-full after:transition-all after:duration-300`;

  return (
    <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">

        {/* Logo / Brand */}
        <div
          className="text-xl font-bold text-pink-600 cursor-pointer"
          onClick={() => navigate("/")}
        >
          Vivah<span className="text-gray-800">-eConnect</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-6">

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

              {/* Logout Button */}
              <button
                onClick={handleLogout}
                className="ml-4 px-4 py-1.5 rounded-lg text-sm font-medium bg-pink-500 text-white hover:bg-pink-600 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}