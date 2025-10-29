import React from "react";
import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Profile from "./sections/Profile";
import Projects from "./sections/Projects";
import Skills from "./sections/Skills";
import Awards from "./sections/Awards";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Admin from "./pages/Admin";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/portfolio/:nickname" element={<PortfolioPage />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/:nickname" element={<PortfolioPage />} />
        <Route path="/" element={<PortfolioPage />} />
      </Routes>
    </Router>
  );
}

function PortfolioPage() {
  const { nickname } = useParams();
  
  return (
    <div className="scroll">
      <Header nickname={nickname || "CSeungJoo"} />
      <Profile nickname={nickname || "CSeungJoo"} />
      <Skills nickname={nickname || "CSeungJoo"} />
      <Projects nickname={nickname || "CSeungJoo"} />
      <Awards nickname={nickname || "CSeungJoo"} />
      <Footer />
    </div>
  );
}
<script src="https://kit.fontawesome.com/dba8a9ea51.js" crossorigin="anonymous"></script>

export default App;
