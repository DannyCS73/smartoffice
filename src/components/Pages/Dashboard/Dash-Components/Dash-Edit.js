import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function EditWidget(props){

  let navigate = useNavigate(); 

  function navToRoomsPage(){
    navigate('/rooms' , {state:{
      id: props.company_id
  }})
  }


    return(    
      <div onClick={navToRoomsPage}>
      <Card className="widget" sx={{ minWidth: 275 }} 
              style={{"backgroundImage": "url(/assets/building.png)" , 
                      "backgroundSize": "150px", 
                      "backgroundRepeat": "no-repeat", 
                      "backgroundPosition": "110% 170%"}}>
      <CardContent >
          <div className="widget-title">
              <Typography variant="h4">
                  Rooms
              </Typography>
          </div>
        <Typography variant="h1" style={{'cursor': 'pointer'}}>
          {props.num}
        </Typography>
      </CardContent>
    </Card> 
    </div>)
}