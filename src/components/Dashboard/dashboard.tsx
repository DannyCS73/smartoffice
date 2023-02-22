import React from "react";
import NavBar from "../Nav-Bar/sidebar";
import { Grid, Box } from "@mui/material";
import WalletWidget from "./Dash-Components/Dash-Wallet";
import FloorsWidget from "./Dash-Components/Dash-Floors";
import UserWidget from "./Dash-Components/Dash-User";
import DevicesWidget from "./Dash-Components/Dash-Devices";
import TopBar from "../Nav-Bar/topbar";

export default function Dashboard(){

    return (
        <div style={{ display: 'flex', height: "100vh"}}>
            <NavBar />
            <div style={{width: "100vw"}}>
                <TopBar />
                <Box style={{width: "10vw", "marginTop": "5vh", "marginLeft":"5vw"}}>
                    <DevicesWidget/>
                </Box>
            </div>
        </div>

    )
}