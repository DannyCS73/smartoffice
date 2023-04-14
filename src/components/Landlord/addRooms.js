import React, { useEffect, useState } from "react";
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MenuItem } from "@mui/material";



export default function AddRooms(props){

    const [companies, setCompaines] = useState()
    

    useEffect(() => {
        fetch(`http://127.0.0.1:8081/companies`,{
            method: "GET"
        }).then(res => res.json()).then(data => {
            setCompaines(data.map((item) => {
                if (item["is_landlord"] == false){
                    return(
                        <MenuItem key={item.name} value={item.id}> 
                            {item.name}
                        </MenuItem> 
                    )
                }
            }))
        })
    },[])


    function addSensor(event){
        event.preventDefault()
        fetch(`http://127.0.0.1:8081/buildings/${props.building_id}/floors/${props.floor}/rooms`, { //post a new user to the API for verification.
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization' : `Basic ${JSON.parse(localStorage.getItem("USER")).token}`
            },
        body: JSON.stringify(
            {
                name: formData.name,
                number: parseInt(formData.number),
                size: parseInt(formData.size),
                company_id: parseInt(formData.company),
                floor_id: props.floor
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
        number: "",
        size: "",
        company: ""
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
        <DialogTitle>Add a new Room to Floor {props.floor}</DialogTitle>
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
                            type="text"
                            label="number"
                            name="number"
                            onChange={handleChange}
                            value={formData.number}
                            className="name"
                            defaultValue = ""
                        />
                    </div>

                    <div className="form-element">     
                        <TextField
                            type="text"
                            label="size"
                            name="size"
                            onChange={handleChange}
                            value={formData.size}
                            className="name"
                            defaultValue = ""
                        />
                    </div>

                    <div className="form-element">    
                        <TextField
                                type="text"
                                label="company"
                                name="company"
                                select
                                onChange={handleChange}
                                value={formData.company}
                                className="name"
                                defaultValue = ""
                        >
                            {companies}
                        </TextField>
                    </div>
                </form>
            </DialogContentText>
        </DialogContent>
    <DialogActions>
    <Button variant="contained" color="error" onClick={props.close}>Cancel</Button>
    <Button variant="contained" color="primary" onClick={addSensor}>Add Room</Button>

    </DialogActions>

  </div>
    )
}