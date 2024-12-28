import axios from 'axios'
import { VIEWEMPLOYEE, ADDEMPLOYEE, DELETEEMPLOYEE, EDITEMPLOYEE, UPDATEEMPLOYEE } from "./types";
import { readJsonConfigFile } from 'typescript';
import { config } from '../../config/config'

export const getEmployeeList = () => (dispatch: any) => {
    console.log("Get Employee List in action");
    axios.get(config.apiRootPath + config.getEmployees).then((res) => {
        console.log("Response Get Employee", res);
        dispatch({
            type: VIEWEMPLOYEE,
            payload: res.data,
        })
    })
}

export const deleteEmployeeList = (employeeId: any) => (dispatch: any) => {
    console.log("Delete Employee List in action", employeeId);
    axios.delete(config.apiRootPath + employeeId)
        .then((res) => {
            console.log("Response Delete Employee", res);
            dispatch({
                type: DELETEEMPLOYEE,
                payload: res.data,
            })
        })
}

export const createEmployee = (employee: any) => (dispatch: any) => {
    console.log("Create Employee List in action", employee);
    const body = JSON.stringify(employee);
    axios.post(config.apiRootPath + config.addEmployee, body, {
        headers: {
            "content-type": "application/json"
        },
    })
        .then((res) => {
            console.log("Response Create Employee", res);
            dispatch({
                type: ADDEMPLOYEE,
                payload: res.data,
            })
        })
}

export const getEmployeeDetails = (employeeId: any) => (dispatch: any) => {
    console.log("Get Employee Details in action", employeeId);
    axios.get(config.apiRootPath + employeeId)
        .then((res) => {
            console.log("Response Get Employee", res);
            dispatch({
                type: EDITEMPLOYEE,
                payload: res.data,
            })
        })
}

export const updateEmployee = (employeeId: any, employeedetails: any) => (dispatch: any) => {
    console.log("Update Employee List in action", employeeId);
    console.log("Update Employee id in action", employeedetails);
    const body = JSON.stringify(employeedetails);
    axios.put(config.apiRootPath + employeeId, { ...employeedetails })
        .then((res) => {
            console.log("Response Update Employee", res);
            dispatch({
                type: UPDATEEMPLOYEE,
                payload: res.data,
            })
        })
}
