import React from 'react';
import BookingForm from './components/Pages/BookingForm';
import CancelBookingForm from './components/Pages/CancelBookingForm';
import UpdateBookingForm from './components/Pages/UpdateBookingForm';
import Home from './components/Pages/Home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from "./components/Navbar/Navbar";
import "./styles.css";

function App() {
  return (
        <div className="App">
      <Router>
      <Navbar />
      <div className="container">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/add' element={<BookingForm />} />
        <Route path='/update' element={<UpdateBookingForm />} />
        <Route path='/delete' element={<CancelBookingForm />} />
      </Routes>
      </div>
      </Router>
        </div>
  );
}

export default App; 