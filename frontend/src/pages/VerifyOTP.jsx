import { useState } from "react";
import api from "../api/axios";
import { Link, useLocation, useNavigate } from "react-router-dom";

export default function VerifyOTP() {
  const location = useLocation();
  const [email, setEmail] = useState(location.state?.email || "");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const navigate = useNavigate();

  const handleVerify = async (e) => {
    e.preventDefault();
    setMessage("");
    setMessageType("");
    setIsSubmitting(true);

    try {
      const res = await api.post("verify-otp/", {
        email: email,
        otp: otp,
      });

      console.log("OTP Verified:", res.data);

      setMessage("✅ OTP Verified Successfully! Redirecting to login...");
      setMessageType("success");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      console.log("OTP Error:", err.response?.data);
      setMessage(err.response?.data?.error || "❌ Invalid OTP or expired");
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell auth-shell-compact">
        <div className="auth-card">
          <div className="auth-heading">
            <p className="auth-kicker">Email verification</p>
            <h2>Verify OTP</h2>
          </div>

          <form className="auth-form" onSubmit={handleVerify}>
            <label className="field-group">
              <span>Email address</span>
              <input
                placeholder="Enter Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </label>

            <label className="field-group">
              <span>OTP code</span>
              <input
                placeholder="Enter OTP Code"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                inputMode="numeric"
                required
              />
            </label>

            <button className="primary-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Verifying..." : "Verify OTP"}
            </button>
          </form>

          {message && (
            <p
              className={`form-message ${
                messageType === "success" ? "form-message-success" : "form-message-error"
              }`}
            >
              {message}
            </p>
          )}

          <p className="auth-switch">
            Back to <Link to="/">Login</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
