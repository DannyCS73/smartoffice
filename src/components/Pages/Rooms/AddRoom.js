import React, { useEffect } from "react";

import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { MenuItem } from "@mui/material";




export default function AddRoom(props){
    

    const [rooms, setRooms] = React.useState()
    const [floors, setFloors] = React.useState()
    const [isBuilding, setIsBuilding] = React.useState(false)



    useEffect(() => {
        fetch(`http://127.0.0.1:8081/buildings`, {
            method: "GET"
        }).then(res => res.json()).then(data => {
            setRooms(data.map((item) => (
                <MenuItem key={item.name} value={item.id}> 
                    {item.name}
                </MenuItem> 
                )))
        })
    },[])


    function addRoom(event){
        event.preventDefault()
        fetch(`http://127.0.0.1:8081/buildings/${formData.building}/floors/${formData.floor_id}/rooms`, { //post a new user to the API for verification.
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + JSON.parse(localStorage.getItem("USER")).token
            },
        body: JSON.stringify(
            {
                name: "placeholder",
                floor_id: formData.floor_id,
                company_id: JSON.parse(localStorage.getItem('USER')).company_id,
                size: formData.size
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
        
            // props.setRefresh(true)
        }


    const [formData, setFormData] = React.useState({
        building : "",
        floor_id: "",
        size: "",
    })


    function handleBuildingChange(event){ //update form data as it is changed.
        const {name, value} = event.target
        setFormData(prevFormData =>{
            return  {
                ...prevFormData,
                [name] : value
            }
        })
        setIsBuilding(true)
        fetch(`http://127.0.0.1:8081/buildings/${value}/floors`, {
            method:"GET"
        }).then(res => res.json()).then(data => {
            setFloors(data.map((item) => (
                <MenuItem key={item.name} value={item.id}> 
                    {item.name}
                </MenuItem> 
                )))
        })

    }

    function handleChange(event){
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
        <DialogTitle>Add a new room</DialogTitle>
          <DialogContent>
            <DialogContentText>
            <form className="form">
             <div className="form-element">    
                <TextField
                        type="text"
                        label="Building ID"
                        name="building"
                        select
                        onChange={handleBuildingChange}
                        value={formData.building}
                        className="roomID"
                        defaultValue = ""
                >
                    {rooms}
                </TextField>

            </div>
            </form>

            {isBuilding && <form>
            <div className="form-element">    
                <TextField
                        type="text"
                        label="Floor id"
                        name="floor_id"
                        select
                        disabled={false}
                        onChange={handleChange}
                        value={formData.floor}
                        className="roomID"
                        defaultValue = ""
                >
                    {floors}
                </TextField>

            </div>

            <div className="form-element">    
                <TextField
                        type="text"
                        label="Size"
                        name="size"
                        onChange={handleChange}
                        value={formData.size}
                        className="roomID"
                        defaultValue = ""
                >

                </TextField>
            </div>
            </form>}
            </DialogContentText>
        </DialogContent>
    <DialogActions>
    <Button variant="contained" color="error" onClick={props.close}>Cancel</Button>
    <Button variant="contained" color="primary" onClick={addRoom}>Add Room</Button>

    </DialogActions>

  </div>
    )
}