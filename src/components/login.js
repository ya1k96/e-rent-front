import { Component } from "react";
import logo from '../images/eRent144x144.png';
import { useDispatch } from 'react-redux';
import { login } from "../slice/loginSlise";

export class Login extends Component {
    state = {
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

    getValueForm = (event) => {
        this.setState({
            [event.target.name]: {value: event.target.value}
        });
    }

    resetFieldClass = (event) => {
        this.setState({
            [event.target.name]: {msg: '', invalid: false}
        });
    }

    sendLogin = () => {
        //prueba
        const dispatch = useDispatch();

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
                dispatch(login())
            }
            resp.errors?.forEach(error => {
                this.setState({
                    [error.param]: {invalid: true, msg: error.msg}
                });
            });            
        });
    }

    render() {
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
                        className={this.state.email.invalid
                        ? `border-red-400 ${this.state.className}` : this.state.className} 
                        placeholder="Correo" onChange={this.getValueForm}
                        onClick={this.resetFieldClass}>                            
                        </input>
                        <p className="font-medium text-sm text-red-400">{this.state.email.msg}</p>
                    </div>            
                        <div className="mt-1 rounded-full relative shadow-sm">
                            <input type="password" 
                            name="password"
                            className={ this.state.password.invalid
                            ? `border-red-400  ${this.state.className}` : this.state.className} 
                            placeholder="Contraseña" onChange={this.getValueForm}
                            onClick={this.resetFieldClass}></input>   
                            <p className="font-medium text-sm text-red-400">{this.state.password.msg}</p> 
                        </div>    
                    </form>

                    <div className="grid grid-cols-1 mx-auto gap-y-5 mt-5">
                        <div className="rounded-full w-auto mx-auto">
                            <a  className="px-8 py-1 text-base font-medium rounded-full text-white bg-blue-300  hover:text-blue-100 md:py-2 sm:py-3 sm:text-lg md:text-lg md:px-10 cursor-pointer focus:ring"
                            onClick={this.sendLogin}>
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
        </>
        );
    }
}
