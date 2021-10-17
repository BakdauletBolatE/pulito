 import {SET_ISLOADING_FALSE,SET_ISLOADING_TRUE,
        GET_ORDERS,GET_USER_ORDERS,CREATE_ORDER_FAIL,CREATE_ORDER_SUCCESS, 
        CHANGE_STATUS_DELIVERY,CHANGE_EXPORTATION_STATUS,
        CHANGE_CLEAN_STATUS,GET_ORDER,GET_ORDER_RATE} from '../actions/types.js';


 const initialState = {
     orders: [],
     order: null,
     createdOrder: null,
     isLoading: false,
     orderRates: []
 }

 const orders = (state = initialState, action) => {
    switch (action.type){
        case SET_ISLOADING_TRUE:
            return{
                ...state,
                isLoading: true,
            }
        case GET_ORDER_RATE:
            return {
                ...state,
                orderRates: action.payload
            }
        case SET_ISLOADING_FALSE:
            return{
                ...state,
                isLoading: false
            }
        case CREATE_ORDER_SUCCESS:
            return {
                ...state,
                createdOrder: action.payload
            }
        case GET_ORDER:
            return {
                ...state,
                order: action.payload
            }
        case CREATE_ORDER_FAIL:
            return {
                ...state
            }
        case GET_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case GET_USER_ORDERS:
            return {
                ...state,
                orders: action.payload
            }
        case CHANGE_EXPORTATION_STATUS:
            const eId = action.payload.id
            let updatedOrdersEx = state.orders.map(item => 
                {
                  if (item.id === eId){
                    return action.payload //gets everything that was already in item, and updates "done"
                  }
                  return item; // else return unmodified item 
            });
            return {
                ...state,
                orders: updatedOrdersEx
            }
        case CHANGE_CLEAN_STATUS:
            const cId = action.payload.id;
            let updatedOrdersClean = state.orders.map(item => 
                {
                  if (item.id === cId){
                    return action.payload //gets everything that was already in item, and updates "done"
                  }
                  return item; // else return unmodified item 
            });
            return {
                ...state,
                orders: updatedOrdersClean
            }
        case CHANGE_STATUS_DELIVERY:
            const dId = action.payload.id;
            let updatedOrdersDelivery = state.orders.map(item => 
                {
                  if (item.id === dId){
                    return action.payload //gets everything that was already in item, and updates "done"
                  }
                  return item; // else return unmodified item 
            });
            return {
                ...state,
                orders: updatedOrdersDelivery
            }
        default:
            return state;
    }
 }

 export default orders;