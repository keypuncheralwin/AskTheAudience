import { RiQuestionnaireFill } from "react-icons/ri";
import Typography from '@mui/material/Typography';
import { MdPoll } from "react-icons/md";
import { FaTheaterMasks, FaVoteYea } from 'react-icons/fa'
import { useNavigate } from "react-router-dom";

export default function AlertDialog() {

  const navigate = useNavigate()

  function handleClick(){
    navigate("/trending")
  }

  return (
    <div className="home">
      <div>
      <div className="block1">
      <RiQuestionnaireFill size={150} />
        <Typography variant="h3" component="div" gutterBottom>
        You've got questions? We've got all the answers! All of them!
      </Typography>
      </div>
      <div className="block1">
      <Typography variant="h4" component="div" gutterBottom>
        Let the internet know about your problems and let them vote on it to help you reach a solution!
      </Typography>
      <MdPoll className="blockIcon" size={150} />
      </div>
      <div className="block1">
      <FaTheaterMasks  className="blockIcon2" size={150} />
      <Typography variant="h4" component="div" gutterBottom>
        Here at Ask The Audience, we allow you to create polls to get immediate feedback from our wide userbase!
        You can also vote on other users polls becuase who dosen't love helping out a stranger on the internet!
      </Typography>
      </div>
      </div>
      <div className="block2">
        <Typography variant="h3" component="div" gutterBottom>
        What are you waiting for? Check out the trending polls Now!.
      </Typography>
      <FaVoteYea className="redirectIcon" onClick={handleClick} size={150} />
      </div>
  
    </div>
  );
}
