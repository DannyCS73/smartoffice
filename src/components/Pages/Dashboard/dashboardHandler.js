import React, { useEffect, useState } from 'react';
import {useNavigate} from "react-router-dom";
import Dashboard from './dashboard';


export default function DashboardHandler(){

    const[isClient , setIsClient] = useState()

    let navigate = useNavigate()

    useEffect(() => {
        setIsClient(JSON.parse(localStorage.getItem("USER")).is_company_landlord)
        if(JSON.parse(localStorage.getItem("USER")).is_company_landlord == true){
            if(JSON.parse(localStorage.getItem("USER")).is_admin == true){
                navigate('/admin')
            } else {
                navigate('/landlord')
            }
        }
    },[])

    return (
        <div>
            {isClient === false && <Dashboard />}
        </div>
    )
}