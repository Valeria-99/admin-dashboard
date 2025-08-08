import React, {useMemo} from 'react';
import {MaterialReactTable} from "material-react-table";
import './DataGrid.css';
import userData from '../../data';

const DataGrid = () => {

    const columns = useMemo(() => [
        {
            accessorKey: "name.firstName",
            header: "First Name",
        },
        {
            accessorKey: "name.lastName",
            header: "Last Name",
        },
        {
            accessorKey: "address",
            header: "Address",
        },
        {
            accessorKey: "city",
            header: "City",
        },
        {
            accessorKey: "state",
            header: "State",
        },
    ], []);

    console.log(userData);



  return (
    <div className="table-container">
        <MaterialReactTable columns = {columns} data={userData}/>
    </div>
  )
}

export default DataGrid;


