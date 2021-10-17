import { CREATE_MESSAGES,CREATE_ERROR_MESSAGES } from "../actions/types";

const initialState = {
    errors: [],
    messages: []
}

const messages = (state = initialState, action) => {
   switch (action.type){
       case CREATE_MESSAGES:
           return {
               ...state,
               messages: action.payload
           }
        case CREATE_ERROR_MESSAGES:
            return {
                ...state,
                errors: action.payload
        }
        default:
            return state
   }
}

export default messages;