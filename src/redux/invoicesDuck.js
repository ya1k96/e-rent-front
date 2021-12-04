import axios from "axios";
import { config } from "../config";

//CONSTANTES
const initialData = {
    array: [],
    offset: 0,
    one: null,
    isLoading: false
};

const LIST_INVOICES = 'LIST_INVOICES';
const GET_ONE_INVOICE = 'GET_BY_ID';
const START_LOADING = 'START_LOADING';

//REDUCERS
export default function invoiceReducer(state = initialData, action) {
    switch(action.type) {
        case LIST_INVOICES:
            return {...state, array: action.payload.body, isLoading: false};
        case START_LOADING:
            return {...state, isLoading: true};
        case GET_ONE_INVOICE:
            return state;
            // return {...state, array: action.payload.array};
        default: 
            return state;
    }
}

//ACCIONES
export const dashboardInvoices = () => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    dispatch({type: START_LOADING});
    try {
        const res = await axios.get(`${config.URL_SERVER}/invoices/dashboard`,
        {
            headers: {
              'Authorization': `Bearer ${JSON.parse(token)}` 
            }
          });
        dispatch({
            type: LIST_INVOICES,
            payload: res.data
        });
    } catch (error) {
        
    }
}