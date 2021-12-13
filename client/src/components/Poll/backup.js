import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';




function PollDisplay(props){

    const options = props.options
    

    options.map((item,index) => {
        
        console.log(item.option.name[0])
        console.log(item.option.votes)
        
    })

    const intialData = [1, 1, 2, 3]
    
    const [data, setData] = useState(intialData)
    
    const [selected, setSelcted] = useState(10)
    const [classSelect, setCalssSelect] = useState('option')

    const [isClicked, setIsClicked] = useState(false)

    const calculatePercentages = () => {
        const total = data.reduce((a, b) => a + b, 0)
        const percentages = data.map(item => {
            const percentage = Math.round(item / total * 100)
            return percentage
    })
    return percentages
    }


function updateData(location){

    const updatedData = data.map((item,index) => {
        if(index === location){
            item = item+1
        }
        return item
    })
    console.log(updatedData)

    setData(updatedData)
}
        
    const dataInPercentage = calculatePercentages()

    const setClass = 'option'

    function handleClick(event){
    
    if (!isClicked){
        setCalssSelect('optionSelected')
        const dataIndex = Number(event.target.lastChild.textContent)
        console.log(dataIndex)
        setSelcted(dataIndex)
        updateData(dataIndex)
        setIsClicked(true)
    }

    }


// {selected === index ? primary : 'grey.300'}
    return (
        <div className="poll">
            
            {dataInPercentage.map((item,index) => {
                 return(
                     <div className="optionText" key={index+1}>This is a long ass sentence 
                 <Box className={classSelect} key={index} onClick={(event) => { handleClick(event) }} sx={{width: `${item}%`, bgcolor: `${selected === index ? '#1976d2' : 'grey.300'}`, color:'black', p: 1, my: 0.5 }}>{item}%<span hidden>{index}</span></Box>
                 </div>
                 )
            })} 
            
        </div>
      );
}

export default PollDisplay