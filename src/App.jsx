import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage'; // your main hotel listing
import Visited from './pages/Visited';
import Navbar from './components/Navbar';
import DraftBookings from './pages/DraftBookings';
import CompletedBookings from './pages/CompletedBookings';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/visited" element={<Visited />} />
        <Route path="/drafts" element={<DraftBookings />} />
        <Route path="/completed" element={<CompletedBookings/>} />
      </Routes>
    </Router>
  );
}

export default App;
