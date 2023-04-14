import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './Table.css'; // import the css file
import { IoTrashBinSharp } from "react-icons/io5";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import CircleIcon from '@mui/icons-material/Circle';
import { AiFillEdit } from "react-icons/ai";

// placeholder data
function RoomsTable(props) {

    const loc = useLocation()
    const [tableData, setTableData] = useState();
    const [data, setData]  = useState([])

    function setTable(){
        fetch(`http://127.0.0.1:8081/companies/${loc.state.id}/rooms`, {
          method: "GET"
      }).then(res => res.json()).then(data => {
        console.log(data)
        setTableData(data.map((item) => {
            return (
                <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.size}</td>
                    <td>{item.sensors.length}</td>
                </tr>
            )
        }))
      })
    }

    useEffect(() => {
        setTable()
    },[])

    return (
        <div className="Table">
            <table>
                <thead>
                    <tr>
                    <th>ID</th>
                    <th>Location</th>
                    <th>Room Size (m2)</th>
                    <th>Sensor Count</th>
                </tr>
                </thead>
                <tbody>
                    {tableData}
                </tbody>
            </table>
        </div>
    )
}


export default RoomsTable;
