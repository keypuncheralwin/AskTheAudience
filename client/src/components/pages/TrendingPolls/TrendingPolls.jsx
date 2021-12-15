import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import getLoggedInUser from '../Authentication/checkAuth'
import axios from 'axios'
import PollCard from "../../Poll/Card";
import Alert from '@mui/material/Alert';
import { NavLink } from "react-router-dom";
import { RiChatPollFill } from "react-icons/ri";
import Link from '@mui/material/Link';

const RecentPolls = (props) => {

    const { userInfo, manageLogin } = props;

    const navigate = useNavigate()
    
    const [retrievedPolls, setRetrievedPolls] = useState(null)

    let cardClass = ''
    
    useEffect(() => {
        axios.get('api/polls/allPolls').then(res => {
          if(res.data.length >= 1){setRetrievedPolls(res.data)}
        }).catch(error => {
        
            console.log(error)
            
            console.log(error.message)
            manageLogin(getLoggedInUser)
            navigate("/login", { state: { sessionExpired: true} })
    
          });
          
  },[])


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
          
          return (<PollCard key={item._id} pollId={item._id} title={item.title} description={item.description} username={item.username} date={item.createdAt} status={'current'} totalVotes={totalVotes}/>)
        
      })}
      </>
    )
  }

    return (

        <div className={cardClass}> 
        {!retrievedPolls && <RiChatPollFill className="pollIcon" size={60}/>}           
        {retrievedPolls ? dataExtractor(retrievedPolls) : 
        <Alert severity="info">You haven't created any polls yet, click  <NavLink className={"link"} to="/newPoll">
        <Link>here</Link>
        </NavLink> to create one!</Alert>}
        </div>
    )
}

export default RecentPolls





