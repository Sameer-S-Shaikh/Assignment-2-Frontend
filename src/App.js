import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./components/dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import { Home } from "./components/Home";
import Wishlist from "./components/Wishlist";
function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Home></Home>}></Route>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/wishlist" element={<Wishlist />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
