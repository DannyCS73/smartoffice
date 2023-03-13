import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";
import {useNavigate} from "react-router-dom";

export default function UserWidget(props){

  let navigate = useNavigate(); 

  function navToUsersPage(){
    navigate('/Users' , {state:{
      id: props.company_id
  }})
  }

  return(    
      <div  onClick={navToUsersPage}  >
      <Card className="widget" sx={{ minWidth: 275 } } 
              style={{"backgroundImage": "url(/assets/user.png)" , 
                      "backgroundSize": "150px", 
                      "backgroundRepeat": "no-repeat", 
                      "backgroundPosition": "110% 170%"}}>
      <CardContent >
          <div className="widget-title">
              <Typography variant="h4">
                  Clients
              </Typography>
          </div>
        <Typography variant="h1" style={{'cursor': 'pointer'}}>
          {props.count}
        </Typography>
      </CardContent>
    </Card> 
    </div>
  )
}