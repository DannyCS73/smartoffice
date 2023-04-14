import React, { useEffect, useState } from "react";
import NavBar from "../../Nav-Bar/sidebar";
import { Grid, Box, Typography, Button } from "@mui/material";
import UserWidget from "./Dash-Components/Dash-User";
import DevicesWidget from "./Dash-Components/Dash-Devices";
import TopBar from "../../Nav-Bar/topbar";
import EditWidget from "./Dash-Components/Dash-Edit";
import BlocksMinedGraph from "./Graphs/BlocksMinedGraph";
import {useNavigate} from "react-router-dom";
import ContractWidget from "./Dash-Components/Dash-Contract";
import ErrorOverlay from "../../ErrorOverlay";
import CreateWallet from "../Wallet/createWallet";


export default function Dashboard(){

    let navigate = useNavigate(); 

    const [hasWallet, setHasWallet] = useState(true)
    const [roomCount, setRoomCount] = useState(0)
    const [apiError, setAPIError] = useState() 
    const [errorMsg, setErrorMsg] = useState()

    const [wallet, setWallet] = useState(true)

    useEffect(() => {
        fetch(`http://127.0.0.1:8081/companies/${JSON.parse(localStorage.getItem("USER")).company_id}/wallet`, {
            method: "GET"
        }).then(res => res.json()).then(data => {
            setWallet(data.message)
        })
    },[])

    useEffect(() => {
        fetch(`http://127.0.0.1:8081/companies/${JSON.parse(localStorage.getItem("USER")).company_id}/wallet`, {
            method: "GET",
            headers:{
                'Authorization': 'Bearer ' + (JSON.parse(localStorage.getItem("USER")).token).slice(1,-1)
            }
        }).then(res => res.json()).then(data => {
            setHasWallet(data.message)
            console.log(data.code)
        }).catch(err => {
            setAPIError(true)
            setErrorMsg(String(err))
        })
    },[])

    useEffect(() => {
        fetch(`http://127.0.0.1:8081/companies/${JSON.parse(localStorage.getItem("USER")).company_id}/rooms`, {
            method: "GET",
            headers:{
                'Authorization': 'Bearer ' + (JSON.parse(localStorage.getItem("USER")).token).slice(1,-1)
            }
        }).then(res => res.json()).then(data => {
            setRoomCount(data.length)
            console.log(data.code)
        }).catch(err => 
            {
                setAPIError(true)
                setErrorMsg(String(err))
            }
        )
    },[])


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
        }).catch(err => 
            {
                setAPIError(true)
                setErrorMsg(String(err))
            }
        )
    },[])


    
      const[balance, setBalance] = useState()

      useEffect(() => {
        const interval = setInterval(() => {
            fetch(`http://127.0.0.1:8081/blockchain/company/${JSON.parse(localStorage.getItem("USER")).company_id}/balance`, {
                method: "GET",
                headers:{
                    'Authorization': 'Bearer ' + (JSON.parse(localStorage.getItem("USER")).token).slice(1,-1)
                }
            }).then(res => res.json()).then(data => {
                setBalance(data.balance)
            }).catch(err => 
                {
                    setAPIError(true)
                    setErrorMsg(String(err))
                }
            )
        }, 5000)
        return () => clearInterval(interval);
      },[])

      useEffect(() => {
        fetch(`http://127.0.0.1:8081/blockchain/company/${JSON.parse(localStorage.getItem("USER")).company_id}/balance`, {
            method: "GET",
            headers:{
                'Authorization': 'Bearer ' + (JSON.parse(localStorage.getItem("USER")).token).slice(1,-1)
            }
        }).then(res => res.json()).then(data => {
            setBalance(data.balance)
        }).catch(err => 
            {
                setAPIError(true)
                setErrorMsg(String(err))
            }
        )
      },[])

    return (
        <div>
            {apiError && <ErrorOverlay err={errorMsg}/>}
        { !apiError &&  <div style={{ display: 'flex', height: "100vh"}}>
            <div>
                <NavBar />
            </div>
            
         <div style={{width: "100vw"}}>
                    <TopBar title="Company Dashboard" isAddOption = {false} isDashboard = {true} name={companyName} />
                    <Box sx={{ px: 10 }}>
                            <div className="centre">
                                <div style={{"display": "flex"}} >
                                <div className="centre">
                                    <Typography variant="h3"> Avaliable Company Tokens : {balance}</Typography> 
                                </div>
                                </div>
                            </div>
                

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
                                <EditWidget num={roomCount} company_id={companyID} />
                            </Grid>

                            <Grid container xs={12} spacing={2}>
                                <Grid item xs={12}>
                                    <ContractWidget name="Records" />
                                </Grid>
                            </Grid>
                        </Grid>
                        <div className="centre">
                                <div style={{"display": "flex"}} >
                                    <Typography variant="h5">
                                        Blockchain Status : 
                                    </Typography>
                                    <Typography variant="h5" className="connected">
                                        Valid
                                    </Typography>
                                </div>
                            </div>
                            <div className="centre">
                                <div style={{"display": "flex"}} >
                                    <Typography variant="h5">
                                        Validation Status : 
                                    </Typography>
                            {  hasWallet ? 
                                    <Typography variant="h5" className="connected">
                                        In validation pool
                                    </Typography> :
                                    <div>
                                        <Typography variant="h5" className="disconnected">
                                            Invalid - Need to create a company wallet
                                        </Typography> 
                                        <CreateWallet setWallet = {setWallet}/>
                                    </div>
                                }
                                </div>
                            </div>
                    </Box>

                </div>
                </div>}
        </div>

    )
}