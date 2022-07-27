import React from 'react';
import './styles/home.css'
import Typical from 'react-typical';
import { useState } from 'react';

const Home = () => {
        return (
        <div style={{marginTop:"80px"}}>
            <Typical
                     steps={['Bookings', 1000, `Bookings Open!`, 500]}
                     loop={Infinity}
                     wrapper="p"
                    className="welcome-text"
                  />
            <p className="about">Get your table number by booking a reservation and have a meal at our restaurant. Bookings are closed after 8:00 PM IST.</p>
            <p className='slogan'>We make food, you make memories.</p>
        </div>
    );
}

export default Home;