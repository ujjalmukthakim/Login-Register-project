import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    activation_type: "otp", // backend field
  });

  const [message, setMessage] = useState("");

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ✅ Submit Register Form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const res = await api.post("register/", formData);

      console.log("Backend Response:", res.data);

      // ✅ OTP Flow → Redirect
      if (formData.activation_type === "otp") {
        setMessage("✅ OTP sent! Redirecting to OTP verification...");

        setTimeout(() => {
          navigate("/verify-otp");
        }, 1500);
      }

      // ✅ Activation Link Flow → Stay Here
      else {
        setMessage("✅ Activation link sent! Check your email inbox.");
      }
    } catch (err) {
      console.log("Backend Error:", err.response?.data);

      setMessage(
        err.response?.data?.error ||
          "❌ Registration failed. Please try again."
      );
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Register</h2>

      <form onSubmit={handleSubmit}>
        {/* Username */}
        <input
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        {/* Email */}
        <input
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        {/* Password */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <br />
        <br />

        {/* Activation Type Option */}
        <label>Choose Activation Method:</label>
        <br />

        <select
          name="activation_type" // ✅ MUST MATCH BACKEND
          value={formData.activation_type}
          onChange={handleChange}
        >
          <option value="otp">Email OTP</option>
          <option value="activation">Activation Link</option>
        </select>

        <br />
        <br />

        <button type="submit">Register</button>
      </form>

      {/* Message */}
      <p style={{ marginTop: "15px" }}>{message}</p>
    </div>
  );
}
