import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import NavBar from "../Nav-Bar/sidebar";
import TopBar from "../Nav-Bar/topbar";
import LandlordTable from "./landlordTable";



export default function Landlord(){
    const[isLandlord , setIsLandlord] = useState(false)
    let navigate = useNavigate()


    useEffect(() => {
        setIsLandlord(JSON.parse(localStorage.getItem("USER")).is_company_landlord)

        if(JSON.parse(localStorage.getItem("USER")).is_company_landlord == true){
            if(JSON.parse(localStorage.getItem("USER")).is_admin == true){
                navigate('/admin')
            } else {
                
            }
        } else{
            navigate('/dashboard')
        }
    },[])



    return (
        <div>
        {isLandlord === true && <div style={{ display: 'flex', height: "100vh"}}>
            <NavBar />
            <div style={{width: "100vw" ,height:"100vh"}}>
                <TopBar 
                    title = "Landlord"
                />
                <Typography style={{marginTop:"1vh" , "marginLeft": "1vw"}} variant="h5"> View or edit a Building</Typography>
                <LandlordTable />
            </div>
        </div>}
        </div>
    )
}