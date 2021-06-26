import { Component } from "react";
import invoiceDetail from '../../images/icons/invoice.svg';
import Moment from 'react-moment';
import moment from 'moment/min/moment-with-locales';

Moment.globalMoment = moment;
Moment.globalLocale = 'es';

export default class ItemInvoice extends Component {
    render() {
        return(<>
        <div className="bg-white hover:bg-gray-200 shadow-xl  mb-2 mt-1 rounded-lg animate__animated animate__fadeIn">
            <div className="flex place-content-between px-4 py-3">  
                <div className="flex items-start">
                    <img className="h-14 w-auto" src={invoiceDetail} alt="item-invoice"></img>                            
                    <p className="font-medium text-gray-700 mx-0 my-auto">{this.props.name}</p>
                </div>                              
                <div>
                    <p className="font-medium text-gray-700 mx-0 my-auto">
                    <Moment format="MMMM">{this.props.createdAt}</Moment> 
                    </p>
                    <p className="font-medium text-gray-500 mx-0 my-auto text-sm">${this.props.total}</p>

                </div>
                
            </div>
        </div>
        </>);
    }
}