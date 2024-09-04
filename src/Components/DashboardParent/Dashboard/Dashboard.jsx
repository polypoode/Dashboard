import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Dashboard.scss'
import Navbar from '../Navbar/Navbar';
import Calendar from '../../Widget/Calendar/Calendar';
import Planner from '../../DashboardParent/Planner/Planner.jsx';
import Team from '../../DashboardParent/Team/Team.jsx';
import Message from '../../DashboardParent/Message/Message.jsx';


import './Dashboard.scss'
import '../Navbar/Navbar.scss'

function Dashboard(props) {
    const { profile, setProfile } = props;
    const  [usecase, setUsecase ] = useState('dashboard');
    const navigate = useNavigate();
  
    
  return (
    <div id='dashboard'>
      <Navbar profile={profile} setProfile={setProfile} setUsecase={setUsecase}></Navbar>

    { usecase === 'dashboard' ?
      <div id='widget'>
        <Calendar></Calendar>
      </div>
    : usecase === 'planner' ? 
      <Planner></Planner>
    : usecase === 'team' ?
      <Team></Team>
    : usecase === 'message' ?
      <Message></Message>
    :
    null
    }

    </div>
  )
}

export default Dashboard
