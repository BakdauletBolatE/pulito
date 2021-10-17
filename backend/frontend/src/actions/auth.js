import {    LOGIN_FAIL, 
            LOGIN_SUCCESS, 
            USER_LOADED_FAIL, 
            USER_LOADED_SUCCESS,
            AUTHENTICATION_FAIL,
            AUTHENTICATION_SUCCESS,
            LOGIN_PHONE_FAIL,
            LOGIN_PHONE_SUCCESS,
            VERIFY_PHONE_FAIL,
            VERIFY_PHONE_SUCCESS,
            LOGOUT_SUCCESS,
            SET_ISLOADING_FALSE,SET_ISLOADING_TRUE,
         } from "./types";

import axios from "axios";
import { createErrorMessages } from "./alerts";


const mainURl = "http://127.0.0.1:8000";

export const load_user = () => async dispatch => { 
    if (localStorage.getItem('access')) {
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }

        try {
            const res = await axios.get(`${mainURl}/auth/users/me/`, config);
    
            dispatch({
                type: USER_LOADED_SUCCESS,
                payload: res.data
            })
    
            
        } 
        catch (err) {
            dispatch({
                type: USER_LOADED_FAIL,
            })
        }
    }
    else {
        dispatch({
            type: USER_LOADED_FAIL,
        })
    }
}


export const check_authenticated = () => async dispatch => { 
    if (localStorage.getItem('access')) {
        const config = {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `JWT ${localStorage.getItem('access')}`,
                'Accept': 'application/json'
            }
        }
        try{

            const body = JSON.stringify({token: localStorage.getItem('access')})
            const res = await axios.post(`${mainURl}/auth/jwt/verify/`, body,config);
        
            if (res.data.code !== 'token_not_valid' || res.data.code !== "user_not_found"){
                dispatch({
                    type: AUTHENTICATION_SUCCESS,
                })
            }
            else{
                dispatch({
                    type: AUTHENTICATION_FAIL,
                })
            }
        }
        catch (err) {
            try {
                const body = JSON.stringify({refresh: localStorage.getItem('refresh')})
                const res = await axios.post(`${mainURl}/auth/jwt/refresh/`, body,config);
                
                dispatch({
                    type: LOGIN_SUCCESS,
                    payload: res.data
                })
                dispatch({
                    type: AUTHENTICATION_SUCCESS,
                })
                setTimeout(load_user, 1000)
                
            }
            catch( err) {
                dispatch({
                    type: LOGIN_FAIL,
                })
                dispatch({
                    type: AUTHENTICATION_FAIL,
                })
            }
        }
    }
    else {
        dispatch({
            type: AUTHENTICATION_FAIL,
        })
    }
}



export const logout = () => async dispatch => {
    dispatch({
        type: LOGOUT_SUCCESS,
    })
    
}


export const login = (email, password) => async dispatch => {
    dispatch({type:SET_ISLOADING_TRUE}) 
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password});
    try {
        const res = await axios.post(`${mainURl}/auth/jwt/create/`, body, config);
        dispatch({type:SET_ISLOADING_FALSE}) 
        dispatch({
            type: LOGIN_SUCCESS,
            payload: res.data
        })
       
    } 
    catch (err) {
        dispatch({type:SET_ISLOADING_FALSE}) 
        const arrayData = err.response.data
        dispatch(createErrorMessages(arrayData))
        dispatch({
            type: LOGIN_FAIL,
        })
        
    }
}

export const register = (email, password,re_password,number_phone,name) => async dispatch => { 
    dispatch({type:SET_ISLOADING_TRUE}) 
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({email, password,re_password,number_phone,name});
    try {
        const res = await axios.post(`${mainURl}/auth/users/`, body, config);
        
        dispatch(login(email, password))
       
    } 
    catch (err) {
        const arrayData = err.response.data
        dispatch(createErrorMessages(arrayData))
        dispatch({type:SET_ISLOADING_FALSE}) 
        dispatch({
            type: LOGIN_FAIL,
        })
        
    }
}


export const login_phone = (number_phone) => async dispatch => { 
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({number_phone});
    try {
        const res = await axios.post(`${mainURl}/api/auth-sms/login/`, body, config);

        dispatch({
            type: LOGIN_PHONE_SUCCESS,
            payload: res.data
        })
    } 
    catch (err) {
        dispatch({
            type: LOGIN_PHONE_FAIL,
            payload: err
        })
    }
}


export const register_phone = (number_phone,name) => async dispatch => { 
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({number_phone,name});
    try {
        const res = await axios.post(`${mainURl}/api/auth-sms/register/`, body, config);

        dispatch({
            type: LOGIN_PHONE_SUCCESS,
            payload: res.data
        })
    } 
    catch (err) {
        dispatch({
            type: LOGIN_PHONE_FAIL,
            payload: err
        })
    }
}

export const verify_phone = (number_phone,code) => async dispatch => { 
    const config = {
        headers:{
            'Content-Type': 'application/json'
        }
    }
    const body = JSON.stringify({number_phone,code});
    try {
        const res = await axios.post(`${mainURl}/api/auth-sms/verify/`, body, config);


        dispatch({
            type: VERIFY_PHONE_SUCCESS,
            payload: res.data
        })
        dispatch(load_user())
    } 
    catch (err) {
        dispatch({
            type: VERIFY_PHONE_FAIL,
        })
    }
}

