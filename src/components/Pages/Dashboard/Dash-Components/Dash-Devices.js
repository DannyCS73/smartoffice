import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useNavigate} from "react-router-dom";

export default function DevicesWidget(props){

    let navigate = useNavigate(); 

    function navToSensorsPage(){
      navigate('/sensors' , {state:{
        id: props.company_id
    }})
    }

    return(    
        <div onClick={navToSensorsPage} >
        <Card className="widget" sx={{ minWidth: 275 }} 
                style={{"backgroundImage": "url(/assets/sensor.png)" , 
                        "backgroundSize": "150px",  
                        "backgroundRepeat": "no-repeat", 
                        "backgroundPosition": "110% 170%"}}>
        <CardContent >
            <div className="widget-title">
                <Typography variant="h4">
                    Sensors
                </Typography>
   
            </div>
          <Typography variant="h1" style={{'cursor': 'pointer'}}>
            {props.num}
          </Typography>
        </CardContent>
      </Card> 
      </div>

    )
}