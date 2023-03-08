import React from 'react';
import {ReactComponent as Mail} from "../media/mail.svg";
import {ReactComponent as Lock} from "../media/lock.svg";
import {ReactComponent as Asterisk} from "../media/asterisk.svg";
import { Link } from 'react-router-dom';

export function LogIn() {

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
                        <form className='form'>
                            <div className='inputContainer'>
                                <div className='emailContainer'>
                                    <   input type="email"
                                        className='email'
                                        placeholder="Email"
                                    />
                                    <Mail className='svg emailIcon'/>
                                    <Asterisk className='svg asteriskIcon'/>
                                </div>
                                <div className='passWordContainer'>
                                    <   input type="password"
                                        className='password'
                                        placeholder="Password"
                                    />
                                    <Lock className='svg lockIcon'/>
                                    <Asterisk className='svg asteriskIcon'/>
                                </div>
                                <   input type="submit"
                                    className="submitButton"
                                    value={"Log In"}
                                />
                            </div>
                        </form>
                    </div>
                </div>
            </section> 
        </>
    )
}