import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ListingPage from './pages/ListingPage';
import FavouritesPage from './pages/FavouritesPage';
import Footer from './components/Footer';
import AllPage from './pages/AllPage';
import BeginnersPage from './pages/BeginnersPage';
import './index.css';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import CreateListingPage from './pages/CreateListingPage';

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
      <Route path="/listing/create" element={<CreateListingPage />}/>
    </Routes>
    <Footer />
  </BrowserRouter>
  );
}

export default App;
