import React,{useState} from 'react';
import {Theme,makeStyles, Grid, TextField, Button, Card, CardContent, Typography } from '@material-ui/core';
import Select from 'react-select';
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
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

const UpdateBookingForm = () => {

  const [phoneNo,setPhoneNo]=useState('');
  const [value,setValue]=useState(0);
  const [reservationTime,setReservationTime]=useState('');
  const [updationStatus,setUpdationStatus]=useState('Enter details to Update.');
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
      const [severity,setSeverity]=React.useState("");

      const handleClickToOpen = () => {
        if(!phoneNo=='' && phoneNo.length==10) setOpen(true);
      };
      const handleToClose = () => {
        setOpen(false);
      };
             
    const handleSubmit = async(event) => {
             event.preventDefault();
             const phoneNo= event.target.phoneNo.value;
             const members= event.target.members.value;
             const reservationTime = event.target.reservationTime.value;
                    
            await axios.put(`restaurant/Bookings/Change-Booking-Details`,{phoneNo,members,reservationTime},{
                 headers: {
                 "content-type": "application/json"
                          }, 
                })
                  .then((response) => {
                     setUpdationStatus(response.data);
                     setSeverity("success");
                     setPhoneNo('');
                     setValue(0);
                     setReservationTime('');      
         
                    }, (error) => {
                        setSeverity("error");
                        if(!error.response.data=='') setUpdationStatus(error.response.data);
                        else setUpdationStatus("Something Wrong.");
                        setPhoneNo('');
                        setValue(0);
                        setReservationTime('');      
//                        console.log(error);
                    });
                    
}
                                           
    return (
      <div className="App" style={{marginTop: "90pt"}}> 
        <Grid>
          <MuiThemeProvider theme={theme}>
          <Card style={{ maxWidth: 510, padding: "20px 5px", margin: "0 auto" , boxShadow: 'none', backgroundColor: "wheat"}}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Change Booking Details
            </Typography> 
              <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                Enter registered phone number and changes you want to update
            </Typography> 
              <form id='form' onSubmit={(e)=> handleSubmit(e)}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                  <TextField id="phoneNo" style={{backgroundColor: "white"}} name="phoneNo" inputProps={{maxLength:10, minLength:10}} onChange={(event) => {
                       const re = /^[0-9\b]+$/;
                       if (event.target.value === '' || re.test(event.target.value)) {
                      setPhoneNo(event.target.value);
                    }}}
                       value={phoneNo} placeholder="Enter phone number" label="Phone number" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                  <Select id="members" options={noOfMembers} name="members" onChange={handleChange} value={value} placeholder='Members' maxMenuHeight={150} 
                      theme={(theme) => ({
                        ...theme,
                        borderRadius: 0,
                        colors: {
                        ...theme.colors,
                          text: 'brown',
                          primary25: 'wheat',
                          primary: 'brown',
                          colors: "wheat"
                        },
                      })}                  
                  />
                  </Grid>
                  <Grid item xs={12}>
                  <TextField id="reservationTime" style={{backgroundColor: "white"}} name="reservationTime" type="time" onChange={event => setReservationTime(event.target.value)} value={reservationTime} placeholder="Enter reservation time" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <Button id="updateButton" type="submit" variant="contained"  onClick={handleClickToOpen} color="primary" fullWidth>Update</Button>
                  </Grid>
  
                </Grid>
              </form>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleToClose}>
                    <Alert id="alert" onClose={handleToClose} severity={severity} sx={{ width: '100%' }}>
                      {updationStatus}
                    </Alert>
              </Snackbar>
            </CardContent>
          </Card>
          </MuiThemeProvider>
        </Grid>
      </div>
    );
}

export default UpdateBookingForm;