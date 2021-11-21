import {createStore, combineReducers, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';

import authReducer from './authDuck';
import invoicesReducer from './invoicesDuck';
import contractReducer from './contractDuck';

const rootReducer = combineReducers({
    invoices: invoicesReducer,
    auth: authReducer,
    contract: contractReducer
});

export default function generateStore() {
    return createStore(rootReducer, compose(applyMiddleware(thunk)));
}