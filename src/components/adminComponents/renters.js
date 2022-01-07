import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import neutralUser from '../../images/icons/neutral-user.png';
import { listarContratos } from '../../redux/contractDuck';
import { spinner } from '../utils/spinner';

const Renters = () => {
    const dispatch = useDispatch();
    const {isLoading, array, success, message} = useSelector(store => store.contracts);  

    useEffect(() => {
        dispatch(listarContratos());
    }, []);    

    return(<>
    <div className="flex justify-center mt-5">
        <Link to="/newrenter">
            <button className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <p className="text-white font-medium">Nuevo inquilino</p>
            </button>
        </Link>
        {/* <Link to="/newrenter">
        </Link> */}
    </div>
    <div className="flex justify-center mt-6">
        {
        isLoading ? spinner() : 
        <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-4">
            {                 
                (array.length > 0 && !isLoading) ?
                array.map(renter => <Link to={'/dashboard/renter/'+renter._id} key={renter._id}>
                <div className="bg-white shadow-lg rounded-xl w-40 h-40 hover:bg-blue-200  cursor-pointer animate__animated animate__fadeIn">                        
                <img className="m-auto mt-3 w-28 h-28" src={neutralUser} alt="invoice-logo"></img>
                <p className="text-center font-medium text-gray-600 ">{renter.name +' '+ renter.surname}</p>
                {
                    renter.aldia ? <div className="flex justify-center">
                        <p className="bg-green-400 rounded-full text-white text-sm font-sans w-1/3 pl-2 pr-1">Al dia</p>
                    </div> : ''
                }
            </div></Link> ) : ''          
            }
        </div>
        }

    </div>
    </>)
}

export default Renters;