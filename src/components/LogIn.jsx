import React from 'react';
import { useState} from "react";
import {ReactComponent as Mail} from "../media/mail.svg";
import {ReactComponent as Lock} from "../media/lock.svg";
import {ReactComponent as Asterisk} from "../media/asterisk.svg";
import { Link } from 'react-router-dom';
import { updateLocalStorage } from './LocalStorage';

export const LogIn = () => {
    
    const [data, setData] = useState(null);
    const [error, setError] = useState("adad");
    
    function submit(event) {
        event.preventDefault();
        // setError(null);

        const email = event.target.email.value;
        const password = event.target.password.value;

        if(email && password) {
            
            fetch('http://51.38.51.187:5050/api/v1/auth/sign-up', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ "email": {email}, "password": {password} })
            })
            
            .then(response => console.log(response))
            .then(response => {
                if (response.status === "404") {
                    throw new Error('404');
                }
                else if (response.status === "601") {
                    throw new Error('601');
                }
                return response;
            })
            .then( (data) => data.json() )
            .then( data => { setData(data) } )
            .catch(error => {
                if (error.message === '404') {
                    setError("User email not found or password invalid");
                } else if (error.message === '601') {
                    setError("User is not validated");
                } else {
                    console.error('Error:', error);
                }
            });
        } else {
        }
        
        
    }

    if (data) {
        updateLocalStorage(data.accessToken)
        console.log("token", data.accessToken)
    }
    const hidePassword = () => {
        var x = document.getElementById("pasword");
        if (x.type === "password") {
            x.type = "text";
        } else {
            x.type = "password";
        }
    }
    
    return(
        <>
            <section className="loginContainer">
                <div className="mainBox">
                    <div className='card'>
                        <div className="switchContainer">
                            <span className="currentSelector">Log In</span>
                            <Link to='../signup' className="secondSelector">
                                <span>Sign Up</span>
                            </Link>
                        </div>
                        <div className="tittle">
                            <span>Log In</span>
                        </div>
                        <form className='form' onSubmit={submit}>
                            <div className='inputContainer'>
                                <div className='emailContainer'>
                                    <input
                                        type="email"
                                        className='email'
                                        placeholder="Email"
                                        id='email'
                                        />
                                    <Mail className='svg emailIcon'/>
                                    <Asterisk className='svg asteriskIcon'/>
                                </div>
                                <div className='passWordContainer'>
                                    <input 
                                        type="password"
                                        className='password'
                                        placeholder="Password"
                                        id="password"
                                        />
                                    <Lock className='svg lockIcon'/>
                                    <Asterisk className='svg asteriskIcon'/>
                                </div>
                                <div className='showPassword'>
                                    <input type={'checkbox'} onClick={hidePassword}/>
                                    Show Password
                                </div>

                                <div className='submit'>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    
                                    {!error ? (
                                        <Link to='../users-page' className='submitLink'>
                                            <input
                                                type="submit"
                                                className="submitButton"
                                                value={"Log In"}
                                                />
                                        </Link>    
                                    ): (
                                        <input
                                        type="submit"
                                        className="submitButton"
                                        value={"Log In"}
                                        />
                                    )}

                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </section> 
        </>
    )
}
export const Token = React.createContext( LogIn.data );