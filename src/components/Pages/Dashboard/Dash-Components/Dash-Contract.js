import React, { useEffect, useState } from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, CardHeader } from "@mui/material";
import "./widget.css"
import ErrorPopup from "../../../ErrorPopup";

export default function ContractWidget(props){


    const[info, setInfo] = useState([])
    const [errorUI ,setErrorUI] = useState()


    function getHistory(){
        fetch(`http://127.0.0.1:8081/companies/${JSON.parse(localStorage.getItem("USER")).company_id}/history`,{
            method: "GET"
        }).then(res => {
            console.log(res)
            return(res.json())
        }).then(data => {
            setInfo(data.message.reverse().map((item) => {
                return(
                    <Typography variant="subtitle1">
                        {item.time} - {item.message} - 
                        <span className={Math.sign(parseInt(item.reward)) == 1 ? "reward" : "notReward"}>
                        {Math.sign(parseInt(item.reward)) == 1 ? "↑" : "↓"} {item.reward} tokens 
                        </span>
                    </Typography>
                )
            }))
        }).catch(error => {
            setErrorUI(<ErrorPopup severity={"error"} message={"CANNOT CONNECT TO BLOCKCHAIN"}></ErrorPopup>)
        })
    }

    useEffect(() => {
        getHistory()
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
            getHistory();
          }, 5000);
        return () => clearInterval(interval);
    },[])


    return(    
      <div style={{"marginTop" : "1.5vh", "marginLeft" :"1.5vh"}}>
      <Card className="widget" sx={{ minWidth: 275 , minHeight: 325, maxHeight: 325}}>
      {errorUI}
      <div className="widget-title">
            <Typography variant="h4">
                Records
            </Typography>
        </div>
        <div style={{maxHeight: "30vh", overflow: "scroll"}}>
            <CardContent style={{display: 'flex', justifyContent: 'space-between', flexDirection: 'column'}}>
                <div>
                    {info}
                </div>
            </CardContent>
        </div>
        </Card> 
    </div>)
}