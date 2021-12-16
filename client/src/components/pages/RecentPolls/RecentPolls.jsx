import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import getLoggedInUser from '../Authentication/checkAuth'
import axios from 'axios'
import PollCard from "../../Poll/Card";
import CircularProgress from '@mui/material/CircularProgress';

const RecentPolls = (props) => {

    const manageDeleteRefresh = props.manageDeleteRefresh
    const { userInfo, manageLogin } = props;

    const navigate = useNavigate()
    
    const [retrievedPolls, setRetrievedPolls] = useState(null)

    let cardClass = ''
    
    useEffect(() => {
        axios.get('api/polls/allPolls').then(res => {
          if(res.data.length >= 1){setRetrievedPolls(res.data)}
          else{setRetrievedPolls(null)}

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
          
          return (<PollCard key={item._id} pollId={item._id} title={item.title} description={item.description} username={item.username} date={item.createdAt} status={'recent'} totalVotes={totalVotes}/>)
        
      })}
      </>
    )
  }

    return (

        <div className={cardClass}> 
        {!retrievedPolls && <CircularProgress sx={{ color: 'var(--accent)' }}  className="pollIcon" />}           
        {retrievedPolls ? dataExtractor(retrievedPolls) : "Loading Polls"}
        </div>
    )
}

export default RecentPolls





