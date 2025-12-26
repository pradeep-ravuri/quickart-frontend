import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ShopContext } from "../context/ShopContext";
import { toast } from "react-toastify";

const Login = () => {
  const { token, setToken, navigate, backendUrl } = useContext(ShopContext);

  const [currentState, setCurrentState] = useState("Login"); // Login | Sign Up
  const [authMode, setAuthMode] = useState("password"); // password | otp

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---------------- PASSWORD LOGIN / SIGNUP ----------------
  const handlePasswordAuth = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (currentState === "Sign Up") {
        const res = await axios.post(`${backendUrl}/api/user/register`, {
          name,
          email,
          password,
        });

        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        } else {
          toast.error(res.data.message);
        }
      } else {
        const res = await axios.post(`${backendUrl}/api/user/login`, {
          email,
          password,
        });

        if (res.data.success) {
          setToken(res.data.token);
          localStorage.setItem("token", res.data.token);
        } else {
          toast.error(res.data.message);
        }
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- SEND OTP ----------------
  const sendOtp = async () => {
    if (!email) {
      toast.error("Enter email first");
      return;
    }

    setLoading(true);

    try {
      const res = await axios.post(`${backendUrl}/api/user/send-otp`, {
        email,
      });

      if (res.data.success) {
        toast.success("OTP sent to your email");
        setOtpSent(true);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- VERIFY OTP ----------------
  const verifyOtp = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${backendUrl}/api/user/verify-otp`, {
        email,
        otp,
      });

      if (res.data.success) {
        setToken(res.data.token);
        localStorage.setItem("token", res.data.token);
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      toast.error(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) navigate("/");
  }, [token, navigate]);

  return (
    <div>
      <form
        onSubmit={authMode === "password" ? handlePasswordAuth : verifyOtp}
        className="flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800"
      >
        <div className="inline-flex items-center gap-2 mb-2 mt-10">
          <p className="text-3xl font-medium">
            {currentState === "Login" ? "Login" : "Sign Up"}
          </p>
          <hr className="border-none h-[1.5px] w-8 bg-gray-800" />
        </div>

        {/* NAME (SIGNUP ONLY) */}
        {currentState === "Sign Up" && authMode === "password" && (
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border"
            placeholder="Name"
            required
          />
        )}

        {/* EMAIL */}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border"
          placeholder="Email"
          required
        />

        {/* PASSWORD MODE */}
        {authMode === "password" && (
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border"
            placeholder="Password"
            required
          />
        )}

        {/* OTP MODE */}
        {authMode === "otp" && otpSent && (
          <input
            type="text"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="w-full px-3 py-2 border"
            placeholder="Enter OTP"
            required
          />
        )}

        {/* ACTION LINKS */}
        <div className="w-full flex justify-between text-sm">
          <p
            className="cursor-pointer text-blue-600"
            onClick={() =>
              setAuthMode(authMode === "password" ? "otp" : "password")
            }
          >
            {authMode === "password" ? "Login with OTP" : "Login with Password"}
          </p>

          <p
            className="cursor-pointer"
            onClick={() =>
              setCurrentState(currentState === "Login" ? "Sign Up" : "Login")
            }
          >
            {currentState === "Login" ? "Create account" : "Login here"}
          </p>
        </div>

        {/* BUTTONS */}
        {authMode === "otp" && !otpSent ? (
          <button
            type="button"
            onClick={sendOtp}
            disabled={loading}
            className="bg-black text-white px-8 py-2 mt-4"
          >
            {loading ? "Sending OTP..." : "Send OTP"}
          </button>
        ) : (
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white px-8 py-2 mt-4"
          >
            {loading
              ? "Please wait..."
              : authMode === "otp"
              ? "Verify OTP"
              : currentState === "Login"
              ? "Sign In"
              : "Sign Up"}
          </button>
        )}
      </form>
    </div>
  );
};

export default Login;
