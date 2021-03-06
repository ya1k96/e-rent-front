import renterLogo from '../../images/icons/users.png';
import invoiceLogo from '../../images/icons/invoice.png';
import {spinner} from "../utils/spinner";
import { Link } from "react-router-dom";
import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ListInvoices from '../utils/listInvoices';
import { dashboardInvoices } from '../../redux/invoicesDuck';

const Dashboard = () => {    
    const dispatch = useDispatch();
    const {isLoading, array} = useSelector(store => store.invoices);  

    useEffect(() => {
        dispatch(dashboardInvoices());
    }, []);

    const renderInvoices = () => {    
        return array?.length > 0
        ? <ListInvoices renters={array}></ListInvoices> 
        : <p className="font-medium text-lg text-gray-500 text-center my-16 text-shadow">Nada por aqui</p>
    }

    return(<>                       
        <div className="flex justify-center p-4">
            <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5">                             
                <Link className="bg-white shadow-lg rounded-xl w-40 h-40 hover:bg-blue-200 cursor-pointer" to="/renters">                        
                    <img className="m-auto mt-3 w-28 h-28" src={renterLogo} alt="invoice-logo"></img>
                    <p className="text-center font-medium text-gray-600 ">Inquilinos</p>
                </Link>
                <Link className="bg-white shadow-lg rounded-xl w-40 h-40 hover:bg-blue-200 cursor-pointer" to="/invoices">                        
                    <img className="m-auto mt-5 mb-2 w-24 h-24" src={invoiceLogo} alt="invoice-logo"></img>
                    <p className="text-center font-medium text-gray-600 ">Facturas</p>
                </Link>
                
            </div> 
        </div> 
            <p className="font-medium text-gray-500 text-center mt-3">Proximos vencimientos</p>
        <div className="flex justify-center mt-5">
            {
                isLoading ? <div className="flex place-items-center h-72">
                    { spinner() }
                </div> :
                <div className="md:w-1/3 sm:w-screen h-52 rounded-xl">
                    <div className="grid grid-cols-1 ">
                        {renderInvoices()}
                    </div>
                </div>
            }                
        </div>
        {/* <Modal show={state.showModal}></Modal> */}
    </>);
};

export default Dashboard;