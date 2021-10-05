import {GET_EXPORTATION_LIST, GET_CLEAN_LIST, GET_DELIVERY_LIST, GET_DONE_LIST,SET_ROUTE} from '../actions/types.js';

const initialState = {
    exportationList: [],
    cleanList: [],
    deliveryList: [],
    doneList: [],
    route: ""
}

 const status = (state = initialState, action) => {
   switch (action.type){
       case GET_EXPORTATION_LIST:
           return {
               ...state,
               exportationList: action.payload
        }
        case GET_CLEAN_LIST:
           return {
               ...state,
               cleanList: action.payload
        }
        case GET_DELIVERY_LIST:
           return {
               ...state,
               deliveryList: action.payload
        }
        case GET_DONE_LIST:
           return {
               ...state,
               doneList: action.payload
        }
        case SET_ROUTE:
            return {
                ...state,
                route: action.payload
            }
       default:
           return state;
   }
}

export default status;