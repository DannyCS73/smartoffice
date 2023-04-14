import React from "react";
import { Box } from "@mui/system";
import { Card, CardContent, Typography } from "@mui/material";


export default function Transaction(){
    return (
        <div className="transaction">
            <Card sx={{ minWidth: 275 }}>
            <CardContent>
                <Typography variant="h5" component="h2">
                    Block Mined
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="green">
                    Incoming
                </Typography>
                <Typography variant="body2">
                    10 tokens
                </Typography>
                <Typography variant="body2">
                    Date mined: 10/12/22
                </Typography>
            </CardContent>
            </Card>
        </div>
      );
    }