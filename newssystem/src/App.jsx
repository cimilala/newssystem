import React from "react";
import "./App.less";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import {  useSelector } from "react-redux";
import NotFound from "./pages/NotFound";
import NewsSandBox from "./pages/NewsSandBox";

export default function App() {
  const user = useSelector((state) => {
    return state.user.user;
  });
  
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />}></Route>

        {user === "" ? (
          <Route path="/" element={<Navigate to="/login" />}></Route>
        ) : (
          <Route path="/*" element={<NewsSandBox />}></Route>
        )}
        <Route path="*" element={<NotFound />}></Route>
      </Routes>
    </div>
  );
}
