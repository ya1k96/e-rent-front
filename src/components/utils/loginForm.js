import React, {useEffect} from "react";
import logo from '../../images/eRent144x144.png';
import { useForm } from 'react-hook-form';
import { Link } from "react-router-dom";
import { loader } from '../utils/spinner';
import { useDispatch, useSelector } from 'react-redux';
import { login } from "../../redux/authDuck";

export const LoginForm = () => {
    let className = `rounded-full relative shadow-sm h-10 
    focus:rounded-full focus:ring focus:ring-blue-200 focus:border-blue-300 
     block w-full pl-7 pr-12 md:text-sm sm:text-lg border-gray-300 rounded-full border-2 text-gray-500`;
    const { register, handleSubmit, formState: { errors } } = useForm();
    const dispatch = useDispatch();
    const {isLoading, error, success} = useSelector(store => store.auth);  

    const onSubmit = (data) => {
        const body = {
            email: data.email,
            password: data.password
        };
        //Disparamos la accion de login
        dispatch(login(body));        
    };

    return (<>
        {isLoading ? loader() : ''}        
        <div className="flex justify-center">
            <div className="md:w-2/5 md:h-2/5 p-10 grid grid-cols-1 gap-1">
                <div className="flex justify-center">
                    <img src={logo} alt=""></img>          
                </div>                
                <p className="text-gray-500 text-center text-xl">e-rent</p>
                <p className="text-gray-500 text-center mb-4 md:text-3xl sm:text-4xl">Ingresar</p>  
                {/* ERROR SECTION  */}
                {   
                    (!success && error) ? 
                    <div className="bg-red-200 rounded-xl p-2">
                        <p className="font-medium text-sm text-red-500 text-center">{error}</p>
                    </div>
                    : ''
                }                            
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
                            type="submit">Ingresar</button>
                        </div>
                        <div className="rounded-full w-auto mx-auto mt-2">
                            <Link to="/register">
                                <button href="" className="py-1 text-base font-medium rounded-full text-blue-400 bg-gray-custom md:py-2 sm:py-3 sm:text-lg md:text-md 
                                cursor-pointer md:px-10 hover:text-blue-300">
                                    Registrarte
                                </button>
                            </Link>
                        </div>
                        <div className="mt-5">
                            <p className="font-medium text-gray-500 text-sm text-center">
                                ¿Olvidaste tu contraseña?                                
                            </p>
                        </div>

                    </div>
                </form>

            </div>
        </div>
    </>);
}
