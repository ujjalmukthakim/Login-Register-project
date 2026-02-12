import { useContext } from "react";
import { AuthContext } from "../auth/AuthContext";

export default function Dashboard() {
  const { logoutUser } = useContext(AuthContext);

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h1>Welcome Dashboard 🎉</h1>

      <button onClick={logoutUser}>Logout</button>
    </div>
  );
}
