import React from 'react';
import {ReactComponent as Mail} from "../media/mail.svg";
import {ReactComponent as Lock} from "../media/lock.svg";
import {ReactComponent as Asterisk} from "../media/asterisk.svg";
import { Link } from 'react-router-dom';


export function SignUp() {

    return(
        <>
           <section className="loginContainer">
                <div className="mainBox">
                    <div className='card'>
                        <div className="switchContainer">
                            <Link to='../login' className="secondSelector">
                                <span>Log In</span>
                            </Link>
                            <span className="currentSelector">Sign Up</span>
                        </div>
                        <div className="tittle">
                            <span>Sign Up</span>
                        </div>
                        <form>
                            <div className='inputContainer'>
                                <div className='nameContainer'>
                                    <input
                                        type="text"
                                        placeholder='Name'
                                        className='name'
                                    />
                                    <Asterisk className='svg asteriskIcon'/>
                                    <input
                                        type="text"
                                        placeholder='Surname'
                                        className='surName'
                                    />
                                </div>
                                <div className='emailContainer'>
                                    <input 
                                        type="email"
                                        className='email'
                                        placeholder="Email"
                                    />
                                    <Mail className='svg emailIcon'/>
                                    <Asterisk className='svg asteriskIcon'/>
                                </div>
                                <div className='passWordContainer'>
                                    <input
                                        type="password"
                                        className='password'
                                        placeholder="Password"
                                    />
                                    <Lock className='svg lockIcon'/>
                                    <Asterisk className='svg asteriskIcon'/>
                                </div>
                                
                                <div className='submit'>
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                    <span></span>

                                    <input
                                        type="submit"
                                        className="submitButton"
                                        value={"Sign Up"}
                                    />
                                </div>
                                    
                            </div>
                        </form>
                    </div>
                </div>
            </section> 
        </>
    )
}