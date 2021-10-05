import { LOGIN_FAIL,LOGOUT_SUCCESS,LOGIN_SUCCESS,USER_LOADED_FAIL,USER_LOADED_SUCCESS,AUTHENTICATION_SUCCESS,AUTHENTICATION_FAIL,VERIFY_PHONE_SUCCESS,LOGIN_PHONE_SUCCESS,LOGIN_PHONE_FAIL } from "../actions/types";
import { AsyncStorage } from 'react-native';
const initialState = {
    access: AsyncStorage.getItem('access'),
    refresh: AsyncStorage.getItem('refresh'),
    isAuthenticated: false,
    user: null,
    code: null,
    isPhoneWrited:false
}

const auth = (state = initialState, action) => {
   switch (action.type){
        case VERIFY_PHONE_SUCCESS:
            AsyncStorage.setItem('access',action.payload.access);
            AsyncStorage.setItem('refresh', action.payload.refresh);
            console.log(action.payload)
            return {
                ...state,
                isAuthenticated:true,
                access: action.payload.access,
                refresh:action.payload.refresh,
            }
        case LOGIN_FAIL:
            AsyncStorage.removeItem('access');
            AsyncStorage.removeItem('refresh');
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
            AsyncStorage.removeItem('access');
            AsyncStorage.removeItem('refresh');
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
            AsyncStorage.setItem('access',action.payload.access);
            AsyncStorage.setItem('refresh', action.payload.refresh);
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