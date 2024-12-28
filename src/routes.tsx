import { Route, Routes } from "react-router-dom";
import React from "react";
// Route Views
import TabPanel from './views/employeeTab'
import ViewEmployeeTable from './../src/views/viewEmployeeTable';
import AddEmployeeTable from './../src/views/addEmployee';
import EditEmployeeTable from './../src/views/editEmployee';


export default function RouterPage() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<TabPanel />} />
        <Route path="/viewEmployee" element={<ViewEmployeeTable />} />
        <Route path="/addEmployee" element={<AddEmployeeTable />} />
        <Route path="/editEmployee" element={<EditEmployeeTable />} />
      </Routes>
    </div>
  )
}
