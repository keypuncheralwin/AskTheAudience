import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";


export default function getLoggedInUser(){
    const cookieValue = Cookies.get('token') 
    
    if(cookieValue !== undefined){
        const decoded = jwt_decode(cookieValue);
        
        return decoded
    } else {
        return false
    }
}
