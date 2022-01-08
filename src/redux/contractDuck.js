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
const LISTAR_CONTRATOS = 'LISTAR_CONTRATOS';
const DEFAULT_ERROR = 'DEFAULT_ERROR';
const CONTRACT_DETAIL_SUCCESS = 'CONTRACT_DETAIL_SUCCESS';

//REDUCERS
export default function contractReducer(state = initialData, action) {
    switch(action.type) {        
        case CONTRACT_CREATE_SUCCESS:
            return {...state, isLoading: false, one: action.payload.array, success: true, message: action.payload};
        case CONTRACT_DETAIL_SUCCESS:
            return {...state, isLoading: false, one: action.payload.array, success: true, message: action.payload};
        case CONTRACT_CREATE_ERROR:
            return {...state, isLoading: false, success: true, message: action.payload};
        case DEFAULT_ERROR:
            return {...state, isLoading: false, success: false, message: action.payload};
        case START_CONTRACT_LOADING:
            return {...state, isLoading: true};        
        case LISTAR_CONTRATOS:
            return {...state, isLoading: false, success: true, array: action.payload.array};        
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

export const listarContratos = () => (dispatch, getState) => {
    dispatch({type: START_CONTRACT_LOADING});
    const token = localStorage.getItem('token');

    axios.get(`${config.URL_SERVER}${URL_REDUCER}`,
    {
        headers: {
          'Authorization': `Bearer ${JSON.parse(token)}` 
        }
      })
    .then(res => {
        if(res.status > 199 && res.status < 300) {
            dispatch({
                type: LISTAR_CONTRATOS,
                payload: {
                    array: res.data.body,
                    message: "OK"
                },                
            });
        }

    })
    .catch(err => {
        dispatch({
            type: DEFAULT_ERROR,    
            payload: 'Ocurrio un error.'
        });        

    });   
}

export const detailContract = (idContract) => (dispatch, getState) => {
    dispatch({type: START_CONTRACT_LOADING});
    const token = localStorage.getItem('token');

    axios.get(`${config.URL_SERVER}${URL_REDUCER}/${idContract}`,
    {
        headers: {
          'Authorization': `Bearer ${JSON.parse(token)}` 
        }
      })
    .then(res => {
        if(res.status > 199 && res.status < 300) {
            dispatch({
                type: CONTRACT_DETAIL_SUCCESS,
                payload: {
                    array: res.data.body,
                    message: "OK"
                },                
            });
        }

    })
    .catch(err => {
        dispatch({
            type: DEFAULT_ERROR,    
            payload: 'Ocurrio un error.'
        });        

    });   
}