import axios from "axios";
import { config } from "../config";

//CONSTANTES
const initialData = {
    user: null,
    token: null,
    isLoading: false,
    error: null,
    success: null
};

const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
const USER_LOGIN_ERROR = 'USER_LOGIN_ERROR';
const GET_REGISTER = 'GET_REGISTER';
const START_LOGIN_LOADING = 'START_LOGIN_LOADING';

//REDUCERS
export default function authReducer(state = initialData, action) {
    switch(action.type) {
        case USER_LOGIN_SUCCESS:
            return {...state, isLoading: false, user: action.payload.user, token: action.payload.token, success: true};
        case USER_LOGIN_ERROR:
            return {...state, isLoading: false, error: action.payload, success: false};
        case GET_REGISTER:
            return {...state, isLoading: false, error: false};
        case START_LOGIN_LOADING:
            return {...state, isLoading: true};
        default: 
            return state;
    }
}

//ACCIONES
export const login = (user) => (dispatch, getState) => {
    dispatch({type: START_LOGIN_LOADING});
    axios.post(`${config.URL_SERVER}/auth/login`, user)
    .then(res => {
        if(res.status > 199 && res.status < 300) {
            localStorage.setItem('token', JSON.stringify(res.data.body.token)); 
            dispatch({
                type: USER_LOGIN_SUCCESS,
                payload: res.data.body
            });
        }

    })
    .catch(err => {
        console.log(err);
        dispatch({
            type: USER_LOGIN_ERROR,    
            payload: 'Tus datos son incorrectos'
        });        

    });
    
}
export const register = () => async (dispatch, getState) => {

    try {
        const res = await axios.get(`${config.URL_SERVER}/auth/register`);
        dispatch({
            type: GET_REGISTER,
            payload: res.data.user
        });
    } catch (error) {
        
    }
}