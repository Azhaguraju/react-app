import React, { useEffect, useState } from 'react'
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import { useSelector, useDispatch } from 'react-redux';
import { getEmployeeList, deleteEmployeeList, getEmployeeDetails } from '../redux/actions/onboardEmployeeAction';
import {
  DataGrid,
  GridColDef,
  GridApi,
  GridCellValue,
  GridCellParams
} from "@material-ui/data-grid";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions
} from "@material-ui/core";
import { useNavigate } from "react-router-dom";

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 250 },
  { field: 'name', headerName: 'Name', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },
  { field: 'phoneno', headerName: 'Phone No', width: 150 },
  { field: 'gender', headerName: 'Gender', width: 130 },
  {
    field: "edit",
    headerName: "Edit",
    sortable: false,
    width: 130,
    renderCell: () => {
      return (
        <Button variant="contained" color="primary" startIcon={<EditIcon />}>
          Edit
        </Button>
      );
    }
  },
  {
    field: "delete",
    headerName: "Delete",
    sortable: false,
    width: 130,
    renderCell: () => {
      return (
        <Button
          variant="contained"
          color="secondary"
          startIcon={<DeleteIcon />}
        >
          Delete
        </Button>
      );
    }
  }
];

export type Employee = {
  _id: any;
  name: string;
  email: string;
  phoneno: number;
  gender: string;
};

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    display: "flex",
    overflow: "auto",
    flexDirection: "column",
    elevation: 3
  }
}));

export default function ViewEmployeeTable() {

  const dispatch: any = useDispatch();

  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getEmployeeList());
    console.log()
  }, []);

  var employeeLists = []

  employeeLists = useSelector(
    (state: any) => state.employeedata.getEmployeeData
  );
  console.log("employee", employeeLists)

  const classes = useStyles();
  const [selectedUser, setSelectedUser] = useState({} as Employee);
  const [openDialog, setOpenDialog] = useState(false);
  const [optionSelected, setOptionSelected] = useState('');

  function currentlySelected(params: GridCellParams) {
    let value: any = params.colDef.field;
    const api: GridApi = params.api;

    setOptionSelected(value)
    console.log("azhagu", optionSelected);
    const fields = api
      .getAllColumns()
      .map((c) => c.field)
      .filter((c) => c !== "__check__" && !!c);
    const thisRow: Record<string, GridCellValue> = {};

    fields.forEach((f) => {
      thisRow[f] = params.getValue(params.id, f);
    });

    const employee = {} as Employee;
    employee["_id"] = thisRow["_id"]!.toString();
    employee["name"] = thisRow["name"]!.toString();
    employee["email"] = thisRow["email"]!.toString();
    employee["phoneno"] = Number(thisRow["phoneno"]);
    employee["gender"] = thisRow["gender"]!.toString();

    setSelectedUser(employee);
    setOpenDialog(true);

  }

  const handleClose = () => {
    setOpenDialog(false);
  };

  const DeleteEmployee: any = () => {
    console.log("hi deletet function ", selectedUser._id)
    dispatch(deleteEmployeeList(selectedUser._id))
    handleClose();
    alert("Employee Deleted Successfully");
    navigate("/");
  }

  const EditEmployeeDetails: any = () => {
    console.log("hi deletet function ", selectedUser._id);
    dispatch(getEmployeeDetails(selectedUser._id));
    handleClose();
    navigate("/editEmployee");
  }


  return (
    <main>

      <Container maxWidth="lg" className="data-tab-table" >
        <Grid item xs={12}>
          <Paper >
            {employeeLists !== undefined || employeeLists >= 0 ? (
              <DataGrid
                rows={employeeLists}
                columns={columns}
                pageSize={10}
                columnBuffer={8}
                autoHeight
                onCellClick={currentlySelected}
                getRowId={(row: any) => row._id}
              />
            ) : "No employee data"}
          </Paper>
        </Grid>
      </Container>
      {optionSelected === "edit" ? (
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="employee-edit">Employee Edit</DialogTitle>
          <DialogContent>
            <DialogContentText id="employee-edit-description">
              <label>Are you sure want to Edit {JSON.stringify(selectedUser.name)}</label>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={EditEmployeeDetails} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <Dialog
          open={openDialog}
          onClose={handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="employee-delete">Employee Delete</DialogTitle>
          <DialogContent>
            <DialogContentText id="employee-delete-description">
              <label>Are you sure want to Delete {JSON.stringify(selectedUser.name)}</label>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={DeleteEmployee} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      )
      }
    </main >
  );
};
