import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ListingPage from './pages/ListingPage';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  return (
    <BrowserRouter> 
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />}/>;
      <Route path="/profile" element={<ProfilePage />}/>;
      <Route path="/listing/:id" element={<ListingPage />}/>
    </Routes>
  </BrowserRouter>
  );
}

export default App;
