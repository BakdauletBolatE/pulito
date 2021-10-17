import axios from 'axios';
import {SET_ISLOADING_FALSE,SET_ISLOADING_TRUE,
       GET_ORDERS,GET_USER_ORDERS,CHANGE_EXPORTATION_STATUS,CHANGE_CLEAN_STATUS,
       CHANGE_STATUS_DELIVERY,CREATE_ORDER_SUCCESS,CREATE_ORDER_FAIL,GET_ORDER,GET_ORDER_RATE } from './types';
import { createMessages } from './alerts';

const mainUrl = "http://127.0.0.1:8000";

//GET ORDERS

export const getUserOrders = () => dispatch => {
    try {
        dispatch({
            type:SET_ISLOADING_TRUE
        })
        const CONFIG = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        axios.get(mainUrl+'/api/orders-user/',CONFIG)
        .then(res=>{
            dispatch({
                type: GET_USER_ORDERS,
                payload: res.data
            });
            dispatch({
                type:SET_ISLOADING_FALSE,
            })
        })
        .catch( err => {
            dispatch({
                type:SET_ISLOADING_FALSE,
            })
        })
    }
    catch (err) {
        dispatch({
            type:SET_ISLOADING_FALSE,
        })
    }
} 


export const getOrderRatesByFilters = (owner_id,order_id) => dispatch => {
    try {
        dispatch({
            type:SET_ISLOADING_TRUE
        })

        const CONFIG = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        axios.get(mainUrl+`/api/orders-rate?owner=${owner_id}&order=${order_id}`,CONFIG)
        .then(res=>{
            dispatch({
                type: GET_ORDER_RATE,
                payload: res.data
            });
            dispatch({
                type:SET_ISLOADING_FALSE,
            })
        })
        .catch( err => {
            dispatch({
                type:SET_ISLOADING_FALSE,
            })
        })
        

    }
    catch (err) {
        dispatch({
            type:SET_ISLOADING_FALSE,
        })
    }

    

}

export const getOrderById = (id) => dispatch => {
    try {
        dispatch({
            type:SET_ISLOADING_TRUE
        })
        const CONFIG = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        axios.get(mainUrl+'/api/orders/'+id,CONFIG)
        .then(res=>{
            dispatch({
                type: GET_ORDER,
                payload: res.data
            });
            dispatch({
                type:SET_ISLOADING_FALSE,
            })
        })
        .catch( err => {
            dispatch({
                type:SET_ISLOADING_FALSE,
            })
        })
    }
    catch (err) {
        dispatch({
            type:SET_ISLOADING_FALSE,
        })
    }
} 


export const getOrdersById = (id) => dispatch => {

    try {
        dispatch({
            type:SET_ISLOADING_TRUE,
        })
        const CONFIG = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        axios.get(mainUrl+'/api/order-by-status/'+id,CONFIG)
        .then(res => {
            dispatch({
                type: GET_ORDERS,
                payload: res.data
            });
            dispatch({
                type:SET_ISLOADING_FALSE,
            })
        })
        .catch( err => {
            dispatch({
                type:SET_ISLOADING_FALSE,
            })
        })
    }
    catch (err) {
        dispatch({
            type:SET_ISLOADING_FALSE,
        })
    }
    
}

export const createOrder = (data,route) => dispatch => {

    try{
        const CONFIG = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        axios.post(mainUrl+`/api/order-with-user/`,data,CONFIG)
        .then(res => {
            dispatch(
                getOrdersById(route)
            )
            dispatch(
                createMessages( {msg: `Заказ: ${res.data} успешно создан` })
            )
            dispatch(
                { 
                    type: CREATE_ORDER_SUCCESS,
                    payload:res.data 
                }
            )
        })
    }
    catch (err) {
        dispatch({
            type: CREATE_ORDER_FAIL,
        })
    }
    
}

export const changeExportationStatus = (selectId, orderId, name,route) => dispatch => {
    const CONFIG = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }
    axios.patch(mainUrl+`/api/orders/${orderId}/`,{exportationStatus: selectId, shoes_name: []},CONFIG)
    .then(res =>{
        if (parseInt(selectId) === 2) {
            dispatch(
                createMessages( {msg: `Заказ: ${name}: перемещен в корзину Чистку` })
            )
        }        
    
        dispatch({
            type: CHANGE_EXPORTATION_STATUS,
            payload:res.data
        })
    }
    )
}

export const changeCleanStatus = (selectId, orderId, name,route) => dispatch => {
    const CONFIG = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }
    axios.patch(mainUrl+`/api/orders/${orderId}/`,{cleanStatus: selectId, shoes_name: []},CONFIG)
    .then(res =>{
        if (parseInt(selectId) === 2) {
            dispatch(
                createMessages( {msg: `Заказ: ${name}: перемещен в корзину Доставки` })
            )
        }
        dispatch({
            type: CHANGE_CLEAN_STATUS,
            payload:res.data
        })
    }
    )
}



export const changeDeliveryStatus = (selectId, orderId, name,route) => dispatch => {
    const CONFIG = {
        headers:{
            'Content-Type': 'application/json',
            'Authorization': `JWT ${localStorage.getItem('access')}`,
            'Accept': 'application/json'
        }
    }
    axios.patch(mainUrl+`/api/orders/${orderId}/`,{statusDelivery: selectId, shoes_name: []},CONFIG)
    .then(res =>{
        if (parseInt(selectId) === 2) {
            dispatch(
                createMessages( {msg: `Заказ: ${name}: готова` })
            )
        }

        

        dispatch({
            type: CHANGE_STATUS_DELIVERY,
            payload:res.data
        })
    }
    )
}