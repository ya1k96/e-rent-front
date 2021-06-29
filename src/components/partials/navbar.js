import { Component } from "react";
import { Link } from "react-router-dom";
import logoERent from '../../images/eRent144x144.png';

export class Navbar extends Component {
    openMenu() {
        return (<div className="-mr-2 -my-2 md:hidden">
        <button type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-expanded="false">
        <span className="sr-only">Open menu</span>
        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" ariaHidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
        </button>
    </div> );
    }
    
    itemsNav() {
        return (<nav className="w-1/4 md:block lg:block sm:hidden">
        <div className="flex justify-around">                       
            <Link to="/renters">
                <a  className="text-base font-medium text-gray-500 hover:text-gray-900">
                Renters
                </a>
            </Link>
            <Link to="/info">
                <a  className="text-base font-medium text-gray-500 hover:text-gray-900">
                Info
                </a>
            </Link>
            <Link to="/info">
                <a  className="text-base font-medium text-gray-500 hover:text-gray-900">
                Info
                </a>
            </Link>
        </div>
        
    </nav>
    )
    }
    render() {
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
                        <p className="font-medium text-gray-500 cursor-pointer">{this.props.name}</p>
                </div>
                </div>
            </div>
                   
        </div>
        </>);
    }
}