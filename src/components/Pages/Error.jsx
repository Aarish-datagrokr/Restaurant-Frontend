import { Row } from 'mdbreact';
import React from 'react'
import { Link } from 'react-router-dom';
import "./styles/error.css";
const Error = () => {
    return (
        <div className='error-container'>
            <img className="image" src="https://cdn.dribbble.com/users/492116/screenshots/1667059/thrillist-404.gif"></img>
            <h1 className="error-message">PAGE NOT FOUND!</h1>
        </div>
    );
}

export default Error;