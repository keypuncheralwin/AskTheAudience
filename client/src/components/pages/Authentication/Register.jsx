import React, { useState } from 'react';
import axios from 'axios'
import './authentication.css'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { NavLink, useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { MdLockOpen, MdCheckCircleOutline } from "react-icons/md";
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import useStyles from './formStyling'

export default function Register(props) {

  const { userInfo } = props;

  const navigate = useNavigate()
  userInfo && navigate("/myPolls")

  const [emailError, setEmailError] = useState(false)
  const [userNameError, setUserNameError] = useState(false)
  const [passwordError, setPasswordError] = useState(false)
  const [isUserAdded, setIsUserAdded] = useState(false)

  const classes = useStyles();

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // eslint-disable-next-line no-console
    const formData = {
    email: data.get('email'),
    username: data.get('username'),
    password: data.get('password'),
    confirmPassword: data.get('confirm-password')}
    

    if(formData.password !== formData.confirmPassword){
      setPasswordError(true)
      setTimeout(() => {setPasswordError(false)}, 5000);
    }else{
      axios.post('/api/users/register', formData)
      .then( res => { 
        console.log('user created',res)
        setIsUserAdded(true)
        setTimeout(() => navigate("/login"), 1000);        
      })
      .catch(error => {
        const errorMessage = error.response.data.message;
        console.log(errorMessage)
        if (errorMessage.startsWith('email')){
          setEmailError(true)
          setTimeout(() => {setEmailError(false)}, 5000);
        }else if(errorMessage.startsWith('username')){
          setUserNameError(true)
          setTimeout(() => {setUserNameError(false)}, 5000);
        }
      });
    }

    
    
    


  };

  return (
      <Container maxWidth="xs" className='.overlap'>
        
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: `${isUserAdded ? '#006400' :'var(--accent)'}` }}>
            {isUserAdded ? <MdCheckCircleOutline size={25} /> :<MdLockOpen  />}
          </Avatar>
          <Typography component="h1" variant="h5">
            Register
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>

          <TextField className={classes.root}
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              error={emailError}
              helperText = {emailError ? "email is already in use" : ""}
            />
            <TextField className={classes.root}
              margin="normal"
              required
              fullWidth
              id="username"
              label="username"
              name="username"
              autoComplete="username"
              error={userNameError}
              helperText = {userNameError ? "username is already in use" : ""}
            />
            
            <TextField className={classes.root}
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              error={passwordError}
              helperText = {passwordError ? "Passwords do not match" : ""}
            />

            <TextField className={classes.root}
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="confirm-password"
              autoComplete="current-password"
              error={passwordError}
              helperText = {passwordError ? "Passwords do not match" : ""}
            />
            <Button 
              type="submit"
              fullWidth
              variant="outlined"
              sx={{ mt: 3, mb: 2, borderColor: 'var(--accent)', color: 'var(--text)', '&:hover': { color: 'var(--accent)', borderColor: 'var(--accent)',},}}
            >
              register
            </Button>
            <Grid container>
              <Grid item>
              <NavLink className={"link"} to="/login">
                  {"Already have an account? Log in"}
                </NavLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}