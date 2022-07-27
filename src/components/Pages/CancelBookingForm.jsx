import React,{useState} from 'react';
import {Theme, Grid, TextField, Button, Card, CardContent, Typography, makeStyles} from '@material-ui/core';
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

    const CancelBookingForm = () => {

    const [cancellationStatus,setCancellationStatus]=useState('Enter details to cancel booking.');
    const [phoneNo,setPhoneNo]=useState('');
    
    const [open,setOpen]=React.useState(false);
    const [severity,setSeverity]=React.useState("");
    const handleClickToOpen = () => {
      if(!phoneNo=='' && phoneNo.length==10) setOpen(true);
    };
    const handleToClose = (event,reason) => {
      setOpen(false);
    };

    
    

    const classes = useStyles();
    const handleSubmit = async(event) => {
        event.preventDefault();

        try{
          var response =  await axios({ 
            url: `/restaurant/Bookings/Cancel-Booking`, 
            data: phoneNo,
            method: 'DELETE'
          });
          setCancellationStatus(response.data);
          setSeverity("sucess");
          setPhoneNo('');
        } catch(err) {
          setSeverity("error");
          if(!err.response.data==='') setCancellationStatus(err.response.data);
          else setCancellationStatus("Something Wrong.");
          setPhoneNo('');
          console.log("err->", err.response.data)
 //         console.log(err)
        }     
    }
    
  
    return (
      <div className="App" style={{marginTop: "120pt"}}> 
        <Grid>
          <MuiThemeProvider theme={theme}>
          <Card style={{ maxWidth: 510, padding: "20px 5px", margin: "0 auto" ,boxShadow: 'none'}}>
            <CardContent>
              <Typography gutterBottom variant="h5">
                Cancel Booking
            </Typography> 
              <Typography variant="body2" color="textSecondary" component="p" gutterBottom>
                Enter your registered phone number
            </Typography> 
              <form onSubmit={handleSubmit}>
                <Grid container spacing={1}>
                  <Grid item xs={12}>
                  <TextField name="phoneNo" inputProps={{maxLength:10, minLength:10}} onChange={(event) => {
                       const re = /^[0-9\b]+$/;
                       if (event.target.value === '' || re.test(event.target.value)) {
                      setPhoneNo(event.target.value);
                    }}}
                       value={phoneNo} placeholder="Enter phone number" label="Phone number" variant="outlined" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <Button type="submit" variant="contained" onClick={handleClickToOpen} color="primary" fullWidth>Delete</Button>
                  </Grid>  
                </Grid>
              </form>
              <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleToClose}>
                    <Alert onClose={handleToClose} severity={severity} sx={{ width: '100%' }}>
                      {cancellationStatus}
                    </Alert>
              </Snackbar>
            </CardContent>
          </Card>
          </MuiThemeProvider>
        </Grid>
      </div>
    );
}

export default CancelBookingForm;