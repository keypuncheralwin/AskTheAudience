import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import getLoggedInUser from '../Authentication/checkAuth'
import axios from 'axios'
import PollCard from "../../Poll/Card";
import CircularProgress from '@mui/material/CircularProgress';

const TrendingPolls = (props) => {

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

    const thing = data.filter(item => item.username === 'john')
    console.log(thing)
    
    const dataWithTotalVotes = data.map( item => {
      const totalVotes = item.options.map(object => {return object.option.votes}).reduce((a, b) => a + b, 0)
      item['totalVotes'] = totalVotes
      return item
    })

    const sortedData = dataWithTotalVotes.sort((a,b) => {return  b.totalVotes - a.totalVotes})
   
    return (
        <>
      {sortedData.map(item => {

          return (<PollCard key={item._id} pollId={item._id} title={item.title} description={item.description} username={item.username} date={item.createdAt} status={'trending'} totalVotes={item.totalVotes}/>)
        
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

export default TrendingPolls





