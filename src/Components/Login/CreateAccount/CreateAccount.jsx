import { useState, useEffect, useRef } from 'react';
import React from 'react';
import validate from 'deep-email-validator'
import { useNavigate } from 'react-router-dom';
import './CreateAccount.scss'
import image from '../../../assets/create-account.png'
import summaryImage from '../../../assets/summary.png'

import io from 'socket.io-client';
const socket = io('http://localhost:3001');



function CreateAccount(props) {
    //-----------------------//
    const navigate = useNavigate(); 
    const [step, setStep] = useState(1);
    const {setAuth, setProfile} = props;

    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [company, setCompany] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    //PROFILE PICTURE
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    

    //CHECK EMAIL AND PASSWORD
    const [errorEmail, setErrorEmail] = useState('');
    const [errorPassword, setErrorPassword] = useState('');
    const [errorNames, setErrorNames] = useState('')

    //FUNCTION
    const validateEmail = async () => {
        let res = await validate({
            email: email,
            sender: email,
            validateRegex: true,
            validateMx: false,
            validateTypo: true,
            validateDisposable: true,
            validateSMTP: true,
          })
          if(!res.valid) {
            setErrorEmail('This email is not valid *')
          }else{
            setErrorEmail('')
          }

        return res.valid;
    }
    const validatePassword = async () => {
        if (password.length <= 4 ) {
            setErrorPassword('Your password must be five characters minimum *')
            return false
        } else if(password.length >= 5 && confirmPassword !== password){
            setErrorPassword('The password does not match *')
            return false
        }

        setErrorPassword('')
        return true 
        
    }
    const handleAddOneEmailPassword = async () => {
       const emailValitidy = await validateEmail();
       const passwordValidity = await validatePassword();

       if(emailValitidy === true && passwordValidity === true ){
        AddOne()
       }
    }
    //CHECK IF THERE IS A NAME AND LASTNAME
    const handleAddOneNames = async () => {

        if(name.length && lastName.length){
            setErrorNames('')
            AddOne()
        } else if (name.length === 0 && lastName.length === 0 || name.length >= 1 && lastName.length === 0 || name.length === 0 && lastName.length >= 1){
            setErrorNames('Your Name and Last Name are required *')
        }
    }
    //PROFILE PICTURE
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setProfileImage(file);

        // Generate a preview of the image
        const reader = new FileReader();
        reader.onloadend = () => {
            setImagePreview(reader.result);
        };
        reader.readAsDataURL(file);
    };

    //GENERAL
    function updateInput (e, input) {
        if (input === "name") {
            setName(e.target.value)
        } else if (input === "lastName") {
            setLastName(e.target.value)
        } else if (input === "company") {
            setCompany(e.target.value)
        } else if (input === "email") {
            setEmail(e.target.value)
        } else if (input === "password") {
            setPassword(e.target.value)
        } else if (input === "confirmPassword") {
            setConfirmPassword(e.target.value)
        }
    }
    function AddOne(){
        if(step === 1 || step <= 5){
            setStep(step+1)
        }
    }
    function SubstracOne(){
        if( step === 1){
           setAuth("welcome")
        } else {
            setStep(step-1)
        }
    }
    const handleCreateUser = () => {
        const reader = new FileReader();
        reader.readAsDataURL(profileImage);
        reader.onloadend = () => {
          
        const base64Image = reader.result

                const userData = {
                name,
                lastName,
                company,
                email,
                password,
                picture: base64Image
            };

            setProfile(userData);
            navigate("/dashboard")

            
            console.log(userData)
            
            socket.emit('createUser', userData, (response) => {
                console.log("creating user")
                if (response.status === 'success') {
                    alert('User created successfully');
                    setName("");
                    setLastName("");
                    setCompany("");
                    setEmail("");
                    setPassword("");
                    setConfirmPassword("");
                    setProfileImage(null);
                } else {
                    alert('Error creating user: ' + response.error.message);
                }
            });
        }
    };


    return (
        <div className='createAccount-parent'>
            
            { step === 1 ?
            <div className='createAccount-child'>

                <div className='createAccountImage'>
                    <img src={image}/>
                </div>

                <div className='createAccount-text'>
                    <div className='inputRequired' style={{position:"relative"}}>
                        <p className='requiredIcon'>*</p>
                        <input className='neumorphismeButton' value={name} onChange={(e) => updateInput(e, "name")} type="text" placeholder='Name' />
                    </div>
                    
                    <div className='inputRequired' style={{position:"relative"}}>
                        <p className='requiredIcon'>*</p>
                        <input className='neumorphismeButton' value={lastName} onChange={(e) => updateInput(e, "lastName")} type="text" placeholder='Last Name' />
                    </div>

                    <div className='inputRequired' style={{position:"relative"}}>
                        <input className='neumorphismeButton' value={company} onChange={(e) => updateInput(e, "company")} type="text" placeholder='Company (Optional)' />
                    </div>
                  
                    <div className='createAccount-error'>
                        <p>{errorNames}</p>
                    </div>

                </div>


                <div className='createAccount-button'>
                    <button className='buttonPevNex' onClick={() => {SubstracOne()}}>Previous
                        <div className="buttonPevNex__horizontalCreate"></div>
                    </button>
                    <button className='buttonPevNex' onClick={() => {handleAddOneNames()}}>Next
                        <div className="buttonPevNex__horizontalCreate"></div>
                    </button>
                </div>

                <div className='requiredInfo-parent' >
                    <p className='requiredSymbole-child'>* </p> <p className='requiredInfo-child'>required to create your account</p> 
                </div>
            </div> 
            : 
            step === 2 ?
            <div className='createAccount-child'>

                <div className='createAccountImage'>
                <img src={image}/>
                </div>

                <div className='createAccount-text'>

                    <div className='inputRequired' style={{position:'relative'}}>
                        <p className='requiredIcon'>*</p>
                        <input className='neumorphismeButton' value={email} onChange={(e) => updateInput(e, "email")} type="text" placeholder='Email'/>
                    </div>

                    <div className='createAccount-password'>
                        <div>
                            <p className='requiredIcon'>*</p>
                            <input className='neumorphismeButton'value={password} onChange={(e) => updateInput(e, "password")} type="password" placeholder='Password'/>
                        </div>
                        <div >
                            <p className='requiredIcon'>*</p>
                            <input className='neumorphismeButton' value={confirmPassword} onChange={(e) => updateInput(e, "confirmPassword")} type="password" placeholder='Confirm Password'/>
                        </div>
                    </div>

                    <div className='createAccount-error'>
                        <p>{errorEmail}</p>
                        <p>{errorPassword}</p>
                    </div>
                </div>

                <div className='createAccount-button'>
                    <button className='buttonPevNex' onClick={() => {SubstracOne()}}>Previous
                        <div className="buttonPevNex__horizontalCreate"></div>
                    </button>

                    <button  className='buttonPevNex' onClick={() => {handleAddOneEmailPassword(email)}}>Next
                        <div className="buttonPevNex__horizontalCreate"></div>
                    </button>

                </div>

                <div className='requiredInfo-parent' >
                    <p className='requiredSymbole-child'>*</p> <p className='requiredInfo-child'>  required to create your account</p> 
                </div>

            </div> 
            :  step === 3 ?
            <div className='creation-profilePicture'>
                <div className='createAccountImage'>
                    <img src={image}/>
                </div>

                <div className='creation-card'>
                    <input id='fileInput' type='file' accept='image/*' onChange={handleImageChange}/>

                    <div className='creation-card-child'>
                        {imagePreview ?
                            <div className='card-textPicture'>
                            <img src={imagePreview} className='card-profilePicture'></img>
                        </div>
                        :
                            <div className='card-textPicture'>
                                <p>{name.charAt(0).toUpperCase()}</p>
                            </div>
                        }
                    <div className='cardText'>
                            <label htmlFor='fileInput' >
                                {profileImage ? "Change your profile picture" : "Choose a profile picture"}
                            </label>
                    </div>
                </div>
         </div>

 
                <div className='createAccount-button'>
                    <button className='buttonPevNex' onClick={() => {SubstracOne()}}>Previous
                        <div className="buttonPevNex__horizontalCreate"></div>
                    </button>

                    <button  className='buttonPevNex' onClick={() => {handleAddOneEmailPassword(email)}}>Next
                        <div className="buttonPevNex__horizontalCreate"></div>
                    </button>
                </div>
            </div>
            : step === 4 ?
                <div className='createAccount-summary'>
                    <div className='createAccountImage'>
                        <img src={summaryImage}/>
                    </div>

                    <div className='createAccount-card'>
                        {imagePreview ?
                            <div className='card-textPicture'>
                                <img src={imagePreview} className='card-profilePicture'></img>
                            </div>
                        :
                            <div className='card-textPicture'>
                                <p>{name.charAt(0).toUpperCase()}</p>
                            </div>
                        
                        }
                        
                        <div className='cardText'>
                            <div>
                                <span>Name: </span>
                                <p>{name.charAt(0).toUpperCase() + name.slice(1)} </p>
                            </div>
                            <div>
                                <span>Last Name:</span>
                                <p> {lastName.charAt(0).toUpperCase() + lastName.slice(1)}</p>
                            </div>
                            <div>
                                <span>Email:</span>
                                <p>{email}</p>
                            </div>
                                { company.length === 0 ?
                                    <span>Personal Purpose</span>
                                :   
                                <div>
                                    <span>Company:</span>
                                    <p> {company} </p>
                                </div>
                                }
                            </div>
                        </div>
                    <div className='createAccount-button'>
                        <button className='buttonPevNex' onClick={() => {SubstracOne()}}>Previous
                            <div className="buttonPevNex__horizontalCreate"></div>
                        </button>
                        <button  className='buttonPevNex' onClick={() => handleCreateUser()}>Finish
                            <div className="buttonPevNex__horizontalCreate"></div>
                        </button>
                    </div> 
                </div>
          

            : null
            }

        </div>
    );
}

export default CreateAccount;
