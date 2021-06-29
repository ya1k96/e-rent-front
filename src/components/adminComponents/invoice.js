import React from "react";
import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import logoUser from '../../images/icons/neutral-user.png';
import { createPayment } from "../services/connect";
import { spinner } from "../utils/spinner";
// Moment.globalMoment = moment;
// Moment.globalLocale = 'es';
const Invoice = (props) => {
    const [state, setState] = React.useState({
        invoice: null,
        loading: true,
        notif: ''
    });
    const [payed, setPayed] = React.useState(false);
    const {id} = props.computedMatch.params;
    
    React.useEffect(() => {
        fetch(`http://192.168.1.8:8080/api/invoices/detail/${id}`)
        .then(resp => resp.json())
        .then(resp => {
            setPayed(resp.invoice.payed)
            setState({...state, invoice: resp?.invoice, loading: false});
        } );
    }, [payed])

    const checkPayed = () => {
        return state.invoice.payed ?
        <button className="bg-green-400 rounded-full p-1 px-2 mt-2 focus:outline-none">                                
            <p className="font-medium text-white"><span className="fui-check-circle text-white"></span> Pagado</p>
        </button>: '';        
    }

    const sendPayment = () => {
        setState({...state, loading: true});
        createPayment(state.invoice._id)
        .then(resp => {
            const data = resp.data;            
            setState({...state, success: data.ok, notif: data.msg, loading: false});
            setPayed(data.ok);
            setTimeout(() => setState({...state, notif:''}), 3000);
        })        
    }

    const reciboButton = () => {
        return payed ? 
        <a href={`http://192.168.1.8:8080/api/payments/detail/${state.invoice.payment._id}/${state.invoice._id}`}>
            <button className="bg-blue-400 rounded-full p-1 px-2 mt-2 ml-2 focus:outline-none" >                                
                <p className="font-medium text-white"><span className="fui-link"></span> Descargar recibo</p>
            </button> 
        </a>
        : '';
    }

    const buttonPay = () => {
        return payed ? '' :
        <div className="flex justify-center mt-4">        
                <button className="bg-white focus:outline-none rounded-3xl p-3 px-6 text-blue-400 font-medium hover:text-blue-300 focus:ring"
                onClick={sendPayment}>
                Generar recibo
                </button>            
        </div>;
    }

    return (<>
        <div className="flex justify-center mt-4 h-full">
            {
            state.notif.length > 0 ? <div className={ (state.success ? ' bg-green-100' : 'bg-red-100') + " rounded-lg shadow-sm p-4 m-4 z-50 fixed animate__animated animate__fadeIn w-1/3 ml-10"}>
            <p className={ (state.success ? ' text-green-700': 'text-red-400 ') + " font-medium text-sm"}>
                {state.notif}
            </p> </div>: ''
            }
            { state.loading ? <div className="flex items-center justify-center h-72">{spinner()}</div> : 
                <div className="bg-white shadow-lg rounded-lg md:w-2/4 sm:w-full h-2/4 p-8 pb-4 sm:mx-5">
                    <div className="flex justify-between">
                        <div className="grid grid-cols-1">
                            <p className="text-gray-700">
                                <span className="text-lg font-medium ">
                                    Mes de {' '}
                                    <Moment format="MMMM">{state.invoice.period}</Moment>                                 
                                </span>
                                <br></br>                     
                                Total a pagar 
                                <span className="text-gray-500">
                                {' ' + state.invoice.total + ' ARS'}
                                </span>  
                            </p>  
                            <div className="mt-4">
                                { checkPayed() }
                                { reciboButton() }                       
                            </div>   
                            <br></br>                          
                            <p className="text-sm text-gray-500 mt-1">
                                <span>Vence </span> 
                                <Moment fromNow>{state.invoice.expiration}</Moment>
                            </p>
                        </div>
                        <div className="flex items-center">
                            <img className="m-auto mb-2 w-24 h-24" src={logoUser} alt="invoice-logo"></img> 
                            <p className="text-gray-700 font-semibold w-1/4">
                                <span className="text-gray-500 text-center m-0">
                                    {state.invoice.contract_id.name + ' ' + state.invoice.contract_id.surname}                        
                                </span>
                            </p>

                        </div>
                                                        
                    </div>                                           
                    { buttonPay() }
                </div>                
            }               
        </div>
    </>);
}

export default Invoice;