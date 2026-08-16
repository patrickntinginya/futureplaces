import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Explore from "./pages/Explore.jsx";
import PlaceDetailsPage from "./pages/PlaceDetailsPage.jsx";
import Saved from "./pages/Saved.jsx";
import AddBusiness from "./pages/AddBusiness.jsx";
import BusinessDashboard from "./pages/BusinessDashboard.jsx";
import BottomNav from "./components/BottomNav.jsx";

export default function App() {
  return (
    <div className="app-shell">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/places/:slug" element={<PlaceDetailsPage />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/add-business" element={<AddBusiness />} />
        <Route path="/business" element={<BusinessDashboard />} />
      </Routes>
      <BottomNav />
    </div>
  );
}
