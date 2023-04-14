import React, { useEffect, useState } from "react";
import NavBar from "../../Nav-Bar/sidebar";
import TopBar from "../../Nav-Bar/topbar";
import RoomsTable from "../../Tables/RoomsTable";

import SensorsTable from '../../Tables/SensorsTable'

export default function Rooms(){


    const [ refresh , setRefresh] = useState(false)

    useEffect(() => {
        if(refresh){
            window.location.reload()
        } else{
            console.log("already refreshed")
        }
    },[refresh])


    return(
        <div style={{ display: 'flex', height: "100vh"}}>
            <NavBar />
            <div style={{width: "100vw"}}>
                <TopBar 
                    title = "Rooms"
                />
                <RoomsTable 
                    refresh={refresh}
                    setRefresh = {setRefresh}
                />
            </div>

        </div>


    )
}