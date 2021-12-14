import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import getLoggedInUser from '../Authentication/checkAuth'
import axios from 'axios'
import PollCard from "../../Poll/Card";

const MyPolls = (props) => {

    const { userInfo, manageLogin } = props;

    const navigate = useNavigate()
    
    const [retrievedPolls, setRetrievedPolls] = useState(null)
    
    useEffect(() => {
        axios.get('api/polls/myPolls').then(res => {
            setRetrievedPolls(res.data)
        }).catch(error => {
        
            console.log(error)
            
            console.log(error.message)
            manageLogin(getLoggedInUser)
            navigate("/login", { state: { sessionExpired: true} })
    
          });
  },[])

  function dataExtractor(data){
      console.log(data)
    return (
        <>
      {data.map(item => {
          return (<PollCard key={item._id} pollId={item._id} title={item.title} description={item.description} username={item.username} date={item.createdAt} status={'current'}/>)
        
      })}
      </>
    )
  }

    return (

        <div className="cardCollection">            
        {retrievedPolls && dataExtractor(retrievedPolls)}
        </div>
    )
}

export default MyPolls