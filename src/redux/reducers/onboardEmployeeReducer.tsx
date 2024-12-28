import {
    VIEWEMPLOYEE, DELETEEMPLOYEE,ADDEMPLOYEE,EDITEMPLOYEE,UPDATEEMPLOYEE
} from '../actions/types'

const initialState = {
    getEmployeeData: [],
    deleteEmployee: [],
    addEmployee:{},
    getEmployeeDetails:{},
    updateEmployee:{},
}

export default function (state = initialState, action: any) {
    switch (action.type) {
        case VIEWEMPLOYEE: {
            console.log("VIEWEMPLOYEE", action.payload);
            return {
                ...state,
                getEmployeeData: action.payload,
            }
        }
        case DELETEEMPLOYEE: {
            console.log("DELETEEMPLOYEE", action.payload);
            return {
                ...state,
                deleteEmployee: action.payload,
            }
        }
        case ADDEMPLOYEE: {
            console.log("ADDEMPLOYEE", action.payload);
            return {
                ...state,
                addEmployee: action.payload,
            }
        }
        case EDITEMPLOYEE: {
            console.log("EDITEMPLOYEE", action.payload);
            return {
                ...state,
                getEmployeeDetails: action.payload,
            }
        }
        case UPDATEEMPLOYEE: {
            console.log("UPDATEEMPLOYEE", action.payload);
            return {
                ...state,
                updateEmployee: action.payload,
            }
        }
        default:
            return state;
    }
}