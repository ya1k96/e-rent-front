import React from "react";
import Moment from 'react-moment';
import logoUser from '../../images/icons/neutral-user.png';
import { createPayment, getInvoice } from "../services/connect";
import { loader } from "../utils/spinner";
import { withRouter } from 'react-router-dom';

const Invoice = (props) => {
    const {id} = props.computedMatch.params;
    const initialState = {
        period: '',
        expiration: '',
        contract_id: {
            name: '', surname: ''
        }
     }
    const [contract, setContract] = React.useState(initialState);
    const [notif, setnotif] = React.useState({ msg: '' , success: ''});
    const [payed, setPayed] = React.useState(false);
    const [loading, setloading] = React.useState(true);
    
    React.useEffect(() => {
        getInvoice(id)
        .then(resp => {
            console.log(resp.data.invoice);
            setPayed(resp.data.invoice.payed)
            setContract(resp.data.invoice);
            setloading(false);
        } );
    }, [payed])

    
    const sendPayment = () => {
        setloading(true);
        createPayment(contract._id)
        .then(resp => {
            const data = resp.data;                        
            setPayed(true);
            setnotif({msg: data.msg, success: data.ok});
            setTimeout(() => {
                setnotif({ msg:'', success: ''});
                setloading(false);
            }, 3000);
        })        
    }

    const CheckPayed = () => {
        return contract.payed ?
        <button className="bg-white rounded-full p-1 px-2 mt-2 focus:outline-none self-start">                                
            <p className="font-medium text-green-400"><span className="fui-check-circle text-green-400"></span> Pagado</p>
        </button>: '';        
    }
    
    const ReciboButton = () => {
        return contract.payed ? 
        <a href={`http://192.168.1.8:8080/api/payments/detail/${contract.payment._id}/${contract._id}`}>
            <button className="bg-blue-400 rounded-full p-1 px-2 mt-2 focus:outline-none" >                                
                <p className="font-medium text-white text-md"><span className="fui-link"></span> Descargar recibo</p>
            </button> 
        </a>
        : '';
    }

    const ButtonPay = () => {
        return payed ? '' :
        <div className="flex justify-center mt-4">        
                <button className="bg-white focus:outline-none rounded-3xl p-3 px-6 text-blue-400 font-medium hover:text-blue-300 focus:ring"
                onClick={sendPayment}>
                Generar recibo
                </button>            
        </div>;
    }

    return (<>
        {loading ? loader() : null }
        <div className="flex flex-col mt-4 ">
            <div className="self-center md:w-2/4 sm:w-full h-2/4 mb-2">
                <button className="cursor-pointer" onClick={() => props.history.goBack()}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                    </svg>
                </button>
                
            </div>
            <div className="flex self-center w-full items-center justify-center">
            {
            notif.msg.length > 0 ? <div className={ (notif.success ? ' bg-green-100' : 'bg-red-100') + " rounded-lg shadow-sm p-4 m-4 z-50 fixed animate__animated animate__fadeIn w-1/3 ml-10"}>
            <p className={ (notif.success ? ' text-green-700': 'text-red-400 ') + " font-medium text-sm"}>
                {notif.msg}
            </p> </div>: ''
            }
            <div className="bg-white shadow-lg rounded-lg md:w-2/4 sm:w-full h-2/4 p-8 pb-4 pr-3 md:pr-8 sm:mx-5">
                    <div className="flex justify-between">
                        <div className="grid grid-cols-1">
                            <p className="text-gray-700 ">
                                <span className="text-lg font-medium ">
                                    Mes de {' '}
                                    <Moment format="MMMM">{contract.period}</Moment>                                 
                                </span>
                                <br></br>                     
                                Total a pagar 
                                <span className="text-gray-500">
                                {' ' + contract.total + ' ARS'}
                                </span>  
                                <br></br>                     
                                Periodo {' '}
                                <span className="text-gray-500">
                                <Moment format="MMMM/Y">{contract.period}</Moment> 
                                </span>  
                            </p>  
                            <div className="mt-4">
                                <div className="flex flex-col md:flex-row gap-x-2 gap-y-0">
                                    <CheckPayed></CheckPayed>
                                    <ReciboButton></ReciboButton>
                                </div>                     
                            </div>   
                            <br></br>                          
                            {
                                !payed ? <p className="text-sm text-gray-500 mt-1">
                                <span>Vence </span> 
                                <Moment fromNow>{contract.expiration}</Moment>
                                </p>: null
                            }
                        </div>
                        <div className="flex flex-col">
                            <img className="mb-2 w-24 h-24 self-center" src={logoUser} alt="invoice-logo"></img> 
                            <p className="text-gray-700 font-semibold text-center">
                                <span className="text-gray-500 m-0">
                                    {contract.contract_id.name + ' ' + contract.contract_id.surname}                        
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