import { useEffect, useState } from "react";
import api from "../api/axios";
import { useParams, useNavigate } from "react-router-dom";

export default function Activate() {
  const { token } = useParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Activating account...");

  useEffect(() => {
    const activateAccount = async () => {
      try {
        const res = await api.get(`activate/${token}/`);

        console.log("Activated:", res.data);

        setMessage("✅ Account Activated Successfully!");

        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (err) {
        console.log("Activation Error:", err.response?.data);
        setMessage("❌ Invalid or expired activation link");
      }
    };

    activateAccount();
  }, [token]);

  return (
    <div style={{ textAlign: "center", marginTop: "80px" }}>
      <h2>{message}</h2>
    </div>
  );
}
