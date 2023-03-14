import { useState } from "react";
import { ReactComponent as Exit } from "../media/exit.svg";
import { Link } from 'react-router-dom';
import { getLocalStorage } from "./LocalStorage";

export function UsersPage() {

    const token = getLocalStorage()
    console.log(token)

    const [data, setData] = useState(null);

    fetch('http://51.38.51.187:5050/api/v1/users', 
        {headers: {Authentication: 'Bearer' + token}
    })
        .then( (data) => data.json() )
        .then( data  => { setData(data) } )


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
                        {data ? (
                                data.map((data, i) => {
                                    return (
                                        <div key={i}>
                                            {data.email}
                                        </div>
                                    )})
                            ) : ""
                        }

                        
                    </div>
                </div>
            </section> 
        </>
    )
}