import React, { useEffect } from "react";
import { spinner } from "../utils/spinner";
import moment from "moment";
import { Link } from "react-router-dom";
import WordSpace from "../utils/WordSpace";
import { useDispatch, useSelector } from "react-redux";
import { detailContract } from "../../redux/contractDuck";

export const RenterProfile = (props) => {
    const {id} = props.computedMatch.params;
    const dispatch = useDispatch();
    const { isLoading, one } = useSelector(store => store.contracts);
    
    moment.locale('es-ES');

    useEffect(() => {
        dispatch(detailContract(id));
    }, []);

    return (<>
        <p className="head-text mt-4">Detalles del contrato</p>
        <div className="content-center sm:mt-0 rounded-lg ">
        <div className="md:grid md:grid-cols-12 md:gap-6 md:w-2/4 sm:w-full mt-5">                    
            <div className=" md:mt-0 md:col-span-12 ">            
            { isLoading ? <div className="mx-auto w-20">{spinner()}</div> : 
            <div className="overflow-hidden sm:rounded-md bg-white shadow-lg mx-5   ">
            <div className="px-4 py-5 sm:p-6">
                <p className="text-md text-gray-600">
                    Contrato celebrado con <span className="profile-text text-md"><WordSpace>{one?.surname + ' ' + one?.name}</WordSpace></span>, por un monto total de <span className="profile-text text-md">{one?.price}ARS</span> y un plazo de <span className="profile-text text-md">
                        <WordSpace>{moment(one?.end).from(one?.begin)}.</WordSpace>
                    </span> 
                     Iniciando el dia 
                    <span className="profile-text text-md">
                    <WordSpace>{ moment(one?.begin).format('YYYY-MM-DD')}</WordSpace>
                    </span>, dando por finalizado a la fecha { moment(one?.end).format('YYYY-MM-DD')}.
                    <br/>
                    Se fija un incremento de 
                    <span className="profile-text text-md">
                        <WordSpace>{one?.increment_porc}%
                        </WordSpace>
                    </span>
                     con respecto al precio del ultimo recibo, este se hara cada 
                     <span className="profile-text text-md">
                     {one?.increment_month} 
                     </span>
                     meses hasta finalizar el contrato.
                </p>
                
            </div>                
                <div className="px-4 py-3 text-right sm:px-6">
                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                    Eliminar
                    </button>
                    <Link to={ one?._id + '/edit'}>
                        <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-blue-400 bg-white-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                        Editar
                        </button>
                    </Link>
                </div>
            </div>
        }                     
            </div>                    
        </div>
        </div>
    </>);
}