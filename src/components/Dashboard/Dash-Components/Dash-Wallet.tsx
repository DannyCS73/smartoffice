import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button } from "@mui/material";

export default function WalletWidget(){
    return(    
    <Card sx={{ maxWidth: 345 }}>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            Devices
          </Typography>
        </CardContent>
      </Card>)
}