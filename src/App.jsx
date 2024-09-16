import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import Welcome from './Components/Welcome/Welcome.jsx';
import Dashboard from './Components/DashboardParent/Dashboard/Dashboard.jsx';

function App() {
  //WITH GOOGLE
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    console.log(profile)
  }, [profile])
  

  //CREATE ACCOUNT
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  

  return (
    <Router>
      <Routes> 
        <Route path="/" element= {<Welcome 
          setProfile={setProfile} profile={profile}
          userName={userName} setUserName={setUserName}
          email={email} setEmail={setEmail}
          password={password} setPassword={setPassword} confirmPassword={confirmPassword} setConfirmPassword={setConfirmPassword}
        />}></Route>

        <Route path="/dashboard" element={ <Dashboard profile={profile} setProfile={setProfile}></Dashboard> }></Route>
      </Routes>
    </Router>
    
  )
}

export default App
