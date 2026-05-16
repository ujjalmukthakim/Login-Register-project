import { useState, useContext } from "react";
import { AuthContext } from "../auth/AuthContextValue";
import { Link, useNavigate } from "react-router-dom";

export default function Login() {
  const { loginUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setIsSubmitting(true);

    try {
      await loginUser(email, password);
      navigate("/dashboard");
    } catch (err) {
      setMessage(
        err.response?.data?.detail ||
          err.response?.data?.non_field_errors?.[0] ||
          "Invalid credentials! Please check your email and password."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell auth-shell-login">
        <aside className="auth-intro" aria-label="Login welcome">
          <p className="auth-kicker">Secure account access</p>
          <h1>Welcome back</h1>
          <p>
            Continue to your dashboard with a clean, focused login experience.
          </p>
        </aside>

        <div className="auth-card">
          <div className="auth-heading">
            <p className="auth-kicker">Login</p>
            <h2>Sign in to your account</h2>
          </div>

          <form className="auth-form" onSubmit={handleSubmit}>
            <label className="field-group">
              <span>Email address</span>
              <input
                placeholder="name@example.com"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </label>

            <label className="field-group">
              <span>Password</span>
              <input
                placeholder="Enter your password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </label>

            {message && <p className="form-message form-message-error">{message}</p>}

            <button className="primary-button" type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Signing in..." : "Login"}
            </button>
          </form>

          <p className="auth-switch">
            New here? <Link to="/register">Create an account</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
