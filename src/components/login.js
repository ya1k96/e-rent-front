import React, { useState } from "react";
import logo from '../images/eRent144x144.png';
import ReactDOM from 'react-dom';

let initialState = {
    email: {
        invalid: false,
        msg: '',
        value: ''
    },
    password: {
        invalid: false,
        msg: '',
        value: ''
    },
    loading: false,
    className: ` h-10 
    focus:rounded-full focus:ring
    focus:outline-none block w-full pl-7 pr-12 md:text-sm sm:text-lg border-gray-300 rounded-full border-2 `
};    
let getValueForm = (event, state, setState) => {
    state[event.target.name].value = event.target.value;
    setState(state);
}

let resetField = (state, setState) => {
    state.email.invalid = false;
    state.password.invalid = false;
    state.email.msg = '';
    state.password.msg = '';
    
    setState(state);

    //Renderizamos los cambios
    render({
        email: state.email.value,
        password: state.password.value
    })     
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
            state[error.param].invalid = true;
            state[error.param].msg = error.msg;

            setState(state); 
            //Renderizamos los cambios
            render({
                email: state.email.value,
                password: state.password.value
            })           
        });            
    });
}

let render = (props) => {
    ReactDOM.render(<Login email={props.email} password={props.password}></Login>, document.getElementById('root'))
}

export const Login = (props = {email: '', password: ''} ) => {
    const [state, setState] = useState(initialState);

        return (<>
            <div className="flex justify-center">
                <div className="md:w-2/5 md:h-2/5 p-10 grid grid-cols-1 gap-1">
                    <div className="flex justify-center">
                        <img src={logo} alt=""></img>          
                    </div>
                    <p className="text-gray-500 text-center text-xl">e-rent</p>
                    <p className="text-gray-500 text-center mb-4 md:text-3xl sm:text-4xl">Ingresar</p>
                    <form action="">
                    <div className="mt-1 rounded-full relative shadow-sm">
                        <input type="text" name="email"
                        onClick={()=>{resetField(state, setState)}} 
                        defaultValue={props.email}
                        className={state.email.invalid
                        ? `border-red-400 ${state.className}` : state.className} 
                        placeholder="Correo" onChange={
                            (event) => {
                                getValueForm(event, state, setState);
                            }
                        }
                        >                            
                        </input>
                        <p className="font-medium text-sm text-red-400 animate__animated animate__fadeIn">{state.email.msg}</p>
                    </div>            
                        <div className="mt-1 rounded-full relative shadow-sm">
                            <input type="password" 
                            name="password"
                            onClick={()=>{resetField(state, setState)}}
                            defaultValue={props.password}
                            className={ state.password.invalid
                            ? `border-red-400  ${state.className}` : state.className} 
                            placeholder="Contraseña" onChange={
                                (event) => {
                                    getValueForm(event, state, setState);
                                }
                            }
                            ></input>   
                            <p className="font-medium text-sm text-red-400 animate__animated animate__fadeIn">{state.password.msg}</p> 
                        </div>    
                    </form>

                    <div className="grid grid-cols-1 mx-auto gap-y-5 mt-5">
                        <div className="rounded-full w-auto mx-auto">
                            <a  className="px-8 py-1 text-base font-medium rounded-full text-white bg-blue-400  hover:text-blue-100 md:py-2 sm:py-3 sm:text-lg md:text-lg md:px-10 cursor-pointer"
                            onClick={() => sendLogin(state, setState)}>                             
                                Ingresar
                            </a>
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
                </div>
            </div>
        </>);
}
