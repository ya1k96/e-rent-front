import React from "react";
import logo from '../../images/eRent144x144.png';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import {loader} from '../utils/spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const RegisterForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [loading, setLoading] = React.useState(false);
    
    let className = `rounded-full relative shadow-sm h-10 
    focus:rounded-full focus:ring
    focus:outline-none block w-full pl-7 pr-12 md:text-sm sm:text-lg border-gray-300 rounded-full border-2`;


    const onSubmit = (data) => {
        setLoading(true);
        const body = {
            email: data.email,
            password: data.password,
            userId: data.userId
        };
        fetch('http://192.168.1.8:8080/api/register',
        {
            headers: {
                "Content-Type": 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)            
        })
        .then(resp => resp.json())
        .then(resp => {         
            toast(resp?.msg);   
            setLoading(false);
        })
        .catch(error => {
            toast(error.toString());   
            setLoading(false);
        });
    };

    return (<>
        {loading ? loader() : null}
        <div className="flex justify-center">  
        {/* {
                ( status.message.length ) > 0 ? <div className={ (status.success ? 'bg-green-100' : 'bg-red-100') + " flex items-center rounded-lg shadow-sm mt-60 p-4 m-4 z-50 fixed animate__animated animate__fadeIn md:w-1/4 sm:w-full ml-10"}>
                <p className={ (status.success ? 'text-green-700': 'text-red-400 ') + " font-medium text-sm"}>
                    {status.message}                  
                </p> </div> : null 
        }               */}
            <div className="md:w-2/5 md:h-2/5 p-10 grid grid-cols-1 gap-1">            
                <div className="flex justify-center">
                    <img src={logo} alt=""></img>                              
                </div>                
                <p className="text-gray-500 text-center text-xl">e-rent</p>
                <p className="text-gray-500 text-center mb-4 md:text-3xl sm:text-4xl">Registro</p>
                <ToastContainer
                position="bottom-center"
                autoClose={5000}
                toastClassName="bg-red-400 text-lg font-medium"
                hideProgressBar={true}
                bodyClassName="text-white"
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                />
                <div className="bg-indigo-100 p-4 rounded-lg border-gray-300 shadow-inner border-2 border-dashed">
                <p className="text-gray-600 font-medium text-sm"><span className="fui-info-circle"></span> Para registrarte debes contar con tu <strong>Nro de usuario.</strong> <br/> Buscalo en tu recibo</p>
                </div>
                <form action="" onSubmit={handleSubmit(onSubmit)}>
                <div className="mt-1 ">
                    <input type="text" id="email"
                    aria-invalid={errors.name ? "true" : "false"}
                    {
                        ...register('email', { 
                       required: { value:true, message: 'Ingresa tu correo'}, 
                        pattern: {
                            value: /\S+@\S+\.\S+/,
                            message: "Correo invalido"
                        } })
                    }
                    className={ className + (errors?.email ? ' border-red-400':'')}                     
                    placeholder="Correo"
                    >                            
                    </input> 
                    {errors?.email &&(
                        <span className="font-medium text-sm text-red-400">                       
                        {errors.email.message}
                        </span>
                    )}                               
                    
                </div>            
                <div className="mt-1">
                    <input type="userId" 
                    name="userId"
                    className={ className + (errors?.userId ? ' border-red-400':'')} 
                    {
                        ...register('userId', { required: { value:true, message: 'Ingresa tu Nro de usuario'} })
                    }
                    placeholder="Nro de usuario" 
                    ></input>   
                    {errors.userId && (
                        <span className="font-medium text-sm text-red-400">                       
                        {errors.userId.message}
                        </span>
                    )} 
                </div>    
                <div className="mt-1">
                    <input type="password" 
                    name="password"
                    className={ className + (errors?.password ? ' border-red-400':'')} 
                    {
                        ...register('password', { required: { value:true, message: 'Ingresa tu contraseña'} })
                    }
                    placeholder="Contraseña" 
                    ></input>   
                    {errors.password && (
                        <span className="font-medium text-sm text-red-400">                       
                        {errors.password.message}
                        </span>
                    )} 
                </div>  
                  
                <div className="grid grid-cols-1 mx-auto gap-y-5 mt-5">
                    <div className="rounded-full w-auto mx-auto">
                        <button  className="px-8 py-1 text-base font-medium rounded-full text-white bg-blue-400  hover:text-blue-100 md:py-2 sm:py-3 sm:text-lg md:text-lg md:px-10 cursor-pointer"
                        value="Ingresar"
                        type="submit">
                        Registrarse</button>
                    </div>
                    <div className="rounded-full w-auto mx-auto mt-2">
                        <Link to="/">
                            <button className="py-1 text-base font-medium rounded-full text-blue-400 bg-gray-custom md:py-2 sm:py-3 sm:text-lg md:text-md 
                            cursor-pointer md:px-10 hover:text-blue-300">
                                Ingresar
                            </button>
                        </Link>
                    </div>                       

                </div>
            </form>

            </div>
        </div>
    </>);
}
