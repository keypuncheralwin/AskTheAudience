import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


function PollDisplay(props){

    const options = props.options
    const updateVotes = props.updateVotes
    const [isPollEmpty, setIsPollEmpty] = useState(true)
    const [dataWithPercentage, setDataWithPercentage] = useState(false)
    const [radioValue, setRadioValue] = useState('');

    useEffect(() => {
        
        console.log('testing________')
        
        const total = options.map(item => {return item.option.votes}).reduce((a, b) => a + b, 0)

        if(total > 0){setIsPollEmpty(false)}
        
        const updatedData = options.map(item => {
            item.option.percentage = Math.round(item.option.votes / total * 100)
            return options
        })
        
        updatedData.map(item => {return setDataWithPercentage(item)})
        
    },[options])

       



    const handleRadio = (event) => {
      setRadioValue(event.target.value);
    };
    
    

    const [isClicked, setIsClicked] = useState(false)

    


    function handleClick(event,index,optionName){
        const currentVotes = options[index].option.votes
        console.log(options[index].option.votes)
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

    function pollDisplayer2(){
        return(
            
            <FormControl component="fieldset">
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup ria-label="gender" name="controlled-radio-buttons-group" value={radioValue} onChange={ handleRadio }>

        {dataWithPercentage.map((item,index) => {
            
            return (
                <div className="optionText" key={index+1} >
                <FormControlLabel  value={item.option.name[0]} control={<Radio />} label={item.option.name[0]} />
                </div>
            )
        })}

        </RadioGroup>
        </FormControl>

        )
    } 




    return (
        <div className="poll">

        {
            dataWithPercentage ? pollDisplayer2() : 'loading polls'
        }               
      
       
            
        </div>
      );
}

export default PollDisplay

