import React from "react";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/auth/Login";
import Signup from "./components/auth/Signup";
import Home from "./components/Home";
import Jobs from "./components/Jobs";
import Browse from "./components/Browse";
import Profile from "./components/Profile";

const App = () => {
  return (
    <BrowserRouter>
       
      <Routes>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route index element={<Home/>}></Route>
        <Route path="/jobs"element={<Jobs/>}></Route>
        <Route path="/browse"element={<Browse/>}></Route>
        <Route path="/profile"element={<Profile/>}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
