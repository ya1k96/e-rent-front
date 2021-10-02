import React from "react";
import { useForm } from 'react-hook-form';
import { getRenterById } from "../services/connect";
import { spinner } from "../utils/spinner";
import moment from "moment";

export const EditRenterProfile = (props) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [state, setState] = React.useState({notif: ''});
    const [loading, setloading] = React.useState(true);
    const [renter, setrenter] = React.useState(null);
    
    const {id} = props.computedMatch.params;
    moment.locale('es');

    React.useEffect(() => {
        getRenterById(id)
        .then(resp => {
            const data = resp;        
            setloading(false);        
            setrenter(data.contract);
        });
    }, [false]);
    
    const updateRenter = (data) => {
        setState({...state, loading: true})
        getRenterById(id)
        .then(resp => {
            const data = resp.data;
            setState({...state, notif: data.msg, success: data.ok})
            setloading(false);
            setTimeout(function() {
                setState({...state, notif: ''})                
            },3000)
            
        });
    }

    return (<>
        <p className="font-medium text-2xl text-gray-500 text-center mt-4">Info</p>
        <div className="flex justify-center sm:mt-0 rounded-lg ">
        <div className="md:grid md:grid-cols-12 md:gap-6 md:w-2/4 sm:w-full mt-5">                    
            <div className=" md:mt-0 md:col-span-12 ">
            {
            state.notif.length > 0 ? <div className={ (state.success ? 'bg-green-100' : 'bg-red-100') + " rounded-lg shadow-sm p-4 m-4 z-50 fixed animate__animated animate__fadeIn w-1/3 ml-10"}>
            <p className={ (state.success ? 'text-green-700': 'text-red-400 ') + " font-medium text-sm"}>
                {state.notif}
            </p> </div>: ''
            }
            { loading ? <div className="mx-auto w-20">{spinner()}</div> : 
            <form onSubmit={handleSubmit(updateRenter)} method="POST">
            <div className="overflow-hidden sm:rounded-md bg-white shadow-lg mx-5   ">
            <div className="px-4 py-5 sm:p-6">
                <div className="grid grid-cols-12 gap-2">
                <div className="md:col-span-6 sm:col-span-12">
                    <label for="first_name" className="block text-sm font-medium text-gray-700">Nombre</label>
                    <input type="text" name="first_name" id="first_name" 
                    defaultValue={renter?.name}
                    autocomplete="given-name" className="focus:outline-none mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2"
                    {
                    ...register('name', { 
                    required: { value: true, message: 'Ingresa un nombre'} })
                    }
                    ></input>
                    {errors?.name &&(
                        <span className="font-medium text-sm text-red-400">                       
                        {errors.name.message}
                        </span>
                    )}
                </div>

                <div className="md:col-span-6 sm:col-span-12">
                    <label for="last_name" className="block text-sm font-medium text-gray-700">Apellido</label>
                    <input type="text" name="last_name" id="last_name" 
                    defaultValue={renter?.surname}
                    autocomplete="family-name" className="focus:outline-none mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2"
                    {
                    ...register('lastname', { 
                    required: { value:true, message: 'Ingresa un apellido'}})
                    }
                    ></input>
                    {errors?.lastname &&(
                        <span className="font-medium text-sm text-red-400">                       
                        {errors.lastname.message}
                        </span>
                    )}
                </div>

                <div className="col-span-12">
                    <div className="flex flex-row justify-center py-3">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>                                              
                    <p className="text-sm text-gray-500 font-medium text-center">
                        Por seguridad algunos campos no se pueden modificar                
                    </p>

                    </div>
                </div>                            
                <div className="md:col-span-12 sm:col-span-12 ">
                    <label for="email_address" className="block text-sm font-medium text-gray-500">Monto: {renter?.price} ARS</label>                                               
                </div>                            
                <div className="md:col-span-6 sm:col-span-12">
                    <label for="country" className="block text-sm font-medium text-gray-500">Periodo aumento {renter?.increment_month} Meses</label>                                                                   
                </div>
                <div className="md:col-span-12 sm:col-span-12">
                    <label for="country" className="block text-sm font-medium text-gray-500">Porcentaje de aumento {renter?.increment_porc}%</label>                        
                </div>
                <div className="md:col-span-12 sm:col-span-6">
                    <label for="street_address" className="block text-sm font-medium text-gray-500">Fecha de inicio { moment(renter?.begin).format('YYYY-MM-DD')}</label>                        
                    
                </div>
                <div className="md:col-span-12 sm:col-span-6">
                    <label for="street_address" className="block text-sm font-medium text-gray-500">Fecha de fin <span className="text-sm font-medium text-gray-500">{ moment(renter?.end).format('YYYY-MM-DD')}</span></label>                        
                    
                </div>

                <div className="md:col-span-12 sm:col-span-6">
                    <label for="country" className="block text-sm font-medium text-gray-500">Fin del contrato {moment(renter?.end).from(renter?.begin)}</label>                                                                     
                </div>                            
                
                </div>
            </div>                
                <div className="px-4 py-3 text-right sm:px-6">
                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Guardar
                    </button>
                </div>
            </div>
        </form>
        }                     
            </div>                    
        </div>
        </div>
    </>);
}