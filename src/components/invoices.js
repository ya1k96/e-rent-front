import { Component } from "react";
import { Link } from "react-router-dom";
import ItemInvoice from "./utils/itemInvoice";
import spinner from "./utils/spinner";

export default class Invoices extends Component {
    state = {
        loading: true,
        invoices: []
    };

    componentDidMount() {
        this.getInvoices();
    }
    
    getInvoices(from = '', until = '') {
        this.setState({
            loading: true
        });

        fetch(`http://192.168.1.8:8080/api/invoices?from=${from}&until=${until}`)
        .then(resp => resp.json())
        .then(resp => {
            this.setState({
                loading: false,
                invoices: resp.invoices
            });
        })
    }

    getValueForm = (event) => {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    renderList() {
        return this.state.invoices.length > 0 ? 
        this.state.invoices.map(invoice => <Link to={'/invoice/'+invoice._id}
        key={invoice._id}>
            <ItemInvoice name={invoice.contract_id.name + ' ' + invoice.contract_id.surname} 
            total={invoice.total} 
            month={invoice.month}
            >
            </ItemInvoice>
        </Link>)
        :  
        <div className="flex place-content-center h-full">
            <p className="text-center font-medium text-md text-gray-400 my-auto">Nada por aqui</p>
        </div>
    }

    setDates = () => {
        this.getInvoices(this.state.from,this.state.until);
    }

    render() {
        return(<>
        <div className="flex justify-center mt-10">
            <div className="grid md:grid-cols-3 divide-x sm:grid-cols-1 sm:divide-y divide-gray-300 bg-white rounded-lg shadow-xl md:w-3/5 sm:w-full sm:mx-4">
                <div className="col-span-2 my-auto h-80 overflow-y-auto p-5">
                    {
                       this.state.loading ? <div className="flex items-center justify-center h-full">
                        { spinner() }
                        </div> :
                        this.renderList()
                    }
                </div>
                <div className="grid grid-flow-row auto-rows-min px-4">    
                    <p className="font-medium text-lg text-gray-500 text-center mt-5">Filtrar por fecha</p>                
                    <input type="date" name="from" key="1" onChange={this.getValueForm} className="h-16 border-gray-200 rounded-md my-4 focus:outline-none focus:ring text-gray-600 font-medium"></input>
                    <input type="date" name="until" key="2" onChange={this.getValueForm} className="h-16 border-gray-200 rounded-md my-4 focus:outline-none focus:ring text-gray-600 font-medium"></input>
                    <button className="bg-blue-400 rounded-lg py-3 mt-2 focus:outline-none focus:bg-blue-300 focus:ring">
                        <p className="font-medium text-white text-md" onClick={this.setDates}>Aplicar</p>
                    </button>
                </div>
            </div>

        </div>
        </>);
    }
}