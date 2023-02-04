import React, {useState, useEffect} from "react"
import './App.css';
import {FaUserAlt} from "react-icons/fa"
import {AiFillLock} from "react-icons/ai"
import base64 from 'react-native-base64'
import { useNavigate } from "react-router-dom";
import LoggedInUsers from "/Users/daniel/smartoffice/src/LoggedInUsers.js"

export default function Login(){

    let navigate = useNavigate(); 

    const[disabled, setDisabled] = useState(false)
  
    const[formData, setFormData]= React.useState({
        username: "",
        password: ""
    })

    const [msg, setMsg] = useState("")
  
    function handleChange(event){
      const {name, value} = event.target
      setFormData(prevFormData =>{
          return  {
              ...prevFormData,
              [name] : value
          }
      })
    }
  
    function handleSubmit(event){
      event.preventDefault()
      fetch("http://127.0.0.1:8080/login", {
          method: 'GET',
          headers:{
              'Authorization': 'Basic ' + base64.encode(formData.username + ":" + formData.password) //send username and password through authorization headers
          }}).then(res => {
              if(!res.ok){
                  throw Error(res.status)
              }
              return res.json()}).then(data => {
                  localStorage.setItem("token", JSON.stringify(data.token)) //store user token in local storage
                  localStorage.setItem("user_id", JSON.stringify(data.user_id)) //store user token in local storage
                  console.log("token : " + data.token)
                  navigate('/home')
              }) 
              .catch(err => {
                setDisabled(true)
                setMsg(""+err)
              })
          }
    return (
        <div className="login-page">
        <div className= "login-container">
            <div className = "form-container">
                <form onSubmit={handleSubmit}>
                <FaUserAlt/>
                     <div >
                        <input 
                            className="login-input"
                            type="text"
                            placeholder="username"
                            name="username"
                            onChange={handleChange}
                            value={formData.username}
                        />
                    </div>
                    <div>
                        <AiFillLock/>
                        <input 
                            className="login-input"
                            type="password"
                            placeholder="password"
                            name="password"
                            onChange={handleChange}
                            value={formData.password}
                        />
                    </div>
                    <button className="login-submit">
                            <p>log in </p>
                     </button>
                     {disabled && <p>{msg}</p>}
                </form>
            </div>
        </div>
    </div>
    )

}