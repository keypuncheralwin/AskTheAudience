import { useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import PollDisplay from "../../Poll/PollDisplay";
import axios from 'axios'

import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';


export default function SinglePoll(props){

    const {state} = useLocation();
    const navigate = useNavigate()
    const [refreshPoll, setRefreshPoll] = useState(false)
    const [pollData, setPollData] = useState(false)

    const [showStatus, setShowStatus] = useState(false)
    const [statusText, setStatusText] = useState('')
    const [statusColor, setStatusColor] = useState('')


  useEffect(() => {
    if(!state){return navigate("/myPolls")} 
    
    const { id } = state;
    axios.get(`/api/polls/poll/${id}`).then(res => {
        setPollData(res.data)
        
    }).catch(err => {
        console.log(err)
    })  


  },[refreshPoll]);


  function updateVotes(index){

    const { id } = state;
    console.log(id)
    console.log(index)
    console.log(pollData.options[index].option.votes)
    const updateData = {pollId: id, optionId: index}
    axios.post(`/api/polls/poll/vote`, updateData).then(res => {
        
        console.log(res)
        setRefreshPoll(!refreshPoll)
        setShowStatus(true)
        setStatusText(res.data.message)
        setStatusColor('success')
        setTimeout(function(){ setShowStatus(false) }, 4000);   
        

    }).catch(err => {
        console.log(err.response)
        
        if(err.response.data === 'Forbidden'){
          setShowStatus(true)
          setStatusText('You need to login to vote')
          setStatusColor('error')
          setTimeout(function(){ setShowStatus(false) }, 4000); 

        }else{
          setShowStatus(true)
          setStatusText(err.response.data.message)
          setStatusColor('error')
          setTimeout(function(){ setShowStatus(false) }, 4000); 
        }
              
        
    }) 


  }




    return(

        
        <div className="cardPoll">
            <Collapse className="singlePollStatus" in={showStatus} timeout={'auto'} >{showStatus ? <Alert severity={statusColor}>{statusText}</Alert> : ''}</Collapse> 
            <Card  sx={{  
                border: 'var(--cardBorder)',
                bgcolor: 'var(--cardBackground)',
                color: 'var(--text)'
            }}>
            <CardHeader className='cardHeader'
        avatar={
          <Avatar sx={{ bgcolor: `var(--accent)` }} aria-label="user logo">
            {pollData ? pollData.username.toUpperCase().substring(0,2) : <CircularProgress sx={{ color: 'var(--accent)' }}  className="pollIcon" />}
          </Avatar>
        }
        
        action={
          <IconButton aria-label="settings" sx={{ color: 'var(--text)' }}>
            
          </IconButton>
        }
        title={pollData ? pollData.username : <CircularProgress sx={{ color: 'var(--accent)' }}  className="pollIcon" />}
        
        subheader={<Typography sx={{ color: 'var(--text)' }}>{pollData ? pollData.createdAt.substring(0,10) : <CircularProgress sx={{ color: 'var(--accent)' }}  className="pollIcon" />}</Typography>}
      />
      <CardContent>
        
        <Typography variant="h5" sx={{ mb: 1.5 }} color={'var(--text)'}>
        {pollData ? pollData.title : <CircularProgress sx={{ color: 'var(--accent)' }}  className="pollIcon" /> }
        </Typography>
        <Typography variant="body3">
        {pollData ? pollData.description : <CircularProgress sx={{ color: 'var(--accent)' }}  className="pollIcon" /> }
        </Typography>
        {pollData ? <PollDisplay options={pollData.options} updateVotes={ updateVotes } refreshPoll={refreshPoll}/> : <CircularProgress sx={{ color: 'var(--accent)' }}  className="pollIcon" />}
      </CardContent>
    </Card>
            
        </div>
    )
}