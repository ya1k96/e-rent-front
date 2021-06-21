import { useState } from "react";
import logo from '../images/eRent144x144.png';

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
    className: ` h-10 
    focus:rounded-full focus:ring
    focus:outline-none block w-full pl-7 pr-12 md:text-sm sm:text-lg border-gray-300 rounded-full border-2 `
};    
let getValueForm = (event, setState) => {
    console.log(setState)
    // this.setState({
    //     [event.target.name]: {value: event.target.value}
    // });
}

let resetFieldClass = (event) => {
    console.log(event)
    // this.setState({
    //     [event.target.name]: {msg: '', invalid: false}
    // });
}

let sendLogin = () => {

    const body = {
        email: this.state.email.value,
        password: this.state.password.value
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
            this.setState({
                [error.param]: {invalid: true, msg: error.msg}
            });
        });            
    });
}
export const Login = () => {
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
                        className={state.email.invalid
                        ? `border-red-400 ${state.className}` : state.className} 
                        placeholder="Correo" onChange={getValueForm}
                        onClick={resetFieldClass}>                            
                        </input>
                        <p className="font-medium text-sm text-red-400">{state.email.msg}</p>
                    </div>            
                        <div className="mt-1 rounded-full relative shadow-sm">
                            <input type="password" 
                            name="password"
                            className={ state.password.invalid
                            ? `border-red-400  ${state.className}` : state.className} 
                            placeholder="Contraseña" onChange={getValueForm}
                            onClick={resetFieldClass}></input>   
                            <p className="font-medium text-sm text-red-400">{state.password.msg}</p> 
                        </div>    
                    </form>

                    <div className="grid grid-cols-1 mx-auto gap-y-5 mt-5">
                        <div className="rounded-full w-auto mx-auto">
                            <a  className="px-8 py-1 text-base font-medium rounded-full text-white bg-blue-300  hover:text-blue-100 md:py-2 sm:py-3 sm:text-lg md:text-lg md:px-10 cursor-pointer focus:ring"
                            onClick={sendLogin}>
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
