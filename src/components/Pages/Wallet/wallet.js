import { Typography } from "@mui/material";
import React, {useEffect, useState} from "react";

import NavBar from "../../Nav-Bar/sidebar";
import TopBar from "../../Nav-Bar/topbar";
import Balance from "./balance";
import CreateWallet from "./createWallet";
import Transaction from "./transaction";

export default function Wallet(){

    const [hasWallet, setHasWallet] = useState(true)

    useEffect(() => {
        fetch(`http://127.0.0.1:8081/companies/${JSON.parse(localStorage.getItem("USER")).company_id}/wallet`, {
            method: "GET"
        }).then(res => res.json()).then(data => {
            setHasWallet(data.message)
        })
    },[])




    return(
        <div style={{ display: 'flex', height: "100vh"}}>
            <NavBar />
            <div style={{width: "100vw"}}>
                <TopBar 
                    title = "Company Wallet"
                />
                { hasWallet ?
                    <div>
                        <div className="balance-container">
                            <Balance />
                        </div>
                        <Transaction/>
                        <Transaction/>
                    </div> :
                    <div>
                        <div className="centre">
                            <Typography variant="h5">Company does not currently have a wallet:</Typography>
                        </div>
                        <div className="centre">
                            <CreateWallet
                                setWallet = {setHasWallet}
                            />
                        </div>
                    </div>
                }
         
            </div>
        </div>


    )
}