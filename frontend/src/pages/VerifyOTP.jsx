import { useState } from "react";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");

  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("verify-otp/", {
        email: email,
        otp: otp,
      });

      console.log("OTP Verified:", res.data);

      setMessage("✅ OTP Verified Successfully! Redirecting to login...");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log("OTP Error:", err.response?.data);
      setMessage("❌ Invalid OTP or expired");
    }
  };

  return (
    <div style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h2>Verify OTP</h2>

      <form onSubmit={handleVerify}>
        <input
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br /><br />

        <input
          placeholder="Enter OTP Code"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <br /><br />

        <button type="submit">Verify OTP</button>
      </form>

      <p>{message}</p>
    </div>
  );
}
