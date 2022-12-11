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
import FavouritesPage from './pages/FavouritesPage';
import Footer from './components/Footer';
import AllPage from './pages/AllPage';
import BeginnersPage from './pages/BeginnersPage';

function App() {
  return (
    <BrowserRouter> 
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />}/>;
      <Route path="/profile" element={<ProfilePage />}/>
      <Route path="/listing/:id" element={<ListingPage />}/>
      <Route path="/all" element={<AllPage />}/>
      <Route path="/favourites" element={<FavouritesPage />}/>
      <Route path="/beginners" element={<BeginnersPage />}/>
    </Routes>
    <Footer />
  </BrowserRouter>
  );
}

export default App;
