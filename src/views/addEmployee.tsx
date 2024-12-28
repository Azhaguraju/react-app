import React, { useState } from "react";
import { Button, Grid } from "@material-ui/core";
import { createEmployee } from '../redux/actions/onboardEmployeeAction'
import { useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from "react-router-dom";

export default function AddEmployee() {

    const dispatch: any = useDispatch();

    const navigate = useNavigate();

    const [state, setState] = useState({
        name: "",
        email: "",
        phoneno: "",
        gender: ""
    });

    const handleInputChange = (event: any) => {
        const { name, value } = event.target;
        setState((prevProps) => ({
            ...prevProps,
            [name]: value
        }));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        console.log(state);
        dispatch(createEmployee(state));
        alert("Employee Added Successfully");
        navigate("/viewEmployee");
    };

    const handleCancel: any = () => {
        navigate("/viewEmployee");
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
                        <Grid item md={6}>
                            <TextField
                                required
                                label="Name"
                                name="name"
                                value={state.name}
                                onChange={handleInputChange}
                            />
                        </Grid>
                        <Grid item md={6}>
                            <TextField
                                required
                                label="Email"
                                name="email"
                                value={state.email}
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
                                value={state.phoneno}
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
                                    value={state.gender}
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
                            Add Employee
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
