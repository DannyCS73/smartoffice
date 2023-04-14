import React, { useEffect, useState } from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MenuItem } from "@mui/material";
import ErrorPopup from "../../ErrorPopup";


import "./sensors.css"

const types = [
    {
        name: "Temperature Sensor",
        unit: "C"
    }
]

const typesDict = 
    {
        "C" : "Temperature"
    }

export default function AddSensor(props){

    const [errorMsg, setErrorMsg] = useState()
    

    const [rooms, setRooms] = React.useState()
    useEffect(() => {
        console.log(JSON.parse(localStorage.getItem("USER")).company_id)
        fetch(`http://127.0.0.1:8081/companies/${JSON.parse(localStorage.getItem("USER")).company_id}/rooms`, {
            method: "GET",
            headers:{
                'Authorization' : `Basic ${JSON.parse(localStorage.getItem("USER")).token}`
            }
        }).then(res => res.json()).then(data => {
            setRooms(data.map((item) => (
                <MenuItem key={item.name} value={item.id}> 
                    {item.name}
                </MenuItem> 
                )))
        })
    },[])


    function addSensor(event){
        var msg = ""
        event.preventDefault()
        fetch(`http://127.0.0.1:8081/sensors`, { //post a new user to the API for verification.
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Basic ${JSON.parse(localStorage.getItem("USER")).token}`
            },
        body: JSON.stringify(
            {
                name: formData.name,
                type: formData.type,
                unit: formData.unit,
                room_id: formData.room_id
            }
        )}).then(res => {
            if(!res.ok) {
                return res.text().then(text => { throw new Error(text) })
            }
            else {
                return res.json();
            }}).then(data => {
                console.log(data)
                props.setRefresh(true)
            }).catch(err => {
                msg = JSON.parse(err["message"])
                setErrorMsg(<ErrorPopup severity={"error"} message={msg["message"]} />)
            })
        
            
        }

    
    


    const [formData, setFormData] = React.useState({
        name : "",
        type: "",
        unit: "",
        room_id: ""
    })


    function handleChange(event){ //update form data as it is changed.
        const {name, value} = event.target
        setFormData(prevFormData =>{
            if([name] == 'unit'){
                console.log([name])

                return {
                    ...prevFormData,
                    [name] : value,
                    type : typesDict["C"]
                }
            }
            return  {
                ...prevFormData,
                [name] : value
            }
        })
    }


    return (
        <div className="dialog-content">
        <DialogTitle>Add a new sensor</DialogTitle>
          <DialogContent>
            <DialogContentText>
                <form className="form">
                
             <div className="form-element">

             
                    <TextField
                        type="text"
                        label="Name"
                        name="name"
                        onChange={handleChange}
                        value={formData.name}
                        className="name"
                        defaultValue = ""
                    />

            </div>
              
            <div className="form-element">
                <TextField 
                        onChange={handleChange}
                        select
                        name="unit"
                        label="Select Sensor Type"
                        helperText="Please select sensor type"
                        className="select"
                        value={formData.unit}

                >
                    {types.map((item) => (
                        <MenuItem key={item.value} value={item.unit}>
                            {item.name}
                        </MenuItem>
                    ))
                    }
                </TextField>     

            </div> 

            <div className="form-element">    
                <TextField
                        type="text"
                        label="Room id"
                        name="room_id"
                        select
                        onChange={handleChange}
                        value={formData.room_id}
                        className="roomID"
                        defaultValue = ""
                >
                    {rooms}
                </TextField>

            </div>
                </form>
            </DialogContentText>
        </DialogContent>
    <DialogActions>
    <Button variant="contained" color="error" onClick={props.close}>Cancel</Button>
    <Button variant="contained" color="primary" onClick={addSensor}>Add Sensor</Button>

    </DialogActions>
    {errorMsg}

  </div>
    )
}