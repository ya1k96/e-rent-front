import React from "react";
import { getRenterById } from "../../services/connect";
import { spinner } from "../utils/spinner";
import moment from "moment";
import { Link } from "react-router-dom";
import WordSpace from "../utils/WordSpace";

export const RenterProfile = (props) => {
    const [loading, setloading] = React.useState(true);
    const [renter, setrenter] = React.useState(null);
    
    const {id} = props.computedMatch.params;
    moment.locale('es-ES');

    React.useEffect(() => {
        getRenterById(id)
        .then(resp => {                  
            setloading(false);        
            setrenter(resp.data);
        });
    }, []);

    return (<>
        <p className="font-medium text-2xl text-gray-500 text-center mt-4">Detalles del contrato</p>
        <div className="flex justify-center sm:mt-0 rounded-lg ">
        <div className="md:grid md:grid-cols-12 md:gap-6 md:w-2/4 sm:w-full mt-5">                    
            <div className=" md:mt-0 md:col-span-12 ">            
            { loading ? <div className="mx-auto w-20">{spinner()}</div> : 
            <div className="overflow-hidden sm:rounded-md bg-white shadow-lg mx-5   ">
            <div className="px-4 py-5 sm:p-6">
                <p className="text-md text-gray-600">
                    Contrato celebrado con <span className="text-md text-gray-700 font-medium"><WordSpace>{renter?.surname + ' ' + renter?.name}</WordSpace></span>, por un monto total de <span className="text-md text-gray-700 font-medium">{renter?.price}ARS</span> y un plazo de <span className="text-md text-gray-700 font-medium">
                        <WordSpace>{moment(renter?.end).from(renter?.begin)}.</WordSpace>
                    </span> 
                     Iniciando el dia 
                    <span className="text-md text-gray-700 font-medium">
                    <WordSpace>{ moment(renter?.begin).format('YYYY-MM-DD')}</WordSpace>
                    </span>, dando por finalizado a la fecha { moment(renter?.end).format('YYYY-MM-DD')}.
                    <br/>
                    Se fija un incremento de 
                    <span className="text-md text-gray-700 font-medium">
                        <WordSpace>{renter?.increment_porc}%
                        </WordSpace>
                    </span>
                     con respecto al precio del ultimo recibo, este se hara cada 
                     <span className="text-md text-gray-700 font-medium">
                     {renter?.increment_month} 
                     </span>
                     meses hasta finalizar el contrato.
                </p>
                
            </div>                
                <div className="px-4 py-3 text-right sm:px-6">
                    <button type="submit" className="inline-flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-400 focus:outline-none focus:ring-2 focus:ring-offset-2 ">
                    Eliminar
                    </button>
                    <Link to={ renter?._id + '/edit'}>
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