import React, { useEffect, useState } from 'react';
import './Table.css'; // import the css file
import { useNavigate, useLocation } from "react-router-dom";

// placeholder data

function UsersTable() {
  // state variables
  const loc = useLocation()
  const [data, setData]  = useState([])
  const [tableData, setTableData] = useState();
  const [searchTerm, setSearchTerm] = useState('');


  useEffect(() => {
    fetch(`http://127.0.0.1:8081/companies/${loc.state.id}/clients`, {
        method: "GET"
    }).then(res => res.json()).then(data => {
      console.log(data)
      setData(data)
      setTableData(data.map((item) => {
        return(
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>{item.name}</td>
      </tr>
      )}))
    })
},[])

  // render component
  return (
    <div className="Table">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>name</th>
          </tr>
        </thead>
        <tbody>{tableData}</tbody>
      </table>
    </div>
  );
}

export default UsersTable;
