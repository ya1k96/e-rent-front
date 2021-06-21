import { Component } from "react";
import renterLogo from '../images/icons/users.png';
import invoiceLogo from '../images/icons/invoice.png';
import ItemInvoice from "./utils/itemInvoice";
import spinner from "./utils/spinner";
import { Link } from "react-router-dom";

export class Renters extends Component {
    state = {
        loading: true,
        renters: []
    };
    
    componentDidMount() {
        fetch(`http://192.168.1.8:8080/api/dashboard`)
        .then(resp => resp.json())
        .then(resp => {
            this.setState({
                renters: resp?.renters,
                loading: false
            });
        });
    }
    
    renderInvoices() {        
            return (this.state.renters.length > 0 ?
            this.state.renters.map(invoice => 
            <Link to={'/invoice/'+invoice._id}
            key={invoice._id}>
                <ItemInvoice name={invoice.contract_id.name + ' ' + invoice.contract_id.surname} 
                total={invoice.total} 
                month={invoice.month}
                >
                </ItemInvoice>
            </Link>
           ) : <> 
            <p className="font-medium text-lg text-gray-700">
                Nada por aqui!
            </p>
           </>);
    }

    render() {
        return(<>
            <div className="flex justify-center p-4">
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5">                             
                    <Link className="bg-white shadow-lg rounded-xl w-40 h-40 hover:bg-blue-200 cursor-pointer" to="/invoices">                        
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
                    this.state.loading ? <div className="flex place-items-center h-72">
                        { spinner() }
                    </div> :
                    <div className="md:w-1/3 sm:w-screen h-52 rounded-xl">
                        <div className="grid grid-cols-1 ">{ this.renderInvoices() }</div>
                    </div>
                }                
            </div>
        </>);
    }
}