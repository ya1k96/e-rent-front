import React from "react";
import { Link } from "react-router-dom";
import ItemInvoice from "./itemInvoice";
const ListInvoices = (props) => { 
    return props.renters.map(invoice => 
        <Link to={'/dashboard/invoice/'+invoice._id}
        key={invoice._id}>
            <ItemInvoice name={invoice.contract_id.name + ' ' + invoice.contract_id.surname} 
            total={invoice.total} 
            month={invoice.month}
            >
            </ItemInvoice>
        </Link>
    );
}

export default ListInvoices;