import React from 'react';
import {ReactComponent as Mail} from "../media/mail.svg";
import {ReactComponent as Lock} from "../media/lock.svg";

export default function SignUp() {

    return(
        <>
            <section className="loginContainer">
                <div className="mainBox">
                    <div className="switchContainer">
                        <div className="firstSelector">
                            <span>Log In</span>
                        </div>
                        <div className="secondSelector">
                            <span>Sign Up</span>
                        </div>
                    </div>
                    <div className="tittle">
                        <span>SignUp</span>
                    </div>
                    <form>
                        <input type="text" 
                            placeholder="Name"
                            
                        />
                        <input type="text" 
                            placeholder="Surname"
                        />
                        <input type="email"
                            placeholder="Email" 
                        /><Mail/>
                        <input type="password" 
                            placeholder="Password"
                        /><Lock/>
                        <input type="submit" className="submitButton" value={"Sign Up"}/>
                    </form>
                </div>
            </section> 
        </>
    )
}