import React from 'react';
import './App.css';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import './index.css'
import UserRoutes from './routes/userRoutes/UserRoutes';
import { setRedirectFunction } from './services/axiosInstance';
import { useEffect } from 'react';

function App() {

  const navigate = useNavigate();

  // Set the redirect function on mount
  useEffect(() => {
    setRedirectFunction(() => navigate("/login"));
  }, [navigate]);
  return (
    <>
     <Toaster 
  position="top-center"  // Correct positioning prop
  toastOptions={{
    duration: 2000,
    style: {
      background: '#fff',   // Custom background color
      color: '#16a34a',     // Custom text color
      borderRadius: '8px',  // Custom border radius
      padding: '16px',      // Custom padding
      fontSize: '16px',     // Increase text size
    },
  }} 
/>
    <Routes>
    <Route path='/*' element={<UserRoutes/>} />    
  </Routes>
  </>
  )
}

export default App
