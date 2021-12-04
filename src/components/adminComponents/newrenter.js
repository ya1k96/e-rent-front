import React, {useEffect, useState} from "react";
import { useForm } from 'react-hook-form';
import { spinner } from "../utils/spinner";
import { useDispatch, useSelector } from 'react-redux';
import { createContract } from "../../redux/contractDuck";

const NewRenter = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const {isLoading, success, message} = useSelector(store => store.contracts);  
    const dispatch = useDispatch();
    const [notif, setnotif] = useState(null);

    // useEffect(() => {
    //     console.log(isLoading)
    //     if(success) {
    //         setnotif(message);
    //         setTimeout(function() {
    //             setnotif(null);                
    //         }, 3000)
    //     }
    // }, [success]);

    const onSubmit = (data) => {
        console.log(data)
        dispatch(createContract(data));        
    }

    return (<>
        <p className="font-medium text-2xl text-gray-500 text-center mt-4">Nuevo inquilino</p>
        <div className="flex justify-center sm:mt-0 rounded-lg ">
        <div className="md:grid md:grid-cols-12 md:gap-6 md:w-2/4 sm:w-full mt-5">                    
            <div className=" md:mt-0 md:col-span-12 ">
            {
            notif?.length > 0 ? <div className={ (success ? 'bg-green-100' : 'bg-red-100') + " rounded-lg shadow-sm p-4 m-4 z-50 fixed animate__animated animate__fadeIn w-1/3 ml-10"}>
            <p className={ (success ? 'text-green-700': 'text-red-400 ') + " font-medium text-sm"}>
                {notif}
            </p> </div>: ''
            }
            <form action="" onSubmit={handleSubmit(onSubmit)} method="POST">
                <div className="overflow-hidden sm:rounded-md bg-white shadow-lg mx-5   ">
                <div className="px-4 py-5 sm:p-6">
                    <div className="grid grid-cols-12 gap-2">
                    <div className="md:col-span-6 sm:col-span-12">
                        <label htmlFor="first_name" className="block text-sm font-medium text-gray-700">Nombre</label>
                        <input type="text" name="first_name" id="first_name" autoComplete="given-name" className="focus:outline-none mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2"
                        {
                        ...register('name', { 
                        required: { value:true, message: 'Ingresa un nombre'} })
                        }
                        ></input>
                        {errors?.name &&(
                            <span className="font-medium text-sm text-red-400">                       
                            {errors.name.message}
                            </span>
                        )}
                    </div>

                    <div className="md:col-span-6 sm:col-span-12">
                        <label htmlFor="last_name" className="block text-sm font-medium text-gray-700">Apellido</label>
                        <input type="text" name="last_name" id="last_name" autoComplete="family-name" className="focus:outline-none mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2"
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

                    <div className="md:col-span-12 sm:col-span-12 ">
                        <label htmlFor="email_address" className="block text-sm font-medium text-gray-700">Monto</label>
                        <input type="text" name="email_address" id="email_address" autoComplete="email" className="mt-1 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2"
                        {
                        ...register('price', { 
                        required: { value:true, message: 'Ingresa un monto'} })
                        }
                        ></input>
                        {errors?.price &&(
                            <span className="font-medium text-sm text-red-400">                       
                            {errors.price.message}
                            </span>
                        )}
                    </div>                            
                    <div className="md:col-span-6 sm:col-span-12">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Periodo aumento</label>
                        <select id="country" name="country" autoComplete="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {
                            ...register('increment_month', { 
                            required: { value:true, message: 'Campo requerido' }})
                        }
                        >
                        <option value="12">12 meses</option>
                        <option value="6">6 meses</option>
                        <option value="3">3 meses</option>
                        </select>
                        {errors?.increment_month &&(
                            <span className="font-medium text-sm text-red-400">                       
                            {errors.increment_month.message}
                            </span>
                        )}
                    </div>
                    <div className="md:col-span-6 sm:col-span-12">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Porcentaje de aumento</label>
                        <input type="text" id="country" name="country" autoComplete="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {
                            ...register('increment_porc', { 
                            required: { value:true, message: 'Campo requerido' }})
                        }
                        >                        
                        </input>
                        {errors?.increment_porc &&(
                            <span className="font-medium text-sm text-red-400">                       
                            {errors.increment_porc.message}
                            </span>
                        )}
                    </div>
                    <div className="md:col-span-12 sm:col-span-6">
                        <label htmlFor="street_address" className="block text-sm font-medium text-gray-700">Fecha inicio</label>
                        <input type="date" name="street_address" id="street_address" autoComplete="street-address" className="focus:outline-none mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md py-2"
                        {
                        ...register('begin', { 
                        required: { value:true, message: 'Establece el inicio' }})
                        }
                        ></input>
                        {errors?.begin &&(
                            <span className="font-medium text-sm text-red-400">                       
                            {errors.begin.message}
                            </span>
                        )}
                    </div>

                    <div className="md:col-span-12 sm:col-span-6">
                        <label htmlFor="country" className="block text-sm font-medium text-gray-700">Periodo del contrato</label>
                        <select id="country" name="country" autoComplete="country" className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {
                            ...register('months', { 
                            required: { value:true, message: 'Este campo es requerido' }})
                        }
                        >
                        <option value="36">36 meses</option>
                        <option value="24">24 meses</option>
                        <option value="12">12 meses</option>
                        </select>
                        {errors?.months &&(
                            <span className="font-medium text-sm text-red-400">                       
                            {errors.months.message}
                            </span>
                        )}
                    </div>                            
                    
                    </div>
                </div>
                <div className="px-4 py-3 text-center sm:px-6">
                    {isLoading ? spinner() : ''}
                </div>
                {
                    isLoading ? '' : <div className="px-4 py-3 text-right sm:px-6">
                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Guardar
                    </button>
                </div>
                }
                </div>
            </form>
            </div>                    
        </div>
        </div>
    </>);
}

export default NewRenter;