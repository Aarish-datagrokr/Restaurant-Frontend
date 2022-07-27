import React,{useState} from 'react';
import { Grid, TextField, Button, Card, CardContent, Typography, makeStyles } from '@material-ui/core';
import Select from 'react-select';
import axios from 'axios';
import { MuiThemeProvider, createTheme } from '@material-ui/core/styles';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';


const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(165, 42, 42)"
    },
    secondary: {
      main: 'rgb(245, 222, 179)'
    }
  }
});

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
}); 

const useStyles = makeStyles((Theme) => ({
  backDrop: {
    backdropFilter: "blur(3px)",
    backgroundColor:'rgba(0,0,30,0.4)'
  },
}));

const BookingForm = () => {
  const [name,setName]=useState('');
  const [phoneNo,setPhoneNo]=useState('');
  const [value,setValue]=useState(0);
  const [reservationTime,setReservationTime]=useState('');
  const [bookingStatus,setBookingStatus]=useState('Enter details to book table.');
      
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

  const classes = useStyles();
  const [open,setOpen]=React.useState(false);
  const [severity,setSeverity]=useState("");
  const handleClickToOpen = () => {
    if(phoneNo.length==10) setOpen(true);
  };
  const handleToClose = () => {
    setOpen(false);
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
/*            addNotification({
              title: 'Success',
              subtitle: 'Table Booked',
              message: response.data,
              theme: 'light',
              closeButton:"X",
              backgroundTop:"green",
              backgroundBottom:"yellowgreen"
            })*/
            setSeverity("success");
            setBookingStatus(response.data);  
            setName('');
            setPhoneNo('');
            setValue(0);
            setReservationTime('');      
          }, (error) => {
            setSeverity("error");
            if(!error.response.data==='') setBookingStatus(error.response.data);
            else setBookingStatus("Something Wrong.");
            setName('');
            setPhoneNo('');
            setValue(0);
            setReservationTime('');      
            console.log(error);
  });

}
    return (
      <div className="App" style={{marginTop: "90pt"}}> 
        <Grid >
          <MuiThemeProvider theme={theme}>
          <Card style={{ maxWidth: 510,  padding: "20px 5px", margin: "auto auto"}}>
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
                  <Select style={{color:"wheat"}} options={noOfMembers} name="members" onChange={handleChange} value={value} placeholder='Members' maxMenuHeight={150} 
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                        ...theme.colors,
                          text: 'brown',
                          primary25: 'wheat',
                          primary: 'brown',
                        },
                      })}
                  />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField name="reservationTime" type="time" onChange={event => setReservationTime(event.target.value)} value={reservationTime} placeholder="Enter reservation time" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" style={{backgroundColor: "brown",fontSize: "18px"}} variant="contained" onClick={handleClickToOpen} color="primary" fullWidth>Submit</Button>
                  </Grid>
                </Grid>
              </form>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleToClose}>
                    <Alert onClose={handleToClose} severity={severity} sx={{ width: '100%' }}>
                      {bookingStatus}
                    </Alert>
              </Snackbar>
            </CardContent>
          </Card>
          </MuiThemeProvider>
        </Grid>
      </div>
    );
}

export default BookingForm;