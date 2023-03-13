import React from "react";
import NavBar from "../../Nav-Bar/sidebar";
import TopBar from "../../Nav-Bar/topbar";

import ValidatorsTable from "../../Tables/ValidatorsTable";

export default function Validators(){
    return(
        <div style={{ display: 'flex', height: "100vh"}}>
        <NavBar />
        <div style={{width: "100vw"}}>
            <TopBar 
                title = "Validators"
            />
            <ValidatorsTable />
        </div>

    </div>
    )
}