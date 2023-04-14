import { Button, Divider, Modal, Typography, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import MuiGrid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddBuilding from './addBuilding';
import Dialog from '@mui/material/Dialog';
import AddFloors from './addFloors';
import AddRooms from './addRooms';

import './Table.css'
import { idID } from '@mui/material/locale';


export default function LandlordTable(){

    const [buildings, setBuildings] = useState()
    const [floors, setFloors] = useState([])
    const [showFloors, setShowFloors] = useState(false)
    const [rooms, setRooms] = useState([])
    const [showRooms, setShowRooms] = useState(false)
    const [display, setDisplay] = useState()
    const [open, setOpen] = useState(true);
    const handleClose = () => setDisplay();
    const [floorsDisplay, setFloorsDisplay] = useState()
    const [roomsDisplay, setRoomsDisplay] = useState()
    
    const[buildingButtonState, setBuildingButtonState] = useState(-1)

    const [disabled, setDisabled] = useState(JSON.parse(localStorage.getItem("USER")).is_admin)

    const style = {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
        };



    const [buildingOpen, setBuildingOpen] = React.useState()
    function handleNewBuildingOpen(){
        setBuildingOpen(true)
        
    }

    function handleNewBuildingClose(){
        setBuildingOpen(false)
    }


    const [floorsOpen, setFloorsOpen] = React.useState()
    function handleNewFloorsOpen(){
        setFloorsOpen(true)
        
    }

    function handleNewFloorsClose(){
        setFloorsDisplay()
    }

    const [roomOpen, setRoomOpen] = React.useState()
    function handleNewRoomOpen(){
        setFloorsOpen(true)
        
    }

    function handleNewRoomClose(){
        setRoomsDisplay()
    }


    useEffect(() => {
        fetch(`http://127.0.0.1:8081/landlords/${JSON.parse(localStorage.getItem("USER")).company_id}/buildings`, {
            method: "GET"
        }).then(res => res.json()).then(data => {
            setBuildings(data.map((item, index) => {
                return(
                   <Button sx={{marginTop:2}} className="b-button" variant="contained" onClick={() => onBuildingClick(index, item.id, item.name)} color={buildingButtonState === index ? 'primary' : 'primary'}>{item.name}</Button>
                )
            }))
        }).then(() => {
            setBuildings(prev => [...prev,  <Button sx={{marginTop:2}} disabled={!disabled} className="b-button" variant="contained" onClick={handleNewBuildingOpen} color="primary"><AddCircleOutlineIcon/></Button>])
        })
    },[])

    function onBuildingClick(index, id, name){
        setBuildingButtonState(index)
        setRooms([])
        fetch(`http://127.0.0.1:8081/buildings/${id}/floors`, {
            method: "GET",
            headers: {
                'Authorization' : `Basic ${JSON.parse(localStorage.getItem("USER")).token}`
            }
            
        }).then(res => res.json()).then(data => {
            setFloors(data.map((item) => {
                return(
                    <Button sx={{marginTop:2}} className="b-button" variant="contained" onClick={() => onFloorClick(id, item.id)} color="primary">{item.name}</Button>
                )
            }))

        }).then(() => {
            setFloors(prev => [...prev,  <Button variant="contained" disabled={!disabled}  sx={{marginTop:2}} className="b-button" onClick={() => handleAddFloor(id, name)} color="primary"><AddCircleOutlineIcon/></Button>])
        })
    }

    function handleAddFloor(building_id, name ){
        setFloorsDisplay(
            <Dialog open={true} onClose={handleNewFloorsClose} fullwidth >
                <AddFloors
                close = {handleNewFloorsClose}
                id = {building_id}
                name = {name}
                />
            </Dialog>
        )
    }

    function onFloorClick(building_id,id,button_id){
        fetch(`http://127.0.0.1:8081/buildings/${building_id}/floors/${id}/rooms`, {
            method: "GET",
            headers: {
                'Authorization' : `Basic ${JSON.parse(localStorage.getItem("USER")).token}`
            }
            
        }).then(res => res.json()).then(data => {
            setRooms(data.map((item) => {
                return(
                    <Button sx={{marginTop:2}} className="b-button"variant="contained" onClick={() => onRoomClick(building_id, id, item.id)} color="primary">{item.name}</Button>
                )
            }))
        }).then(() => {
            setRooms(prev => [...prev,  <Button sx={{marginTop:2}} disabled={!disabled} className="b-button" variant="contained" onClick={() => {handleAddRoom(building_id, id)}} color="primary"><AddCircleOutlineIcon/></Button>])
        })
    }

    function handleAddRoom(building_id, floor_id){
        setRoomsDisplay(
            <Dialog open={true} onClose={handleNewRoomClose} fullwidth >
                <AddRooms
                    close = {handleNewRoomClose}
                    building_id = {building_id}
                    floor = {floor_id}
                />
            </Dialog>
        )
    }

    


    function onRoomClick(building_id, floor_id, id){
        fetch(`http://127.0.0.1:8081/buildings/${building_id}/floors/${floor_id}/rooms/${id}`, {
            method: "GET",
            headers: {
                'Authorization' : `Basic ${JSON.parse(localStorage.getItem("USER")).token}`
            }
        }).then(res => res.json()).then(data => {
            setDisplay(
                <Modal
                open= {open}
                onClose={handleClose}
                >
                <Box sx={style} >
                    <Typography  variant="h6" component="h2">
                    {data.name}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                    Company Occupying room : {data.company.name}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                    Sensors : {data.sensors.length}
                    </Typography>
                    <Typography sx={{ mt: 2 }}>
                    Size : {data.size}
                    </Typography>
                    <Button variant="contained" color="primary" onClick={handleClose}>Close</Button>
                </Box>
                </Modal>
            )
        })
    }


return (
    <div style={{ display: "flex", marginLeft:"1vw", marginTop:"1vh"}}>
        <div className='column'>
            {buildings}
        </div>
        <div className='column'>
            {floors}
        </div>
        <div className='column'>
            {rooms}
        </div>
        {display}
        {floorsDisplay}
        {roomsDisplay}
        <Dialog open={buildingOpen} onClose={handleNewBuildingClose} fullwidth >
             <AddBuilding
                close = {handleNewBuildingClose}
                id = {2}
              />
        </Dialog>
    </div>
);
}