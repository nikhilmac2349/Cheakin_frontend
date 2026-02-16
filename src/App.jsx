import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";

import Navbar from "./components/Navbar";

import Home from "./pages/Home/Home";
import Login from "./pages/Authentication/Login";
import Signup from "./pages/Authentication/Signup";
import Dashboard from "./pages/Dashboard/Dashh";
import ProfProfile from "./pages/ProfProfile/ProfProfile";
import Student from "./pages/Student/Student";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import AddActual from "./pages/AddActual/AddActual";
import AddPlanned from "./pages/AddPlanned/AddPlanned";

const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

     
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/profile" element={<ProfProfile />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/student/:studentId" element={<Student />} />
          <Route path="/add-actual" element={<AddActual />} />
          <Route path="/add-planned" element={<AddPlanned />} />
        </Routes>
      {/* </div> */}
    </BrowserRouter>
  );
};

export default App;
