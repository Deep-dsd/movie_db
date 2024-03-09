import React from "react";
import { ContextProvider } from "./context";
import Assembler from "./Assembler";
import "./style.css";
const MovieDb = () => {
  return (
    <ContextProvider>
      <Assembler />
    </ContextProvider>
  );
};

export default MovieDb;
