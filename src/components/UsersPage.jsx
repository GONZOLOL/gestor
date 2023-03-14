import React from 'react';
import { useState} from "react";
import {ReactComponent as Exit} from "../media/exit.svg";
import { Link } from 'react-router-dom';


export function UsersPage() {

    const [usersData, setUsersData] = useState(null);
    
    fetch('http://51.38.51.187:5050/api/v1/users', 
        {headers: {Authentication: 'Bearer {token}'}
    })
        .then( (usersData) => usersData.json() )
        .then(usersData => {
            setUsersData(usersData)
        })


    return(
        <>
           <section className="userPageContainer">
                <div className="mainBox">
                    <div className='card'>
                        <div className="header">
                            <span>Users Page</span>
                            <Link to='../login' className='exitSvg'>
                                <Exit/>
                            </Link>
                        </div>
                        {
                            usersData.map((datos, i) => {
                                return (
                                    <section key={i}>
                                        {datos}
                                    </section>
                                )})
                        }

                        
                    </div>
                </div>
            </section> 
        </>
    )
}