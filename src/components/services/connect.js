import axios from 'axios';
let url = `http://192.168.1.8:8080/api/`;

export const getUser = (token) => {
    return axios.get(`${url}verifyToken?token=${JSON.parse(token)}`);     
}

export const getRenters = () => {
    return axios.get(`${url}renters`);
}

export const createRenter = (renter) => {
    return axios.post(`${url}renters/add`, renter);
}

export const loginUser = (user) => {
    return axios.post(`${url}login`, user);
}

export const getBoard = () => {
    return axios.get(`http://192.168.1.8:8080/api/dashboard`);
}

export const createPayment = (idInvoice) => {
    return axios.post(`http://192.168.1.8:8080/api/payments/create/${idInvoice}`);
}