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
    <div className="content-center mt-5">
        <Link to="/newrenter">
            <button className="btn-primary">
                <p className="text-white font-medium">Nuevo inquilino</p>
            </button>
        </Link>
        {/* <Link to="/newrenter">
        </Link> */}
    </div>
    <div className="content-center mt-5">
        {
        isLoading ? spinner() : 
        <div className="renters-grid">
            {                 
                (array.length > 0 && !isLoading) ?
                array.map(renter => <Link to={'/dashboard/renter/'+renter._id} key={renter._id}>
                <div className="renter-card">                        
                <img className="m-auto mt-3 w-28 h-28" src={neutralUser} alt="invoice-logo"></img>
                <p className="text-card">{renter.name +' '+ renter.surname}</p>
                {
                    renter.aldia ? <div className="content-center">
                        <p className="badge-green">Al dia</p>
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