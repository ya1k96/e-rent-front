import axios from "axios";
import { config } from "../config";

//CONSTANTES
const initialData = {
    array: [],
    offset: 0,
    one: {
        period: '',
        expiration: '',
        contract_id: {
            name: '', surname: ''
        }
    },
    isLoading: false,
    isSuccess: null
};

const LIST_INVOICES = 'LIST_INVOICES';
const GET_ONE_INVOICE = 'GET_BY_ID';
const START_LOADING = 'START_LOADING';

//REDUCERS
export default function invoiceReducer(state = initialData, action) {
    switch(action.type) {
        case LIST_INVOICES:
            return {...state, array: action.payload, isLoading: false};
        case START_LOADING:
            return {...state, isLoading: true};
        case GET_ONE_INVOICE:
            return {...state, one: action.payload, isLoading: false, isSuccess: true};
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

export const getInvoices = (opts) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    dispatch({type: START_LOADING});
    try {
        const query = `?from=${opts.from}&payed=${opts.payed}&until=${opts.until}&renter=${opts.renter}`;
        const res = await axios.get(`${config.URL_SERVER}/invoices${query}`,
        {
            headers: {
              'Authorization': `Bearer ${JSON.parse(token)}` 
            }
          });
        dispatch({
            type: LIST_INVOICES,
            payload: res.data.body
        });
    } catch (error) {
        
    }

}

export const getOne = (id) => async (dispatch, getState) => {
    const token = localStorage.getItem('token');
    dispatch({type: START_LOADING});
    try {
        const res = await axios.get(`${config.URL_SERVER}/invoices/${id}`,
        {
            headers: {
              'Authorization': `Bearer ${JSON.parse(token)}` 
            }
          });
        dispatch({
            type: GET_ONE_INVOICE,
            payload: res.data.body
        });
    } catch (error) {
        
    }

}