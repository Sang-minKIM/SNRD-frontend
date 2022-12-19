import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Boards from "./routers/Boards";
import { Project } from "./routers/Project";
import { Join } from "./routers/Join";
import { Login } from "./routers/Login";
import { NotFound } from "./routers/NotFound";
import { Profile } from "./routers/Profile";
import { Write } from "./routers/Write";
import { Intro } from "./routers/Intro";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/join" element={<Join />} />
        <Route path="/profile/:userId" element={<Profile />} />
        <Route path="/boards/:projectId" element={<Boards />} />
        <Route path="/write/:contentId" element={<Write />} />
        <Route path="/main/:projectId" element={<Project />} />
        <Route path="/" element={<Intro />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
