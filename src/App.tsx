import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Boards from "./routers/Boards";
import Home from "./routers/Home";
import { Join } from "./routers/Join";
import { Login } from "./routers/Login";
import { NotFound } from "./routers/NotFound";
import { Profile } from "./routers/Profile";
import { Write } from "./routers/Write";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/boards" element={<Boards />} />
        <Route path="/write/:contentId" element={<Write />} />
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
