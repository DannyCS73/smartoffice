import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

export default function UserWidget(){
    return(    
    <Card sx={{ maxWidth: 345 }}>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            User
          </Typography>
        </CardContent>
      </Card>)
}