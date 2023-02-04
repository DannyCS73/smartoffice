
import React, {useState} from "react"
import {FaUserAlt} from "react-icons/fa"
import {AiFillLock} from "react-icons/ai"
import base64 from 'react-native-base64'


export default function LoggedInUsers(props) {
    return(
        <div style={{"display":"flex"}}>
            <p>{props.name}</p>
        </div>
    )
}