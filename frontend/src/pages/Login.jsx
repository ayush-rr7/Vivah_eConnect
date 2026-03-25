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

  const style = "border p-2 w-full mb-3 rounded hover:scale-102 ";
  const styleBtn = "bg-red-600 text-white rounded w-1/2  p-2 hover:scale-102";

  return (
    <>
      {/* <div className=" min-h-screen"> */}
      <div className="   ">
        <h1 className="text-2xl flex justify-center">Matrimonial Site</h1>
      </div>

      <div className="flex justify-center">
       
        <div className="h-min w-lg my-10 p-4 flex justify-center shadow-xl">
          <div>
             {errors.map((err, index) => (
          <ul key={index} className="text-red-600 flex flex-col">
            <li> {err.msg}</li>
          </ul>
        ))}
            <form onSubmit={handleSubmit}>
              <input
                type="email"
                name="email"
                placeholder=" Email"
                value={formData.email}
                onChange={handleChange}
                required
                className={style}
              />{" "}
              <br />
              {/* <input type="number" name ="Contact"  placeholder=" Contact No" value={formData.Contact} onChange= {handleChange} required   className={style}/> <br/> */}
              <input
                type="password"
                name="password"
                placeholder=" Password"
                value={formData.password}
                onChange={handleChange}
                required
                className={style}
              />{" "}
              <br />
              <div className="flex justify-center">
                <button type="submit" className={styleBtn}>
                  {" "}
                  Submit
                </button>
              </div>
            </form>
            <Link
              to="/signup"
              className="text-blue-600 hover:text-blue-800 p-2  "
            >
              New user? SignUP here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
