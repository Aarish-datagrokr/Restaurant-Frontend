import React from 'react';
import './styles/home.css'
import Typical from 'react-typical';

const Home = () => {
    var status = "Open!";
    var about = "Get your table number by booking a reservation and have a meal at our restaurant. Bookings are closed after 8:00 PM IST.";
    var today = new Date().getHours();
    if(today>=20) { 
        status="Closed!";
        about = "We're sorry but it's past 8:00 PM and bookings are closed, You can book a table for the next day, Booking starts at 12:00 AM IST.";
    }
    return (
        <div style={{marginTop:"80px"}}>
                <Typical
                     steps={['Bookings', 1000, `Bookings ${status}`, 500]}
                     loop={Infinity}
                     wrapper="p"
                    className="welcome-text"
                  />
            <p className="about">{about}</p>
            <p className='slogan'>We make food, you make memories.</p>
        </div>
    );
}

export default Home;