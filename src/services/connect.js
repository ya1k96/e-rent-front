import axios from 'axios';
export const url = `http://192.168.1.8:8080/api/`;

export const getUser = (token) => {
    return axios.get(`${url}verifyToken?token=${JSON.parse(token)}`);     
}

export const getRenters = () => {
    return axios.get(`${url}renters`);
}

export const getRenterById = (id) => {
    return axios.get(`${url}renters/detail/${id}`);
}

export const getInvoice = (id) => {
    return axios.get(`${url}invoices/detail/${id}`);        
}

export const getInvoices = (from = '', until = '', payed = false, renter = '') => {       
    return axios.get(`${url}invoices?from=${from}&until=${until}&payed=${payed}&renter=${renter}`);
}

export const createRenter = (renter) => {
    return axios.post(`${url}renters/add`, renter);
}

export const loginUser = (user) => {
    return axios.post(`${url}login`, user);
}

export const getBoard = () => {
    return axios.get(`${url}dashboard`);
}

export const createPayment = (idInvoice) => {
    return axios.post(`${url}payments/create/${idInvoice}`);
}

// async function getData(url = '') {
//     const response = await fetch(url);
//     return response.json();
// }

// //implementando el metodo POST:
// async function postData(url = '', data = {}) {
//     // Opciones por defecto estan marcadas con un *
//     const response = await fetch(url, {
//       method: 'POST', // *GET, POST, PUT, DELETE, etc.
//       mode: 'cors', // no-cors, *cors, same-origin
//       cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
//       credentials: 'same-origin', // include, *same-origin, omit
//       headers: {
//         'Content-Type': 'application/json'
//         // 'Content-Type': 'application/x-www-form-urlencoded',
//       },
//       redirect: 'follow', // manual, *follow, error
//       referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
//       body: JSON.stringify(data) // body data type must match "Content-Type" header
//     });
//     return response.json(); // parses JSON response into native JavaScript objects
//   }
  