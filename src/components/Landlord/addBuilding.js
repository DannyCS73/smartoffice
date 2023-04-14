import React, { useEffect, useState } from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MenuItem } from "@mui/material";



export default function AddBuilding(props){
    

    const [rooms, setRooms] = React.useState()
 


    function addSensor(event){
        event.preventDefault()
        fetch(`http://127.0.0.1:8081/buildings`, { //post a new user to the API for verification.
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Basic ${JSON.parse(localStorage.getItem("USER")).token}`
            },
        body: JSON.stringify(
            {
                name: formData.name,
                company_id: props.id
            }
        )}).then(res => {
            if(!res.ok) {
                return res.text().then(text => { throw new Error(text) })
            }
            else {
                return res.json();
            }}).then(data => {
                console.log(data)
            
            }).catch(err => {
       
            })
        }

    
    


    const [formData, setFormData] = React.useState({
        name : "",
    })


    function handleChange(event){ //update form data as it is changed.
        const {name, value} = event.target
        setFormData(prevFormData =>{
            return  {
                ...prevFormData,
                [name] : value
            }
        })
    }


    return (
        <div className="dialog-content">
        <DialogTitle>Add a new Building</DialogTitle>
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
              
      

                </form>
            </DialogContentText>
        </DialogContent>
    <DialogActions>
    <Button variant="contained" color="error" onClick={props.close}>Cancel</Button>
    <Button variant="contained" color="primary" onClick={addSensor}>Add Building</Button>

    </DialogActions>

  </div>
    )
}