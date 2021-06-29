import React, { useState } from "react";
import { Link } from "react-router-dom";
import ItemInvoice from "../utils/itemInvoice";
import { spinner } from "../utils/spinner";

const Invoices = () => {
    const [state, setState] = useState({loading: true,
        invoices: []});    
        
        const getInvoices = (from = '', until = '') => {
            setState({...state,
                loading: true
            });
            
            fetch(`http://192.168.1.8:8080/api/invoices?from=${from}&until=${until}`)
            .then(resp => resp.json())
            .then(resp => {
                setState({
                    loading: false,
                    invoices: resp.invoices
                });
            })
        }
        React.useEffect(() => {
            getInvoices();
        }, [])
        
    const getValueForm = (event) => {
        setState({...state,
            [event.target.name]: event.target.value
        });
    }

    const renderList = () => {
        return state.invoices.length > 0 ? 
        state.invoices.map(invoice => <Link to={'/dashboard/invoice/'+invoice._id}
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

    const setDates = () => {
        getInvoices(state.from,state.until);
    }

    return(<>
    <div className="flex justify-center mt-5">
        <div className="grid md:grid-cols-3 divide-x sm:grid-cols-1 sm:divide-y divide-gray-300 bg-white rounded-lg shadow-xl md:w-3/5 sm:w-full sm:mx-4 ">
            <div className="col-span-2 my-auto h-80 overflow-y-auto p-5">
                {
                    state.loading ? <div className="flex items-center justify-center h-full">
                    { spinner() }
                    </div> :
                    renderList()
                }
            </div>
            <div className="grid grid-flow-row auto-rows-min px-4">    
                <p className="font-medium text-lg text-gray-500 text-center mt-5">Filtrar por fecha</p>                
                <input type="date" name="from" key="1" onChange={getValueForm} className="h-16 border-gray-200 rounded-md my-4 focus:outline-none focus:ring text-gray-600 font-medium"></input>
                <input type="date" name="until" key="2" onChange={getValueForm} className="h-16 border-gray-200 rounded-md my-4 focus:outline-none focus:ring text-gray-600 font-medium"></input>
                <button className="bg-blue-400 rounded-lg py-3 mt-2 focus:outline-none focus:bg-blue-300 focus:ring mb-3">
                    <p className="font-medium text-white text-md" onClick={setDates}>Aplicar</p>
                </button>
            </div>
        </div>

    </div>
    </>);
}

export default Invoices;