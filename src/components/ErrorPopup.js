import React, { useState } from 'react';
import { Alert } from "@mui/material"

export default function ErrorPopup(props){
    return(
        <Alert severity={props.severity}>{props.message}</Alert>
    )
}