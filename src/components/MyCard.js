import { Button, Card, CardActions, CardContent, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@material-ui/core';
import React, { Fragment, useState } from 'react';
import { getMatchDetail } from '../api/Api';

export const MyCard = ( { match } ) => {

    const[detail, setDetail] = useState({});
    const[open, setOpen] = useState(false);

    const handleClick = (id) => {
        getMatchDetail(id)
        .then(data =>{ 
        console.log("Match data", data)
        setDetail(data);
        handleOpen();
        
        })
        .catch((error) => console.log(error));
    };


     const getMatchCart = () => {
         return(
             <Card style={{marginTop: 25}}>
                 <CardContent>
                     <Grid container justify="center" alignItems="center" spacing={4}>
                         <Grid item>
                             <Typography variant="h6">{match["team-1"]}</Typography>
                         </Grid>
                         <Grid item>
                             <Typography variant="h1">VS</Typography>
                         </Grid>
                         <Grid item>
                             <Typography variant="h6">{match["team-2"]}</Typography>
                         </Grid>
                     </Grid>
                 </CardContent>
                 <CardActions>
                    <Grid container justify="center">
                        <Button onClick={() => {
                            handleClick(match.unique_id);
                        } }variant="contained" color="primary">Show Details</Button>
                        <Button style = {{ marginLeft: 5 }} variant="contained" color="primary">Start time{new Date(match.dateTimeGMT).toLocaleString()}</Button>
                    </Grid>
                 </CardActions>
             </Card>
         );

       
             
         
     };

     const handleClose = () => {
         setOpen(false); 
     }

     const handleOpen = () => {
        setOpen(true);
     }

     const getDialog = () => (
         <Dialog open={open} onClose={handleClose}>
             <DialogTitle id="alert-dialog-title">{"Match Detail.."}</DialogTitle>
             <DialogContent>
                 <DialogContentText id="alert-dialog-description">
                     <Typography>{detail.stat}</Typography>
                     <Typography>
                         Match <span style={{fontStyle:"italic", fontWeight:"bold"}}>
                             {detail.matchStarted? "Started": "Still not started"}{""}
                            </span>
                     </Typography>
                     <Typography>
                        Type
                        <span style={{fontStyle:"italic", fontWeight:"bold"}}>{detail.type}{""}
                        </span>
                     </Typography>

                 </DialogContentText>
             </DialogContent>
             <DialogActions>
                 <button onClick={handleClose} color="primary" autoFocus>Close</button>
             </DialogActions>

         </Dialog>
     )
     return (
     <Fragment>
         {getMatchCart()}
         {getDialog()}
        
     </Fragment>
     );

};
