import React,{useState} from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import Select from 'react-select';
import axios from 'axios';
import {Notifications} from 'react-push-notification';
import addNotification from 'react-push-notification';

const BookingForm = () => {
  const [name,setName]=useState('');
  const [phoneNo,setPhoneNo]=useState('');
  const [value,setValue]=useState(0);
  const [reservationTime,setReservationTime]=useState('');
      
  const noOfMembers = [
    {value:0, label:"Members"},
    {value:1, label:"1"},
    {value:2, label:"2"},
    {value:3, label:"3"},
    {value:4, label:"4"},
  ];

  const handleChange = (value) => {
    setValue(value);
  };


  const handleSubmit = async(event) => {
      event.preventDefault();
      const name=event.target.name.value;
      const phoneNo= event.target.phoneNo.value;
      const members= event.target.members.value;
      const reservationTime = event.target.reservationTime.value;

      await axios.post(`restaurant/Bookings/Book-For`,{name,phoneNo,members,reservationTime},{
      headers: {
        "content-type": "application/json"
      }, 
       })
          .then((response) => {
            addNotification({
              title: 'Success',
              subtitle: 'Table Booked',
              message: response.data,
              theme: 'light',
              closeButton:"X",
              backgroundTop:"green",
              backgroundBottom:"yellowgreen"
            })
            setName('');
            setPhoneNo('');
            setValue(0);
            setReservationTime('');      
          }, (error) => {
            addNotification({
              title: 'Warning',
              subtitle: 'Something wrong!',
              message: error.response.data,
              theme: 'red',
              closeButton:"X",
            })  
                setName('');
      setPhoneNo('');
      setValue(0);
      setReservationTime('');      
      console.log(error);
  });

}
    return (
      <div className="App"> 
        <Grid>
          <Card style={{ maxWidth: 450,  padding: "20px 5px", margin: "0 auto" }}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Table Booking
            </Typography> 
              <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                Fill up the form and we will notify you if the table is available.
            </Typography> 
              <form onSubmit={(e)=> handleSubmit(e)}>
                <Grid container spacing={1}>
                  <Grid xs={12} item>
                    <TextField name="name" onChange={event => setName(event.target.value)} value={name} placeholder="Enter full name" label="Name" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="phoneNo" inputProps={{maxLength:10, minLength:10}} onChange={(event) => {
                       const re = /^[0-9\b]+$/;
                       if (event.target.value === '' || re.test(event.target.value)) {
                      setPhoneNo(event.target.value);
                    }}}
                       value={phoneNo} placeholder="Enter phone number" label="Phone number" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                  <Select options={noOfMembers} name="members" onChange={handleChange} value={value} placeholder='Members' maxMenuHeight={150} />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="reservationTime" type="time" onChange={event => setReservationTime(event.target.value)} value={reservationTime} placeholder="Enter reservation time" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" color="primary" fullWidth>Submit</Button>
                  </Grid>
  
                </Grid>
              </form>
            </CardContent>
            <Notifications />
          </Card>
        </Grid>
      </div>
    );
}

export default BookingForm;