import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

export default function EditWidget(){
    return(    
      <div >
      <Card className="widget" sx={{ minWidth: 275 }} 
              style={{"backgroundImage": "url(/assets/building.png)" , 
                      "backgroundSize": "150px", 
                      "backgroundRepeat": "no-repeat", 
                      "backgroundPosition": "110% 170%"}}>
      <CardContent >
          <div className="widget-title">
              <Typography variant="h4">
                  Buildings
              </Typography>
          </div>
        <Typography variant="h1" style={{'cursor': 'pointer'}}>
          1
        </Typography>
      </CardContent>
    </Card> 
    </div>)
}