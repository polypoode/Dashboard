import { useNavigate  } from 'react-router-dom';
import React, {useState, useEffect} from 'react'

import './Welcome.scss'
import Auth from '../Login/Auth/Auth';
import CreateAccount from '../Login/CreateAccount/CreateAccount';
import polydash from '../../assets/poly-dash.png'

function Welcome(props) {
  const { profile, setProfile } = props;
    const navigate = useNavigate();
    const [auth, setAuth] = useState("welcome");
    
  return (
      <div id='welcome-parent'>

        <div className='background'>
        <iframe src='https://my.spline.design/browserescape-6b6b20ab9722fb7b77b0928c61d082a8/' frameborder='0' width='100%' height='100%'></iframe>
        </div>
        
        <div className='login'>
        {auth === "welcome" ?
            <div id='welcome-button-parent'>
              <img className='polydashPicture' src={polydash}></img>

            <div className='box-button'>
                <button className='button' onClick={() => setAuth("create")}>Create Account
                  <div className="button__horizontal"></div>
                  <div className="button__vertical"></div>
                </button>

                <button className='button' onClick={() => setAuth("login")}>Login
                  <div className="button__horizontal"></div>
                  <div className="button__vertical"></div>
                </button>
            </div>

            </div>
        : auth === "login" ?
            <Auth setProfile={setProfile} profile={profile} setAuth={setAuth}/>
        : auth === "create" ?
            <CreateAccount setAuth={setAuth} setProfile={setProfile}/>
        : null
        }
        </div>
        
    </div>
  )
}

export default Welcome
