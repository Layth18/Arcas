import { Routes, Route } from "react-router-dom";

import Login from "./Pages/Login";
import SignUpPage from "./Pages/Signup";
import FarmerDashboard from "./Pages/Farmer";
import MillDashboard from "./Pages/Mill";
import DelivererDashboard from "./Pages/Transport";

export default function App() {
  return (
    <Routes>

      {/* Login */}
      <Route path="/" element={<Login />} />

      {/* Signup */}
      <Route path="/signup" element={<SignUpPage />} />

      {/* Farmer Dashboard */}
      <Route path="/Farmer" element={<FarmerDashboard />} />

      {/* Mill Dashboard */}
      <Route path="/Mill" element={<MillDashboard />} />

      {/* Transport Dashboard */}
      <Route path="/Transport" element={<DelivererDashboard />} />

    </Routes>
  );
}
