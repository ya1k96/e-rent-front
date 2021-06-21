import React, { useState } from "react";
import logo from '../images/eRent144x144.png';
import { useForm } from 'react-hook-form';

let getValueForm = (event, state, setState) => {
    let newState = state;
    newState[event.target.name].value = event.target.value;
    setState(state);
}

let resetField = (state, setState) => {
    let newState = state;
    newState.email.invalid = false;
    newState.password.invalid = false;
    newState.email.msg = '';
    newState.password.msg = '';
    
    setState(state); 
}



let sendLogin = (state, setState) => {
    const body = {
        email: state.email.value,
        password: state.password.value
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
            //prueba
        }
        resp.errors?.forEach(error => {
            let newState = state;
            newState[error.param].invalid = true;
            newState[error.param].msg = error.msg;

            setState(state); 
            //Renderizamos los cambios
            // render({
            //     email: state.email.value,
            //     password: state.password.value
            // })           
        });            
    });
}

export const Login = () => {
    let onSubmit = (e) => {
        console.log(e)
        e.preventDefault();
    }
        let initialState = {
            email: {
                value: ''
            },
            password: {
                value: ''
            },
        }; 
        const { register, handleSubmit, formState: { errors } } = useForm();
        const [state, setState] = useState(initialState);

        return (<>
            <div className="flex justify-center">
                <div className="md:w-2/5 md:h-2/5 p-10 grid grid-cols-1 gap-1">
                    <div className="flex justify-center">
                        <img src={logo} alt=""></img>          
                    </div>
                    <p className="text-gray-500 text-center text-xl">e-rent</p>
                    <p className="text-gray-500 text-center mb-4 md:text-3xl sm:text-4xl">Ingresar</p>
                    <form action="" onSubmit={handleSubmit(onSubmit)}>
                    <div className="mt-1 rounded-full relative shadow-sm">
                        <input type="text" id="email" name="email"
                        {
                            ...register('email', { required: { value:true, message: 'Campo requerido'} })
                        }
                        className="h-10 
                        focus:rounded-full focus:ring
                        focus:outline-none block w-full pl-7 pr-12 md:text-sm sm:text-lg border-gray-300 rounded-full border-2" 
                        placeholder="Correo"
                        >                            
                        </input> 
                        {errors.name && errors.name.type === "required" && (
                            <span role="alert">This is required</span>
                        )}                               
                        <p className="font-medium text-sm text-red-400 animate__animated animate__fadeIn">
                            <span className="text-danger text-small d-block mb-2">
                            </span>
                        </p>
                    </div>            
                        <div className="mt-1 rounded-full relative shadow-sm">
                            <input type="password" 
                            name="password"
                            className="h-10 
                            focus:rounded-full focus:ring
                            focus:outline-none block w-full pl-7 pr-12 md:text-sm sm:text-lg border-gray-300 rounded-full border-2" 
                            {...register('password', { required: true })}
                            placeholder="Contraseña" 
                            ></input>   
                            <p className="font-medium text-sm text-red-400 animate__animated animate__fadeIn">
                            </p> 
                        </div>    
                        <div className="grid grid-cols-1 mx-auto gap-y-5 mt-5">
                            <div className="rounded-full w-auto mx-auto">
                                <input  className="px-8 py-1 text-base font-medium rounded-full text-white bg-blue-400  hover:text-blue-100 md:py-2 sm:py-3 sm:text-lg md:text-lg md:px-10 cursor-pointer"
                                value="Ingresar"
                                type="submit"></input>
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
