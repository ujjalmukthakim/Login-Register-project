import { useContext } from "react";
import { AuthContext } from "../auth/AuthContextValue";

export default function Dashboard() {
  const { logoutUser } = useContext(AuthContext);

  return (
    <main className="dashboard-page">
      <section className="dashboard-panel">
        <p className="auth-kicker">Private area</p>
        <h1>Welcome Dashboard 🎉</h1>
        <p>Your login is active and the protected route is working.</p>

        <button className="secondary-button" onClick={logoutUser}>Logout</button>
      </section>
    </main>
  );
}
