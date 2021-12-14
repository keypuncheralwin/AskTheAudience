import { NavLink, useNavigate, useLocation } from "react-router-dom";
import React, { useState, useEffect } from 'react';
import PollDisplay from "../../Poll/PollDisplay";
import axios from 'axios'

export default function SinglePoll(props){

    const {state} = useLocation();
    const navigate = useNavigate()
    const [refreshPoll, setRefreshPoll] = useState(false)
    const [pollData, setPollData] = useState(false)

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
        if(res.data){
            console.log('trigger')
            setRefreshPoll(!refreshPoll)
        }
        
        

    }).catch(err => {
        console.log(err)
    }) 


  }




    return(

        
        <div>
            {pollData ? <PollDisplay options={pollData.options} updateVotes={ updateVotes } refreshPoll={refreshPoll}/> : 'loading'}
        </div>
    )
}