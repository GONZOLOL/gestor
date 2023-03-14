import React from 'react';
import { useState} from "react";
import {ReactComponent as Mail} from "../media/mail.svg";
import {ReactComponent as Lock} from "../media/lock.svg";
import {ReactComponent as Asterisk} from "../media/asterisk.svg";
import { Link } from 'react-router-dom';


export function SignUp() {

    const [name, setName] = useState("");
    const [surname, setSurname] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    function submit(event) {
        event.preventDefault();
        setName(event.target.name.value)
        setSurname(event.target.surname.value)
        setEmail(event.target.email.value)
        setPassword(event.target.password.value)

        
        fetch('http://51.38.51.187:5050/api/v1/auth/sign-up', {
            method: 'POST',
            headers: {
                "name": {name},
                "surname": {surname},
                "email": {email},
                "password": {password}
            },
        })
        
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response;
        })
        .then(response => console.log(response))
        .catch(error => {
            if (error.message === 'Network response was not ok') {
                setError("Email already exist");
                setData(null)
            } else {
                console.error('Error:', error);
            }
        });
    }
    

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
                        <form onSubmit={submit}>
                            <div className='inputContainer'>
                                <div className='nameContainer'>
                                    <input
                                        type="text"
                                        placeholder='Name'
                                        className='name'
                                        id='name'
                                        required
                                    />
                                    <Asterisk className='svg asteriskIcon'/>
                                    <input
                                        type="text"
                                        placeholder='Surname'
                                        className='surName'
                                        id='surname'
                                        required
                                    />
                                </div>
                                <div className='emailContainer'>
                                    <input 
                                        type="email"
                                        className={!error ? "" : "emailError"} 
                                        placeholder="Email"
                                        id='email'
                                        required
                                    />
                                    <Mail className='svg emailIcon'/>
                                    <Asterisk className='svg asteriskIcon'/>
                                </div>
                                <div className='passWordContainer'>
                                    <input
                                        type="password"
                                        className='password'
                                        placeholder="Password"
                                        id='password'
                                        required
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
                        {error ? (<div className='downInputError'>{error}</div>) : ""}
                    </div>
                </div>
            </section> 
        </>
    )
}