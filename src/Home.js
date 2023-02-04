import React, {useEffect, useState} from "react";
import NavBar from "./NavBar";
import LoggedInUsers from "./LoggedInUsers";
import "./index.css"

export default function Home(){

    const[loggedInUsers, setLoggedInUsers] = useState([])

    useEffect(() => {
        fetch("http://127.0.0.1:8080/loggedOnClients", {
          method: "GET"
        }).then(res => res.json()).then(data => {
          console.log(data)
          setLoggedInUsers(data.users.map(filtered => 
            {
              return( <LoggedInUsers name={filtered.username}/> )
            }
          ))
        })},[])
  
        
    return(
    <div className="custom-container">
        <div> 
            <NavBar />
        </div>
        Hello
        </div>
    )
}