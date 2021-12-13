import Cookies from 'js-cookie'
import jwt_decode from "jwt-decode";


export default function getLoggedInUser(){
    const cookieValue = Cookies.get('token') 
    console.log("cokieValue",cookieValue)
    if(cookieValue !== undefined){
        const decoded = jwt_decode(cookieValue);
        console.log(decoded)
        return decoded
    } else {
        return undefined
    }
}
