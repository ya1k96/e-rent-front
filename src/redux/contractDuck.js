import axios from "axios";

//CONSTANTES
const initialData = {
    success: null,
    error: null,
    one: null,
    isLoading: false,
    array: []
}
const URL_REDUCER = '/invoices';
const START_LOADING = 'START_LOADING';
const CONTRACT_CREATE_SUCCESS = 'CONTRACT_SUCCESS';
const CONTRACT_CREATE_ERROR = 'CONTRACT_ERROR';

//REDUCERS
export default function contractReducer(state = initialData, action) {
    switch(action.type) {        
        case START_LOADING:
            return {...state, isLoading: true};
        case CONTRACT_CREATE_SUCCESS:
            return {...state, isLoading: false, array: action.payload, success: true};
        default: 
            return state;
    }
}
//ACCIONES
export const newContract = (contract) => (dispatch, getState) => {
    dispatch({type: START_LOADING});
    axios.post(`${config.URL_SERVER}${URL_REDUCER}`, contract)
    .then(res => {
        if(res.status > 199 && res.status < 300) {
            dispatch({
                type: CONTRACT_CREATE_SUCCESS,
                payload: res.data.body
            });
        }

    })
    .catch(err => {
        console.log(err);
        dispatch({
            type: CONTRACT_CREATE_ERROR,    
            payload: 'Ocurrio un error al registrar el inquilino.'
        });        

    });
    
}