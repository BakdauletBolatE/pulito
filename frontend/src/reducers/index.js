import { combineReducers } from "redux";
import orders from './orders';
import status from './status';
import auth from './auth';
import alerts from './alerts';

export default combineReducers({
    orders,
    status,
    alerts,
    auth,
});