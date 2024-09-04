import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import './Navbar.scss'

import dashIcon from '../../../assets/Icons/dashboard.png'
import logoutIcon from '../../../assets/Icons/logOut.png'
import arrowIcon from '../../../assets/Icons/arrow.png'
import plannerIcon from '../../../assets/Icons/plannerIcon.png'
import teamIcon from '../../../assets/Icons/team.png'
import messageIcon from '../../../assets/Icons/message.png'


function Navbar(props) {
  const{profile, setProfile, setUsecase} = props;
  const [showNav, setShowNav] = useState('true')
  const navigate = useNavigate();

  function HandleSidebar() {
    if(showNav === 'true'){
      setShowNav('false')
    } else if(showNav === 'false') {
      setShowNav('true')
    }
  }

  const logOut = () => {
    googleLogout();
    setProfile(null);
    navigate("/")
  };

  return (
  <>
  { showNav === 'true' 
  ?   
  <div id='sidebar_parentOpen'>
  <div id='sidebar_childOpen'>
    <div className='handleSidebarOpen' onClick={HandleSidebar}>
      <img src={arrowIcon} onClick={HandleSidebar}/>
    </div>

    <div className='navbarOpen'>
      <div className='mainMenuOpen'>
        <div className='profilePictureParentOpen'>
          <img src={profile.picture}  referrerPolicy="no-referrer"/>
        </div>

        <div className='sidebarHomeOpen' onClick={() => setUsecase('dashboard')}>
          <img src={dashIcon}/>
          <p>DASHBOARD</p>
        </div>

        <div className='sidebarHomeOpen' onClick={() => setUsecase('planner')}>
          <img src={plannerIcon}/>
          <p>PLANNER</p>
        </div>

        <div className='sidebarHomeOpen' onClick={() => setUsecase('team')}>
          <img src={teamIcon}/>
          <p  >TEAM WORK</p>
        </div>

        <div className='sidebarHomeOpen' onClick={() => setUsecase('message')}>
          <img src={messageIcon}/>
          <p >MESSAGE</p>
        </div>

      </div>

      <div className='logoutOpen' onClick={logOut}>
        <p>Log Out</p>
        <img src={logoutIcon} onClick={logOut}/>
      </div>

      </div>
    </div>
  </div>
  : 
  <div id='sidebar_parentClose'>
  <div id='sidebar_childClose'>
    <div className='handleSidebarClose' onClick={HandleSidebar}>
      <img src={arrowIcon} onClick={HandleSidebar}/>
    </div>

    <div className='navbarClose'>
      <div className='mainMenuClose'>
        <div className='profilePictureParentClose'>
          <img src={profile.picture} />
        </div>

        <div className='sidebarHomeClose'>
          <img src={dashIcon} onClick={() => setUsecase('dashboard')}/>
        </div>

        <div className='sidebarHomeClose'>
          <img src={plannerIcon} onClick={() => setUsecase('planner')}/>
        </div>

        <div className='sidebarHomeClose' onClick={() => setUsecase('team')}>
          <img src={teamIcon}/>
        </div>

        <div className='sidebarHomeClose' onClick={() => setUsecase('message')}>
          <img src={messageIcon}/>
        </div>

      </div>

      <div className='logoutClose' onClick={logOut}>
        <p>Log Out</p>
        <img src={logoutIcon} onClick={logOut}/>
      </div>

      </div>
    </div>
  </div>
 }
  </>
  )
}

export default Navbar
