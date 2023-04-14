import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './Table.css'; // import the css file
import { IoTrashBinSharp } from "react-icons/io5";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle';
import ErrorPopup from '../ErrorPopup';

// placeholder data
function SensorsTable(props) {
  const loc = useLocation()
  const [data, setData]  = useState([])
  const [tableData, setTableData] = useState();
  const [del, setDel] = useState();
  const [item, setItem] = useState({
    name: "",
    id: ""
  });
  const[col,setCol] = useState()

  const [display, setDisplay] = useState()
  const [apiError, setAPIError] = useState() 
  const [errorMsg, setErrorMsg] = useState()

  function handleDelOpen(){
    setDel(true)
  }

  function handleDelClosed(){
    setDel(false)
  }

  function handleDelete(n, i){
    handleDelOpen()
    setItem(prevItem => {
      return {
        name: n,
        id: i
      }
    })
  }


  function handleSensorDelete(){
    var msg = ""
    fetch(`http://127.0.0.1:8081/sensors/${item.id}`,{
      method: "DELETE",
      headers: {
        'Authorization' : `Basic ${JSON.parse(localStorage.getItem("USER")).token}`
      }
    }).then(res => {
      if(!res.ok) {
          return res.text().then(text => { throw new Error(text) })
      }
      else {
          return res.json();
      }}).then(data => {
      props.setRefresh(true)
    }).catch(err => {
      msg = JSON.parse(err["message"])
      setErrorMsg(<ErrorPopup severity={"error"} message={msg["message"]} />)
    })
  }


  function getActivity(id){
    return fetch(`http://127.0.0.1:8081/sensors/${id}`, {
      method: "GET",
      headers: {
        'Authorization' : `Basic ${JSON.parse(localStorage.getItem("USER")).token}`
      }
    }).then(res => res.json()).then(data => {
       return data.status
    }).catch(err => {
      setAPIError(true)
      setErrorMsg(String(err))
  })
  }


  function setTable(){
    fetch(`http://127.0.0.1:8081/companies/${loc.state.id}/sensors`, {
      method: "GET",
      headers: {
        'Authorization' : `Basic ${JSON.parse(localStorage.getItem("USER")).token}`
      }
    }).then(res => res.json()).then(data => {
      setData(data)
      Promise.all(data.map(item => getActivity(item.id)))
        .then(results => {
          setTableData(data.map((item, index) => {
            const status = results[index]
            var c = "success"
            
            if (status == "active") {
              c = "success"
            }else if (status == "not available"){
              c = "primary"
            } else {
              c = "error"
            }

        return (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td>{item.unit}</td>
            <td>{item.mqtt_topic}</td>
        
            <td><CircleIcon color={c}/></td>
            <td onClick={() => handleDelete(item.name, item.id)} style={{ cursor: "pointer" }}>
              <IoTrashBinSharp />
            </td>
          </tr>
        )}))}
      )
    }
    ).catch(err => {
      setAPIError(true)
      setErrorMsg(String(err))
  })
  }


    useEffect(() => {
      setTable()
  },[props.refresh])



  // state variables
  const [searchTerm, setSearchTerm] = useState('');


  // handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    console.log(filteredData)
  }

  // render component
  return (
    <div className="Table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Unit</th>
            <th>MQTT Topic</th>
            <th>Current Status</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {tableData}
        </tbody>
      </table>


      <Dialog open={del} onClose={handleDelClosed} fullwidth >
        <DialogTitle>Are you sure you want to delete: {item.name} </DialogTitle>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleDelClosed}>Back</Button>
          <Button variant="contained" color="error" onClick={handleSensorDelete}>Delete</Button>
        </DialogActions>
        {errorMsg}

      </Dialog>
    </div>
  );
}


export default SensorsTable;
