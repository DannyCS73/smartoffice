import React from "react";
import { Card, CardMedia, CardContent, Typography, CardActions, Button, Box} from "@mui/material";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { useDemoData } from '@mui/x-data-grid-generator';

export default function FloorsWidget(){

    const { data } = useDemoData({
        dataSet: 'Commodity',
        rowLength: 5,
        maxColumns: 6,
      });

    return(    
    <Card sx={{ maxWidth: 345 }}>
        <CardContent>        <Typography sx={{fontSize: 20}}> Floors </Typography>
     <div style={{ height: 400, width: '100%' }}>
      <div style={{ display: 'flex', height: '100%' }}>
        <div style={{ flexGrow: 1 }}>
          <DataGrid {...data} />
        </div>
      </div>
    </div>
        </CardContent>
      </Card>)
}