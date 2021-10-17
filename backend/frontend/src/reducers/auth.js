import { LOGIN_FAIL,LOGOUT_SUCCESS,LOGIN_SUCCESS,USER_LOADED_FAIL,
        USER_LOADED_SUCCESS,AUTHENTICATION_SUCCESS,AUTHENTICATION_FAIL,
        VERIFY_PHONE_SUCCESS,LOGIN_PHONE_SUCCESS,LOGIN_PHONE_FAIL,
        SET_ISLOADING_FALSE,SET_ISLOADING_TRUE } from "../actions/types";

const initialState = {
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    isAuthenticated: false,
    user: null,
    code: null,
    isLoading: false,
    isPhoneWrited:false
}

const auth = (state = initialState, action) => {
   switch (action.type){
        case SET_ISLOADING_FALSE:
            return {
                ...state,
                isLoading: false
            }
        case SET_ISLOADING_TRUE:
            return {
                ...state,
                isLoading: true
            }
        case VERIFY_PHONE_SUCCESS:
            localStorage.setItem('access',action.payload.access);
            localStorage.setItem('refresh', action.payload.refresh);
            console.log(action.payload)
            return {
                ...state,
                isAuthenticated:true,
                access: action.payload.access,
                refresh:action.payload.refresh,
            }
        case LOGIN_FAIL:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                isAuthenticated:false,
                access: null,
                refresh:null,
                user: null,
            }
        case LOGIN_PHONE_SUCCESS:
            return {
                ...state,
                isPhoneWrited: true,
            }
        case LOGOUT_SUCCESS:
            localStorage.removeItem('access');
            localStorage.removeItem('refresh');
            return {
                ...state,
                access: null,
                refresh: null,
                isAuthenticated: false,
                user: null,
                code: null,
                isPhoneWrited:false
            }
        case LOGIN_PHONE_FAIL:
            return {
                ...state,
                isPhoneWrited: false,
            }
        case LOGIN_SUCCESS:
            localStorage.setItem('access',action.payload.access);
            localStorage.setItem('refresh', action.payload.refresh);
            return {
                ...state,
                isAuthenticated:true,
                access: action.payload.access,
                refresh:action.payload.refresh,
            }
        case USER_LOADED_SUCCESS:
            return {
                ...state,
                user:action.payload
            }
        case AUTHENTICATION_SUCCESS:
            return {
                ...state,
                isAuthenticated: true
            }
        case AUTHENTICATION_FAIL:
            return {
                ...state,
                isAuthenticated: false
            }
        case USER_LOADED_FAIL:
            return {
                ...state,
                user:null
            }   
       

        default:
            return state
   }
}

export default auth;