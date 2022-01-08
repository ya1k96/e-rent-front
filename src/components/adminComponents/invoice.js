import React, { useEffect } from "react";
import Moment from 'react-moment';
import logoUser from '../../images/icons/neutral-user.png';
import { loader } from "../utils/spinner";
import { withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { getOne } from "../../redux/invoicesDuck";
import { createPayment, getUrlPayment } from "../../redux/paymenDuck";


const Invoice = (props) => {
    const dispatch = useDispatch();
    const { isLoading, one } = useSelector(store => store.invoices);
    const payments = useSelector(store => store.payments);
    const {id} = props.computedMatch.params;    
    
    useEffect(() => {
        dispatch(getOne(id));
    }, [payments])
       
    const sendPayment = () => {
        dispatch(createPayment(id));      
    }

    const CheckPayed = () => {
        return one.payed ?
        <button className="check-payed">                                
            <p className="font-medium text-green-400"><span className="fui-check-circle text-green-400"></span> Pagado</p>
        </button>: '';        
    }
    
    const ReciboButton = () => {
        return one.payed ?  
        <a href={one.payment?.doc_url} target="__blank">
            <button className="btn-primary">                                
                <p className="btn-text-white text-md"><span className="fui-link"></span> Descargar recibo</p>
            </button>                 

        </a>
        : '';
    }

    const ButtonPay = () => {
        return one.payed ? '' :
        <div className="content-center mt-4">        
            <button className="btn-outline-secondary" onClick={sendPayment}>
            Generar recibo
            </button>            
        </div>;
    }

    return (<>
        {isLoading ? loader() : null }
        <div className="flex flex-col mt-4">
            <div className="header-back mb-2">
                <button className="cursor-pointer" onClick={() => props.history.goBack()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                    </svg>
                </button>
                
            </div>
            <div className="content-center self-center w-full items-center">
            {/* {
            notif.msg.length > 0 ? <div className={ (notif.success ? ' bg-green-100' : 'bg-red-100') + " rounded-lg shadow-sm p-4 m-4 z-50 fixed animate__animated animate__fadeIn w-1/3 ml-10"}>
            <p className={ (notif.success ? ' text-green-700': 'text-red-400 ') + " font-medium text-sm"}>
                {notif.msg}
            </p> </div>: ''
            } */}
            <div className="card invoice-content">
                    <div className="flex justify-between">
                        <div className="grid grid-cols-1">
                            <p className="text-gray-700 ">
                                <span className="text-lg font-medium ">
                                    Mes de {' '}
                                    <Moment format="MMMM">{one.period}</Moment>                                 
                                </span>
                                <br></br>                     
                                Total a pagar 
                                <span className="text-gray-500">
                                {' ' + one.total + ' ARS'}
                                </span>  
                                <br></br>                     
                                Periodo {' '}
                                <span className="text-gray-500">
                                <Moment format="MMMM/Y">{one.period}</Moment> 
                                </span>  
                            </p>  
                            <div className="mt-4">
                                <div className="buttons-list">
                                    <CheckPayed></CheckPayed>
                                    <ReciboButton></ReciboButton>
                                </div>                     
                            </div>   
                            <br></br>                          
                            {
                                !one.payed ? <p className="text-sm text-gray-500 mt-1">
                                <span>Vence </span> 
                                <Moment fromNow>{one.expiration}</Moment>
                                </p>: null
                            }
                        </div>
                        <div className="flex flex-col">
                            <img className="mb-2 w-24 h-24 self-center" src={logoUser} alt="invoice-logo"></img> 
                            <p className="text-gray-700 font-semibold text-center">
                                <span className="text-gray-500 m-0">
                                    {one.contract_id.name + ' ' + one.contract_id.surname}                        
                                </span>
                            </p>

                        </div>
                                                        
                    </div>                                           
                    <ButtonPay></ButtonPay>
                </div> 
            </div>              
        </div>
    </>);
}

export default withRouter(Invoice);