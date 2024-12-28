import React, { useState, Fragment } from "react";
import { Button, Grid, Typography } from "@material-ui/core";
import { useDispatch } from 'react-redux'
import TextField from '@mui/material/TextField';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Autocomplete from '@mui/material/Autocomplete';

export default function FormExample() {

    const navigate = useNavigate();

    const phoneRegExp: any = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/

    const validationSchema = Yup.object().shape({
        firstname: Yup.string()
            .required('Firstname is required')
            .min(6, 'Firstname must be at least 6 characters')
            .max(20, 'Firstname must not exceed 20 characters'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        phoneno: Yup.string()
            .required('Phone no is required')
            .matches(phoneRegExp, 'phone no is invalid, please enter numbers'),
        selectage: Yup.string()
            .required('Age is required'),
        gender: Yup.string()
            .required('Gender is required'),
        acceptTerms: Yup.bool().oneOf([true], 'Accept Terms is required'),
        selectlanguage: Yup.string().required('At least one language is required'),        
    });

    const {
        register,
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data: any) => {
        console.log(JSON.stringify(data));
    };

    const handleCancel: any = () => {
        navigate("/viewEmployee");
    }

    //dropdown
    const [age, setAge] = React.useState<string | number>('');
    const [open, setOpen] = React.useState(false);

    const handleChange = (event: SelectChangeEvent<typeof age>) => {
        setAge(event.target.value);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    //autocomplete
    const languageList = [
        {
            label: 'English',
            value: 'English'
        },
        {
            label: 'Tamil',
            value: 'Tamil'
        },
        {
            label: 'Japanesh',
            value: 'Japanesh'
        },
        {
            label: 'Hindi',
            value: 'Japanesh'
        }
    ]

    return (
        <Fragment>
            <form>
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
                                    id="firstname"
                                    {...register('firstname')}
                                    error={errors.firstname ? true : false}
                                />
                                <Typography variant="inherit" className="errormsg">
                                    {errors.firstname?.message}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <TextField
                                    required
                                    label="Email"
                                    id="email"
                                    {...register('email')}
                                    error={errors.email ? true : false}
                                />
                                <Typography variant="inherit" className="errormsg">
                                    {errors.email?.message}
                                </Typography>
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
                                    {...register('phoneno')}
                                    error={errors.phoneno ? true : false}
                                />
                                <Typography variant="inherit" className="errormsg">
                                    {errors.phoneno?.message}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <FormControl sx={{ m: 1, minWidth: 120 }}>
                                    <InputLabel id="age">Age</InputLabel>
                                    <Select
                                        {...register("selectage")}
                                        error={errors.selectage ? true : false}
                                        labelId="selectage"
                                        id="selectage"
                                        open={open}
                                        onClose={handleClose}
                                        onOpen={handleOpen}
                                        value={age}
                                        label="Age"
                                        onChange={handleChange}
                                    >
                                        <MenuItem value="">
                                            <em>None</em>
                                        </MenuItem>
                                        <MenuItem value={10}>Ten</MenuItem>
                                        <MenuItem value={20}>Twenty</MenuItem>
                                        <MenuItem value={30}>Thirty</MenuItem>
                                    </Select>
                                </FormControl>
                                <Typography variant="inherit" className="errormsg">
                                    {errors.selectage?.message}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="flex-start"
                            className="employee-filed">
                            <Grid item md={6}>
                                <FormControlLabel
                                    {...register('acceptTerms')}
                                    id="acceptTerms"
                                    control={
                                        <Checkbox
                                        />}
                                    label="I have read and agree to the Terms" />
                                <Typography variant="inherit" className="errormsg">
                                    {errors.acceptTerms?.message}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>
                                <FormControl>
                                    <FormLabel id="gender">Gender</FormLabel>
                                    <RadioGroup
                                        row
                                        id="gender"
                                        {...register('gender')}
                                    // error={errors.gender ? true : false}
                                    >
                                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="Other" control={<Radio />} label="Other" />
                                    </RadioGroup>
                                </FormControl>
                                <Typography variant="inherit" className="errormsg">
                                    {errors.gender?.message}
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid container
                            direction="row"
                            justifyContent="space-evenly"
                            alignItems="flex-start"
                            className="employee-filed">
                            <Grid item md={6}>
                                <Autocomplete
                                    disablePortal
                                    id="autocomplete"
                                    options={languageList}
                                    sx={{ width: 400 }}
                                    renderInput={(params) => <TextField {...params}
                                        {...register('selectlanguage')}
                                        error={errors.selectlanguage ? true : false}
                                        label="Select Language" />}
                                />
                                <Typography variant="inherit" className="errormsg">
                                    {errors.selectlanguage?.message}
                                </Typography>
                            </Grid>
                            <Grid item md={6}>

                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid container
                        direction="row"
                        alignItems="flex-start"
                        className="employee-filed">
                        <Grid >
                            <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                                Register
                            </Button>
                            <Button variant="contained" color="primary" onClick={handleCancel}>
                                Cancel
                            </Button>
                        </Grid>
                    </Grid>
                </div>
            </form>
        </Fragment>
    );
}
