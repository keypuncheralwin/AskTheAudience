import Register from './components/pages/Authentication/Register';
import Login from './components/pages/Authentication/Login';
import Home from './components/pages/Home/Home';
import RecentPolls from './components/pages/RecentPolls/RecentPolls'
import MyPolls from './components/pages/MyPolls/MyPolls'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "../src/components/Poll/polls.css"
import React, { useState, useEffect } from "react";
import Navbar from "./components/Navbar/Navbar";
import NewPoll from "./components/pages/CreatePoll/NewPoll"
import getLoggedInUser from "./components/pages/Authentication/checkAuth"
import SinglePoll from './components/pages/viewPoll/SinglePoll';
import AlertDialog from './test'
import TrendingPolls from './components/pages/TrendingPolls/TrendingPolls';
import PollsByUser from './components/pages/viewUser/PollsByUser';

function App() {

  const [ userInfo, setUserInfo ] = useState();

  function manageLogin(status){
    setUserInfo(status)
  }
  useEffect(() => {
    
    setUserInfo(getLoggedInUser())
  }, [])

  return (
    <div>

      <BrowserRouter>
        <Navbar userInfo={userInfo} manageLogin={manageLogin}/>
        <div className="container" >
        <div className="content">
        <Routes>
          <Route path="/" element={<Home manageLogin={manageLogin}/>}></Route>
          <Route path="/trending" element={<TrendingPolls manageLogin={manageLogin}/>}></Route>
          <Route path="/recent" element={<RecentPolls manageLogin={manageLogin}/>}></Route>
          <Route path="/register" element={<Register userInfo={userInfo} />}></Route>
          <Route path="/login" element={<Login userInfo={userInfo} manageLogin={manageLogin}/>}></Route>
          <Route path="/myPolls" element={<MyPolls userInfo={userInfo} manageLogin={manageLogin}/>}></Route>
          <Route path="/newPoll" element={<NewPoll userInfo={userInfo} manageLogin={manageLogin}/>}></Route>
          <Route path="/poll/:pollId" element={<SinglePoll userInfo={userInfo} manageLogin={manageLogin}/>}></Route>
          <Route path="/polls/:username" element={<PollsByUser userInfo={userInfo} manageLogin={manageLogin}/>}></Route>
          <Route path="/test" element={<AlertDialog userInfo={userInfo} manageLogin={manageLogin}/>}></Route>
        </Routes>
        </div>
        </div>
        </BrowserRouter>
      
      </div>
  );
}

export default App;