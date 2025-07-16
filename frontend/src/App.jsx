import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AuthStore } from "./store/AuthStore";
import { ThemeStore } from "./store/ThemeStore";
import { useEffect } from "react";
import {Loader} from "lucide-react";

import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import SignUpPage from "./pages/SignUpPage";
import LoginPage from "./pages/LoginPage";
import SettingsPage from "./pages/SettingsPage";
import ProfilePage from "./pages/ProfilePage";


const App = () => {
  const {authUser, checkAuth, isCheckingAuth} = AuthStore();
  const {theme} = ThemeStore();
  const location = useLocation();
  
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");
    
    if (token) {
      document.cookie = `jwt=${token}; path=/;`;
      window.history.replaceState({}, document.title, window.location.pathname);
      checkAuth();
    } else {
      checkAuth();
    }
  }, [checkAuth, location]);
  
  console.log({authUser});

  if (isCheckingAuth && !authUser) 
  return(
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin"></Loader>
    </div>
  )

  return (
    <div data-theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={authUser ? <HomePage /> : <Navigate to="/login" />} /> 
        <Route path="/signup" element={!authUser ?  <SignUpPage /> : <Navigate to="/" />} />
        <Route path="/login" element={!authUser ?<LoginPage /> : <Navigate to="/" />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/profile" element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>

  );
};
export default App;