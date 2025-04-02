// src/routes.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminInterface from "./components/AdminInterface";
import Navbar from "./components/NavBar";
import HomeInterface from "./components/HomeInterface";
import UserInterface from "./components/UserInterface";

const AppRoutes = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomeInterface />} />
        <Route path="/Admin" element={<AdminInterface />} />
        <Route path="/User" element={<UserInterface />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
