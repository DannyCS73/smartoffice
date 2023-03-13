import React, { useState } from 'react';
import './Table.css'; // import the css file

// placeholder data
const data = [
  { ID: 1, CompanyName: 'Xandel', TotalSensors: 123, TotalBlocksMined: 234}
];

function UsersTable() {
  // state variables
  const [searchTerm, setSearchTerm] = useState('');
  const [tableData, setTableData] = useState(data);

  // handle search term change
  const handleSearchTermChange = (event) => {
    setSearchTerm(event.target.value);
    const filteredData = data.filter((item) =>
      item.CompanyName.toLowerCase().includes(event.target.value.toLowerCase())
    );
    setTableData(filteredData);
  };

  // render table rows
  const renderTableRows = () => {
    return tableData.map((item) => (
      <tr key={item.ID}>
        <td>{item.ID}</td>
        <td>{item.CompanyName}</td>
        <td>{item.TotalSensors}</td>
        <td>{item.TotalBlocksMined}</td>
      </tr>
    ));
  };



  // render component
  return (
    <div className="Table">
      <input
        type="text"
        placeholder="Search by company name..."
        value={searchTerm}
        onChange={handleSearchTermChange}
        className="SearchInput"
      />
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Company Name</th>
            <th>Total Sensors</th>
            <th>Total Blocks Mined</th>
          </tr>
        </thead>
        <tbody>{renderTableRows()}</tbody>
      </table>
    </div>
  );
}

export default UsersTable;
