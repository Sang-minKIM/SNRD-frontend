import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Boards from "./routers/Boards";
import Home from "./routers/Home";
import Profile from "./routers/Profile";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
