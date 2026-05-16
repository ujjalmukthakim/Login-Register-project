import { useState, useEffect } from "react";
import api from "../api/axios";
import { AuthContext } from "./AuthContextValue";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Login Function
  const loginUser = async (email, password) => {
    const res = await api.post("token/", {
      email,
      password,
    });

    localStorage.setItem("access", res.data.access);
    localStorage.setItem("refresh", res.data.refresh);

    setUser({ email });
  };

  // ✅ Logout Function
  const logoutUser = () => {
    localStorage.clear();
    setUser(null);
  };

  // ✅ Keep Logged In on Refresh
  useEffect(() => {
    const token = localStorage.getItem("access");
    if (token) {
      setUser({ token });
    }
  }, []);

  return (
    <AuthContext.Provider value={{ user, loginUser, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};
