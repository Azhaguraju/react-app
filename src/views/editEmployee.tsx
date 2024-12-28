import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { updateEmployee } from '../redux/actions/onboardEmployeeAction'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';

export default function EditEmployee() {

    const dispatch: any = useDispatch();

    const navigate = useNavigate();

    var employeeupdate: any = {}

    employeeupdate = useSelector(
        (state: any) => state.employeedata.getEmployeeDetails
    );
    console.log("employee update", employeeupdate)


    const [employeedetails, setEmployeeDetails] = useState({
        name: employeeupdate.name,
        email: employeeupdate.email,
        phoneno: employeeupdate.phoneno,
        gender: employeeupdate.gender
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setEmployeeDetails({ ...employeedetails, [name]: value });
        console.log("hiii", employeedetails)
        // setState((prevProps) => ({
        //     ...prevProps,
        //     [name]: value
        // }));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log("update details", employeedetails);
        console.log("update id", employeeupdate._id);
        dispatch(updateEmployee(employeeupdate._id, employeedetails));
        alert("Employee Updated Successfully");
        navigate("/");
    };

    const handleCancel: any = () => {
        navigate("/");
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="add-employee">

                <Grid className="info-form">
                    <Grid container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="flex-start"
                        className="employee-filed">
                        <Grid item md={12}><h5>Update Employee Details for : {employeeupdate.name}</h5></Grid>
                        <Grid item md={6}>
                            <TextField
                                required
                                label="Name"
                                name="name"
                                defaultValue={employeedetails.name}
                                value={employeedetails.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                required
                                label="Email"
                                name="email"
                                defaultValue={employeedetails.email}
                                value={employeedetails.email}
                                onChange={handleInputChange}
                            />
                        </Grid>
                    </Grid>
                    <Grid container
                        direction="row"
                        justifyContent="space-evenly"
                        alignItems="flex-start"
                        className="employee-filed">
                        <Grid item md={6}>
                            <TextField
                                required
                                label="Phone number"
                                name="phoneno"
                                defaultValue={employeedetails.phoneno}
                                value={employeedetails.phoneno}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item md={6}>
                            {/* GENDER */}
                            <FormControl>
                                <FormLabel id="gender">Gender</FormLabel>
                                <RadioGroup
                                    row
                                    name="gender"
                                    defaultValue={employeedetails.gender}
                                    value={employeedetails.gender}
                                    onChange={handleInputChange}
                                >
                                    <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                    <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                    <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                </RadioGroup>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid container
                    direction="row"
                    alignItems="flex-start"
                    className="employee-filed">
                    <Grid >
                        <Button variant="contained" color="primary" type="submit">
                            Update Employee
                        </Button>
                        <Button variant="contained" color="primary" onClick={handleCancel}>
                            Cancel
                        </Button>
                    </Grid>
                </Grid>
            </div>
        </form>
    );
}
