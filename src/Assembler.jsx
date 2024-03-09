import React from "react";
import Home from "./Home";
import SingleMovie from "./SingleMovie";
import { BrowserRouter, Route, Routes } from "react-router-dom";
const Assembler = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies/:movieId" element={<SingleMovie />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Assembler;
