import { CREATE_ERROR_MESSAGES,CREATE_MESSAGES } from './types';


export const createMessages = msg => {
    return {
        type: CREATE_MESSAGES,
        payload: msg
    }            
}

export const createErrorMessages = error => {
    return {
        type: CREATE_ERROR_MESSAGES,
        payload: error
    }
            
}