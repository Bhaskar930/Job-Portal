import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";

const App = () => {
  return (
    <BrowserRouter>
       
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route index element={<Home/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
