import React from 'react';
import BookingForm from './components/BookingForm';
import CancelBookingForm from './components/CancelBookingForm';
import UpdateBookingForm from './components/UpdateBookingForm';

import {Container, Row, Tabs, Tab} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Grid, Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';

function App() {
  return (
        <Card style={{ maxWidth: 510,  padding: "15px 5px" ,margin: "0 auto"}}>
          <Tabs defaultActiveKey="first" variant='tabs'>

              <Tab title="Welcome" eventKey="first" style={{paddingTop: "20px"}}>
                <Card style={{boxShadow:'none'}}>
              <Typography gutterBottom variant="h4" align="center">
                  Welcome to XYZ-Restaurant, We have tables available for maximum 4 people and booking is closed after 8 pm.
              </Typography>
              </Card>
              </Tab>

              <Tab title="Book Table" eventKey="second" >
                <BookingForm />
              </Tab>

              <Tab title="Delete booking" eventKey="third" >
                <CancelBookingForm />
              </Tab>

              <Tab title="Changes in Plan" eventKey="fourth">
                <UpdateBookingForm />
              </Tab>


          </Tabs>
          </Card>
  );
}

export default App; 