import React, { useState, useEffect } from 'react';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { RiDeleteBin5Fill } from "react-icons/ri";
import { MdHowToVote } from "react-icons/md";
import { BsFillArrowRightCircleFill } from "react-icons/bs";


export default function PollCard(props) {

  const pollId = props.pollId
  const cardStatus = props.status
  const usernameLogo = props.username.toUpperCase().substring(0,2)
  const username = props.username
  const  date = props.date.substring(0,10)
  const title = props.title.substring(0, 100) + '...';
  const description = props.description.substring(0, 350) + '...'

  

  return (
    <Card className="card" sx={{
      border: 'var(--cardBorder)',
      bgcolor: 'var(--cardBackground)',
      color: 'var(--text)'
     }}>
      <CardHeader className='cardHeader'
        avatar={
          <Avatar sx={{ bgcolor: 'var(--text)' }} aria-label="recipe">
            {usernameLogo}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings" sx={{ color: 'var(--text)' }}>
            <RiDeleteBin5Fill />
          </IconButton>
        }
        title={username }
        
        subheader={<Typography sx={{ color: 'var(--text)' }}>{date }</Typography>}
      />
      <CardContent className='cardContent'>
      <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>   
        <Typography variant="body2" sx={{ color: 'var(--text)' }}>
          {description} 
        </Typography>
      </CardContent>
      <div className='cardButtons'>
        <IconButton className='cardButtons' aria-label="add to favorites" sx={{ color: 'var(--text)' }}>
          <MdHowToVote />
        <Typography variant="body2" sx={{paddingTop:'8px', margin:0, color: 'var(--text)' }} gutterBottom>10</Typography>
        </IconButton>
        <NavLink to={`/poll/${pollId}`} state={{ id: pollId }}>
        <IconButton className='cardButtons' aria-label="share" sx={{ color: 'var(--text)' }}>
        <Typography variant="body2" sx={{paddingRight:'5px', margin:0, color: 'var(--text)' }} gutterBottom>{cardStatus === 'current' ? 'View Votes' : 'Vote Now'}</Typography>
          <BsFillArrowRightCircleFill  />
        </IconButton>
        </NavLink>
        </div>
    </Card>
  );
}
