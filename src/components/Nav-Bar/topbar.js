import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddSensor from '../Pages/Sensors/AddSensor';
import Dialog from '@mui/material/Dialog';
import AddRoom from '../Pages/Rooms/AddRoom';


export default function TopBar(props){

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sensorOpen, setSensorOpen] = React.useState()
  const [roomOpen, setRoomOpen] = React.useState()


  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleNewSensorOpen(){
    setSensorOpen(true)
  }

  function handleNewSensorClose(){
    setSensorOpen(false)
  }

  function handleNewRoomOpen(){
    setRoomOpen(true)
  }

  function handleNewRoomClose(){
    setRoomOpen(false)
  }

  

  return (
    <AppBar position="static" color="primary">
      <Toolbar>
       {props.isDashboard ? 
       <Typography variant="h5" comxponent="div" sx={{ flexGrow: 1 }}>
          {props.title} ● {props.name}
        </Typography> 
        : <Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
          {props.title} 
        </Typography> 
        }
      {props.isAddOption && <div>
          <IconButton onClick={handleMenu} color="inherit">
            <AddCircleOutlineIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          > 
             {props.title === "Sensors" && <MenuItem onClick={handleNewSensorOpen}>{props.addTitle}</MenuItem>}
             {props.title === "Rooms" && <MenuItem onClick={handleNewRoomOpen}>{props.addTitle}</MenuItem>}
          </Menu>

         {props.title === "Sensors" &&  <Dialog open={sensorOpen} onClose={handleNewSensorClose} fullwidth >
             <AddSensor 
              close = {handleNewSensorClose}
              setRefresh={props.setRefresh}
              />
          </Dialog>
          }

          {props.title === "Rooms" &&  <Dialog open={roomOpen} onClose={handleNewRoomOpen} fullwidth >
             <AddRoom 
              close = {handleNewRoomClose}
              setRefresh={props.setRefresh}
              />
          </Dialog>
          }

        </div> }
      </Toolbar>
    </AppBar>
  );
}