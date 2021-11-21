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
const URL_REDUCER = '/contracts';
const START_CONTRACT_LOADING = 'START_CONTRACT_LOADING';
const CONTRACT_CREATE_SUCCESS = 'CONTRACT_SUCCESS';
const CONTRACT_CREATE_ERROR = 'CONTRACT_ERROR';

//REDUCERS
export default function contractReducer(state = initialData, action) {
    switch(action.type) {        
        case CONTRACT_CREATE_SUCCESS:
            return {...state, isLoading: false, array: action.payload.array, success: true, message: action.payload.message};
        case START_CONTRACT_LOADING:
            return {...state, isLoading: true};
        default: 
            return state;
    }
}
//ACCIONES
export const createContract = (contract) => (dispatch, getState) => {
    dispatch({type: START_CONTRACT_LOADING});
    const token = localStorage.getItem('token');

    axios.post(`${config.URL_SERVER}${URL_REDUCER}`, contract,
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
                    message: "Nuevo inquilino registrado!"
                },                
            });
        }

    })
    .catch(err => {
        dispatch({
            type: CONTRACT_CREATE_ERROR,    
            payload: 'Ocurrio un error al registrar el inquilino.'
        });        

    });
    
}