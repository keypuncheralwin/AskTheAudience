import axios from 'axios'
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import getLoggedInUser from '../Authentication/checkAuth'




const Home = (props) => {

  const { manageLogin } = props;
  const navigate = useNavigate()

  function handleClick(){
    axios.get('/api/test').then(res => {
      console.log(res)
      manageLogin(getLoggedInUser())
    }).catch(error => {
      
      console.log(error.message)
      manageLogin(getLoggedInUser)
      navigate("/login", { state: { sessionExpired: true} })
      
      
    })
  }
  

    return (
        <div>
            Home
            <Button onClick={handleClick}
              type="submit"
            >
              Test
            </Button>
            </div>
    )
}

export default Home