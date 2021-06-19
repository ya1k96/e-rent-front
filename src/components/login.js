import { Component } from "react";
import logo from '../images/eRent144x144.png';

export class Login extends Component {
    render() {
        return (<>
            <div className="flex justify-center">
                <div className="md:w-2/5 md:h-2/5 p-10 grid grid-cols-1 gap-1">
                    <div className="flex justify-center">
                        <img src={logo} alt=""></img>          
                    </div>
                    <p className="text-gray-500 text-center text-xl">e-rent</p>
                    <p className="text-gray-500 text-center mb-4 text-3xl">Ingresar</p>
                    <form action="">
                    <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">                    
                        </div>
                        <input type="text" name="price" 
                        className="h-11 
                        focus:rounded-full focus:ring
                        focus:outline-none  block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-full border-2" placeholder="Correo"></input>
                        <div className="absolute inset-y-0 right-0 flex items-center">
                        </div>
                    </div>            
                        <div className="mt-1 relativexl shadow-sm">
                            <input type="password" name="price" 
                            className="h-11 
                            focus:outline-none focus:ring
                            focus:rounded-full  block w-full pl-7 pr-12 sm:text-sm border-gray-300 rounded-full border-2" placeholder="Contraseña"></input>    
                        </div>    
                    </form>
                    <div className="flex justify-center mt-5">
                    <div className="rounded-full shadow w-32 mr-5">
                    <a  className="flex items-center justify-center px-8 py-1 border border-transparent text-base font-medium rounded-full text-white bg-blue-300 hover:bg-gray-100 hover:text-blue-400 md:py-2 md:text-lg md:px-10 cursor-pointer">
                        Ingresar
                    </a>
                    </div>
                    <div className="rounded-full shadow w-32">
                    <a href="#" className="flex items-center justify-center px-8 py-1 border border-transparent text-base font-medium rounded-full text-blue-400 bg-gray-100 hover:bg-blue-100 hover:text-blue-400 md:py-2 md:text-lg 
                    cursor-pointer md:px-10">
                        Registrarte
                    </a>
                    </div>

                    </div>

                </div>
            </div>
        </>
        );
    }
}
