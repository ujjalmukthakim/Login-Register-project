import { useState } from "react";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    activation_type: "otp", // backend field
  });

  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setMessageType("");
    setIsSubmitting(true);

    try {
      const res = await api.post("register/", formData);

      console.log("Backend Response:", res.data);

      // ✅ OTP Flow → Redirect
      if (formData.activation_type === "otp") {
        setMessage("✅ OTP sent! Redirecting to OTP verification...");
        setMessageType("success");

        setTimeout(() => {
          navigate("/verify-otp", { state: { email: formData.email } });
        }, 1500);
      }

      // ✅ Activation Link Flow → Stay Here
      else {
        setMessage("✅ Activation link sent! Check your email inbox.");
        setMessageType("success");
      }
    } catch (err) {
      console.log("Backend Error:", err.response?.data);

      setMessage(
        err.response?.data?.error ||
          err.response?.data?.email?.[0] ||
          err.response?.data?.username?.[0] ||
          err.response?.data?.password?.[0] ||
          "❌ Registration failed. Please try again."
      );
      setMessageType("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell auth-shell-register">
        <aside className="auth-intro" aria-label="Register welcome">
          <p className="auth-kicker">Start with verification</p>
          <h1>Create your account</h1>
          <p>
            Choose OTP or an activation link, then complete setup through email.
          </p>
        </aside>

        <div className="auth-card">
          <div className="auth-heading">
            <p className="auth-kicker">Register</p>
            <h2>Open a new account</h2>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            {/* Username */}
            <label className="field-group">
              <span>Username</span>
              <input
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                autoComplete="username"
                required
              />
            </label>

            {/* Email */}
            <label className="field-group">
              <span>Email address</span>
              <input
                name="email"
                placeholder="name@example.com"
                type="email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </label>

            {/* Password */}
            <label className="field-group">
              <span>Password</span>
              <input
                name="password"
                type="password"
                placeholder="Create a strong password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength="6"
                required
              />
            </label>

            {/* Activation Type Option */}
            <label className="field-group">
              <span>Choose Activation Method:</span>
              <select
                name="activation_type" // ✅ MUST MATCH BACKEND
                value={formData.activation_type}
                onChange={handleChange}
              >
                <option value="otp">Email OTP</option>
                <option value="link">Activation Link</option>
              </select>
            </label>

            <button className="primary-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating account..." : "Register"}
            </button>
          </form>

          {/* Message */}
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
            Already registered? <Link to="/">Login here</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
