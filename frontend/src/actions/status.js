import axios from 'axios';
import {GET_EXPORTATION_LIST, GET_CLEAN_LIST, GET_DELIVERY_LIST, GET_DONE_LIST, SET_ROUTE} from '../actions/types.js';

const mainUrl = "http://127.0.0.1:8000";


//GET ORDERS




export const getExportationList = () => async dispatch => {
    const CONFIG = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }
    await axios.get(mainUrl+`/api/order-by-status/1`,CONFIG)
    .then(res => {
        dispatch({
            type: GET_EXPORTATION_LIST,
            payload: res.data
        });
    })
    .catch( err => {console.log("error",err); console.log(CONFIG)})
}
export const getCleanList = () => dispatch => {
    const CONFIG = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }
    axios.get(mainUrl+`/api/order-by-status/2`,CONFIG)
    .then(res => {
        dispatch({
            type: GET_CLEAN_LIST,
            payload: res.data
        });
    })
    .catch( err => console.log(err))
}
export const getDeliveryList = () => dispatch => {
    const CONFIG = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }
    axios.get(mainUrl+`/api/order-by-status/3`,CONFIG)
    .then(res => {
        dispatch({
            type: GET_DELIVERY_LIST,
            payload: res.data
        });
    })
    .catch( err => console.log(err))
}
export const getDoneList = () => dispatch => {
    const CONFIG = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }
    axios.get(mainUrl+`/api/order-by-status/4`,CONFIG)
    .then(res => {
        dispatch({
            type: GET_DONE_LIST,
            payload: res.data
        });
    })
    .catch( err => console.log(err))
}
export const setRoute = (id) => dispatch => {
    dispatch({
        type: SET_ROUTE,
        payload: id
    })
}
