import React, { useState, useEffect } from "react";
import TextField from '@mui/material/TextField';
import { MdOutlineAddCircle } from "react-icons/md";
import { MdOutlineRemoveCircle } from "react-icons/md";
import { Button } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import CircularProgress from '@mui/material/CircularProgress';
import { MdCheckCircle } from "react-icons/md";
import './newPoll.css'
import Avatar from '@mui/material/Avatar';
import { BsBarChartSteps } from "react-icons/bs";
import useStyles from "../Authentication/formStyling"
import Box from '@mui/material/Box';
import { useNavigate } from "react-router-dom";
import getLoggedInUser from '../Authentication/checkAuth'
import axios from 'axios'

export default function NewPoll(props){

    
    const { userInfo, manageLogin, manageSession, sessionExpired } = props;

    const navigate = useNavigate()

    useEffect(() => {
    
        if(!userInfo){return navigate("/login")}
        if(sessionExpired){return navigate("/login")}
  },)

    const initialOptions = ['', ''];

    const classes = useStyles();
    
    const [loading, setLoading] = useState(2)
    const [options, setOptions] = useState(initialOptions)
    const [errorMessage, setErrorMessage] = useState('')
    const [animateError, setAnimateError] = useState(false)

    const addOnClick = () => {
        if (options.length < 8){
        setOptions([...options, '']);
        }else{
            setAnimateError(true)
            setErrorMessage("You've reached the maximum options limit")            
            setTimeout(function(){ setErrorMessage(""); setAnimateError(false)}, 3000);            
        }
    }

    const removeOnClick = () => {

        if (options.length > 2){
            const newOptions = options.slice(0, options.length -1)
            setOptions(newOptions);
        }else{
            setAnimateError(true)
            setErrorMessage("Can't remove any more options, minimum of two required")
            setTimeout(function(){ setErrorMessage(""); setAnimateError(false) }, 3000);
        }
        
    }

    


    function handleSubmit(event) {
        event.preventDefault();
        setLoading(0)
        const data = new FormData(event.currentTarget);
        const submittedData = [...data]
        if(!userInfo){
          manageSession(true)
          console.log('state is true')
          return navigate("/login", { state: { sessionExpired: true } })
        }
        
        
        const formData = {
            "username": "",
            "title": "",
            "description":"",
            "options": []
        }

        
        for(let i=0; i<submittedData.length; i++){
            if( i === 0){formData["title"] = submittedData[i][1]}
            if( i === 1){formData["description"] = submittedData[i][1]}
            if( i >= 2){
                formData["options"].push({option : {name : [submittedData[i][1]], votes : 0} })
            }
    
        }
        

      axios.post('/api/polls/new', formData)
      .then( res => { 
        setLoading(1)
        console.log('poll created',res)
        manageSession(false)
        navigate("/myPolls")        
      })
      .catch(error => {
        
        console.log(error)
        
        console.log(error.message)
        manageLogin(getLoggedInUser)
        manageSession(true)
        navigate("/login", { state: { sessionExpired: true} })
        console.log('state is true')

      });

      }
      
      let button = <Button size="small" type="submit">Create Poll</Button>

      if (loading === 0){
        button = <CircularProgress margin="dense" size={25}/>
      }else if (loading === 1){
        button =  <IconButton  aria-label="check" color="success"><MdCheckCircle  /></IconButton>
      } else {
        button = <Button sx={{ borderColor: 'var(--accent)', color: 'var(--text)', '&:hover': { color: 'var(--accent)', borderColor: 'var(--accent)',},}} size="small" type="submit">Create Poll</Button>
      }

    return (
        
        
        <div className="newPollContainer">
        <Avatar sx={{ m: 1, bgcolor:'var(--accent)' }}><BsBarChartSteps size={25}/></Avatar>
        <h2 className='newPollHeader'>Create a new poll</h2> 
        <Collapse in={animateError} timeout={'auto'}>{errorMessage ? <Alert severity="warning">{errorMessage}</Alert> : ''}</Collapse> 
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
        
        <div className="newPoll">
        <TextField className={classes.root} required margin="dense" name="title" id="title" label="Title" variant="outlined" /> 
        <TextField className={classes.root}  required margin="dense" name="decription" id="decription" label="Brief Desription" multiline rows={4} variant="outlined" />
        {
            options.map((option, index) => 
                <TextField className={classes.root} required key={index} margin="dense" name={`Option ${index+1}`} id={`option${index+1}`} label={`Option ${index+1}`} variant="outlined" />
            )
        }
        <div className="pollFooter">
        <div className="adjustOptions">
        <IconButton  aria-label="add" color="success" onClick={ addOnClick }><MdOutlineAddCircle /></IconButton>
        <IconButton aria-label="remove" color="error" onClick={ removeOnClick }><MdOutlineRemoveCircle /></IconButton>
        </div>
        {button}
        </div>
        </div>
        </Box>
        
        </div>
    )


}