import axios from "axios";
import { config } from "../config";

//CONSTANTES
const initialData = {
    success: null,
    one: null,
    isLoading: false,
    array: [],
    message: null
}
const URL_REDUCER = '/payments/';
const START_PAYMENT_LOADING = 'START_PAYMENT_LOADING';
const PAYMENT_CREATE_SUCCESS = 'PAYMENT_SUCCESS';
const PAYMENT_CREATE_ERROR = 'PAYMENT_ERROR';

//REDUCERS
export default function paymentReducer(state = initialData, action) {
    switch(action.type) {        
        case PAYMENT_CREATE_SUCCESS:
            return {...state, isLoading: false, one: action.payload.array, success: true};
        case PAYMENT_CREATE_ERROR:
            return {...state, isLoading: false, success: false, message: action.payload};
        case START_PAYMENT_LOADING:
            return {...state, isLoading: true};               
        default: 
            return state;
    }
}
//ACCIONES
export const createPayment = (id) => (dispatch, getState) => {
    dispatch({type: START_PAYMENT_LOADING});
    const token = localStorage.getItem('token');

    axios.post(`${config.URL_SERVER}${URL_REDUCER}create/${id}`,
    {
        headers: {
          'Authorization': `Bearer ${JSON.parse(token)}` 
        }
      })
    .then(res => {
        if(res.status > 199 && res.status < 300) {
            dispatch({
                type: CONTRACT_CREATE_SUCCESS,
                payload: {
                    array: res.data.body,
                    message: "Pago realizado con exito"
                },                
            });
        }

    })
    .catch(err => {
        dispatch({
            type: PAYMENT_CREATE_ERROR,    
            payload: 'Ocurrio un error al pagar la factura'
        });        

    });   
}
