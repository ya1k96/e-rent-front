import { Component } from "react";
import spinner from "./utils/spinner";
import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';
import logoUser from '../images/icons/neutral-user.png';

Moment.globalMoment = moment;
Moment.globalLocale = 'es';

export default class Invoice extends Component {
    state = {
        invoice: null,
        loading: true
    };                    
    
    componentDidMount() {
        const { match: { params } } = this.props;

        fetch(`http://192.168.1.8:8080/api/invoices/detail/${params.id}`)
        .then(resp => resp.json())
        .then(resp => this.setState({invoice: resp?.invoice, loading: false}) );
    }

    checkPayed() {
        return this.state.invoice.payed ?
        <button className="bg-green-400 rounded-full p-1 px-2 mt-2 focus:outline-none">                                
            <p className="font-medium text-white"><span class="fui-check-circle text-white"></span> Pagado</p>
        </button>: '';        
    }

    reciboButton() {
        return this.state.invoice.payed ? 
        <button className="bg-blue-400 rounded-full p-1 px-2 mt-2 ml-2 focus:outline-none">                                
            <p className="font-medium text-white"><span class="fui-link"></span> Descargar recibo</p>
        </button> : '';
    }

    buttonPay() {
        return this.state.invoice.payed ? '' :
        <div className="flex justify-center mt-4">        
            <button className="bg-white focus:outline-none rounded-3xl p-3 px-6 text-blue-400 font-medium hover:text-blue-300 focus:ring">
            Generar recibo
            </button>
        </div>;
    }

    render() {
        return (<>
            <div className="flex justify-center mt-4 h-full"> 
                { this.state.loading ? <div className="flex items-center justify-center h-72">{spinner()}</div> : 
                    <div className="bg-white shadow-lg rounded-lg md:w-2/4 sm:w-full h-2/4 p-8 pb-4 sm:mx-5">
                        <div className="flex justify-between">
                            <div className="grid grid-cols-1">
                                <p className="text-gray-700">
                                    <span className="text-lg font-medium ">
                                        Mes de {' '}
                                        <Moment format="MMMM">{this.state.invoice.period}</Moment>                                 
                                    </span>
                                    <br></br>                     
                                    Total a pagar 
                                    <span className="text-gray-500">
                                    {' ' + this.state.invoice.total + ' ARS'}
                                    </span>  
                                </p>  
                                <div className="mt-4">
                                    { this.checkPayed() }
                                    { this.reciboButton() }                       
                                </div>   
                                <br></br>                          
                                <p className="text-sm text-gray-500 mt-1">
                                    <span>Vence </span> 
                                    <Moment fromNow>{this.state.invoice.expiration}</Moment>
                                </p>
                            </div>
                            <div className="flex items-center">
                                <img className="m-auto mb-2 w-24 h-24" src={logoUser} alt="invoice-logo"></img> 
                                <p className="text-gray-700 font-semibold w-1/4">
                                    <span className="text-gray-500 text-center m-0">
                                        {this.state.invoice.contract_id.name + ' ' + this.state.invoice.contract_id.surname}                        
                                    </span>
                                </p>

                            </div>
                                                            
                        </div>                                           
                        { this.buttonPay() }
                    </div>                
                }               
            </div>
        </>);
    }
}