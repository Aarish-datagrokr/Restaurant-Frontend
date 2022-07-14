import React from 'react';
import BookingForm from './components/BookingForm';
import CancelBookingForm from './components/CancelBookingForm';
import UpdateBookingForm from './components/UpdateBookingForm';

import {Container, Row, Tabs, Tab} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';

function App() {
  return (
    <Container className="py-4">
        <Row className="justify-content-center">
          <Tabs defaultActiveKey="first" variant='tabs'  className='mb-1 p-0' style={{position:"absolute"}}>

              <Tab title="Welcome" eventKey="first" style={{paddingTop:"100pt"}}>
                <Card>
              <Typography gutterBottom variant="h3" align="center">
                  Welcome to XYZ-Restaurant, We have tables available for maximum 4 people and booking is closed after 8 pm.
              </Typography>
              </Card>
              </Tab>

              <Tab title="Book Table" eventKey="second" style={{paddingTop:"100pt"}}>
                <BookingForm style={{align : "center"}}/>
              </Tab>

              <Tab title="Delete booking" eventKey="third" style={{paddingTop:"100pt"}}>
                <CancelBookingForm />
              </Tab>

              <Tab title="Changes in plan" eventKey="fourth" style={{paddingTop:"100pt"}}>
                <UpdateBookingForm />
              </Tab>


          </Tabs>
        </Row>
      </Container>
  );
}

export default App; 