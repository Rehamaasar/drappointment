<<<<<<< HEAD

import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import Services from "./pages/Services";
import Doctors from "./pages/Doctors";
import Login from "./pages/Login";
import Contact from "./pages/Contact";
import Layout from "./components/Layout";
import About from "./pages/About";
import DoctorDetail from "./pages/DoctorDetails";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";


function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/about" element={<Layout><About /></Layout>} />
        <Route path="/doctors/:id" element={<Layout><DoctorDetail /></Layout>} />
        <Route path="/" element={<Home />} />
        <Route path="/services" element={<Services />} />
        <Route path="/doctors" element={<Doctors />} />
        <Route path="/login" element={<Login />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;

=======
>>>>>>> d9bf9c478d66a27ab8f11d6e86a9d6957ffeddea
