import React, { StrictMode, useEffect, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import ItemInvoice from "../utils/itemInvoice";
import { spinner } from "../utils/spinner";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux";
import { getInvoices } from "../../redux/invoicesDuck";

const Invoices = (props) => {
    const dispatch = useDispatch();
    const { isLoading, array } = useSelector(store => store.invoices);
    const { register, handleSubmit } = useForm();
    let initialOpts = {
        from: '', 
        until: '', 
        payed: '', 
        renter: ''
    }

    useEffect(() => {
        dispatch(getInvoices(initialOpts));
    }, [])
        
    const onSubmit = (data) => {    
        initialOpts = {
            from: data.from, 
            until: data.until, 
            payed: data.payed, 
            renter: data.renter
        }    

        dispatch(getInvoices(initialOpts));
    }

    const renderList = () => {
        return array.length > 0 ? 
        array.map(invoice => <Link to={'/dashboard/invoice/'+invoice._id}
        key={invoice._id}>
            <ItemInvoice name={invoice.contract_id.name + ' ' + invoice.contract_id.surname} 
            total={invoice.total} 
            month={invoice.month}
            createdAt={invoice.createdAt}
            >
            </ItemInvoice>
        </Link>)
        :  
        <div className="flex place-content-center h-full">
            <p className="text-center font-medium text-md text-gray-400 my-auto">Nada por aqui</p>
        </div>
    }


    return(<>
    <div className="flex flex-col mt-5 items-center">
        <div className="md:w-7/12 sm:w-full h-2/4 mb-2">
            <button className="cursor-pointer" onClick={() => props.history.goBack()}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 01-18 0z" />
                </svg>
            </button>
            
        </div>
        <div className="grid md:grid-cols-3 divide-x sm:grid-cols-1 sm:divide-y divide-gray-300 bg-white rounded-lg shadow-xl md:w-3/5 sm:w-full sm:mx-4 ">
            <div className="col-span-2 my-auto h-80 overflow-y-auto p-5">
                {
                    isLoading ? <div className="flex items-center justify-center h-full">
                    { spinner() }
                    </div> :
                    renderList()
                }
            </div>
            <div className="grid grid-flow-row auto-rows-min px-4">    
                <div className="flex flex-row m-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 m-0 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg> 
                <p className="font-medium text-lg text-gray-500 text-center ml-4">Filtrar</p>                
                </div>
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    <label className="font-medium text-gray-600">Inquilino
                    </label>
                    <input type="text" name="renter" key="0" className="h-12 border-gray-200 rounded-md focus:outline-none focus:ring text-gray-500 font-medium"
                    {
                        ...register('renter')
                    }></input>
                    <label className="font-medium text-gray-600">Desde
                    </label>
                    <input type="date" name="from" key="1"  className="h-12 border-gray-200 rounded-md focus:outline-none focus:ring text-gray-500 font-medium"
                    {
                        ...register('from')
                    }></input>
                    <label className="font-medium text-gray-600">Hasta
                    </label>
                    <input type="date" name="until" key="2" className="h-12 border-gray-200 rounded-md focus:outline-none focus:ring text-gray-500 font-medium"
                    {
                        ...register('until')
                    }></input>
                    <label className="font-medium text-gray-500 my-2">Pagados
                    <input type="checkbox" name="payed" key="3" className="appearance-none checked:bg-blue-400 checked:border-transparent rounded-md ml-2" 
                    {
                        ...register('payed')
                    }
                    ></input>
                    </label>
                    
                    <button className="bg-blue-400 rounded-lg py-3 mt-2 focus:outline-none focus:bg-blue-300 focus:ring mb-3" type="submit">
                        <p className="font-medium text-white text-md">Aplicar</p>
                    </button>

                </form>
            </div>
        </div>

    </div>
    </>);
}

export default withRouter(Invoices);