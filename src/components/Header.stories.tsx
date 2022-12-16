import React from "react";

import styled from "styled-components";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./Header";
import { Login } from "../routers/Login";
import { Join } from "../routers/Join";
import { Profile } from "../routers/Profile";
import Boards from "../routers/Boards";
import { Write } from "../routers/Write";
import Home from "../routers/Home";

export default {
  title: "components/Header",
  component: Header,
};

export const StyledHeader = () => (
  <BrowserRouter>
    <Header />
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<Join />} />
      <Route path="/profile/:userId" element={<Profile />} />
      <Route path="/boards" element={<Boards />} />
      <Route path="/write/:contentId" element={<Write />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </BrowserRouter>
);
