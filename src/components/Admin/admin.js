import React from "react";
import NavBar from "../Nav-Bar/sidebar";
import TopBar from "../Nav-Bar/topbar";



export default function Admin(){
    return (
        <div style={{ display: 'flex', height: "100vh"}}>
            <NavBar />
            <div style={{width: "100vw"}}>
                <TopBar 
                    title = "Admin"
                />
            </div>
      
        </div>
    )
}