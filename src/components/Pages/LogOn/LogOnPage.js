import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Typography } from '@mui/material';
import base64 from 'react-native-base64'
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: '50px',
  },
  box: {
    border: '1px solid #ccc',
    borderRadius: '5px',
    padding: '20px',
    width: '600px',
  },
  form: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  textField: {
    margin: '10px',
    flex: 1,
  },
  button: {
    margin: '10px',
  },
}));

export default function LogOnPage() {
  const classes = useStyles();
  const[formData, setFormData]= React.useState({
    username: "",
    password: ""
})
let navigate = useNavigate();

function handleChange(event){
    const {name, value} = event.target
    setFormData(prevFormData =>{
        return  {
        ...prevFormData,
        [name] : value
    }
    })
}

function handleSubmit(event){
  event.preventDefault()
  fetch("http://127.0.0.1:8081/login", {
      method: 'POST',
      headers:{
          'Authorization': 'Basic ' + base64.encode(formData.username + ":" + formData.password)
      }
  }).then(res => {
      if(!res.ok){
          throw Error("Invalid username or password")
      }
      return res.json()
      })
  .then(data => {
      localStorage.setItem("USER", JSON.stringify(data))
      navigate('/dashboard')
      
  })
}

  return (
    <div className={classes.container}>
      <Typography variant="h2">Smart Office</Typography>
      <div className={classes.box}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <TextField
            id="username"
            name="username"
            label="Client ID"
            onChange={handleChange}
            value={formData.username}
          />
          <TextField
            id="password"
            name="password"
            label="Password"
            type="password"
            onChange={handleChange}
            value={formData.password}
            className={classes.textField}
          />
          <Button

            variant="contained"
            color="primary"
            type="submit"
            className={classes.button}
          >
            Log In
          </Button>
        </form>
      </div>
    </div>
  );
}
