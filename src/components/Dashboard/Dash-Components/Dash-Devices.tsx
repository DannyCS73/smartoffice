import React from "react";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

export default function DevicesWidget(){
    return(   
        <div className="widget">
        <Card sx={{ minWidth: 275 }} 
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
            15
          </Typography>
        </CardContent>
      </Card> 
      </div>

    )
}