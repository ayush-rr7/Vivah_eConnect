import { useState,useEffect  } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
// import axios from "axios";
import api from "../api/axios";

function Register() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState([]);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isCreatingAccount, setIsCreatingAccount] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    city: "",
    email: "",
    contact: "",
    password: "",
    gender: "",
    otp: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
  let interval;
  if (step === 2 && timer > 0) {
    interval = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
  }
  if (timer === 0) {
    setCanResend(true);
  }
  return () => clearInterval(interval);
}, [step, timer]);

  
  const handleStart = async (e) => {
  e.preventDefault();
  setErrors([]);
  setIsSendingOtp(true);
  try {
    await api.post("/auth/sendOtp", {
      email: formData.email
    });
    setStep(2);
    setTimer(30);
    setCanResend(false);
  } catch (err) {
    console.log(err.response?.data);
    setErrors([{ msg: err.response?.data?.message || "Unable to send OTP. Please try again." }]);
  } finally {
    setIsSendingOtp(false);
  }
};
const handleResendOtp = async () => {
  setErrors([]);
  setIsSendingOtp(true);
  try {
    await api.post("/auth/sendOtp", {
      email: formData.email
    });

    setTimer(30);
    setCanResend(false);
  } catch (err) {
    console.log(err.response?.data);
    setErrors([{ msg: err.response?.data?.message || "Unable to resend OTP. Please try again." }]);
  } finally {
    setIsSendingOtp(false);
  }
};

const handleVerify = async (e) => {
  e.preventDefault();
  setErrors([]);
  setIsVerifyingOtp(true);
  try {
    const res = await api.post("/auth/verifyOtp", {
      email: formData.email,
      otp: formData.otp
    });

    // STORE TOKEN (VERY IMPORTANT)
    localStorage.setItem("verifyToken", res.data.token);

    setStep(3);
  } catch (err) {
    console.log(err.response?.data);
    setErrors([{ msg: err.response?.data?.message || "Invalid OTP. Please try again." }]);
  } finally {
    setIsVerifyingOtp(false);
  }
};
const handleComplete = async (e) => {
  e.preventDefault();
  setErrors([]);
  setIsCreatingAccount(true);
  try {
    await signup({
      ...formData,
      token: localStorage.getItem("verifyToken") 
    });

    navigate("/login");
  } catch (err) {
    if (err.response && err.response.data.errors) {
      setErrors(err.response.data.errors);
    } else {
      setErrors([{ msg: err.response?.data?.message || "Unable to create account. Please try again." }]);
    }
  } finally {
    setIsCreatingAccount(false);
  }
};

 return (
  <div className="min-h-screen bg-gradient-to-br from-pink-50 to-rose-100 flex items-center justify-center px-4">

    <div className="w-full max-w-md bg-white rounded-2xl shadow-md p-6">

      {/* Title */}
      <h1 className="text-2xl font-semibold text-center text-gray-800 mb-2">
        Vivah e-Connect
      </h1>

      <p className="text-center text-sm text-gray-500 mb-6">
        Create your account to start finding matches
      </p>

      {/* Progress Bar */}
      <div className="flex items-center mb-6">
        <div className={`flex-1 h-1 ${step >= 1 ? "bg-pink-500" : "bg-gray-200"}`} />
        <div className={`flex-1 h-1 ${step >= 2 ? "bg-pink-500" : "bg-gray-200"}`} />
        <div className={`flex-1 h-1 ${step >= 3 ? "bg-pink-500" : "bg-gray-200"}`} />
      </div>

      {/* Error Display */}
      {errors.length > 0 && (
        <div className="mb-4">
          {errors.map((err, index) => (
            <p key={index} className="text-red-600 text-sm">
              {err.msg}
            </p>
          ))}
        </div>
      )}

      {/* STEP 1 */}
      {step === 1 && (
        <form onSubmit={handleStart} className="space-y-4">

          <h2 className="text-lg font-medium text-gray-700">
            Enter your email
          </h2>

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            type="submit"
            disabled={isSendingOtp}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 disabled:cursor-not-allowed text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
          >
            {isSendingOtp && (
              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            )}
            {isSendingOtp ? "Sending OTP..." : "Send OTP"}
          </button>
        </form>
      )}

      {/* STEP 2 */}
      {step === 2 && (
        <form onSubmit={handleVerify} className="space-y-4 text-center">

          <h2 className="text-lg font-medium text-gray-700">
            Verify OTP
          </h2>

          <p className="text-sm text-gray-500">
            OTP sent to {formData.email}
          </p>

          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={formData.otp}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg px-4 py-3 text-center tracking-widest focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <button
            type="submit"
            disabled={isVerifyingOtp}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 disabled:cursor-not-allowed text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
          >
            {isVerifyingOtp && (
              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            )}
            {isVerifyingOtp ? "Verifying..." : "Verify OTP"}
          </button>

          <button
            type="button"
            onClick={handleResendOtp}
            disabled={!canResend || isSendingOtp}
            className={`text-sm ${
              canResend ? "text-blue-600" : "text-gray-400"
            }`}
          >
            {isSendingOtp
              ? "Sending..."
              : canResend
              ? "Resend OTP"
              : `Resend in ${timer}s`}
          </button>
        </form>
      )}

      {/* STEP 3 */}
      {step === 3 && (
        <form onSubmit={handleComplete} className="space-y-4">

          <h2 className="text-lg font-medium text-gray-700">
            Complete Profile
          </h2>

          <input
            type="email"
            value={formData.email}
            disabled
            className="w-full border border-gray-200 rounded-lg px-4 py-3 bg-gray-100 text-gray-500"
          />

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
            className="input-field"
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            required
            className="input-field"
          />

          <input
            type="text"
            name="contact"
            placeholder="Contact Number"
            value={formData.contact}
            onChange={handleChange}
            required
            className="input-field"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
            className="input-field"
          />

          {/* Gender */}
          <div>
            <p className="text-sm font-medium mb-2">Gender</p>
            <div className="flex gap-6">
              <label>
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  checked={formData.gender === "Male"}
                  onChange={handleChange}
                /> Male
              </label>

              <label>
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={formData.gender === "female"}
                  onChange={handleChange}
                /> Female
              </label>
            </div>
          </div>

          {/* Terms */}
          <div className="flex items-center gap-2 text-sm">
            <input type="checkbox" required />
            <span>I agree to terms</span>
          </div>

          <button
            type="submit"
            disabled={isCreatingAccount}
            className="w-full bg-pink-500 hover:bg-pink-600 disabled:bg-pink-300 disabled:cursor-not-allowed text-white py-2 rounded-lg transition flex items-center justify-center gap-2"
          >
            {isCreatingAccount && (
              <span className="h-4 w-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
            )}
            {isCreatingAccount ? "Creating..." : "Create Account"}
          </button>
        </form>
      )}
    </div>
  </div>
);
}

export default Register;
