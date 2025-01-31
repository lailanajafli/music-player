import React, {useState} from "react";

// Router
import { Routes, Route } from "react-router-dom";

// Pages
import Home from "./pages/Home";
import PlayList from "./pages/PlayList";
import Player from "./pages/Player";


// Components

import { MainContext } from "./context/MainContext";

const App = () => {
  return (
    <MainContext>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </MainContext>
  );
};

export default App;
