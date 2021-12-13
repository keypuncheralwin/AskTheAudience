import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';




function PollDisplay(props){

    const options = props.options
    const updateVotes = props.updateVotes


    const [data, setData] = useState(options)
    const [dataWithPercentage, setDataWithPercentage] = useState(false)

    useEffect(() => {
        console.log('testing')
        const total = data.map(item => {return item.option.votes}).reduce((a, b) => a + b, 0)
        
        const updatedData = data.map(item => {
            item.option.percentage = Math.round(item.option.votes / total * 100)
            return data
        })
        
        updatedData.map(item => {return setDataWithPercentage(item)})
    },[data])

       

  
    
    
    
    

    const [isClicked, setIsClicked] = useState(false)

    


    function handleClick(event,index,optionName){
        const currentVotes = data[index].option.votes
        console.log(data[index].option.votes)
        updateVotes(index)

    }

    function pollDisplayer(){

        return(
        dataWithPercentage.map((item,index) => {
            
            return (
                <div className="optionText" key={index+1}><h1>{item.option.name}</h1>
                 <Box onClick={(event) => { handleClick(event,index,item.option.name) }}  key={index}  sx={{width: `${item.option.percentage}%`, bgcolor:'grey.300', color:'black', p: 1, my: 0.5 }}></Box>
                 </div>
            )
        })
        )
    } 



    return (
        <div className="poll">
            
        {
            dataWithPercentage ? pollDisplayer() : 'loading polls'
        }
            
        </div>
      );
}

export default PollDisplay