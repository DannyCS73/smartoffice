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


export default function TopBar(props){

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sensorOpen, setSensorOpen] = React.useState()
  const [userOpen, setUserOpen] = React.useState()


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

  function handleNewUserOpen(){
    setUserOpen(true)
  }

  function handleNewUserClose(){
    setUserOpen(false)
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
             {props.title === "Clients" && <MenuItem onClick={handleNewUserOpen}>{props.addTitle}</MenuItem>}
          </Menu>

         {props.title === "Sensors" &&  <Dialog open={sensorOpen} onClose={handleNewSensorClose} fullwidth >
             <AddSensor 
              close = {handleNewSensorClose}
              setRefresh={props.setRefresh}
              />
          </Dialog>
          }

        </div> }
      </Toolbar>
    </AppBar>
  );
}