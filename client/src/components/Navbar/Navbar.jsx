import React, { useState } from 'react';
import { FaBars, FaTimes, FaTheaterMasks } from 'react-icons/fa'
import { NavLink, useNavigate } from "react-router-dom";
import './Navbar.css'
import { lightTheme, darkTheme } from './setDarkMode'
import { MdDarkMode, MdOutlineDarkMode } from "react-icons/md";
import Cookies from 'js-cookie'
import getLoggedInUser from '../pages/Authentication/checkAuth'

const Navbar = (props) => {

    const { userInfo, manageLogin } = props;
    const navigate = useNavigate()
        
    const [click, setClick] = useState(false)
    const [isDark, setIsDark] = useState(false)

    const handleClick = () => setClick(!click)
    const handleDark= () => {
        
        !isDark ? darkTheme() : lightTheme();
        setIsDark(!isDark)
        setClick(!click)
    }

    function handleLogOut(){
        Cookies.remove('token')
        manageLogin(getLoggedInUser())
        navigate("/")
    }
    
    return (
        
        <div className='navbar'>
        
        <NavLink to="/">
            <div className='logo'>
            <FaTheaterMasks size={50}/>
            <h2 className='logoText'>Ask The Audience</h2>            
            </div>
        </NavLink>
            
            
        <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            <NavLink to="/trending" className={({ isActive }) => (isActive ? 'selected' : '')} ><li onClick={handleClick} className='nav-item'>Trending Polls</li></NavLink>
            <NavLink to="/recent" className={({ isActive }) => (isActive ? 'selected' : '')} ><li onClick={handleClick} className='nav-item'>Recent Polls</li></NavLink>
             
            { !userInfo ? <NavLink to="/register" className={({ isActive }) => (isActive ? 'selected' : '')}><li onClick={handleClick} className='nav-item'>Register</li></NavLink> : null}
            { !userInfo ? <NavLink to="/login" className={({ isActive }) => (isActive ? 'selected' : '')}><li onClick={handleClick} className='nav-item'>Login</li></NavLink> : null}
            { userInfo ? <NavLink to="/myPolls" className={({ isActive }) => (isActive ? 'selected' : '')}><li onClick={handleClick} className='nav-item'>My Polls</li></NavLink> : null }
            { userInfo ? <NavLink to="/newPoll" className={({ isActive }) => (isActive ? 'selected' : '')}><li onClick={handleClick} className='nav-item'>Create a Poll</li></NavLink> : null }
            { userInfo ? <NavLink to="/login" className={({ isActive }) => (isActive ? 'selected' : '')}><li onClick={handleLogOut} className='nav-item'>Logout</li></NavLink> : null }
            <li onClick={handleDark} className='nav-item themeIcon'>{isDark ? <MdDarkMode size={21}/> : <MdOutlineDarkMode size={21}/>}</li>
        </ul>
            <div className='hamburger' onClick={handleClick}>
                {click ? (<FaTimes size={30} style={{ color: '#f8f8f8' }} />) : (<FaBars size={30} style={{ color: '#f8f8f8' }} />)}
            </div>
        </div>
        
    )
}

export default Navbar