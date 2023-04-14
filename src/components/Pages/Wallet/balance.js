import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@mui/material";

export default function Balance(){

    const[balance, setBalance] = useState()

    useEffect(() => {
        fetch(`http://127.0.0.1:8081/blockchain/company/${JSON.parse(localStorage.getItem("USER")).company_id}/balance`, {
            method: "GET"
        }).then(res => res.json()).then(data => {
            setBalance(data.balance)
        })
    },[])

    setInterval(() => {
        fetch(`http://127.0.0.1:8081/blockchain/company/${JSON.parse(localStorage.getItem("USER")).company_id}/balance`, {
            method: "GET"
        }).then(res => res.json()).then(data => {
            setBalance(data.balance)
        })
    },5000)


    return (
        <div>
            <div className="centre">
               <Typography variant="h3"> Balance : {balance}</Typography> 
            </div>
          
        </div>
    )
}