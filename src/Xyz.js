import React,{useState} from 'react';
import BookingForm from './components/BookingForm';
import CancelBookingForm from './components/CancelBookingForm';
import UpdateBookingForm from './components/UpdateBookingForm';
import PropTypes from "prop-types";
import Box from "@material-ui/core/Box";

import {Container, Row} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography, Tabs, Tab } from '@material-ui/core';
import Card from '@material-ui/core/Card';

function Xyz() {
    const [value,setValue]=useState(0);

    function handleChange(event,newValue) {
        setValue(newValue);
    }
  return (
    <Container className="py-4">
        <Row className="justify-content-center">
        <Card style={{ maxWidth: 510,  padding: "15px 5px", margin: "0 auto"}}>
          <Tabs
           value={value}
           onChange={handleChange}
           aria-label="scrollable auto tabs example" 
           >

              <Tab value={0} label="Welcome" style={{paddingTop:"50pt"}}>
                <Card style={{boxShadow:'none'}}>
              <Typography gutterBottom variant="h4" align="center">
                  Welcome to XYZ-Restaurant, We have tables available for maximum 4 people and booking is closed after 8 pm.
              </Typography>
              </Card>
              </Tab>

              <Tab label="Book Table" value={1} style={{paddingTop:"20pt"}}>
                <BookingForm />
              </Tab>

              <Tab label="Delete booking" value={2} style={{paddingTop:"20pt"}}>
                <CancelBookingForm />
              </Tab>

              <Tab label="Changes in plan" value={3} style={{paddingTop:"20pt"}}>
                <UpdateBookingForm />
              </Tab>
          </Tabs>
          </Card>
        </Row>
      </Container>
  );
}

export default Xyz; 