
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import {useState} from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { MdExpandMore } from "react-icons/md";
import { Button } from '@mui/material';
import './comments.css' 
import useStyles from "../pages/Authentication/formStyling"
import axios from 'axios'
import Alert from '@mui/material/Alert';
import Collapse from '@mui/material/Collapse';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardContent from '@mui/material/CardContent';
import Avatar from '@mui/material/Avatar';
import randomColor from '../Poll/profileColor';

export default function Comments(props) {

    const comments = props.comments
    const refreshComments = props.refreshComments
    const pollId = props.pollId
    const [showStatus, setShowStatus] = useState(false)
    const [statusText, setStatusText] = useState('')
    const [statusColor, setStatusColor] = useState('')

    const classes = useStyles();

    const [isexpanded, setIsExpanded] = useState(false)

    function handleClick(){
        setIsExpanded(!isexpanded)
    }

    function handleSubmit(event){
        event.preventDefault();
        
        const data = new FormData(event.currentTarget);
        const submittedData = [...data]
        const formData = {pollId: pollId, comment: submittedData[0][1]}
        console.log(formData.comment)

        
        axios.post(`/api/polls/comment`, formData)
        .then( res => { 
        
        console.log('added comment',res)
        refreshComments()
        setShowStatus(true)
        setStatusText(res.data.message)
        setStatusColor('success')
        setTimeout(function(){ setShowStatus(false) }, 4000);  
      })
      .catch(error => {
        
        console.log(error)
        
        setShowStatus(true)
        setStatusText("failed to add comment")
        setStatusColor('error')
        setTimeout(function(){ setShowStatus(false) }, 4000); 

      });

        
    }
    
    
    function renderComments(){
        
        if(comments.length === 0){
            
            return "No comments"
        }
        
        
        const latestComments = [...comments].reverse();
        console.log(latestComments)

        return (
            latestComments.map(item => {
                const date = item.user.date
                const dateArray = item.user.date.split(',')
                console.log(dateArray[0].split(',')[0].split(''))
                return (
                    <div className="commentCard">
                    <Card sx={{
                        border: 'var(--cardBorder)',
                        bgcolor: 'var(--cardBackground)',
                        color: 'var(--text)'
                       }}>
                        <CardHeader className='cardHeader'
                          avatar={
                            
                            <Avatar sx={{ bgcolor: `${randomColor()}` }} aria-label="recipe">
                              {item.user.name.toUpperCase().substring(0,2)}
                            </Avatar>
                          }
                  
                          title={
                            
                            <Typography sx={{ color: 'var(--text)' }}>{item.user.name}</Typography>
                          }
                          
                          subheader={<Typography sx={{ color: 'var(--text)' }}>{item.user.date }</Typography>}
                        />
                        <CardContent className='cardContent'>
                        <Typography gutterBottom variant="body2" component="div">
                            {item.user.comment}
                          </Typography>
                        </CardContent>
                        </Card>
                        </div>
                )
            })
        )
    }


  return (
    <div>
    <Collapse className="singlePollStatus" in={showStatus} timeout={'auto'} >{showStatus ? <Alert severity={statusColor}>{statusText}</Alert> : ''}</Collapse> 
      <Accordion  expanded={isexpanded} sx={{ mt: 1, color: 'var(--text)', backgroundColor: 'var(--cardBackground)' }}>
        <AccordionSummary onClick={handleClick}
          expandIcon={<MdExpandMore sx={{ color: 'var(--text)'}} onClick={handleClick} />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography >Comments</Typography>
        </AccordionSummary>
        <AccordionDetails>
        
        <Box  component="form" onSubmit={handleSubmit}  sx={{ mt: 1}}>
        <div className='commentContainer'>
        <TextField className={classes.root} required margin="dense" name="comment" id="comment" label="New Comment" multiline rows={3} variant="outlined" />
        <Button className={classes.root} className='commentButton' sx={{ borderColor: 'var(--accent)', color: 'var(--text)', '&:hover': { color: 'var(--accent)', borderColor: 'var(--accent)',},}} size="small" type="submit">Add Comment</Button>
        </div>
        </Box>
        
        {comments ? renderComments() : "Loading Comments"}
          
        </AccordionDetails>
      </Accordion>
      
    </div>
  );
}
