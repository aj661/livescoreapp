import React, {Fragment, useEffect, useState} from 'react';
import { Navbar } from './components/Navbar';
import {getMatches} from './api/Api'
import { MyCard } from './components/MyCard';
import { Grid, Typography } from '@material-ui/core';
import './App.css';

 function App() {

  const[matches, setMatches] = useState( [ ] )
  
   useEffect( () => {
    getMatches()
      .then((data) =>{
        setMatches(data.matches)
        console.log(data.matches);
      })
      .catch()
      
    },[]);
   return (
     <div className="App">
       <Navbar/>
       <Typography variant="h4" style={{ marginTop: 10 }}>Welcome To My Cricket Livescore App</Typography>
       <Grid container>
         <Grid sm="2"></Grid>
         <Grid sm="8">
         {
           matches.map((match) => 
            <Fragment>
              {
                match.type === "Twenty20" ? (
                  <MyCard key={match.unique_id} match={match}/>
                ) : (
                  " "
                )
              }
            </Fragment>
           )
         }

         </Grid>
       </Grid>
      </div>
      

   );
 }
 export default App;