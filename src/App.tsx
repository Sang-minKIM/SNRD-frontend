import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Boards from "./routers/Boards";
import Home from "./routers/Home";
import Profile from "./routers/Profile";
import { Write } from "./routers/Write";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/profile/:id" element={<Profile />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/write/:contentId" element={<Write />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
