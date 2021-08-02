import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import logoERent from '../../images/eRent144x144.png';
import { UserContext } from "../context/userContext";
import Modal from "../utils/modal";

const Navbar = (props) => {
    const { setUser } = React.useContext(UserContext);
    const [active, setActive] = useState(false);
    let history = useHistory();

    const toggle = () => {
        setActive(!active);
    }

    const handle = () => {
        localStorage.removeItem('token');
        setUser({publicUser:null, logged: false})
        history.push('/');
    }

    return (<>
        <div className="relative bg-gray-custom shadow-md p-0">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
            <div className="flex justify-around items-center border-b-2 border-gray-100 py-2">
            <div className="flex items-center">
                <img className="h-12 w-12" src={logoERent}></img>
                <a className="font-medium text-gray-600 text-xl" href="/">
                    e-Rent
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
            <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-blue-100 sm:mx-0 sm:h-10 sm:w-10">
                <svg className="h-6 w-6 text-red-600" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">              
                </svg>
            </div>
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