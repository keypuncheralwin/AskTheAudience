import React, { useState, useEffect } from 'react';
import './authentication.css'
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { MdLock, MdCheckCircleOutline } from "react-icons/md";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useStyles from './formStyling'
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import jwt_decode from "jwt-decode";
import getLoggedInUser from './checkAuth'

export default function Login(props) {

  
  const { userInfo, manageLogin } = props;

  const navigate = useNavigate()
  userInfo && navigate("/myPolls")

  const {state} = useLocation();
  const [sessionExpiry, setSessionExpiry] = useState(false)

  useEffect(() => {
    if(state){
      const { sessionExpired } = state;
      setSessionExpiry(sessionExpired)    
      }
  },[state]);
  
  


  const [userNameError, setUserNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  
  const classes = useStyles();
  

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    
    console.log([...data])
    const formData  = {
      username: data.get('username'),
      password: data.get('password'),
    };
    axios.post('/api/users/login', formData)
      .then( res => { 
        const token = res.data.token
        console.log(token)
        const decoded = jwt_decode(token);
        console.log(decoded);
        console.log('user logged in',res)
        setIsLoggedIn(true)
        manageLogin(getLoggedInUser)
        navigate("/")        
      })
      .catch(error => {
        
        console.log(error)
        setUserNameError(true)
        setTimeout(() => {setUserNameError(false)}, 5000);
        setPasswordError(true)
        setTimeout(() => {setPasswordError(false)}, 5000);

      });
  };

  return (
    
      <Container maxWidth="xs">
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: `${isLoggedIn ? '#006400' :'var(--accent)'}` }}>
          {isLoggedIn ? <MdCheckCircleOutline size={25} /> :<MdLock  />}
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          {sessionExpiry ? <Alert severity="warning">Your session has expired, please log in again to continue!</Alert> : null}
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

            <TextField required className={classes.root}
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              name="username"
              autoComplete="username"
              autoFocus
              error={userNameError}
              helperText = {userNameError ? "username or password is incorrect" : ""}
            />
            <TextField required className={classes.root}
              margin="normal"
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              error={userNameError}
              helperText = {passwordError ? "username or password is incorrect" : ""}              
            />
            
            <Button 
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2, borderColor: 'var(--accent)', color: 'var(--text)', '&:hover': { color: 'var(--accent)', borderColor: 'var(--accent)',},}}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
              <NavLink className={"link"} to="/register">
                {"Don't have an account? Sign Up"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      
  );
}