import Navbar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";

import { Routes, Route, Navigate } from "react-router-dom";
import { axiosInstance } from "../lib/axios";
import { AuthStore } from "./store/AuthStore";
import { useEffect } from "react";
import {Loader} from "lucide-react";


const App = () => {
  const {authUser, checkAuth,isCheckingAuth } = AuthStore();
  
  useEffect(() => {
    checkAuth();
  }
  ,[checkAuth]);

  console.log({authUser});

  if (isCheckingAuth && !authUser){
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"></Loader>
    </div>


  }

  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<HomePage /> } />
        <Route path="/signup" element={ <SignUpPage /> } />
        <Route path="/signin" element={<LoginPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </div>
  );
};
export default App;