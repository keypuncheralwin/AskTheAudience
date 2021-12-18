import React, { useState, useEffect } from "react";
import getLoggedInUser from '../Authentication/checkAuth'
import axios from 'axios'
import PollCard from "../../Poll/Card";
import Alert from '@mui/material/Alert';
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { RiChatPollFill } from "react-icons/ri";
import Link from '@mui/material/Link';

const PollsByUser = (props) => {

    const { manageLogin } = props;

    const navigate = useNavigate()
    const {state} = useLocation();
    
    const [retrievedPolls, setRetrievedPolls] = useState(null)

    const [refreshOnDelete, setRefreshOnDelete] = useState(false)

    let cardClass = ''
    
    useEffect(() => {
      if(!state){return navigate("/trending")}

      const { username } = state;
      
      axios.get(`/api/polls/${username}`).then(res => {
          if(res.data.length >= 1){setRetrievedPolls(res.data)}
        }).catch(error => {
        
          console.log(error)
            
          console.log(error.message)
          manageLogin(getLoggedInUser)
          navigate("/login", { state: { sessionExpired: true} })
    
        });
          
  },[refreshOnDelete])

  function manageDeleteRefresh(){
    console.log('delete refresh')
    setRefreshOnDelete(!refreshOnDelete)
  }

    if(retrievedPolls){
      if(retrievedPolls.length === 1){cardClass = 'oneCard'}
      else if(retrievedPolls.length === 2){cardClass = 'twoCards'}
      else{cardClass = 'cardCollection'}
    }else{
      cardClass = 'noCards'
    }

  function dataExtractor(data){
      
    return (
        <>
      {data.map(item => {
        const totalVotes = item.options.map(object => {return object.option.votes}).reduce((a, b) => a + b, 0)
          
          return (<PollCard key={item._id} pollId={item._id} title={item.title} description={item.description} username={item.username} date={item.createdAt} status={'byUser'} totalVotes={totalVotes} manageDeleteRefresh={manageDeleteRefresh}/>)
        
      })}
      </>
    )
  }

    return (

        <div className={cardClass}> 
        {!retrievedPolls && <RiChatPollFill className="pollIcon" size={60}/>}           
        {retrievedPolls ? dataExtractor(retrievedPolls) : 
        <Alert severity="info">You haven't got any polls, click  <NavLink className={"link"} to="/newPoll">
        <Link>here</Link>
        </NavLink> to create one!</Alert>}
        </div>
    )
}

export default PollsByUser