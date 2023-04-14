import { Button, Dialog, DialogContentText, DialogTitle , DialogActions} from "@mui/material";
import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";

export default function CreateWallet(props){

    const [open, setOpen] = useState(false)

    function handleOpen(){
        setOpen(true)
    }

    function handleClose(){
        setOpen(false)
    }

    function create(){
        fetch(`http://127.0.0.1:8081/companies/${JSON.parse(localStorage.getItem('USER')).company_id}/wallet`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            }
        }).then(res => res.json()).then(data => {
            console.log(data)
        })
        props.setWallet(true)
        handleClose()
    }


    return (
        <div>
             <Button variant="contained" color="primary" onClick={handleOpen}>Create Company Wallet</Button>
             <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Create Company Wallet</DialogTitle>
                <DialogContentText>
                    <div style={{"margin-left" : "1vw"}}>
                        You can only create a company wallet once, make sure you save your private key in a safe space, if your private key is lost you will not be able to use your company tokens.
                    </div>
                </DialogContentText>
                <DialogActions>
                    <Button variant="contained" color="primary" onClick={create}>Create Wallet</Button>
                    <Button variant="contained" color="error" onClick={handleClose}>Cancel</Button>
                </DialogActions>

             </Dialog>
        </div>
    )
}