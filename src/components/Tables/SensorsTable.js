import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import './Table.css'; // import the css file
import { IoTrashBinSharp } from "react-icons/io5";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

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
    fetch(`http://127.0.0.1:8081/sensors/${item.id}`,{
      method: "DELETE"
    }).then(res => res.json()).then(data => {
      props.setRefresh(true)
    })
  }

  useEffect(() => {
    fetch(`http://127.0.0.1:8081/companies/${loc.state.id}/sensors`, {
        method: "GET"
    }).then(res => res.json()).then(data => {
      setData(data)
      setTableData(data.map((item) => {

        return(
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
          <td>{item.type}</td>
          <td>{item.unit}</td>
          <td>{item.mqtt_topic}</td>
          <div className="centred">
            <td onClick= {() => handleDelete(item.name, item.id)} style={{"cursor":"pointer"}}>{<IoTrashBinSharp/>}</td>
          </div>
      </tr>
      )}))
    })
},[props.refresh])


  // state variables
  const [searchTerm, setSearchTerm] = useState('');


  // handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredData = data.filter((item) =>
      item.name.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setTableData(filteredData.map((item) => {
      return(
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.type}</td>
            <td>{item.unit}</td>
            <td>{item.mqtt_topic}</td>
            <div className="centred">
              <td onClick= {() => handleDelete(item.name, item.id)} style={{"cursor":"pointer"}}>{<IoTrashBinSharp/>}</td>
            </div>
          </tr>

           )}));
  };

  // render component
  return (
    <div className="Table">
      <input
        type="text"
        placeholder="Search by Sensor name..."
        value={searchTerm}
        onChange={handleSearchTermChange}
        className="SearchInput"
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Unit</th>
            <th>MQTT Topic</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>


      <Dialog open={del} onClose={handleDelClosed} fullwidth >
        <DialogTitle>Are you sure you want to delete: {item.name} </DialogTitle>
        <DialogActions>
          <Button variant="contained" color="primary" onClick={handleDelClosed}>Back</Button>
          <Button variant="contained" color="error" onClick={handleSensorDelete}>Delete</Button>
        </DialogActions>

      </Dialog>



    </div>
  );
}

export default SensorsTable;
