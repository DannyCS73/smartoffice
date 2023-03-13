import React from "react";
import NavBar from "../../Nav-Bar/sidebar";
import TopBar from "../../Nav-Bar/topbar";

import CustomTable from '../../Tables/SensorsTable'
import UsersTable from "../../Tables/UsersTable";

export default function Users(){
    return(
        <div style={{ display: 'flex', height: "100vh"}}>
            <NavBar />
            <div style={{width: "100vw"}}>
                <TopBar 
                    title = "Clients"
                />
                <UsersTable />
            </div>

        </div>

    )
}