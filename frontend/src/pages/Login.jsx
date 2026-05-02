import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// import './App.css'

function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [errors, setErrors] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await login(formData); // ✅ NOT axios
      navigate("/dashboard");
    } catch (err) {
      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
      }
    }
  };

return (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center px-4">

    {/* Auth Card */}
    <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">

      {/* Title */}
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-2">
        Vivah e-Connect
      </h1>

      <p className="text-center text-sm text-gray-500 mb-6">
        Login to continue your journey
      </p>

      {/* Error Messages */}
      {errors.length > 0 && (
        <div className="mb-4">
          {errors.map((err, index) => (
            <p key={index} className="text-red-600 text-sm">
              {err.msg}
            </p>
          ))}
        </div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          type="email"
          name="email"
          placeholder="Email address"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
        />

        <button
          type="submit"
          className="w-full bg-pink-500 hover:bg-pink-600 text-white py-2 rounded-lg transition"
        >
          Login
        </button>
      </form>

      {/* Footer */}
      <p className="text-center text-sm text-gray-500 mt-6">
        New user?{" "}
        <Link
          to="/signup"
          className="text-pink-600 hover:underline"
        >
          Create an account
        </Link>
      </p>

    </div>
  </div>
);
  
}

export default Login;
