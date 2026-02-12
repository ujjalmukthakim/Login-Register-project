import { BrowserRouter, Routes, Route } from "react-router-dom";

import Register from "./pages/Register";
import VerifyOTP from "./pages/VerifyOTP";
import Login from "./pages/Login";
import Activate from "./pages/Activate";
import Dashboard from "./pages/Dashboard";

import PrivateRoute from "./auth/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ========================= */}
        {/* Public Routes */}
        {/* ========================= */}

        {/* Default route → Login */}
        <Route path="/" element={<Login />} />

        {/* Register Page */}
        <Route path="/register" element={<Register />} />

        {/* OTP Verification Page */}
        <Route path="/verify-otp" element={<VerifyOTP />} />

        {/* Activation Link Page */}
        <Route path="/activate/:token" element={<Activate />} />

        {/* ========================= */}
        {/* Protected Routes */}
        {/* ========================= */}

        {/* Dashboard (Only after login) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
