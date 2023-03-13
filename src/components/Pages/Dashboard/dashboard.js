import React, { useEffect, useState } from "react";
import NavBar from "../../Nav-Bar/sidebar";
import { Grid, Box } from "@mui/material";
import UserWidget from "./Dash-Components/Dash-User";
import DevicesWidget from "./Dash-Components/Dash-Devices";
import TopBar from "../../Nav-Bar/topbar";
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import EditWidget from "./Dash-Components/Dash-Edit";
import ActiveSensorsGraph from "./Graphs/ActiveSensorsGraph";
import BlocksMinedGraph from "./Graphs/BlocksMinedGraph";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import WalletIcon from '@mui/icons-material/Wallet';


export default function Dashboard(){

    const [sensorCount,setSensorCount] = useState()
    const [companyID,setCompanyID] = useState()
    const [companyName,setCompanyName] = useState()
    const [companyClients, setCompanyClients] = useState()

    useEffect(() => {
        fetch(`http://127.0.0.1:8081/clients/${JSON.parse(localStorage.getItem('USER')).user_id}/company`).then(res => res.json()).then(data => {
            setCompanyName(data["name"])
            setCompanyID(data["id"])
            setSensorCount(data["sensors_count"])
            setCompanyClients(data["client_count"])
        })
    },[])


    return (
        <div style={{ display: 'flex', height: "100vh"}}>
            <NavBar />
            <div style={{width: "100vw"}}>
                <TopBar title="Company Dashboard" isAddOption = {false} isDashboard = {true} name={companyName} />
                <Box sx={{ px: 10 }}>
                    <Grid container spacing={2} justifyContent="center" sx={{ my: 4 }}>
                        <Grid item xs={4}>
                            <DevicesWidget
                                num={sensorCount}
                                company_id={companyID}
                             />
                        </Grid>
                        <Grid item xs={4}>
                            <UserWidget 
                                count= {companyClients}
                                company_id={companyID}
                                />
                        </Grid>
                        <Grid item xs={4}>
                            <EditWidget />
                        </Grid>


                        <Grid item xs={6}>
                            <ActiveSensorsGraph />
                        </Grid>
                        <Grid item xs={6}>
                            <BlocksMinedGraph />
                        </Grid>
                    </Grid>
                </Box>

            </div>
        </div>

    )
}