import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import getLoggedInUser from '../Authentication/checkAuth'
import axios from 'axios'
import RecipeReviewCard from "../../Poll/Card";

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
          return (<RecipeReviewCard key={item._id} pollId={item._id} title={item.title} description={item.description} username={item.username} date={item.createdAt} status={'current'}/>)
        
      })}
      </>
    )
  }

  
  const text1 = "This is a long as title, let's see how long I can take it baby, boo booy maswdasdasdaskfjn aksjfdbaksdljb skdjfbskldjfgbkjsldf sdf sdjkhfbsdkjhfb"
  const text2 = "boby boo, baby choo"
  const description = "asdfsd f sdf sd fsd fs df sdf   sdf sd f s sdf sdf ds f dof gndofii noinionoinoin onoinio noi noin oin oin oi noi noi noi "
  const description1 = "sdfc sdf sd fsd f sdf sdf sd fsd fsd f sdf sd fsd f sd fs df"
  const username = 'Alwin'
  const date = '2021-12-12T01:59:45.632Z'

    return (

        <div className="cardCollection">            
        {retrievedPolls && dataExtractor(retrievedPolls)}
        </div>
    )
}

export default MyPolls