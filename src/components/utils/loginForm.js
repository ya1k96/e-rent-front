import React from "react";
import logo from '../../images/eRent144x144.png';
import { useForm } from 'react-hook-form';
import { UserContext } from "../context/userContext";
import { useHistory } from "react-router-dom";

export const LoginForm = () => {
    let history = useHistory();
    const {user, setUser} = React.useContext(UserContext);
    const { register, handleSubmit, formState: { errors } } = useForm();
    if(localStorage.getItem('token')) {
        let token = localStorage.getItem('token');
        fetch(`http://192.168.1.8:8080/api/verifyToken?token=${JSON.parse(token)}`)
        .then(resp => resp.json())        
        .then((resp) => {
            if(resp.ok) {
                setUser({...user, logged: true, publicUser: resp.decoded});
                history.push('/');

            }
        })        
    }
    let className = `rounded-full relative shadow-sm h-10 
    focus:rounded-full focus:ring
    focus:outline-none block w-full pl-7 pr-12 md:text-sm sm:text-lg border-gray-300 rounded-full border-2`;


    const onSubmit = (data) => {
        const body = {
            email: data.email,
            password: data.password
        };
        fetch('http://192.168.1.8:8080/api/login',
        {
            headers: {
                "Content-Type": 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(body)            
        })
        .then(resp => resp.json())
        .then(resp => {
            if(resp.ok) {  
                localStorage.setItem('token', JSON.stringify(resp.token));    
                setUser({...user, logged: true});
                history.push('/');

            } else {
                alert(`${resp.error.msg}`)            
            }
        });
    };

    return (<>
        <div className="flex justify-center">
            <div className="md:w-2/5 md:h-2/5 p-10 grid grid-cols-1 gap-1">
                <div className="flex justify-center">
                    <img src={logo} alt=""></img>          
                </div>                
                <p className="text-gray-500 text-center text-xl">e-rent</p>
                <p className="text-gray-500 text-center mb-4 md:text-3xl sm:text-4xl">Ingresar</p>
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
                            <a href="#" className="py-1 text-base font-medium rounded-full text-blue-400 bg-gray-custom md:py-2 sm:py-3 sm:text-lg md:text-md 
                            cursor-pointer md:px-10 hover:text-blue-300">
                                Registrarte
                            </a>
                        </div>
                        <div className="mt-5">
                            <p className="font-medium text-gray-500 text-sm">
                                ¿Olvidaste tu contraseña?                                
                            </p>
                        </div>

                    </div>
                </form>

            </div>
        </div>
    </>);
}
