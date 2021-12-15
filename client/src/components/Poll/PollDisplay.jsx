import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import Typography from '@mui/material/Typography';

function PollDisplay(props){

    const options = props.options
    const updateVotes = props.updateVotes
    const [isPollEmpty, setIsPollEmpty] = useState(true)
    const [dataWithPercentage, setDataWithPercentage] = useState(false)
    const [radioValue, setRadioValue] = useState('');
    const [disableRadio, setDisableRadio] = useState(false)

    useEffect(() => {
        
        console.log('testing________')
        
        const total = options.map(item => {return item.option.votes}).reduce((a, b) => a + b, 0)

        if(total > 0){
            setIsPollEmpty(false) 
            setDisableRadio(true)}
        
        const updatedData = options.map(item => {
            item.option.percentage = Math.round(item.option.votes / total * 100)
            return options
        })
        
        updatedData.map(item => {return setDataWithPercentage(item)})
        
    },[options])

       
    function handleClick(event,index,optionName){
        const currentVotes = options[index].option.votes
        console.log(options[index].option.votes)
        updateVotes(index)
    }


    const handleRadio = (event) => {
        
      setRadioValue(event.target.value);
      const index = event.target.value
      updateVotes(index)

    };
    
    

    const [isClicked, setIsClicked] = useState(false)


    function pollDisplayer(){

        if(isPollEmpty){
            return(
            
                <FormControl component="fieldset">
                <FormLabel component="legend">Gender</FormLabel>
                <RadioGroup ria-label="gender" name="controlled-radio-buttons-group" value={radioValue} onChange={ handleRadio } >
                <h3>Be the first to vote on this poll!</h3>
            {dataWithPercentage.map((item,index) => {
                
                return (
                    <div className="optionText" key={index+1} >
                    <FormControlLabel disabled={disableRadio} value={index} control={<Radio />} label={item.option.name[0]} />
                    </div>
                )
            })}
    
            </RadioGroup>
            </FormControl>
    
            )
        }else{

            return(
                
                dataWithPercentage.map((item,index) => {
                    
                    return (
                        <div key={index+1}><Typography variant="body3">{item.option.name}</Typography>
                        <div className="percentageContainer">
                        <Box onClick={(event) => { handleClick(event,index,item.option.name) }}  key={index}  sx={{width: `${item.option.percentage}%`, bgcolor:'grey.300', color:'black', p: 1, my: 0.5 }}></Box>
                        <p>{item.option.percentage}%</p>
                        </div>
                         </div>
                    )
                })
            )
        }

        
    } 





    return (
        <div className="pollBars">
            <div className='pollBarsContiner'>
        {
            dataWithPercentage ? pollDisplayer() : 'loading polls'
        }               
        </div>
       
            
        </div>
      );
}

export default PollDisplay

