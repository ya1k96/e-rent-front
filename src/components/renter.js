import { Component } from "react";
import renterLogo from '../images/icons/users.png';
import invoiceLogo from '../images/icons/invoice.png';
import ItemInvoice from "./utils/itemInvoice";

export class Renters extends Component {
    state = {
        loading: true
    };
    componentDidMount() {
        setTimeout(() => {
            this.setState({loading: false});
            
        }, 2000);
    }
    lodingSpinner() {
        return (<div>
            <div class="lds-ring"><div></div>
            <div></div>
            <div></div>
            <div></div>
            </div>
        </div>);
    }
    render() {
        return(<>
            <div className="flex justify-center p-4">
                <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-5">                
                    <div className="bg-white shadow-lg rounded-xl w-40 h-40 hover:bg-blue-200 cursor-pointer">
                        <img className="m-auto mt-3 w-28 h-28" src={renterLogo} alt="renters-logo"></img>
                        <p className="text-center font-medium text-gray-600">Inquilinos</p>
                    </div>
                    <div className="bg-white shadow-lg rounded-xl w-40 h-40 hover:bg-blue-200 cursor-pointer">
                        <img className="m-auto mt-5 mb-2 w-24 h-24" src={invoiceLogo} alt="invoice-logo"></img>
                        <p className="text-center font-medium text-gray-600 ">Facturas</p>
                    </div>
                   
                </div> 
            </div>       
                <p className="font-medium text-gray-500 text-center mt-3">Proximos vencimientos</p>
            <div className="flex justify-center mt-5">
                {
                    this.state.loading ? this.lodingSpinner() :
                    <div className="md:w-1/3 sm:w-screen h-52 rounded-xl">
                        <div className="grid grid-cols-1 ">
                            <ItemInvoice name="Lucas Bruzzo" total="5000" month="Mayo"></ItemInvoice>
                            <div className="divide-x"></div>
                            <ItemInvoice name="Sonia Meza" total="3000" month="Mayo"></ItemInvoice>
                            <div className="divide-x"></div>
                            <ItemInvoice name="Lucas Bruzzo" total="12000" month="Mayo"></ItemInvoice>                                                              
                        </div>
                    </div>

                }                
            </div>
        </>);
    }
}