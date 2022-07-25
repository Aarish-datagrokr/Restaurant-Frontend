import React,{useState} from 'react';
import {Theme, Grid, TextField, Button, Card, CardContent, Typography, makeStyles} from '@material-ui/core';
import axios from 'axios';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";

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
    const handleClickToOpen = () => {
      if(!phoneNo=='' && phoneNo.length==10) setOpen(true);
    };
    const handleToClose = () => {
      setOpen(false);
      setCancellationStatus("Enter details to cancel booking");
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
          setPhoneNo('');
        } catch(err) {
          if(!err.response.data==='') setCancellationStatus(err.response.data);
          else setCancellationStatus("Something Wrong.");
          setPhoneNo('');
          console.log("err->", err.response.data)
 //         console.log(err)
        }     
    }
    
  
    return (
      <div className="App"> 
        <Grid>
          <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
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
              <Dialog
                fullWidth
                open={open}
                onClose={handleToClose}
                maxWidth="xs"
                BackdropProps={{
                  classes: {
                    root: classes.backDrop,
                  },
                }} >
          <DialogTitle>{"Notification!"}</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {cancellationStatus}
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleToClose} 
                    color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
}

export default CancelBookingForm;