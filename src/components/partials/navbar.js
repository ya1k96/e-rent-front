import React, {useState} from "react";
import logoERent from '../../images/eRent_brand.png';
import { Redirect } from 'react-router';
import Modal from "../utils/modal";

const Navbar = (props) => {
    const [active, setActive] = useState(false);

    const toggle = () => {
        setActive(!active);
    }

    const handle = () => {
        localStorage.removeItem('token');
        return (<Redirect to="/" />);
    }

    return (<>
        <div className="relative bg-gray-custom shadow-md p-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-around items-center border-b-2 border-gray-100 py-2">
            <div className="flex items-center">                
                <a className="font-medium text-gray-600 text-xl" href="/">
                    <img className="h-12 py-1" src={logoERent}></img>
                </a>
            </div>                  
            <div className="flex items-center">                    
                    <p className="font-medium text-gray-500 cursor-pointer mr-5">{props.name}</p>
                    <button className="" onClick={toggle}>
                        
                        <p className="text-md font-medium text-gray-700"><span className="fui-exit"></span> salir</p>
                    </button>
            </div>
            </div>
        </div>
                
    </div>
    <Modal active={active} toggle={toggle} okMessage="Si" handle={handle}>
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
           
            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">
                Cerrar sesion
                </h3>
                <div className="mt-2">
                <p className="text-sm text-gray-500">
                    ¿Estas seguro que queres salir?
                </p>
                </div>
            </div>
            </div>
        </div>
    </Modal>
    </>);
}

export default Navbar;