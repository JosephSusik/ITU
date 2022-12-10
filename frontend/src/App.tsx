import React from 'react';
import './index.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProfilePage from './pages/ProfilePage';
import ProductPage from './pages/ProductPage';
import Footer from './components/Footer';

function App() {
  return (
    <BrowserRouter> 
    <Navbar />
    <Routes>
      <Route path="/" element={<HomePage />}/>;
      <Route path="/profile" element={<ProfilePage />}/>;
      <Route path="/product/:id" element={<ProductPage />}/>
    </Routes>
    <Footer />
  </BrowserRouter>
  );
}

export default App;
