import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthContextValue";

export default function PrivateRoute({ children }) {
  const { user } = useContext(AuthContext);

  if (!user) {
    return <Navigate to="/" />;
  }

  return children;
}
