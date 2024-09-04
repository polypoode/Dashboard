import React, { useState, useEffect } from 'react';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import image from '../../../assets/create-account.png'
import googleLogo from '../../../assets/Icons/iconGoogle.png'
import './Auth.scss'

function Auth(props) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {setAuth} = props;

    const login = useGoogleLogin({
        onSuccess: (codeResponse) => {
            setUser(codeResponse);
            setLoading(true);
        },
        onError: (error) => console.error('Login Failed:', error),
    });

    useEffect(() => {
        if (!user) return;

        const fetchProfile = async () => {
            try {
                const { data } = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
                    headers: {
                        Authorization: `Bearer ${user.access_token}`,
                        Accept: 'application/json',
                    },
                });
                console.log('API Response:', data);
                props.setProfile(data);
            } catch (error) {
                console.error('API Error:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, [user]);

    const logOut = () => {
        googleLogout();
        setUser(null);
        setProfile(null);
    };


    return (
        <div className='createAccount-parent'>
            <div className='createAccount-child'>

            <div className='createAccountImage'>
                    <img src={image}/>
                </div>

            <div className='LogIn-text'>
                <input className='neumorphismeButton' type="text" placeholder='Email'/>
                <input className='neumorphismeButton' type="password" placeholder='password'/>
            </div>
                <div className='ligne'></div>
                
            <button className='logInWithGoogle' onClick={login}>
                <img src={googleLogo} />
                Log In With Google
            </button>

            <div id='GoogleAuth-functionality'>
                {!user ? (
                    <></>
                ) : (
                    <div>
                        {loading ? (
                            <p>Loading...</p>
                        ) : (
                            <div>
                                {props.profile ? (
                                    navigate("/dashboard")
                                ) : (
                                    <p>The Account Does Not Exist</p>
                                )}
                                <button onClick={logOut}>Log out</button>
                            </div>
                        )}
                    </div>
                )}
            </div>

                <div className='createAccount-button'>
                    <button className='buttonPevNex' onClick={() => setAuth("welcome")}>Previous
                        <div className="buttonPevNex__horizontalCreate"></div>
                    </button>
                    <button className='buttonPevNex' onClick={() => navigate("/dashboard")}>Finish
                        <div className="buttonPevNex__horizontalCreate"></div>
                    </button>
                </div>
            </div>
            
        



        </div>
    );
}

export default Auth;
